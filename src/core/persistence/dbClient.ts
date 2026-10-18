import {
  PathEnrollment360,
  ActivityProgressRecord,
  LearningPath360,
  SyncStatus,
  CompletenessReport,
} from '../../types/pedagogy360';

// ============================================================================
// CLIENT DE PERSISTANCE RÉSISTANT (HYBRIDE API SERVERLESS + CACHE LOCAL)
// ============================================================================

export interface SaveResult {
  success: boolean;
  syncedToRemote: boolean;
  timestamp: string;
  error?: string;
}

class DatabasePersistenceClient {
  private localKeyPrefix = 'finlearn_360_';
  private syncListeners: ((status: SyncStatus) => void)[] = [];
  private memoryFallback = new Map<string, string>();
  private syncStatus: SyncStatus = {
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    isSyncing: false,
    lastSyncedAt: null,
    pendingChangesCount: 0,
    hasSyncError: false,
  };

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleNetworkChange(true));
      window.addEventListener('offline', () => this.handleNetworkChange(false));
    }
  }

  public subscribeSyncStatus(listener: (status: SyncStatus) => void): () => void {
    this.syncListeners.push(listener);
    listener(this.syncStatus);
    return () => {
      this.syncListeners = this.syncListeners.filter((l) => l !== listener);
    };
  }

  private notifySyncListeners() {
    this.syncListeners.forEach((l) => l({ ...this.syncStatus }));
  }

  private handleNetworkChange(online: boolean) {
    this.syncStatus.isOnline = online;
    if (!online) {
      this.syncStatus.hasSyncError = true;
      this.syncStatus.syncErrorMessage = 'Connexion réseau perdue. Mode hors-ligne actif.';
    } else {
      this.syncStatus.hasSyncError = false;
      this.syncStatus.syncErrorMessage = undefined;
      this.flushPendingSync();
    }
    this.notifySyncListeners();
  }

  // --------------------------------------------------------------------------
  // ENROLLMENTS & PROGRESSION
  // --------------------------------------------------------------------------

  public async getEnrollment(userId: string, pathId: string): Promise<PathEnrollment360 | null> {
    const localKey = `${this.localKeyPrefix}enrollment_${userId}_${pathId}`;

    // 1. Tenter la récupération distante si en ligne et dans le navigateur
    if (this.syncStatus.isOnline && typeof window !== 'undefined' && typeof fetch !== 'undefined') {
      try {
        const response = await fetch(`/api/progress?userId=${encodeURIComponent(userId)}&pathId=${encodeURIComponent(pathId)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.enrollment) {
            this.setLocal(localKey, data.enrollment);
            this.syncStatus.lastSyncedAt = new Date().toISOString();
            this.syncStatus.hasSyncError = false;
            this.notifySyncListeners();
            return data.enrollment;
          }
        }
      } catch (err: any) {
        console.warn('[Persistence] Serveur distant injoignable, lecture du cache local:', err.message);
        this.syncStatus.hasSyncError = true;
        this.syncStatus.syncErrorMessage = 'Serveur distant indisponible, utilisation du cache local.';
        this.notifySyncListeners();
      }
    }

    // 2. Fallback cache local persistant
    return this.getLocal<PathEnrollment360>(localKey);
  }

  public async getAllUserEnrollments(userId: string): Promise<PathEnrollment360[]> {
    const listKey = `${this.localKeyPrefix}enrollments_list_${userId}`;
    
    if (this.syncStatus.isOnline && typeof window !== 'undefined' && typeof fetch !== 'undefined') {
      try {
        const response = await fetch(`/api/progress?userId=${encodeURIComponent(userId)}&mode=all`, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.enrollments)) {
            this.setLocal(listKey, data.enrollments);
            return data.enrollments;
          }
        }
      } catch (err) {
        // Fallback local
      }
    }

    const cached = this.getLocal<PathEnrollment360[]>(listKey);
    return cached || [];
  }

  public async saveEnrollment(enrollment: PathEnrollment360): Promise<SaveResult> {
    const localKey = `${this.localKeyPrefix}enrollment_${enrollment.userId}_${enrollment.pathId}`;
    const listKey = `${this.localKeyPrefix}enrollments_list_${enrollment.userId}`;
    
    // 1. Sauvegarde locale immédiate garantie
    this.setLocal(localKey, enrollment);
    
    // Mettre à jour la liste locale
    const existingList = this.getLocal<PathEnrollment360[]>(listKey) || [];
    const updatedList = [
      enrollment,
      ...existingList.filter((e) => e.pathId !== enrollment.pathId),
    ];
    this.setLocal(listKey, updatedList);

    // 2. Tenter l'envoi au serveur Vercel/PostgreSQL
    if (this.syncStatus.isOnline && typeof fetch !== 'undefined') {
      this.syncStatus.isSyncing = true;
      this.notifySyncListeners();

      try {
        const url = typeof window !== 'undefined' ? '/api/progress' : 'http://localhost/api/progress';
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enrollment }),
        });

        this.syncStatus.isSyncing = false;

        if (response && response.ok) {
          this.syncStatus.lastSyncedAt = new Date().toISOString();
          this.syncStatus.hasSyncError = false;
          this.syncStatus.syncErrorMessage = undefined;
          this.notifySyncListeners();
          return {
            success: true,
            syncedToRemote: true,
            timestamp: this.syncStatus.lastSyncedAt,
          };
        } else {
          const errData = response ? await response.json().catch(() => ({})) : {};
          const errMsg = errData.error || (response ? `Erreur serveur HTTP ${response.status}` : 'Erreur réseau');
          this.syncStatus.hasSyncError = true;
          this.syncStatus.syncErrorMessage = `Échec de sauvegarde distante : ${errMsg}`;
          this.queuePendingSync(enrollment);
          this.notifySyncListeners();
          return {
            success: false,
            syncedToRemote: false,
            timestamp: new Date().toISOString(),
            error: errMsg,
          };
        }
      } catch (networkErr: any) {
        this.syncStatus.isSyncing = false;
        this.syncStatus.hasSyncError = true;
        this.syncStatus.syncErrorMessage = `Réseau indisponible : ${networkErr.message}`;
        this.queuePendingSync(enrollment);
        this.notifySyncListeners();
        return {
          success: false,
          syncedToRemote: false,
          timestamp: new Date().toISOString(),
          error: networkErr.message || 'Erreur réseau',
        };
      }
    } else {
      // Hors-ligne explicite
      this.queuePendingSync(enrollment);
      return {
        success: true,
        syncedToRemote: false,
        timestamp: new Date().toISOString(),
        error: 'Mode hors-ligne : sauvegarde locale enregistrée, en attente de synchronisation distante.',
      };
    }
  }

  // --------------------------------------------------------------------------
  // GESTION DU BUFFER DE SYNCHRONISATION (OFFLINE RESILIENCE)
  // --------------------------------------------------------------------------

  private queuePendingSync(enrollment: PathEnrollment360) {
    const queueKey = `${this.localKeyPrefix}pending_sync_queue`;
    const queue = this.getLocal<PathEnrollment360[]>(queueKey) || [];
    const filtered = queue.filter((e) => !(e.userId === enrollment.userId && e.pathId === enrollment.pathId));
    filtered.push(enrollment);
    this.setLocal(queueKey, filtered);
    this.syncStatus.pendingChangesCount = filtered.length;
  }

  private async flushPendingSync() {
    const queueKey = `${this.localKeyPrefix}pending_sync_queue`;
    const queue = this.getLocal<PathEnrollment360[]>(queueKey) || [];
    if (queue.length === 0) return;

    this.syncStatus.isSyncing = true;
    this.notifySyncListeners();

    const remaining: PathEnrollment360[] = [];
    for (const item of queue) {
      try {
        const url = typeof window !== 'undefined' ? '/api/progress' : 'http://localhost/api/progress';
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enrollment: item }),
        });
        if (!res.ok) remaining.push(item);
      } catch {
        remaining.push(item);
      }
    }

    this.setLocal(queueKey, remaining);
    this.syncStatus.pendingChangesCount = remaining.length;
    this.syncStatus.isSyncing = false;
    this.syncStatus.lastSyncedAt = remaining.length === 0 ? new Date().toISOString() : this.syncStatus.lastSyncedAt;
    this.notifySyncListeners();
  }

  // --------------------------------------------------------------------------
  // HELPERS STORAGE LOCAL ET FALLBACK MÉMOIRE
  // --------------------------------------------------------------------------

  private getLocal<T>(key: string): T | null {
    if (typeof localStorage !== 'undefined') {
      try {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : null;
      } catch {
        return null;
      }
    }
    const val = this.memoryFallback.get(key);
    return val ? JSON.parse(val) : null;
  }

  private setLocal(key: string, data: any) {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.error('[Persistence] Erreur écriture localStorage:', e);
      }
    }
    this.memoryFallback.set(key, JSON.stringify(data));
  }
}

export const dbPersistence = new DatabasePersistenceClient();
