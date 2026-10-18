import { LearningPath360, Lesson360, Module360 } from '../../types/pedagogy360';

interface ExtraLessonSpec {
  title: string;
  context: string;
  theory: [string, string, string];
  example: { title: string; scenario: string; dataset: Record<string, number | string>; steps: string[] };
  company: string;
  problem: string;
  resolution: string;
  exercise: { instruction: string; dataset: Record<string, number | string>; answer: number; correction: string };
  transfer: { instruction: string; dataset: Record<string, number | string>; answer: number; correction: string };
  questions: [
    { question: string; options: [string, string, string, string]; correctIndex: number; explanation: string },
    { question: string; options: [string, string, string, string]; correctIndex: number; explanation: string },
  ];
}

const extraLessons: Record<string, [ExtraLessonSpec, ExtraLessonSpec]> = {
  MOD_N1_M1: [
    {
      title: 'De la pièce justificative à la vente à crédit',
      context: 'Une vente n’est pas un simple montant au journal : il faut distinguer la livraison, la facture, la dette du client, la TVA collectée et le règlement ultérieur. Cette leçon suit une transaction de bout en bout.',
      theory: [
        'La facture constate une créance lorsque le bien est livré ou le service rendu selon les conditions applicables. Elle ne prouve pas que l’argent est déjà reçu. L’analyste sépare donc trois dates : fait générateur, émission de la pièce et encaissement. Cette distinction explique pourquoi le chiffre d’affaires et la trésorerie évoluent à des moments différents.',
        'Pour une vente taxable, le débit du compte client porte le TTC. Le crédit du produit porte le HT, tandis que la TVA facturée est isolée au compte de TVA collectée. À l’encaissement, on débite la banque et on crédite le client : le règlement éteint la créance, il ne crée pas un second produit.',
        'Le contrôle de la chaîne rapproche bon de commande, bon de livraison, facture, journal des ventes et relevé bancaire. Un écart peut révéler une erreur de période, une facture dupliquée, un paiement partiel ou un litige. La TVA et les comptes précis dépendent de la nature de l’opération et des règles applicables à la date de la transaction.',
      ],
      example: { title: 'Vente de fournitures à crédit', scenario: 'EKD livre des fournitures pour 2 500 000 FCFA HT, TVA pédagogique de 18 %, payable à 30 jours.', dataset: { ht: 2500000, tva: 450000, ttc: 2950000 }, steps: ['Calculer la TVA : 2 500 000 × 18 % = 450 000 FCFA.', 'Débiter le client de 2 950 000 FCFA.', 'Créditer le produit de 2 500 000 FCFA et la TVA collectée de 450 000 FCFA.', 'Au règlement, débiter Banque et créditer Client pour le montant reçu.'] },
      company: 'EKD SARL, distributeur de fournitures à Yamoussoukro', problem: 'Le journal crédite le compte produit du TTC et omet la TVA collectée ; le total des ventes est alors surévalué.', resolution: 'Reprendre la facture, séparer HT et TVA, puis rapprocher la créance avec l’échéancier client. Le règlement sera comptabilisé séparément à la date de valeur bancaire.',
      exercise: { instruction: 'Une prestation est facturée 1 200 000 FCFA HT avec une TVA pédagogique de 18 %. Quel est le montant TTC de la créance ?', dataset: { ht: 1200000, tauxTvaPourcent: 18 }, answer: 1416000, correction: 'TVA = 1 200 000 × 18 % = 216 000 FCFA. La créance TTC vaut 1 416 000 FCFA. Produit HT et TVA collectée restent sur des comptes distincts.' },
      transfer: { instruction: 'Le client paie 900 000 FCFA sur une créance initiale de 1 416 000 FCFA. Quel solde reste dû ?', dataset: { creanceInitiale: 1416000, reglement: 900000 }, answer: 516000, correction: 'Solde client = 1 416 000 − 900 000 = 516 000 FCFA. Seule la partie réglée est lettrée ; le reliquat reste dans l’échéancier.' },
      questions: [
        { question: 'Quel événement éteint une créance client ?', options: ['La livraison', 'La comptabilisation de la TVA', 'Le règlement rapproché avec le client', 'La clôture mensuelle'], correctIndex: 2, explanation: 'La livraison permet de constater la vente selon les conditions applicables ; seul le règlement éteint la créance à hauteur du montant payé.' },
        { question: 'Pourquoi le compte client est-il débité du TTC dans cet exemple ?', options: ['Il comprend la TVA due par le client avec le prix', 'La TVA est toujours une charge', 'Le TTC est le chiffre d’affaires', 'Le paiement a déjà été reçu'], correctIndex: 0, explanation: 'Le client doit le montant total de la facture. Le produit demeure égal au montant hors taxe.' },
      ],
    },
    {
      title: 'Suivre une opération du journal jusqu’aux états financiers',
      context: 'Le contrôle d’une écriture ne s’arrête pas à l’égalité débit-crédit. Il faut vérifier son passage au grand livre, son solde dans la balance et son effet sur le bilan et le résultat.',
      theory: [
        'Le journal conserve l’ordre chronologique et la référence de la pièce. Le grand livre regroupe les mouvements par compte : il permet de retrouver l’origine d’un solde. La balance synthétise les soldes débiteurs et créditeurs ; l’égalité de ses totaux détecte certaines erreurs, mais ne prouve pas à elle seule que les comptes sont correctement classés.',
        'Une vente à crédit augmente un produit et une créance. L’encaissement ultérieur transforme cette créance en disponibilité sans modifier le produit de la vente. À la clôture, les créances non réglées restent à l’actif, sous réserve des dépréciations nécessaires. L’analyse du résultat doit donc être complétée par l’analyse du recouvrement.',
        'La piste d’audit se construit avec la même référence de pièce dans le journal, le compte auxiliaire client et le justificatif bancaire. En pratique, on contrôle la période, le sens, le montant et le lettrage. Une balance équilibrée peut masquer une imputation au mauvais compte ou une omission complète des deux côtés.',
      ],
      example: { title: 'Facture puis règlement partiel', scenario: 'Une facture TTC de 2 950 000 FCFA est payée à hauteur de 2 000 000 FCFA avant la clôture.', dataset: { factureTtc: 2950000, encaissement: 2000000, soldeClient: 950000 }, steps: ['À la facture, enregistrer la créance et distinguer HT/TVA.', 'Au règlement, débiter Banque de 2 000 000 et créditer le client du même montant.', 'Vérifier dans le grand livre client qu’il reste 950 000 FCFA débiteur.', 'Présenter le reliquat dans les créances de clôture et suivre son échéance.'] },
      company: 'Cabinet fictif Ivoire Audit Conseil, mandat de revue mensuelle d’EKD SARL', problem: 'Le relevé bancaire montre un paiement de 2 000 000 FCFA, mais le compte client a été soldé intégralement.', resolution: 'Lettrer le paiement partiel avec la facture, rétablir le reliquat de 950 000 FCFA et documenter l’écart entre relevé bancaire et auxiliaire client.',
      exercise: { instruction: 'Une facture de 3 540 000 FCFA est réglée à hauteur de 2 100 000 FCFA. Quel est le solde débiteur restant ?', dataset: { facture: 3540000, reglement: 2100000 }, answer: 1440000, correction: 'La créance restante est 3 540 000 − 2 100 000 = 1 440 000 FCFA. Le grand livre client ne doit être soldé qu’après rapprochement de tous les règlements.' },
      transfer: { instruction: 'Trois factures de 600 000, 450 000 et 300 000 FCFA sont toutes réglées. Quel est le total des encaissements à rapprocher ?', dataset: { facture1: 600000, facture2: 450000, facture3: 300000 }, answer: 1350000, correction: 'Total = 600 000 + 450 000 + 300 000 = 1 350 000 FCFA. Le contrôle doit aussi comparer les références et dates, pas seulement le total.' },
      questions: [
        { question: 'Que prouve l’égalité des totaux de la balance ?', options: ['Que toute imputation est correcte', 'Que les comptes sont tous exacts', 'Que les soldes débiteurs et créditeurs totalisent le même montant', 'Qu’aucune opération n’a été omise'], correctIndex: 2, explanation: 'Une balance équilibrée ne détecte pas une omission complète ni une erreur d’imputation compensée.' },
        { question: 'Quel est l’effet du règlement d’une créance déjà comptabilisée ?', options: ['Il crée un second chiffre d’affaires', 'Il échange une créance contre une disponibilité', 'Il augmente la TVA collectée', 'Il diminue le capital'], correctIndex: 1, explanation: 'Le règlement débite la banque et crédite le compte client ; le produit ne change pas.' },
      ],
    },
  ],
  MOD_N2_M2: [
    {
      title: 'Reclasser le bilan pour mesurer les ressources stables',
      context: 'Le bilan comptable répond à une logique de classement par nature. Le diagnostic fonctionnel le reclasse selon le cycle de financement et la durée des emplois pour expliquer l’équilibre financier.',
      theory: [
        'Le fonds de roulement net global (FRNG) compare les ressources stables aux emplois stables. Les ressources stables regroupent principalement les capitaux propres et financements durables ; les emplois stables correspondent aux immobilisations nettes. Un FRNG positif signifie qu’une partie des ressources longues finance le cycle d’exploitation.',
        'Le reclassement doit être documenté : échéance d’emprunt, nature du poste, caractère d’exploitation et montant net des immobilisations. Une dette à moins d’un an peut devoir être isolée des ressources longues. Les retraitements doivent suivre la méthode retenue et s’appliquer de la même façon aux exercices comparés.',
        'Le FRNG ne se lit jamais seul. Un excédent de ressources stables peut être absorbé par le besoin d’exploitation ; à l’inverse, un BFR négatif peut financer l’entreprise. Le diagnostic relie donc emplois stables, cycle client-stock-fournisseur et trésorerie nette, puis recherche la cause opérationnelle du besoin.',
      ],
      example: { title: 'Bilan fonctionnel simplifié', scenario: 'SAIB présente 96 M FCFA de ressources stables et 74 M d’emplois stables.', dataset: { ressourcesStables: 96000000, emploisStables: 74000000, frng: 22000000 }, steps: ['Identifier capitaux propres et dettes durables : 96 M FCFA.', 'Retenir les emplois stables nets : 74 M FCFA.', 'Calculer FRNG = 96 − 74 = 22 M FCFA.', 'Vérifier que les postes courants ne sont pas inclus dans ces deux masses.'] },
      company: 'SAIB SA, unité de transformation de cacao à Abengourou', problem: 'Le rapport présente les emprunts à long terme dans le passif circulant, ce qui minore artificiellement le FRNG.', resolution: 'Vérifier les échéanciers, isoler la part exigible à moins d’un an selon la méthode retenue et documenter les reclassements avant de commenter le FRNG.',
      exercise: { instruction: 'Les ressources stables sont de 125 M FCFA et les emplois stables de 101 M FCFA. Calculez le FRNG.', dataset: { ressourcesStables: 125000000, emploisStables: 101000000 }, answer: 24000000, correction: 'FRNG = 125 − 101 = 24 M FCFA. Ce montant est disponible pour contribuer au financement du cycle d’exploitation.' },
      transfer: { instruction: 'Le FRNG est de 24 M FCFA et le BFR de 31 M FCFA. Quelle est la trésorerie nette ?', dataset: { frng: 24000000, bfr: 31000000 }, answer: -7000000, correction: 'TN = FRNG − BFR = 24 − 31 = −7 M FCFA. Il faut ensuite identifier les concours bancaires et les causes du BFR.' },
      questions: [
        { question: 'Quel est le calcul fonctionnel du FRNG ?', options: ['Ressources stables − emplois stables', 'Créances − dettes fournisseurs', 'Chiffre d’affaires − charges', 'Banque − caisse'], correctIndex: 0, explanation: 'Le FRNG mesure la part des ressources durables restant après financement des emplois stables.' },
        { question: 'Un FRNG positif garantit-il une trésorerie positive ?', options: ['Oui, toujours', 'Non, car un BFR supérieur peut absorber le FRNG', 'Oui si le chiffre d’affaires augmente', 'Non, seulement si les stocks sont nuls'], correctIndex: 1, explanation: 'La trésorerie nette dépend du différentiel FRNG − BFR.' },
      ],
    },
    {
      title: 'Diagnostiquer les tensions entre stocks, clients et fournisseurs',
      context: 'Une même croissance peut améliorer le résultat tout en dégrader le cash. Cette leçon analyse le calendrier du cycle d’exploitation et quantifie le besoin que l’entreprise doit financer.',
      theory: [
        'Le BFR d’exploitation traduit le décalage entre les décaissements engagés pour produire ou acheter et les encaissements reçus des clients. Les stocks immobilisent du cash avant la vente ; les créances prolongent ce délai ; le crédit fournisseur en finance une partie. Le calcul dépend des postes classés comme opérationnels.',
        'Pour expliquer une variation, comparer les soldes à des dates homogènes et rapporter les délais à des flux annuels cohérents. Le DSO rapproche créances clients et ventes à crédit ; le DPO rapproche dettes fournisseurs et achats pertinents ; le DIO rapproche stocks et coût de consommation. Les conventions de jours et les bases doivent être explicitées.',
        'Un délai moyen est un indicateur, pas une preuve de retard pour chaque facture. L’analyse utile descend au portefeuille : balance âgée, litiges, concentration client, produits lents et conditions négociées. Les leviers doivent respecter les contrats, la qualité de service et les besoins de production.',
      ],
      example: { title: 'Décomposer un besoin d’exploitation', scenario: 'Une PME détient 18 M de stocks et 32 M de créances ; elle doit 26 M à ses fournisseurs.', dataset: { stocks: 18000000, clients: 32000000, fournisseurs: 26000000, bfr: 24000000 }, steps: ['Additionner stocks et créances d’exploitation : 50 M FCFA.', 'Retrancher le crédit fournisseur de 26 M.', 'Le BFR simplifié est de 24 M FCFA.', 'Examiner si dettes fiscales et autres créances opérationnelles sont également pertinentes.'] },
      company: 'Naya Distribution, grossiste en pièces détachées à Abidjan', problem: 'Les ventes progressent de 25 %, mais les retards clients et les stocks de sécurité font augmenter le BFR plus vite que les ressources disponibles.', resolution: 'Segmenter les créances par ancienneté, distinguer stock de sécurité et stock dormant, puis négocier des échéanciers ciblés plutôt qu’un raccourcissement uniforme des délais.',
      exercise: { instruction: 'Les stocks sont de 22 M, les créances de 41 M et les dettes fournisseurs de 35 M FCFA. Calculez le BFR simplifié.', dataset: { stocks: 22000000, clients: 41000000, fournisseurs: 35000000 }, answer: 28000000, correction: 'BFR simplifié = 22 + 41 − 35 = 28 M FCFA. Le chiffre ne remplace pas l’analyse des autres postes opérationnels.' },
      transfer: { instruction: 'Le BFR est de 28 M et le FRNG de 35 M FCFA. Calculez la trésorerie nette théorique.', dataset: { bfr: 28000000, frng: 35000000 }, answer: 7000000, correction: 'TN = FRNG − BFR = 35 − 28 = 7 M FCFA. Comparez ce montant à la trésorerie nette observée et recherchez tout écart de périmètre.' },
      questions: [
        { question: 'Pourquoi une hausse des ventes peut-elle créer une tension de trésorerie ?', options: ['Les ventes à crédit augmentent les créances avant les encaissements', 'Le chiffre d’affaires réduit toujours la banque', 'La hausse des ventes annule les dettes', 'Le résultat et le cash sont identiques'], correctIndex: 0, explanation: 'La croissance peut financer davantage de stocks et de créances avant que les clients règlent.' },
        { question: 'Quel levier agit directement sur le poste clients ?', options: ['Réduire les immobilisations', 'Accélérer le traitement des litiges et le recouvrement', 'Augmenter les amortissements', 'Décaler le paiement des salaires'], correctIndex: 1, explanation: 'Le recouvrement et la résolution des litiges peuvent réduire le délai d’encaissement, sous réserve de préserver la relation commerciale.' },
      ],
    },
  ],
  MOD_N3_M3: [
    {
      title: 'Construire les soldes intermédiaires à partir du compte de résultat',
      context: 'Le compte de résultat rassemble des produits et charges par nature. Les SIG reconstruisent des étapes de formation de la performance pour identifier où la marge se crée ou se dégrade.',
      theory: [
        'La marge commerciale concerne les activités d’achat-revente ; la production de l’exercice caractérise les activités de production. La valeur ajoutée mesure la richesse créée après consommation des biens et services externes. L’excédent brut d’exploitation (EBE) exprime la performance opérationnelle avant amortissements, financement et impôt sur le résultat.',
        'Chaque solde dépend d’un périmètre comptable précis. Il faut vérifier les reclassements, les subventions, les charges de personnel et les autres produits d’exploitation. Une confusion entre production vendue et chiffre d’affaires peut fausser la comparaison d’une entreprise commerciale avec une entreprise industrielle.',
        'Pour interpréter les SIG, comparer plusieurs périodes et calculer les marges en pourcentage des ventes ou de la production. Une hausse de l’EBE peut provenir d’un meilleur prix, d’un mix plus favorable ou d’une baisse de coûts ; le montant seul ne révèle pas le moteur de la variation.',
      ],
      example: { title: 'Calculer un EBE simplifié', scenario: 'Une société réalise 250 M FCFA de ventes, consomme 130 M d’achats et 40 M de services externes, puis supporte 45 M de personnel.', dataset: { ventes: 250000000, achatsConsommes: 130000000, servicesExternes: 40000000, personnel: 45000000, ebe: 35000000 }, steps: ['Valeur ajoutée simplifiée = 250 − 130 − 40 = 80 M.', 'EBE simplifié = 80 − 45 = 35 M FCFA.', 'Calculer la marge EBE : 35 / 250 = 14 %.', 'Comparer à N−1 et expliquer l’évolution par les volumes, prix et coûts.'] },
      company: 'SIPLAST, fabricant de matériaux à Yopougon', problem: 'La direction observe une croissance du chiffre d’affaires mais une baisse de la marge EBE après hausse des coûts d’énergie.', resolution: 'Séparer effet volume, effet prix, mix produit et coût des consommations avant de proposer une renégociation énergétique ou une révision tarifaire.',
      exercise: { instruction: 'Ventes 180 M, consommations externes 102 M et charges de personnel 43 M FCFA. Calculez l’EBE simplifié.', dataset: { ventes: 180000000, consommationsExternes: 102000000, personnel: 43000000 }, answer: 35000000, correction: 'Valeur ajoutée simplifiée = 180 − 102 = 78 M. EBE = 78 − 43 = 35 M FCFA. Les autres produits/charges d’exploitation doivent être intégrés si le cas les fournit.' },
      transfer: { instruction: 'Un EBE de 35 M est généré sur 250 M de ventes. Calculez le taux de marge EBE en pourcentage entier.', dataset: { ebe: 35000000, ventes: 250000000 }, answer: 14, correction: '35 / 250 = 0,14, soit 14 %. Ce ratio doit être comparé dans le temps et avec des entreprises comparables.' },
      questions: [
        { question: 'À quel stade l’EBE se situe-t-il ?', options: ['Après intérêts et impôt', 'Avant amortissements, financement et impôt sur le résultat', 'Après distribution de dividendes', 'Avant les consommations externes'], correctIndex: 1, explanation: 'L’EBE isole la performance opérationnelle avant amortissements, financement et impôt sur le résultat.' },
        { question: 'Que faut-il comparer pour expliquer une variation d’EBE ?', options: ['Uniquement les ventes', 'Les prix, volumes, mix et coûts pertinents', 'Uniquement les soldes bancaires', 'Le nombre de fournisseurs'], correctIndex: 1, explanation: 'La décomposition par moteurs opérationnels donne une explication actionnable.' },
      ],
    },
    {
      title: 'Mesurer l’effet de levier et son point de rupture',
      context: 'La dette peut améliorer le rendement des capitaux propres lorsque la rentabilité économique dépasse le coût de l’endettement. L’inverse amplifie les pertes et réduit la marge de sécurité.',
      theory: [
        'Une approximation de l’effet de levier relie rentabilité économique, coût de la dette après impôt et structure financière. Si la rentabilité des actifs financés dépasse le coût de la dette, l’endettement peut accroître la rentabilité des capitaux propres. La relation exacte dépend des conventions de calcul, de la fiscalité et des éléments non récurrents.',
        'Le différentiel de taux est sensible au cycle : baisse des marges, hausse du taux variable ou dépréciation d’actifs peuvent inverser le signe du levier. Les ratios Dette nette/EBE et couverture des intérêts ajoutent une lecture de capacité de remboursement, mais leurs seuils ne sont pas universels.',
        'Une analyse professionnelle construit plusieurs scénarios et teste les covenants, l’échéancier, les garanties et les besoins de liquidité. Un levier positif dans un scénario central n’est pas une recommandation d’emprunt si le scénario défavorable menace la continuité d’exploitation.',
      ],
      example: { title: 'Comparer rendement et coût de la dette', scenario: 'Une PME prévoit une rentabilité économique de 12 % et une dette à 8 % avant impôt.', dataset: { rentabiliteEconomiquePct: 12, coutDettePct: 8, spreadPct: 4 }, steps: ['Comparer la rentabilité économique de 12 % au coût de dette de 8 %.', 'Le différentiel avant fiscalité est de 4 points.', 'Tester un recul de rentabilité à 6 % ou une hausse du taux à 13 %.', 'Ne conclure qu’après analyse des flux, du risque et des modalités de dette.'] },
      company: 'Ivoire Agro-Industrie, expansion d’une ligne de conditionnement', problem: 'L’investissement est financé par une dette à taux variable alors que les ventes sont saisonnières.', resolution: 'Simuler un scénario de marge faible et de taux majoré ; prévoir une réserve de liquidité et un plan de remboursement soutenable avant la décision.',
      exercise: { instruction: 'La rentabilité économique est de 9 % et le coût de dette de 11 %. Quel est le différentiel avant impôt en points ?', dataset: { roa: 9, tauxDette: 11 }, answer: -2, correction: 'Différentiel = 9 − 11 = −2 points. La dette exerce un effet défavorable avant impôt dans cette approximation.' },
      transfer: { instruction: 'L’EBE est de 48 M et la dette financière nette de 144 M FCFA. Calculez Dette nette / EBE.', dataset: { detteNette: 144000000, ebe: 48000000 }, answer: 3, correction: '144 / 48 = 3 fois. L’interprétation dépend de la stabilité des flux, des maturités et du secteur ; ce ratio seul ne définit pas un seuil officiel.' },
      questions: [
        { question: 'Quand l’endettement amplifie-t-il potentiellement le rendement des capitaux propres ?', options: ['Quand le coût de dette dépasse le rendement des actifs', 'Quand le rendement économique dépasse le coût de la dette', 'Quand les ventes sont nulles', 'Dans tous les cas'], correctIndex: 1, explanation: 'Le différentiel positif est une condition favorable, mais ne suffit pas à conclure sans examiner le risque et les flux.' },
        { question: 'Pourquoi tester un scénario défavorable ?', options: ['Pour garantir un taux de profit', 'Pour vérifier la capacité à servir la dette si les hypothèses se dégradent', 'Pour éliminer les amortissements', 'Pour remplacer les états financiers'], correctIndex: 1, explanation: 'Le stress test révèle les marges de sécurité et les risques de liquidité ou de covenant.' },
      ],
    },
  ],
  MOD_N4_M4: [
    {
      title: 'Construire une prévision hebdomadaire de trésorerie traçable',
      context: 'Un plan de trésorerie utile se fonde sur des dates de paiement probables, et non sur les seules dates de facturation. Cette leçon transforme un carnet de commandes et un échéancier en prévision de cash.',
      theory: [
        'La trésorerie de fin de semaine est égale à la trésorerie d’ouverture, augmentée des encaissements et diminuée des décaissements. Chaque ligne doit indiquer la source, la date attendue, le degré de certitude et le responsable de mise à jour. Les flux comptables non encaissés ne deviennent pas automatiquement des flux de cash.',
        'Séparer les flux récurrents, ponctuels et conditionnels. Une commande signée n’est pas un encaissement ; un paiement client dépend de la facturation, de la livraison et du délai de règlement. Les salaires, taxes, loyers et remboursements suivent leurs échéances contractuelles ou légales.',
        'Un modèle glissant se met à jour chaque semaine : remplacer les prévisions par les réalisés, expliquer les écarts, puis ajouter une nouvelle période à l’horizon. L’objectif n’est pas de prédire parfaitement, mais de détecter assez tôt un besoin de financement et d’activer des mesures réalistes.',
      ],
      example: { title: 'Calculer le solde de fin de semaine', scenario: 'La société ouvre la semaine avec 15 M FCFA, prévoit 12 M d’encaissements et 19 M de paiements.', dataset: { ouverture: 15000000, encaissements: 12000000, decaissements: 19000000, cloture: 8000000 }, steps: ['Solde de clôture = 15 + 12 − 19 = 8 M FCFA.', 'Comparer le solde au minimum de liquidité opérationnelle.', 'Identifier les paiements dont la date est contractuellement flexible.', 'Actualiser le scénario dès réception du relevé bancaire.'] },
      company: 'Cacao du Bandama, transformation saisonnière à Daloa', problem: 'Les achats de fèves sont payés avant les encaissements d’exportation et le plan mensuel masque un creux de cash intra-mois.', resolution: 'Construire un échéancier hebdomadaire par lot d’achat et facture export, puis suivre les dates de départ, documents et valeur bancaire des transferts.',
      exercise: { instruction: 'Solde initial 8 M, encaissements 11 M et décaissements 14,5 M FCFA. Quel est le solde final ?', dataset: { ouverture: 8000000, encaissements: 11000000, decaissements: 14500000 }, answer: 4500000, correction: '8 + 11 − 14,5 = 4,5 M FCFA. Une prévision positive peut malgré tout être insuffisante si le seuil minimal de liquidité est supérieur.' },
      transfer: { instruction: 'Le solde prévu est de 4,5 M FCFA et le seuil opérationnel est de 6 M. Quel financement minimum manque-t-il ?', dataset: { solde: 4500000, seuil: 6000000 }, answer: 1500000, correction: 'Besoin minimum = 6 − 4,5 = 1,5 M FCFA, avant frais, marges de sécurité et incertitude sur les flux.' },
      questions: [
        { question: 'Quelle date doit principalement guider une prévision de cash ?', options: ['La date de commande', 'La date probable de règlement ou de valeur', 'La date de clôture annuelle', 'La date de création du fournisseur'], correctIndex: 1, explanation: 'La trésorerie dépend du moment où les fonds sont effectivement disponibles ou débités.' },
        { question: 'Que faire du réalisé dans un modèle glissant ?', options: ['Le remplacer par le budget initial', 'Le substituer à la prévision puis expliquer l’écart', 'Le supprimer', 'Le reporter à l’exercice suivant'], correctIndex: 1, explanation: 'Le réalisé améliore la base de prévision et permet d’analyser les écarts.' },
      ],
    },
    {
      title: 'Tester un choc de liquidité et définir des seuils d’action',
      context: 'La prévision centrale ne suffit pas lorsque la collecte est incertaine. Le scénario de stress mesure quand le solde passe sous un seuil et quelles décisions peuvent réduire le risque.',
      theory: [
        'Un stress test transforme une hypothèse adverse en trajectoire de flux : retard client, baisse temporaire des ventes, hausse d’intrants ou retard d’une ligne de crédit. Les variables doivent être explicites, datées et plausibles, et le scénario doit éviter d’appliquer un pourcentage arbitraire à toutes les lignes.',
        'Le point bas de trésorerie et sa date déterminent le délai de réaction. Définir des seuils d’alerte, un responsable et une mesure associée : relance ciblée, report négocié, réduction de stock, tirage autorisé ou arbitrage d’investissement. Les actions doivent respecter contrat et réglementation.',
        'Comparer central, stress et plan d’action. Une amélioration n’est crédible que si elle est chiffrée, faisable dans le délai et attribuée à un responsable. Réestimer les effets croisés : retarder un fournisseur peut sécuriser la caisse aujourd’hui mais compromettre les approvisionnements demain.',
      ],
      example: { title: 'Retard d’encaissements sous un choc ciblé', scenario: 'Un encaissement de 10 M FCFA attendu en semaine 3 est retardé de deux semaines.', dataset: { encaissementAttendu: 10000000, semaineInitiale: 3, semaineNouvelle: 5 }, steps: ['Conserver le montant de 10 M mais le déplacer de S3 à S5.', 'Recalculer les soldes de S3 et S4 : ils baissent chacun de 10 M.', 'Repérer la première semaine sous le seuil de sécurité.', 'Documenter le plan de couverture et son responsable.'] },
      company: 'Ivoire Distribution, distributeur de produits alimentaires', problem: 'Un client représentant 30 % des encaissements prévus signale un retard alors que les paiements fournisseurs sont engagés.', resolution: 'Exécuter un scénario client retardé de 14 jours, déclencher une relance avec preuve de livraison et négocier à l’avance les options de financement ou d’échéancier.',
      exercise: { instruction: 'Un solde de 12 M FCFA devait inclure un encaissement de 7 M qui n’arrive pas. Quel est le nouveau solde ?', dataset: { soldeCentral: 12000000, encaissementRetarde: 7000000 }, answer: 5000000, correction: 'Le nouveau solde est 12 − 7 = 5 M FCFA. Le flux est décalé, pas annulé ; il faut aussi calculer les périodes intermédiaires.' },
      transfer: { instruction: 'Le point bas stressé est de 5 M FCFA et le seuil d’alerte de 8 M. Quel montant de couverture est nécessaire ?', dataset: { pointBas: 5000000, seuilAlerte: 8000000 }, answer: 3000000, correction: 'Couverture minimale = 8 − 5 = 3 M FCFA. Le plan doit expliquer la source, le délai et le coût de cette couverture.' },
      questions: [
        { question: 'Pourquoi décaler un encaissement dans le scénario plutôt que le supprimer ?', options: ['Parce que le stress testé porte sur un retard temporaire', 'Parce qu’un retard augmente le chiffre d’affaires', 'Parce qu’une prévision ne peut pas contenir d’incertitude', 'Parce que le fournisseur est payé plus tôt'], correctIndex: 0, explanation: 'Le scénario doit refléter l’hypothèse testée ; un retard et une perte définitive sont deux risques différents.' },
        { question: 'Quel élément rend une mesure de remédiation exploitable ?', options: ['Un montant sans échéance', 'Un montant, un délai et un responsable', 'Un objectif général', 'Une hausse de ventes non documentée'], correctIndex: 1, explanation: 'Une action doit être chiffrée, datée et attribuée pour être suivie.' },
      ],
    },
  ],
  MOD_N5_M5: [
    {
      title: 'Calculer et interpréter les délais de rotation',
      context: 'Les ratios de rotation traduisent des soldes en jours d’activité. Ils servent à repérer les évolutions et à estimer le cash immobilisé, à condition de choisir des bases cohérentes.',
      theory: [
        'Avec une convention de 360 jours, DSO approximatif = créances clients / ventes annuelles à crédit × 360. DIO = stock moyen / coût annuel consommé × 360. DPO = dettes fournisseurs / achats annuels à crédit × 360. Les comptes de clôture peuvent être remplacés par des moyennes lorsque la saisonnalité est importante.',
        'Le cycle de conversion de cash (CCC) est une lecture simplifiée : DIO + DSO − DPO. Un CCC plus court peut libérer du cash, mais le résultat dépend de la qualité des stocks, des litiges clients et des conditions fournisseurs. Il ne faut pas comparer des ratios calculés avec des bases différentes.',
        'Une variation de délai explique un montant de trésorerie seulement en la multipliant par un flux quotidien adapté. Réduire les jours clients de dix jours ne signifie pas automatiquement récupérer dix jours de chiffre d’affaires TTC : préciser ventes à crédit, saisonnalité, TVA et périmètre du solde.',
      ],
      example: { title: 'Calculer un cycle cash de 45 jours', scenario: 'Convention pédagogique 360 jours : ventes à crédit 438 M, créances 54,75 M, achats consommés 288 M, stock moyen 36 M, dettes fournisseurs 36 M.', dataset: { ventesCredit: 438000000, creances: 54750000, coutConsomme: 288000000, stock: 36000000, dettesFournisseurs: 36000000, dso: 45, dio: 45, dpo: 45, ccc: 45 }, steps: ['DSO = 54,75 / 438 × 360 = 45 jours.', 'DIO = 36 / 288 × 360 = 45 jours.', 'DPO = 36 / 288 × 360 = 45 jours.', 'CCC = 45 + 45 − 45 = 45 jours.'] },
      company: 'Naya Distribution, grossiste aux cycles de vente saisonniers', problem: 'Le DSO calculé sur le chiffre d’affaires TTC est comparé à une année précédente calculée sur ventes HT, créant une baisse artificielle.', resolution: 'Recalculer les deux périodes avec la même base de créances et de ventes à crédit, puis commenter séparément le mix et la saisonnalité.',
      exercise: { instruction: 'Créances moyennes 36 M FCFA, ventes annuelles à crédit 288 M, convention 360 jours. Calculez le DSO.', dataset: { creances: 36000000, ventesCredit: 288000000, jours: 360 }, answer: 45, correction: '36 / 288 × 360 = 45 jours. Indiquez la base de ventes et la convention de jours dans votre rapport.' },
      transfer: { instruction: 'Stock moyen 48 M et coût annuel consommé 384 M FCFA, convention 360 jours. Calculez le DIO.', dataset: { stock: 48000000, consommation: 384000000, jours: 360 }, answer: 45, correction: '48 / 384 × 360 = 45 jours. Un stock moyen est préférable à un solde de clôture en activité saisonnière.' },
      questions: [
        { question: 'Quelle base sert au DSO dans le cas pédagogique ?', options: ['Les ventes à crédit', 'Le total des immobilisations', 'Les achats consommés', 'Les dettes fournisseurs'], correctIndex: 0, explanation: 'Le DSO rapproche les créances clients des ventes à crédit, sur une convention de jours explicitée.' },
        { question: 'Comment se calcule le CCC simplifié ?', options: ['DIO − DSO + DPO', 'DIO + DSO − DPO', 'DSO + DPO + FRNG', 'Stock / chiffre d’affaires'], correctIndex: 1, explanation: 'Le cycle ajoute les jours de stock et de crédit client, puis retranche le financement fournisseur.' },
      ],
    },
    {
      title: 'Quantifier l’impact cash d’un plan de recouvrement',
      context: 'Une recommandation sur le BFR doit convertir un objectif de délai en montant, puis vérifier sa faisabilité opérationnelle et ses effets sur les clients.',
      theory: [
        'À activité stable, une journée de ventes à crédit correspond à ventes annuelles à crédit divisées par la convention de jours choisie. Une réduction de DSO de dix jours produit une estimation de créances libérées égale à dix journées de ventes. Ce calcul est une approximation, pas une promesse d’encaissement.',
        'Segmenter le plan : erreurs de facturation, litiges de livraison, échéances dépassées et clients stratégiques n’ont pas le même traitement. Une facture non reçue appelle une correction de processus ; une contestation appelle une preuve ; un client en difficulté nécessite une stratégie de recouvrement adaptée.',
        'Chiffrer le gain avec un scénario central et une plage d’incertitude. Mesurer aussi le coût de l’action, le risque de perte de vente et les encaissements réellement constatés. Le contrôleur suit le stock de créances jour par jour et rapproche les promesses de paiement aux mouvements bancaires.',
      ],
      example: { title: 'Estimer un gain sur dix jours', scenario: 'Ventes annuelles à crédit de 432 M FCFA sur une base de 360 jours ; objectif de réduction du DSO de dix jours.', dataset: { ventesCredit: 432000000, jours: 360, reductionJours: 10, cashEstime: 12000000 }, steps: ['Ventes quotidiennes = 432 / 360 = 1,2 M FCFA.', 'Cash théorique libéré = 1,2 × 10 = 12 M FCFA.', 'Vérifier les créances réellement concernées et leur recouvrabilité.', 'Suivre les règlements, les litiges et les effets commerciaux.'] },
      company: 'SIPLAST, ventes B2B à des distributeurs régionaux', problem: 'La facturation est émise parfois quinze jours après livraison ; les relances automatiques ne corrigent pas les pièces manquantes.', resolution: 'Réduire le délai de facturation, fiabiliser la preuve de livraison et assigner les litiges à un responsable avant de modifier les conditions de crédit.',
      exercise: { instruction: 'Ventes annuelles à crédit 360 M FCFA, base 360 jours. Estimez le cash libéré par une baisse de DSO de huit jours.', dataset: { ventes: 360000000, jours: 360, reductionJours: 8 }, answer: 8000000, correction: '360 / 360 × 8 = 8 M FCFA d’encours théorique. Le gain effectif dépend de la part de créances éligibles et de la réalisation du plan.' },
      transfer: { instruction: 'Un plan vise 12 M FCFA d’encaissements, mais 25 % reste contesté et non recouvrable à court terme. Quel montant devient immédiatement mobilisable selon cette hypothèse ?', dataset: { objectif: 12000000, partContestePourcent: 25 }, answer: 9000000, correction: 'Montant mobilisable estimé = 12 × (1 − 25 %) = 9 M FCFA. Cette estimation doit être révisée avec les preuves de recouvrement.' },
      questions: [
        { question: 'Que représente le montant libéré par la baisse du DSO ?', options: ['Une estimation d’encours à financer en moins', 'Un bénéfice net garanti', 'Une baisse automatique des ventes', 'Le montant total de TVA récupérée'], correctIndex: 0, explanation: 'Le calcul estime l’effet sur les créances ; il ne garantit pas le recouvrement ni un gain de résultat.' },
        { question: 'Quel processus peut réduire le DSO avant même la relance ?', options: ['Accélérer et fiabiliser la facturation après livraison', 'Augmenter les immobilisations', 'Changer la méthode d’amortissement', 'Retarder le rapprochement bancaire'], correctIndex: 0, explanation: 'Une facture correcte et envoyée à temps démarre plus tôt le délai de paiement.' },
      ],
    },
  ],
  MOD_N6_M6: [
    {
      title: 'Structurer un diagnostic par risques et preuves',
      context: 'Un ratio isolé ne constitue pas un diagnostic. L’analyste doit relier les états financiers, les échéanciers et les informations opérationnelles à des risques vérifiables.',
      theory: [
        'Un diagnostic efficace sépare rentabilité, structure financière, liquidité, cycle d’exploitation et qualité de l’information. Pour chaque dimension, formuler un constat, une preuve chiffrée, une cause probable et une question à confirmer. Le commentaire doit distinguer faits observés, hypothèses et limites de données.',
        'Les ratios exigent un dénominateur cohérent et une période comparable. Dette nette/EBE dépend de la définition de la dette et de l’EBE ; la couverture des intérêts dépend du résultat retenu. Aucun seuil ne remplace l’analyse du secteur, de la saisonnalité, des échéances et des engagements hors bilan.',
        'Pour une décision de crédit, examiner la capacité de remboursement, les sources de remboursement, les garanties et les scénarios. Une notation synthétique doit documenter critères et poids. Elle aide à prioriser une revue, mais ne doit pas masquer une faiblesse majeure derrière une moyenne favorable.',
      ],
      example: { title: 'Passer du ratio à une conclusion prudente', scenario: 'Dette nette 144 M FCFA, EBE 48 M, intérêts 12 M et EBE en baisse de 20 % sur un an.', dataset: { detteNette: 144000000, ebe: 48000000, detteNetteEbe: 3, couvertureInterets: 4 }, steps: ['Dette nette / EBE = 144 / 48 = 3 fois.', 'Couverture EBE / intérêts = 48 / 12 = 4 fois, selon l’indicateur simplifié retenu.', 'Noter la baisse de 20 % et recalculer les ratios sur un scénario prudent.', 'Demander l’échéancier, les covenants et la justification de la baisse.'] },
      company: 'Comité de crédit de Banque Lagune, analyse d’une PME logistique', problem: 'La note commerciale recommande un crédit en s’appuyant sur une seule année de croissance et sans analyser les remboursements en cours.', resolution: 'Compléter les flux de dette, la saisonnalité et le scénario prudent ; formuler une décision conditionnelle avec documents, covenants et échéances de suivi.',
      exercise: { instruction: 'Dette nette de 90 M FCFA et EBE de 30 M. Calculez le ratio Dette nette / EBE.', dataset: { detteNette: 90000000, ebe: 30000000 }, answer: 3, correction: '90 / 30 = 3 fois. Le ratio doit être interprété avec la trajectoire d’EBE, la liquidité et les maturités.' },
      transfer: { instruction: 'EBE 30 M FCFA, charges d’intérêts 6 M. Calculez la couverture simplifiée des intérêts.', dataset: { ebe: 30000000, interets: 6000000 }, answer: 5, correction: '30 / 6 = 5 fois. Cette couverture simplifiée ne remplace pas un calcul contractuel de covenant.' },
      questions: [
        { question: 'Quelles composantes renforcent un diagnostic de ratio ?', options: ['Un constat, une preuve, une cause et une limite', 'Un chiffre sans période', 'Une moyenne sans définition', 'Une recommandation sans données'], correctIndex: 0, explanation: 'Une conclusion traçable associe le chiffre aux éléments qui l’expliquent et aux limites de l’analyse.' },
        { question: 'Un ratio Dette nette/EBE de 3 fois est-il un seuil universel ?', options: ['Oui, pour tout secteur', 'Non, la définition, le secteur et les échéances comptent', 'Oui, dès que l’EBE est positif', 'Non, car le ratio ne se calcule jamais'], correctIndex: 1, explanation: 'Les conventions et profils de risque varient ; le chiffre ne suffit pas à décider.' },
      ],
    },
    {
      title: 'Rédiger une recommandation au comité de crédit',
      context: 'Le livrable professionnel du diagnostic est une décision compréhensible par un comité : elle doit montrer les faits, les incertitudes, les conditions et les prochaines vérifications.',
      theory: [
        'Une note exécutive commence par la décision proposée et son montant, puis présente les moteurs de remboursement, les risques dominants et les conditions. Elle évite de recopier les états financiers. Une annexe conserve les hypothèses, retraitements et calculs pour permettre une revue indépendante.',
        'Un risque doit être lié à une preuve et à une mesure : concentration client → historique d’encaissement et limite d’exposition ; marge volatile → stress test et covenant adapté ; garanties → titre, rang, valeur nette de réalisation et validité. Les garanties atténuent une perte, mais ne remplacent pas la capacité de remboursement.',
        'Toute condition doit être vérifiable et datée : remise d’un état de créances, preuve d’assurance, domiciliation de flux ou revue trimestrielle. Distinguer conditions préalables au décaissement et engagements après décaissement. Les termes juridiques finaux doivent être validés par les responsables habilités.',
      ],
      example: { title: 'Transformer un constat en condition', scenario: 'La PME dépend d’un client représentant 45 % du chiffre d’affaires et prévoit un nouvel emprunt.', dataset: { partPremierClientPct: 45, detteNetteEbe: 3 }, steps: ['Constat : concentration commerciale de 45 %.', 'Preuve : balance âgée et historique de paiement du client principal.', 'Risque : retard du client pouvant dégrader le service de la dette.', 'Condition proposée : suivi mensuel des créances et scénario alternatif documenté.'] },
      company: 'SIPLAST SARL, demande de financement d’une ligne de production', problem: 'Le dossier demande 120 M FCFA mais ne précise ni l’usage des fonds, ni les échéances, ni les conditions de décaissement.', resolution: 'Reformuler la demande en reliant montant, facture d’investissement, flux générés, calendrier de remboursement et conditions de contrôle.',
      exercise: { instruction: 'Un client pèse 45 % du chiffre d’affaires. La limite interne proposée est 35 %. De combien de points dépasse-t-il cette limite ?', dataset: { concentration: 45, limite: 35 }, answer: 10, correction: '45 − 35 = 10 points de pourcentage. La décision doit traiter le risque de concentration et les options de diversification.' },
      transfer: { instruction: 'Le financement proposé est de 120 M FCFA et la première tranche de 30 M est conditionnelle. Quel solde reste à décaisser ?', dataset: { financement: 120000000, tranche: 30000000 }, answer: 90000000, correction: '120 − 30 = 90 M FCFA, sous réserve des conditions et du calendrier approuvés.' },
      questions: [
        { question: 'Que doit contenir une condition de suivi exploitable ?', options: ['Une action vérifiable et une échéance', 'Un objectif vague', 'Un ratio sans responsable', 'Une garantie supposée'], correctIndex: 0, explanation: 'Le comité doit pouvoir vérifier l’exécution, la date et le responsable.' },
        { question: 'Quel rôle jouent les garanties ?', options: ['Elles remplacent les flux de remboursement', 'Elles peuvent atténuer une perte, sans remplacer la capacité de remboursement', 'Elles rendent le crédit sans risque', 'Elles augmentent l’EBE'], correctIndex: 1, explanation: 'La source normale de remboursement reste le cash généré ; la garantie traite surtout le risque de perte en cas de défaut.' },
      ],
    },
  ],
  MOD_N7_M7: [
    {
      title: 'Prévoir le chiffre d’affaires à partir de moteurs opérationnels',
      context: 'Une prévision défendable explicite comment les ventes sont générées. Elle sépare volume, prix, capacité, saisonnalité et taux de recouvrement au lieu d’appliquer un pourcentage opaque.',
      theory: [
        'Pour un distributeur, chiffre d’affaires = unités vendues × prix moyen, éventuellement ventilé par produit et canal. Pour une activité de services, il peut dépendre du nombre de dossiers, du tarif et du taux d’utilisation. Le modèle conserve les moteurs visibles et les relie à des hypothèses documentées.',
        'La croissance historique n’est pas une hypothèse automatique. Examiner capacité, carnet de commandes, évolution tarifaire, attrition client, saisonnalité et contraintes d’approvisionnement. Le scénario central doit être rapproché de preuves ; les scénarios adverse et favorable modifient quelques facteurs identifiés.',
        'Dans Excel, séparer entrées, calculs et restitution ; placer les hypothèses dans des cellules dédiées, utiliser des contrôles et identifier les unités. Un modèle sans constante en dur est plus facile à tester, mais il doit également être lisible, cohérent et réconciliable avec le réalisé.',
      ],
      example: { title: 'Prévision par quantité et prix', scenario: 'Naya prévoit 12 000 unités à 25 000 FCFA en N+1, puis 13 200 unités à 26 000 FCFA en N+2.', dataset: { unitesN1: 12000, prixN1: 25000, caN1: 300000000, unitesN2: 13200, prixN2: 26000, caN2: 343200000 }, steps: ['N+1 = 12 000 × 25 000 = 300 M FCFA.', 'N+2 = 13 200 × 26 000 = 343,2 M FCFA.', 'La hausse combine volume +10 % et prix +4 %.', 'Tester la contrainte de capacité et la cohérence avec les créances prévisionnelles.'] },
      company: 'Naya Distribution, plan de ventes de pièces détachées en Côte d’Ivoire', problem: 'Le budget augmente toutes les lignes de 15 % sans tenir compte des ruptures de stock ni des hausses de tarifs.', resolution: 'Modéliser unités par famille, prix, taux de disponibilité et calendrier d’approvisionnement, puis réconcilier ventes et encaissements prévus.',
      exercise: { instruction: 'Prévision de 8 000 unités à 32 500 FCFA. Calculez le chiffre d’affaires annuel.', dataset: { unites: 8000, prixUnitaire: 32500 }, answer: 260000000, correction: '8 000 × 32 500 = 260 000 000 FCFA. Vérifiez que les unités et le prix ont la même période et le même périmètre.' },
      transfer: { instruction: 'Les unités baissent de 5 % depuis 8 000. Combien d’unités sont prévues après arrondi à l’unité ?', dataset: { unitesInitiales: 8000, baissePct: 5 }, answer: 7600, correction: '8 000 × (1 − 5 %) = 7 600 unités. Dans un modèle réel, expliquer l’origine de cette baisse.' },
      questions: [
        { question: 'Quel avantage apporte une prévision par moteurs ?', options: ['Elle rend les hypothèses visibles et testables', 'Elle supprime le besoin de données', 'Elle garantit la croissance', 'Elle évite toute erreur'], correctIndex: 0, explanation: 'Les volumes, prix et contraintes peuvent être modifiés et discutés séparément.' },
        { question: 'Que doit-on vérifier après une hausse prévisionnelle des ventes ?', options: ['Uniquement le nombre de lignes Excel', 'Capacité, approvisionnement, marge, BFR et encaissements', 'Seulement la TVA', 'Aucun contrôle si la formule calcule'], correctIndex: 1, explanation: 'Une hausse des ventes affecte la capacité, les coûts, les stocks et les créances.' },
      ],
    },
    {
      title: 'Relier résultat, bilan et trésorerie dans un scénario',
      context: 'Un modèle intégré s’appuie sur des relations comptables cohérentes. Le résultat ne se transforme en cash qu’après prise en compte des investissements, du BFR, des impôts et des financements.',
      theory: [
        'Le compte de résultat prévisionnel projette produits et charges sur une période. Le bilan prévisionnel projette les stocks, créances, dettes, immobilisations, financements et capitaux propres. Le tableau de trésorerie explique les variations de cash. Les trois vues doivent se réconcilier à chaque période.',
        'Une vente à crédit augmente le chiffre d’affaires et les créances, pas immédiatement la banque. Un investissement augmente les immobilisations et génère un décaissement ; l’amortissement réduit le résultat sans être un décaissement de la période. Le remboursement de principal réduit la dette et le cash, sans constituer une charge financière.',
        'Contrôles essentiels : bilan équilibré, dette de clôture égale dette d’ouverture plus tirages moins remboursements, cash cohérent avec le plan de trésorerie, et variation de BFR alignée sur les postes du bilan. Une erreur de signe peut produire des états plausibles mais contradictoires.',
      ],
      example: { title: 'Réconcilier une vente à crédit', scenario: 'Vente HT 20 M FCFA, créance initiale nulle, encaissement de 12 M pendant la période.', dataset: { vente: 20000000, creanceInitiale: 0, encaissement: 12000000, creanceFinale: 8000000 }, steps: ['Le résultat reconnaît 20 M de vente HT, sous réserve des règles de période.', 'La banque reçoit 12 M.', 'La créance finale est 20 − 12 = 8 M.', 'Le bilan et le plan de cash présentent ces effets distincts.'] },
      company: 'Société Agro-Industrielle du Bandama (SAIB), modèle financier à trois ans', problem: 'Le modèle comptabilise les ventes en trésorerie à la date de facturation et surestime le cash disponible.', resolution: 'Lier le calendrier d’encaissement aux créances et intégrer les variations de BFR dans la trésorerie, puis vérifier les identités de contrôle.',
      exercise: { instruction: 'Ventes à crédit 35 M FCFA et encaissements 29 M sur la période. Quel est l’accroissement des créances ?', dataset: { ventes: 35000000, encaissements: 29000000 }, answer: 6000000, correction: 'Accroissement = 35 − 29 = 6 M FCFA. À soldes d’ouverture nuls, la créance de clôture augmente de 6 M.' },
      transfer: { instruction: 'Dette d’ouverture 50 M, nouveaux tirages 15 M et remboursements de principal 8 M. Quelle est la dette de clôture ?', dataset: { ouverture: 50000000, tirages: 15000000, remboursements: 8000000 }, answer: 57000000, correction: 'Dette de clôture = 50 + 15 − 8 = 57 M FCFA. Les intérêts sont présentés séparément en charges et décaissements.' },
      questions: [
        { question: 'Quel est l’effet immédiat d’un amortissement comptable ?', options: ['Il réduit le résultat sans sortie de cash égale à l’amortissement', 'Il augmente la dette bancaire', 'Il encaisse une créance', 'Il crée du chiffre d’affaires'], correctIndex: 0, explanation: 'L’amortissement est une charge calculée ; l’investissement a généré le décaissement à une autre date.' },
        { question: 'Quel contrôle valide le lien dette-bilan ?', options: ['Dette finale = ouverture + tirages − remboursements', 'Ventes = cash final', 'Stocks = dettes', 'Résultat = investissements'], correctIndex: 0, explanation: 'La variation de dette doit se réconcilier avec les tirages et remboursements prévus.' },
      ],
    },
  ],
  MOD_N8_M8: [
    {
      title: 'Calculer la VAN et tester les flux d’un projet',
      context: 'La VAN compare l’investissement initial à la valeur actuelle des flux futurs. La décision dépend du taux d’actualisation, du calendrier et de la cohérence des flux retenus.',
      theory: [
        'La valeur actuelle d’un flux futur est son montant divisé par (1 + k) puissance t, où k est le taux par période et t le nombre de périodes. La VAN additionne ces valeurs puis retranche l’investissement initial. Le taux et le calendrier doivent utiliser la même unité de temps.',
        'Les flux doivent refléter les encaissements et décaissements différentiels du projet, après impôt selon la méthode retenue, et inclure les investissements et variations de BFR pertinentes. Les coûts déjà engagés et irrécupérables ne sont généralement pas des flux futurs différentiels.',
        'Une VAN positive signifie que le projet crée de la valeur au taux d’actualisation retenu, sous les hypothèses du modèle. Il faut tester les volumes, marges, délais et valeur terminale. La VAN est sensible au taux et aux flux éloignés ; présenter une sensibilité évite de masquer l’incertitude.',
      ],
      example: { title: 'Valeur actuelle de trois flux', scenario: 'Investissement 100 M FCFA ; flux de 42 M en fin de chacune des trois années ; taux annuel 10 %.', dataset: { investissement: 100000000, fluxAnnuel: 42000000, tauxPct: 10, vanApprox: 4447700 }, steps: ['Actualiser l’année 1 : 42 / 1,10 = 38,18 M.', 'Actualiser l’année 2 : 42 / 1,10² = 34,71 M.', 'Actualiser l’année 3 : 42 / 1,10³ = 31,56 M.', 'Somme actualisée ≈104,45 M ; VAN ≈4,45 M FCFA, sous réserve des arrondis.'] },
      company: 'SIAT SA, projet d’extension d’une unité de transformation à San Pedro', problem: 'Le dossier utilise des flux nominaux avec un taux réel et omet le besoin de stock de démarrage.', resolution: 'Aligner nominal/réel, intégrer le BFR initial et ses récupérations, puis présenter la VAN centrale et une sensibilité aux volumes et au coût du capital.',
      exercise: { instruction: 'Investissement initial 100 M ; un flux de 110 M arrive dans un an. Au taux annuel de 10 %, quelle est la VAN arrondie au millier de FCFA ?', dataset: { investissement: 100000000, flux: 110000000, tauxPct: 10 }, answer: 0, correction: 'Valeur actuelle = 110 / 1,10 = 100 M FCFA ; VAN = 0. Le projet atteint exactement le taux requis dans ce cas simplifié.' },
      transfer: { instruction: 'À 10 %, un flux unique de 121 M arrive dans deux ans pour un investissement initial de 100 M. Quelle VAN en millions, arrondie à l’unité ?', dataset: { investissementM: 100, fluxM: 121, tauxPct: 10, periodes: 2 }, answer: 0, correction: '121 / 1,10² = 100 M ; la VAN est nulle. Toute autre période ou flux terminal modifierait le résultat.' },
      questions: [
        { question: 'Que signifie une VAN nulle dans le modèle ?', options: ['Le projet ne génère aucun flux', 'Les flux actualisés égalent l’investissement initial', 'Le projet est sans risque', 'La valeur comptable est nulle'], correctIndex: 1, explanation: 'Une VAN nulle indique une rentabilité égale au taux d’actualisation retenu, avec les hypothèses données.' },
        { question: 'Quelle cohérence est indispensable pour actualiser des flux ?', options: ['Même unité de période pour taux et calendrier des flux', 'Même nombre de salariés', 'Même montant chaque année', 'Même date de facturation'], correctIndex: 0, explanation: 'Un taux annuel doit être appliqué à des périodes annuelles, ou être converti à la fréquence cohérente.' },
      ],
    },
    {
      title: 'Arbitrer entre VAN, TRI et contraintes de financement',
      context: 'Les critères de rentabilité peuvent classer différemment des projets de tailles ou de calendriers distincts. Le décideur doit comprendre cette divergence avant de choisir.',
      theory: [
        'Le TRI est le taux qui annule la VAN. Il exprime un rendement interne mais peut être ambigu avec des flux non conventionnels et trompeur lorsque les projets diffèrent par taille ou calendrier. L’indice de profitabilité aide à comparer la valeur créée par unité investie sous certaines contraintes.',
        'Pour des projets mutuellement exclusifs, la VAN au coût du capital retenu mesure directement la valeur ajoutée au périmètre. Un TRI plus élevé sur un petit projet ne garantit pas la plus grande création de valeur. Construire les profils de VAN peut révéler un taux de croisement.',
        'Sous rationnement du capital, comparer des combinaisons réalisables, les dépendances entre projets et le budget disponible. Ne pas sélectionner mécaniquement le plus grand indice si les projets sont indivisibles ou si les risques diffèrent. Documenter les hypothèses et les conséquences stratégiques.',
      ],
      example: { title: 'Valeur créée sous contrainte', scenario: 'Budget maximal 100 M FCFA ; projet A demande 60 M et crée une VAN de 15 M ; projet B demande 40 M et crée une VAN de 8 M.', dataset: { budget: 100000000, coutA: 60000000, vanA: 15000000, coutB: 40000000, vanB: 8000000, vanCombinee: 23000000 }, steps: ['A seul respecte le budget et crée 15 M de VAN.', 'B seul respecte le budget et crée 8 M.', 'A+B utilise 100 M et crée 23 M si les projets sont indépendants.', 'Vérifier indivisibilité, dépendances, risque et absence de double comptage.'] },
      company: 'Comité d’investissement de SIAT SA, arbitrage entre modernisation énergétique et capacité supplémentaire', problem: 'Le projet de petite taille affiche un TRI supérieur, mais la direction compare les pourcentages sans tenir compte de la valeur absolue ni des contraintes.', resolution: 'Comparer les VAN au même taux, examiner la combinaison sous budget et présenter les profils de risque avant de choisir.',
      exercise: { instruction: 'Deux projets indépendants dans un budget de 100 M affichent des VAN de 15 M et 8 M et coûtent 60 M et 40 M. Quelle est la VAN combinée ?', dataset: { vanA: 15000000, vanB: 8000000, budget: 100000000 }, answer: 23000000, correction: 'Si les projets sont indépendants et réalisables ensemble, la VAN combinée est 15 + 8 = 23 M FCFA et le budget est entièrement utilisé.' },
      transfer: { instruction: 'Le projet C coûte 70 M pour une VAN de 21 M. Quel est son indice VAN/coût en pourcentage entier ?', dataset: { van: 21000000, cout: 70000000 }, answer: 30, correction: '21 / 70 = 30 %. Cet indice est un outil de comparaison, pas un substitut automatique à la maximisation de valeur.' },
      questions: [
        { question: 'Pourquoi un TRI supérieur peut-il ne pas être le meilleur choix ?', options: ['La taille des investissements et le calendrier diffèrent', 'Le TRI est toujours égal à la VAN', 'Le taux d’actualisation est inutile', 'Le projet est forcément illégal'], correctIndex: 0, explanation: 'Le pourcentage de rendement ne mesure pas seul la valeur absolue créée ni la contrainte budgétaire.' },
        { question: 'Sous budget contraint, quelle vérification est nécessaire ?', options: ['La combinaison réalisable des projets et leurs dépendances', 'Le TRI le plus élevé uniquement', 'La première date de facture', 'Le montant de TVA seul'], correctIndex: 0, explanation: 'L’indivisibilité, les synergies et les interdépendances peuvent changer la meilleure combinaison.' },
      ],
    },
  ],
  MOD_N9_M9: [
    {
      title: 'Éliminer les soldes et opérations réciproques',
      context: 'Un groupe ne peut pas présenter comme une créance sur lui-même une dette qu’une filiale doit à une autre. La consolidation neutralise les opérations internes après rapprochement des contreparties.',
      theory: [
        'Avant l’élimination, rapprocher société émettrice et réceptrice, montant, devise, période, référence et statut. Un écart peut venir d’un paiement en transit, d’une facture non reçue, d’une conversion différente ou d’une erreur de coupure. L’élimination ne doit pas servir à masquer un désaccord non expliqué.',
        'Les créances et dettes intragroupe sont éliminées à somme nulle dans les états consolidés. Les ventes et achats internes sont également neutralisés pour le groupe, car ils ne constituent pas des échanges avec des tiers. Les marges non réalisées sur stocks ou immobilisations demandent des retraitements supplémentaires.',
        'Conserver une matrice de rapprochement et une piste d’audit par paire d’entités. Les écritures d’élimination sont préparées hors comptabilité sociale puis intégrées au processus de consolidation selon le référentiel et le périmètre retenus.',
      ],
      example: { title: 'Élimination d’une créance réciproque', scenario: 'La filiale A a une créance de 30 M FCFA sur B ; B présente la dette correspondante de 30 M.', dataset: { creanceA: 30000000, detteB: 30000000, ecart: 0 }, steps: ['Rapprocher la référence et la période des deux soldes.', 'Constater un écart nul de 30 − 30 = 0.', 'Éliminer la créance et la dette de 30 M dans les comptes consolidés.', 'Conserver les soldes sociaux inchangés et documenter l’écriture de consolidation.'] },
      company: 'Groupe régional Ivoire Agro, société mère à Abidjan et filiale logistique à Dakar', problem: 'La filiale débitrice comptabilise 30 M mais la mère ne comptabilise que 28 M à la clôture.', resolution: 'Isoler l’écart de 2 M, vérifier facture et période, documenter le paiement en transit ou l’erreur, puis ne neutraliser qu’après rapprochement ou traitement autorisé.',
      exercise: { instruction: 'A présente 18 M FCFA de créance intragroupe ; B présente 17 M de dette. Quel écart reste à résoudre avant élimination ?', dataset: { creance: 18000000, dette: 17000000 }, answer: 1000000, correction: 'Écart = 18 − 17 = 1 M FCFA. La consolidation doit expliquer cet écart avant l’élimination complète.' },
      transfer: { instruction: 'Une vente interne de 30 M a un coût de 24 M et les biens sont entièrement revendus à des tiers avant clôture. Quel est le profit interne encore non réalisé dans le groupe ?', dataset: { venteInterne: 30000000, coutInterne: 24000000, revenduExternePourcent: 100 }, answer: 0, correction: 'Les biens sont entièrement revendus à des tiers : aucune marge interne n’est incluse dans le stock final. Les ventes et achats internes sont tout de même éliminés.' },
      questions: [
        { question: 'Que faut-il faire si les soldes réciproques ne concordent pas ?', options: ['Éliminer sans explication', 'Rapprocher et documenter l’écart avant traitement', 'Modifier les comptes sociaux', 'Ignorer la contrepartie'], correctIndex: 1, explanation: 'Un écart peut refléter une différence de période, un transit ou une erreur qui doit être comprise.' },
        { question: 'Pourquoi neutraliser ventes et achats internes ?', options: ['Le groupe ne réalise pas de vente à lui-même vis-à-vis des tiers', 'Pour augmenter le chiffre d’affaires', 'Pour supprimer les ventes externes', 'Pour équilibrer le cash'], correctIndex: 0, explanation: 'Les états consolidés représentent le groupe comme une entité économique unique.' },
      ],
    },
    {
      title: 'Lire l’effet des devises et de la méthode de conversion',
      context: 'Un groupe régional peut combiner plusieurs monnaies fonctionnelles. La conversion doit distinguer les postes du bilan, les flux du résultat et l’effet de conversion, selon le référentiel applicable.',
      theory: [
        'La méthode dépend de la monnaie fonctionnelle, du référentiel et du contexte de la filiale. Dans une méthode de cours de clôture, les actifs et passifs sont généralement convertis au cours de clôture, tandis que produits et charges utilisent des cours aux dates des opérations ou une moyenne appropriée si elle les approxime.',
        'Les différences de conversion ne sont pas nécessairement un flux de trésorerie réalisé. Elles résultent de la conversion d’états exprimés dans une autre monnaie et sont traitées selon les règles de consolidation applicables. Le choix de taux et le calcul doivent être cohérents entre postes.',
        'Documenter devise, source et date des cours, méthode, soldes moyens et exceptions. Vérifier les opérations intragroupe en devise et distinguer risque de conversion du risque transactionnel. Les normes locales et les conventions peuvent différer ; une analyse réelle doit citer le référentiel et sa version.',
      ],
      example: { title: 'Convertir un actif au cours de clôture', scenario: 'Une filiale présente 1 000 000 EUR d’actifs nets ; le taux pédagogique de clôture est 655,957 XOF/EUR.', dataset: { actifsNetsEuro: 1000000, tauxCloture: 655.957, actifsNetsXof: 655957000 }, steps: ['Confirmer le montant et la monnaie de l’état de la filiale.', 'Convertir le bilan au taux prévu par la méthode retenue.', '1 000 000 × 655,957 = 655 957 000 FCFA.', 'Calculer et présenter l’écart de conversion selon le référentiel applicable.'] },
      company: 'Holding Ivoire Agro, consolidant une entité de négoce basée à Dakar et une unité en Europe', problem: 'Le rapport convertit à un seul taux toutes les lignes du bilan et du résultat sans indiquer la méthode.', resolution: 'Identifier la méthode et les cours de conversion, recalculer les postes par catégorie et documenter les écarts de conversion et de transaction séparément.',
      exercise: { instruction: 'Une créance de 200 000 EUR est convertie au taux pédagogique de 655,957 XOF/EUR. Quel est son montant en FCFA ?', dataset: { montantEuro: 200000, taux: 655.957 }, answer: 131191400, correction: '200 000 × 655,957 = 131 191 400 FCFA. Le taux fourni est une hypothèse pédagogique ; documenter le cours applicable dans un dossier réel.' },
      transfer: { instruction: 'Un solde de 100 000 EUR vaut 65 595 700 FCFA au cours utilisé. Quel montant FCFA correspond à 300 000 EUR au même cours ?', dataset: { montantEuro: 300000, taux: 655.957 }, answer: 196787100, correction: '300 000 × 655,957 = 196 787 100 FCFA. Vérifier l’arrondi et l’échelle de présentation des états.' },
      questions: [
        { question: 'Une différence de conversion est-elle automatiquement un flux de trésorerie réalisé ?', options: ['Oui, toujours', 'Non, elle peut provenir de la conversion des états', 'Oui si la filiale est rentable', 'Non, car elle ne se calcule jamais'], correctIndex: 1, explanation: 'La conversion comptable des états ne correspond pas nécessairement à un encaissement ou décaissement.' },
        { question: 'Que faut-il documenter pour convertir une filiale ?', options: ['La monnaie, méthode, cours et dates retenus', 'Uniquement le nom de la filiale', 'La croissance des ventes seulement', 'Le taux choisi sans source'], correctIndex: 0, explanation: 'La piste d’audit exige méthode et cours identifiables et cohérents avec le référentiel.' },
      ],
    },
  ],
  MOD_N10_M10: [
    {
      title: 'Préparer un dossier d’analyse traçable avant la soutenance',
      context: 'Le projet professionnel reprend les compétences du parcours. Un dossier solide distingue données sources, retraitements, calculs, constats, hypothèses et recommandations.',
      theory: [
        'La première étape consiste à établir un dictionnaire des données : définition, unité, période, source, responsable et contrôle. Les états financiers doivent être rapprochés aux balances et pièces disponibles. Les données manquantes sont indiquées explicitement au lieu d’être remplacées silencieusement par une hypothèse.',
        'Organiser le travail dans une chaîne reproductible : import, validation, retraitements, calculs, analyse, scénarios et restitution. Chaque recommandation doit renvoyer à une preuve et à un effet attendu. Conserver les versions des hypothèses et permettre à un lecteur de retrouver le calcul.',
        'La note de synthèse commence par les messages qui changent la décision. Les annexes portent définitions, méthodes, limites et détails arithmétiques. Les informations fictives du cas d’apprentissage ne doivent pas être présentées comme des données d’une entreprise réelle.',
      ],
      example: { title: 'Documenter une variation de BFR', scenario: 'Le BFR augmente de 24 M à 38 M FCFA entre N−1 et N.', dataset: { bfrN1: 24000000, bfrN: 38000000, variation: 14000000 }, steps: ['Calculer la variation : 38 − 24 = 14 M FCFA.', 'Décomposer stocks, créances clients et dettes d’exploitation.', 'Rapprocher les soldes aux balances et échéanciers.', 'Formuler une cause vérifiable et un levier associé.'] },
      company: 'SAIB SA, groupe agro-industriel fictif ; données et noms de ce projet sont pédagogiques', problem: 'Le comité reçoit un rapport qui annonce une crise de cash sans distinguer croissance du BFR, investissement et remboursement de dette.', resolution: 'Construire une piste de preuves, réconcilier bilan et cash-flow, distinguer les causes et présenter un plan d’action chiffré avec limites.',
      exercise: { instruction: 'Le BFR passe de 24 M à 38 M FCFA. De combien augmente-t-il ?', dataset: { bfrN1: 24000000, bfrN: 38000000 }, answer: 14000000, correction: 'Variation = 38 − 24 = 14 M FCFA. Il reste à attribuer cette variation aux composantes du cycle.' },
      transfer: { instruction: 'Une hausse de stock de 9 M explique 14 M de variation de BFR. Quel montant reste à expliquer ?', dataset: { variation: 14000000, effetStock: 9000000 }, answer: 5000000, correction: '14 − 9 = 5 M FCFA restent à expliquer par les autres postes et retraitements.' },
      questions: [
        { question: 'Quel est le rôle du dictionnaire de données ?', options: ['Documenter définition, unité, période, source et contrôles', 'Remplacer les états financiers', 'Masquer les données manquantes', 'Choisir la recommandation à la place de l’analyste'], correctIndex: 0, explanation: 'Il rend les données interprétables et les calculs reproductibles.' },
        { question: 'Comment traiter une donnée manquante ?', options: ['La remplacer sans le dire', 'Documenter l’absence et expliciter toute hypothèse', 'Supprimer le rapport', 'La présenter comme certifiée'], correctIndex: 1, explanation: 'Une hypothèse doit être identifiable et séparée d’un fait observé.' },
      ],
    },
    {
      title: 'Présenter une décision avec limites et plan de suivi',
      context: 'La maîtrise professionnelle se manifeste dans une recommandation claire, chiffrée, conditionnelle lorsque nécessaire, et accompagnée d’indicateurs de suivi.',
      theory: [
        'Une recommandation combine décision, justification, conditions, risques résiduels et indicateurs de suivi. Chaque indicateur a une définition, une source, une fréquence, un seuil d’alerte et un responsable. Un plan d’action doit préciser l’ordre des mesures et les dépendances entre équipes.',
        'La soutenance doit distinguer ce qui est établi de ce qui reste incertain. Présenter au moins un scénario défavorable et expliquer comment la conclusion change. Si l’incertitude est trop importante, proposer une étape de validation plutôt qu’une certitude artificielle.',
        'Le retour de consolidation compare résultats et hypothèses après la décision. Les écarts sont expliqués, les actions révisées et les leçons conservées. Une bonne recommandation n’est pas uniquement celle qui prévoit correctement ; c’est celle dont les risques et conditions peuvent être suivis.',
      ],
      example: { title: 'Transformer un ratio en suivi', scenario: 'Le DSO cible est 45 jours, contre 55 jours observés ; le plan vise -5 jours au trimestre.', dataset: { dsoObserve: 55, dsoCible: 45, reductionPremierTrimestre: 5 }, steps: ['Énoncer l’écart initial de 10 jours.', 'Définir le premier jalon : réduire de 5 jours au trimestre.', 'Mesurer chaque mois avec la même base de ventes à crédit.', 'Analyser les litiges et ne pas confondre baisse de créances et abandon commercial.'] },
      company: 'Comité exécutif fictif de SAIB SA, revue du plan de restructuration de trésorerie', problem: 'Le plan promet un retour au DSO cible sans échéance, indicateur intermédiaire ni responsable de suivi.', resolution: 'Présenter un jalon trimestriel, une source de calcul, les responsables de facturation/recouvrement et un scénario si le jalon n’est pas atteint.',
      exercise: { instruction: 'DSO initial 55 jours, objectif final 45 jours. Quelle réduction totale est visée ?', dataset: { initial: 55, cible: 45 }, answer: 10, correction: '55 − 45 = 10 jours. Un jalon intermédiaire et une méthode stable sont nécessaires pour piloter le plan.' },
      transfer: { instruction: 'Après le premier trimestre, le DSO passe de 55 à 50 jours. Combien de jours de réduction reste-t-il pour atteindre 45 ?', dataset: { actuel: 50, cible: 45 }, answer: 5, correction: '50 − 45 = 5 jours restent à gagner. Examiner aussi la qualité des ventes et la relation client.' },
      questions: [
        { question: 'Quel élément rend un indicateur pilotable ?', options: ['Définition, source, fréquence, seuil et responsable', 'Un nom sans formule', 'Une valeur annuelle sans historique', 'Un objectif sans échéance'], correctIndex: 0, explanation: 'Ces éléments permettent de recalculer et de déclencher une action.' },
        { question: 'Que faire lorsque la conclusion dépend d’une hypothèse incertaine ?', options: ['La présenter comme un fait', 'Montrer le scénario et proposer une validation ou un suivi', 'Supprimer les limites', 'Ignorer le scénario adverse'], correctIndex: 1, explanation: 'Une décision robuste explicite l’incertitude et définit les conditions de révision.' },
      ],
    },
  ],
};

function makeLesson(path: LearningPath360, module: Module360, base: Lesson360, spec: ExtraLessonSpec, sequence: number): Lesson360 {
  const level = path.levels.find((candidate) => candidate.modules.some((item) => item.id === module.id))!;
  const lessonNumber = sequence + 1;
  const id = `L_${level.levelNumber}_M${module.moduleNumber}_${String(lessonNumber).padStart(2, '0')}`;
  const quiz = spec.questions.map((question, index) => ({ ...question, id: `Q_${id}_${index + 1}` }));
  return {
    id,
    chapterId: `${module.id}_CH${lessonNumber}`,
    moduleId: module.id,
    pathId: path.id,
    title: spec.title,
    durationMinutes: 55,
    difficulty: sequence === 1 ? 'Intermédiaire' : 'Avancé',
    objectives: [
      'Expliquer les mécanismes et conventions utilisés dans le cas.',
      'Calculer un indicateur avec ses unités et hypothèses.',
      'Formuler une interprétation et une action traçable.',
    ],
    prerequisites: [`Lire la leçon initiale du module « ${module.title} » et revoir ses définitions.`],
    contextIntro: spec.context,
    theorySections: spec.theory.map((content, index) => ({
      title: ['Mécanisme et définitions', 'Méthode de calcul et contrôle', 'Interprétation professionnelle et limites'][index],
      content,
      rulesAndPrinciples: index === 1 ? ['Documenter la période, l’unité et le périmètre avant de calculer.', 'Rapprocher le résultat aux pièces et aux états de référence.'] : undefined,
      commonMistakes: index === 2 ? ['Confondre une hypothèse pédagogique avec une règle officielle.', 'Conclure à partir d’un indicateur isolé sans vérifier les données sources.'] : undefined,
      professionalBestPractices: index === 2 ? ['Conserver les calculs et hypothèses afin qu’un collègue puisse reproduire l’analyse.'] : undefined,
    })),
    simpleExample: {
      title: spec.example.title,
      scenario: spec.example.scenario,
      dataset: spec.example.dataset,
      stepByStepSolution: spec.example.steps.map((action, index) => ({ step: index + 1, action, justification: 'Cette étape permet de garder une piste de calcul vérifiable.' })),
    },
    intermediateExample: {
      title: 'Vérifier le calcul sur une variante de données',
      scenario: `Transposer la méthode au contexte ${spec.company} en gardant les mêmes définitions et conventions.`,
      dataset: spec.exercise.dataset,
      stepByStepSolution: [
        { step: 1, action: 'Définir le périmètre et les unités des données.', justification: 'Les postes doivent être comparables avant le calcul.' },
        { step: 2, action: spec.exercise.instruction, calculation: `Résultat attendu : ${spec.exercise.answer}`, justification: spec.exercise.correction },
        { step: 3, action: 'Présenter une interprétation et préciser une limite.', justification: 'Un résultat numérique isolé n’est pas encore une recommandation.' },
      ],
    },
    enterpriseCase: {
      companyName: spec.company,
      locationContext: 'Cas pédagogique fictif, espace UEMOA, montants en FCFA',
      sector: 'Entreprise fictive',
      currency: 'FCFA',
      problemStatement: spec.problem,
      financialStatements: { ...spec.example.dataset, ...spec.exercise.dataset },
      realWorldResolution: spec.resolution,
      recommendationToBoard: 'Valider les données sources, présenter le calcul avec ses hypothèses et attribuer le suivi à un responsable métier.',
    },
    guidedExercise: {
      id: `EX_${id}_GUIDED`, title: `Exercice guidé — ${spec.title}`, instruction: spec.exercise.instruction,
      dataset: spec.exercise.dataset, stepByStepGuidance: ['Repérez l’indicateur et son unité.', 'Posez l’opération avant de saisir le résultat.', 'Comparez le résultat à la correction et expliquez son sens.'],
      expectedAnswer: spec.exercise.answer, detailedCorrection: spec.exercise.correction, rubricPoints: 20,
    },
    autonomousExercise: {
      id: `EX_${id}_AUTO`, title: `Transfert autonome — ${spec.title}`, instruction: spec.transfer.instruction,
      dataset: spec.transfer.dataset, hints: ['Commencez par identifier le flux et la période.', 'Vérifiez le signe et l’unité avant de répondre.'],
      expectedAnswer: spec.transfer.answer, detailedCorrection: spec.transfer.correction, rubricPoints: 25,
    },
    practicalActivity: {
      ...base.practicalActivity,
      id: `ACT_${id}_SIM`,
      title: `Atelier de transfert — ${spec.title}`,
      assessment: {
        prompt: spec.exercise.instruction,
        expectedAnswer: spec.exercise.answer,
        correction: spec.exercise.correction,
      },
      completionCriteria: { ...base.practicalActivity.completionCriteria, description: `Reproduire le calcul de cette leçon dans le même atelier métier, expliquer le résultat et enregistrer les hypothèses. ${base.practicalActivity.completionCriteria.description}` },
    },
    comprehensionQuiz: quiz,
    keyTakeawaySummary: [spec.theory[0].split('. ')[0] + '.', spec.exercise.correction, spec.transfer.correction],
    nextStepRecommendation: `Poursuivez avec la prochaine leçon du module « ${module.title} », puis réalisez son évaluation cumulative.`,
  };
}

export function expandPilotPath(path: LearningPath360): LearningPath360 {
  const levels = path.levels.map((level) => ({
    ...level,
    modules: level.modules.map((module) => {
      const specifications = extraLessons[module.id];
      if (!specifications) return module;
      const baseLessons = module.chapters.flatMap((chapter) => chapter.lessons);
      const base = baseLessons[0];
      const lessons = specifications.map((spec, index) => makeLesson(path, module, base, spec, index + 1));
      const questions = [
        ...baseLessons.flatMap((lesson) => lesson.comprehensionQuiz),
        ...lessons.flatMap((lesson) => lesson.comprehensionQuiz),
      ];
      const enrichedBaseChapters = module.chapters.map((chapter) => ({
        ...chapter,
        lessons: chapter.lessons.map((lesson, index) => {
          if (index !== 0) return lesson;
          const baseSpec = specifications[0];
          return {
            ...lesson,
            theorySections: [
              { title: 'Repères du module', content: `${lesson.contextIntro} ${baseSpec.theory[0]}` },
              { title: 'Méthode et contrôles', content: baseSpec.theory[1] },
              { title: 'Interprétation et limites', content: baseSpec.theory[2] },
            ],
            simpleExample: {
              title: baseSpec.example.title,
              scenario: baseSpec.example.scenario,
              dataset: baseSpec.example.dataset,
              stepByStepSolution: baseSpec.example.steps.map((action, step) => ({ step: step + 1, action, justification: 'Cette étape conserve une piste de calcul vérifiable.' })),
            },
            intermediateExample: {
              title: 'Transférer la méthode à un autre jeu de données',
              scenario: `Cas d’application pour ${module.title}. ${baseSpec.exercise.instruction}`,
              dataset: baseSpec.exercise.dataset,
              stepByStepSolution: [
                { step: 1, action: 'Identifier les données, la période et l’unité.', justification: 'Le périmètre doit être stable avant le calcul.' },
                { step: 2, action: baseSpec.exercise.instruction, calculation: String(baseSpec.exercise.answer), justification: baseSpec.exercise.correction },
                { step: 3, action: 'Interpréter le résultat et préciser une limite.', justification: 'La décision métier dépend aussi de la qualité des données.' },
              ],
            },
            comprehensionQuiz: [
              ...lesson.comprehensionQuiz,
              { ...baseSpec.questions[0], id: `Q_${lesson.id}_SUPP_1` },
            ],
            practicalActivity: {
              ...lesson.practicalActivity,
              assessment: {
                prompt: baseSpec.exercise.instruction,
                expectedAnswer: baseSpec.exercise.answer,
                correction: baseSpec.exercise.correction,
              },
            },
          };
        }),
      }));
      return {
        ...module,
        chapters: [
          ...enrichedBaseChapters,
          ...lessons.map((lesson, index) => ({
            id: lesson.chapterId,
            moduleId: module.id,
            title: `Chapitre ${index + 2} : ${lesson.title}`,
            description: lesson.contextIntro,
            estimatedMinutes: lesson.durationMinutes,
            lessons: [lesson],
          })),
        ],
        evaluation: { ...module.evaluation, questions: [...module.evaluation.questions, ...questions] },
      };
    }),
  }));
  return { ...path, version: '3.0.0', levels };
}
