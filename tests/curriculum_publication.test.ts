import { describe, expect, it } from 'vitest';
import { ALL_LEARNING_PATHS_360 } from '../src/data/curriculum360Data';
import { CompletenessAuditor } from '../src/core/authoring/completenessAuditor';

describe('publication et cohérence du catalogue 360°', () => {
  it('ne publie que les parcours qui passent réellement l’audit de complétude', () => {
    const published = ALL_LEARNING_PATHS_360.filter((path) => path.status === 'published');
    expect(published.map((path) => path.id)).toEqual(['PATH_FIN_ANALYST_360']);
    for (const path of published) {
      const report = CompletenessAuditor.auditPath(path);
      expect(report.isReadyForPublish, path.title).toBe(true);
      expect(report.missingElements, path.title).toEqual([]);
    }
    for (const path of ALL_LEARNING_PATHS_360.filter((candidate) => candidate.status === 'draft')) {
      expect(CompletenessAuditor.auditPath(path).isReadyForPublish, path.title).toBe(false);
    }
  });

  it('conserve des identifiants uniques pour les parcours, modules et leçons', () => {
    const pathIds = ALL_LEARNING_PATHS_360.map((path) => path.id);
    expect(new Set(pathIds).size).toBe(pathIds.length);
    for (const path of ALL_LEARNING_PATHS_360) {
      const moduleIds = path.levels.flatMap((level) => level.modules.map((module) => module.id));
      const lessonIds = path.levels.flatMap((level) => level.modules.flatMap((module) =>
        module.chapters.flatMap((chapter) => chapter.lessons.map((lesson) => lesson.id))));
      expect(new Set(moduleIds).size, path.title).toBe(moduleIds.length);
      expect(new Set(lessonIds).size, path.title).toBe(lessonIds.length);
      expect(path.levels.every((level) => level.modules.length > 0), path.title).toBe(true);
      expect(lessonIds.length, path.title).toBeGreaterThan(0);
    }
  });
});
