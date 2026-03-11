import type { BiblicalCharacter } from './characters';

export const CHARACTERS_FR: BiblicalCharacter[] = [
  {
    id: "jesus_christ",
    name: "Jésus-Christ",
    imageUrl: "/images/characters/jesus_christ.png",
    roles: ["Messie", "Fils de Dieu", "Enseignant", "Sauveur"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Bethléem", "Nazareth", "Jérusalem", "Mer de Galilée"],
    shortSummary: "La figure centrale du christianisme, que les enseignements de la plupart des confessions chrétiennes considèrent comme le Fils de Dieu.",
    detailedBio: "Né à Bethléem de Marie, Jésus de Nazareth est le fondateur du christianisme. Les Évangiles décrivent sa naissance miraculeuse, ses enseignements, ses miracles, et sa crucifixion sous Ponce Pilate, suivie de sa résurrection. Sa vie et ses enseignements forment la base du Nouveau Testament.",
    keyScriptures: [
      { reference: "Matthieu 5", event: "Le Sermon sur la Montagne" },
      { reference: "Luc 2", event: "La Naissance de Jésus" },
      { reference: "Jean 3", event: "Conversation avec Nicodème" },
      { reference: "Marc 16", event: "La Résurrection" }
    ],
    relatedCharacters: ["mary", "peter_apostle", "john_apostle", "paul_apostle", "john_baptist"],
    tags: ["Leader", "Enseignant"]
  },
  {
    id: "moses",
    name: "Moïse",
    imageUrl: "/images/characters/moses.png",
    roles: ["Prophète", "Législateur", "Leader"],
    era: "15e-13e Siècle av. J.-C.",
    keyLocations: ["Égypte", "Madian", "Mont Sinaï", "Moab"],
    shortSummary: "Le prophète le plus important du judaïsme, qui a mené les Israélites hors de l'esclavage égyptien et a reçu la Torah.",
    detailedBio: "Né Israélite mais élevé comme un prince égyptien, Moïse a fui à Madian après avoir tué un maître de corvée abusif. Dieu l'a appelé depuis un buisson ardent, l'envoyant de nouveau en Égypte pour exiger la libération des Israélites. Il a dirigé l'Exode, séparé la mer Rouge et reçu les Dix Commandements sur le mont Sinaï.",
    keyScriptures: [
      { reference: "Exode 3", event: "Le Buisson Ardent" },
      { reference: "Exode 14", event: "La Traversée de la Mer Rouge" },
      { reference: "Exode 20", event: "Les Dix Commandements" }
    ],
    relatedCharacters: ["aaron", "miriam", "joshua", "pharaoh"],
    tags: ["Prophète", "Leader"]
  },
  {
    id: "abraham",
    name: "Abraham",
    imageUrl: "/images/characters/abraham.png",
    roles: ["Patriarche"],
    era: "20e-18e Siècle av. J.-C.",
    keyLocations: ["Ur", "Haran", "Canaan", "Égypte"],
    shortSummary: "Le patriarche commun des religions abrahamiques : le judaïsme, le christianisme et l'islam.",
    detailedBio: "Initialement appelé Abram, il fut appelé par Dieu à quitter sa maison à Ur pour voyager vers une nouvelle terre (Canaan) que Dieu promit de donner à ses descendants. Dieu a fait alliance avec lui, lui promettant des descendants aussi nombreux que les étoiles, malgré l'âge avancé de sa femme Sarah.",
    keyScriptures: [
      { reference: "Genèse 12", event: "L'Appel d'Abram" },
      { reference: "Genèse 15", event: "L'Alliance de Dieu avec Abram" },
      { reference: "Genèse 22", event: "La Ligature d'Isaac" }
    ],
    relatedCharacters: ["sarah", "isaac", "ishmael", "lot"],
    tags: ["Patriarche"]
  },
  {
    id: "david",
    name: "David",
    imageUrl: "/images/characters/david.png",
    roles: ["Roi", "Guerrier", "Musicien"],
    era: "10e Siècle av. J.-C.",
    keyLocations: ["Bethléem", "Jérusalem", "Hébron"],
    shortSummary: "Le deuxième roi du Royaume uni d'Israël et de Juda, connu pour avoir tué Goliath et écrit de nombreux Psaumes.",
    detailedBio: "Jeune berger de Bethléem, David a vaincu le géant philistin Goliath avec une fronde et une pierre. Il est devenu le plus grand roi d'Israël, unissant les tribus et établissant Jérusalem comme capitale. Bien qu'imparfait, il fut décrit comme un homme selon le cœur de Dieu.",
    keyScriptures: [
      { reference: "1 Samuel 17", event: "David et Goliath" },
      { reference: "2 Samuel 11", event: "David et Bath-Schéba" },
      { reference: "Psaume 23", event: "L'Éternel est mon Berger" }
    ],
    relatedCharacters: ["saul", "jonathan", "bathsheba", "solomon", "samuel"],
    tags: ["Roi"]
  },
  {
    id: "paul_apostle",
    name: "L'Apôtre Paul",
    imageUrl: "/images/characters/paul.png",
    roles: ["Apôtre", "Missionnaire", "Théologien"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Tarse", "Jérusalem", "Antioche", "Rome", "Corinthe"],
    shortSummary: "Un Pharisien juif converti au christianisme devenu son missionnaire le plus important.",
    detailedBio: "Initialement nommé Saul de Tarse, il a vigoureusement persécuté l'Église chrétienne primitive. En route vers Damas, il a eu une vision dramatique de Jésus ressuscité, conduisant à sa conversion. Il a entrepris trois grands voyages missionnaires et rédigé une grande partie du Nouveau Testament.",
    keyScriptures: [
      { reference: "Actes 9", event: "Conversion sur le chemin de Damas" },
      { reference: "Actes 17", event: "Prédication à Athènes" },
      { reference: "Romains 8", event: "La Vie par l'Esprit" }
    ],
    relatedCharacters: ["jesus_christ", "peter_apostle", "barnabas", "timothy", "luke"],
    tags: ["Apôtre", "Leader", "Auteur"]
  },
  {
    id: "peter_apostle",
    name: "Simon Pierre",
    imageUrl: "/images/characters/peter.png",
    roles: ["Apôtre", "Pêcheur", "Leader"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Bethsaïda", "Capharnaüm", "Jérusalem", "Rome"],
    shortSummary: "L'un des Douze Apôtres de Jésus, souvent leur porte-parole, et l'un des premiers dirigeants de l'Église chrétienne.",
    detailedBio: "Pêcheur sur la mer de Galilée, Pierre a été appelé par Jésus à être un 'pêcheur d'hommes'. Il était connu pour son impulsivité : marchant sur l'eau mais s'enfonçant, déclarant Jésus comme le Messie, mais le reniant trois fois. Il fut restauré par Jésus et devint un pilier de l'Église primitive.",
    keyScriptures: [
      { reference: "Matthieu 16", event: "La Confession de Pierre" },
      { reference: "Matthieu 26", event: "Le Reniement de Pierre" },
      { reference: "Actes 2", event: "Le Sermon de Pierre à la Pentecôte" }
    ],
    relatedCharacters: ["jesus_christ", "andrew", "james_apostle", "john_apostle", "paul_apostle"],
    tags: ["Apôtre", "Leader"]
  },
  {
    id: "mary",
    name: "Marie, Mère de Jésus",
    imageUrl: "/images/characters/mary.png",
    roles: ["Mère"],
    era: "1er Siècle av. J.-C. - 1er Siècle ap. J.-C.",
    keyLocations: ["Nazareth", "Bethléem", "Jérusalem", "Égypte"],
    shortSummary: "La mère de Jésus, qui l'a conçu miraculeusement par le Saint-Esprit.",
    detailedBio: "Jolie jeune Juive de Nazareth fiancée à Joseph. L'ange Gabriel lui a annoncé qu'elle concevrait un fils par le Saint-Esprit. Elle a donné naissance à Jésus à Bethléem, l'a élevé à Nazareth et était présente à sa crucifixion.",
    keyScriptures: [
      { reference: "Luc 1", event: "L'Annonciation" },
      { reference: "Luc 2", event: "La Naissance de Jésus" },
      { reference: "Jean 19", event: "Au pied de la Croix" }
    ],
    relatedCharacters: ["jesus_christ", "joseph_husband", "john_baptist", "elizabeth"],
    tags: ["Matriarche", "Autre"]
  },
  {
    id: "john_apostle",
    name: "L'Apôtre Jean",
    imageUrl: "/images/characters/john_apostle.png",
    roles: ["Apôtre", "Auteur"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Galilée", "Jérusalem", "Éphèse", "Patmos"],
    shortSummary: "Connu comme le 'disciple que Jésus aimait', apôtre et auteur d'un Évangile, des Épîtres et de l'Apocalypse.",
    detailedBio: "Frère de Jacques, Jean faisait partie du cercle intime de Jésus. Présent à la Transfiguration et à la crucifixion. Il a survécu aux autres apôtres, passant ses dernières années à Éphèse et exilé sur l'île de Patmos, où il a reçu les visions de l'Apocalypse.",
    keyScriptures: [
      { reference: "Jean 1", event: "Le Verbe fait chair (Prologue)" },
      { reference: "Jean 19", event: "Jésus confie Marie à Jean" },
      { reference: "Apocalypse 1", event: "La Vision de Jean à Patmos" }
    ],
    relatedCharacters: ["jesus_christ", "james_apostle", "peter_apostle", "mary"],
    tags: ["Apôtre", "Auteur"]
  },
  {
    id: "elijah",
    name: "Élie",
    imageUrl: "/images/characters/elijah.png",
    roles: ["Prophète"],
    era: "9e Siècle av. J.-C.",
    keyLocations: ["Royaume du Nord (Israël)", "Mont Carmel", "Mont Horeb"],
    shortSummary: "Un puissant prophète du royaume du Nord d'Israël qui a défendu l'adoration de Yahvé face au culte de Baal.",
    detailedBio: "Sous le règne du roi Achab et de la reine Jézabel, Élie a appelé une sécheresse et prouvé dramatiquement la suprématie de Yahvé sur le mont Carmel avec un feu venant du ciel. Il ne mourut pas naturellement mais fut emporté au ciel dans un tourbillon par des chars de feu.",
    keyScriptures: [
      { reference: "1 Rois 18", event: "Élie sur le Mont Carmel" },
      { reference: "1 Rois 19", event: "Le murmure doux et léger" },
      { reference: "2 Rois 2", event: "Élie enlevé au Ciel" }
    ],
    relatedCharacters: ["ahab", "jezebel", "elisha"],
    tags: ["Prophète"]
  },
  {
    id: "solomon",
    name: "Salomon",
    imageUrl: "/images/characters/solomon.png",
    roles: ["Roi", "Auteur"],
    era: "10e Siècle av. J.-C.",
    keyLocations: ["Jérusalem"],
    shortSummary: "Fils de David et troisième roi d'Israël, réputé pour son immense sagesse, sa richesse et la construction du Premier Temple.",
    detailedBio: "Quand Dieu lui a offert tout ce qu'il voulait, Salomon a demandé la sagesse pour gouverner. Il fit bâtir le magnifique Premier Temple à Jérusalem. Cependant, ses nombreuses épouses étrangères éloignèrent son cœur de Dieu, conduisant à la division du royaume après sa mort.",
    keyScriptures: [
      { reference: "1 Rois 3", event: "Salomon demande la Sagesse" },
      { reference: "1 Rois 6", event: "La Construction du Temple" },
      { reference: "1 Rois 10", event: "La Visite de la Reine de Saba" }
    ],
    relatedCharacters: ["david", "bathsheba", "queen_of_sheba", "rehoboam"],
    tags: ["Roi"]
  },
  {
    id: "noah",
    name: "Noé",
    imageUrl: "/images/characters/noah.png",
    roles: ["Patriarche"],
    era: "Période Antédiluvienne",
    keyLocations: ["Mésopotamie", "Mont Ararat"],
    shortSummary: "L'homme juste choisi par Dieu pour survivre au grand déluge en construisant une arche.",
    detailedBio: "Alors que la terre était remplie de violence, Dieu a décidé d'envoyer un déluge. Il instruisit Noé de construire une immense arche pour sauver sa famille et des paires d'animaux. Après le déluge, Dieu a fait alliance avec Noé, symbolisée par l'arc-en-ciel, pour ne plus détruire la terre par l'eau.",
    keyScriptures: [
      { reference: "Genèse 6", event: "Dieu ordonne à Noé de construire l'Arche" },
      { reference: "Genèse 8", event: "La Fin du Déluge" },
      { reference: "Genèse 9", event: "L'Alliance de Dieu et l'Arc-en-ciel" }
    ],
    relatedCharacters: ["shem", "ham", "japheth"],
    tags: ["Patriarche"]
  },
  {
    id: "sarah",
    name: "Sarah",
    imageUrl: "/images/characters/sarah.png",
    roles: ["Matriarche"],
    era: "20e-18e Siècle av. J.-C.",
    keyLocations: ["Ur", "Canaan", "Égypte"],
    shortSummary: "La femme d'Abraham et la mère d'Isaac, ayant donné naissance miraculeusement dans sa vieillesse.",
    detailedBio: "Originellement nommée Saraï, elle a voyagé avec Abraham. Stérile jusqu'à un âge avancé, Dieu a promis qu'elle aurait un fils. À 90 ans, elle a donné naissance à Isaac, accomplissant la promesse d'une grande nation.",
    keyScriptures: [
      { reference: "Genèse 12", event: "Voyage en Égypte" },
      { reference: "Genèse 18", event: "Les Trois Visiteurs promettent un Fils" },
      { reference: "Genèse 21", event: "La Naissance d'Isaac" }
    ],
    relatedCharacters: ["abraham", "isaac", "hagar", "ishmael"],
    tags: ["Matriarche"]
  },
  {
    id: "joseph_son_of_jacob",
    name: "Joseph",
    imageUrl: "/images/characters/joseph_son_of_jacob.png",
    roles: ["Dirigeant", "Interprète de Rêves"],
    era: "19e-17e Siècle av. J.-C.",
    keyLocations: ["Canaan", "Égypte"],
    shortSummary: "Fils favori de Jacob, vendu comme esclave par ses frères mais devenu le deuxième homme le plus puissant d'Égypte.",
    detailedBio: "Fils préféré de Jacob. Ses frères jaloux l'ont vendu comme esclave en Égypte. Après un emprisonnement injuste, sa capacité à interpréter les rêves du Pharaon l'a élevé au rang de vizir, où il sauva l'Égypte et sa famille d'une grave famine.",
    keyScriptures: [
      { reference: "Genèse 37", event: "Joseph vendu par ses frères" },
      { reference: "Genèse 41", event: "Joseph interprète les rêves du Pharaon" },
      { reference: "Genèse 45", event: "Joseph révèle son identité" }
    ],
    relatedCharacters: ["jacob", "benjamin", "judah", "pharaoh"],
    tags: ["Leader", "Patriarche"]
  },
  {
    id: "ruth",
    name: "Ruth",
    imageUrl: "/images/characters/ruth.png",
    roles: ["Ancêtre de David"],
    era: "12e Siècle av. J.-C. (Temps des Juges)",
    keyLocations: ["Moab", "Bethléem"],
    shortSummary: "Femme moabite dont la loyauté à sa belle-mère israélite Naomie fit d'elle l'arrière-grand-mère du roi David.",
    detailedBio: "Après la mort de son mari, Ruth a choisi de rester avec sa belle-mère Naomie, disant : 'Ton peuple sera mon peuple, et ton Dieu sera mon Dieu'. Elle s'est mariée plus tard avec Boaz à Bethléem.",
    keyScriptures: [
      { reference: "Ruth 1", event: "La Loyauté de Ruth envers Naomie" },
      { reference: "Ruth 2", event: "Ruth rencontre Boaz" },
      { reference: "Ruth 4", event: "Boaz épouse Ruth" }
    ],
    relatedCharacters: ["naomi", "boaz", "david"],
    tags: ["Matriarche"]
  },
  {
    id: "john_baptist",
    name: "Jean le Baptiste",
    imageUrl: "/images/characters/john_baptist.png",
    roles: ["Prophète", "Précurseur"],
    era: "1er Siècle av. J.-C. - 1er Siècle ap. J.-C.",
    keyLocations: ["Désert de Judée", "Jourdain"],
    shortSummary: "Prophète prêchant la repentance et baptisant dans le fleuve du Jourdain, préparant la voie pour Jésus.",
    detailedBio: "Fils de Zacharie et Élisabeth (parente de Marie). Vivant dans le désert, il a baptisé Jésus dans le Jourdain mais a ensuite été emprisonné et décapité par Hérode Antipas.",
    keyScriptures: [
      { reference: "Luc 3", event: "La prédication de repentance de Jean" },
      { reference: "Matthieu 3", event: "Le Baptême de Jésus" },
      { reference: "Marc 6", event: "La Mort de Jean le Baptiste" }
    ],
    relatedCharacters: ["jesus_christ", "elizabeth", "mary", "herod_antipas"],
    tags: ["Prophète"]
  },
  {
    id: "samuel",
    name: "Samuel",
    imageUrl: "/images/characters/samuel.png",
    roles: ["Prophète", "Juge"],
    era: "11e Siècle av. J.-C.",
    keyLocations: ["Silo", "Rama", "Mitspa"],
    shortSummary: "Dernier juge d'Israël et prophète ayant oint les deux premiers rois d'Israël.",
    detailedBio: "Consacré à Dieu par sa mère Anne, Samuel a grandi sous la tutelle du prêtre Éli. Il a jugé Israël et a oint à contrecœur Saül comme premier roi, puis plus tard, le jeune David.",
    keyScriptures: [
      { reference: "1 Samuel 3", event: "Dieu appelle le jeune Samuel" },
      { reference: "1 Samuel 8", event: "Israël demande un Roi" },
      { reference: "1 Samuel 16", event: "Samuel oint David" }
    ],
    relatedCharacters: ["hannah", "eli", "saul", "david"],
    tags: ["Prophète", "Juge"]
  },
  {
    id: "esther",
    name: "Esther (Hadassa)",
    imageUrl: "/images/characters/esther.png",
    roles: ["Reine"],
    era: "5e Siècle av. J.-C.",
    keyLocations: ["Suse (Perse)"],
    shortSummary: "Une orpheline juive devenue reine de Perse qui a sauvé son peuple du génocide.",
    detailedBio: "Élevée par son cousin Mardochée, elle devint l'épouse du roi perse Assuérus (Xerxès). Lorsque Haman complota d'anéantir les Juifs, Esther risqua sa vie pour révéler le complot et sauver son peuple.",
    keyScriptures: [
      { reference: "Esther 2", event: "Esther choisie comme Reine" },
      { reference: "Esther 4", event: "L'Appel de Mardochée : 'Pour un temps comme celui-ci'" },
      { reference: "Esther 7", event: "Le complot de Haman révélé" }
    ],
    relatedCharacters: ["mordecai", "ahasuerus", "haman"],
    tags: ["Leader", "Autre"]
  },
  {
    id: "isaiah",
    name: "Ésaïe",
    imageUrl: "/images/characters/isaiah.png",
    roles: ["Prophète"],
    era: "8e Siècle av. J.-C.",
    keyLocations: ["Jérusalem", "Juda"],
    shortSummary: "L'un des plus grands prophètes de Juda dont les écrits contiennent de profondes prophéties concernant le Messie à venir.",
    detailedBio: "Avertissant Juda du jugement imminent en raison de leur dégradation morale, Ésaïe a également offert de sublimes promesses de restauration. Ses prophéties sur le 'Serviteur Souffrant' sont longuement citées dans le Nouveau Testament.",
    keyScriptures: [
      { reference: "Ésaïe 6", event: "La Vision de la Sainteté de Dieu par Ésaïe" },
      { reference: "Ésaïe 9", event: "Prophétie du Prince de la Paix" },
      { reference: "Ésaïe 53", event: "Le Serviteur Souffrant" }
    ],
    relatedCharacters: ["hezekiah", "ahaz"],
    tags: ["Prophète", "Auteur"]
  },
  {
    id: "jacob",
    name: "Jacob (Israël)",
    imageUrl: "/images/characters/jacob.png",
    roles: ["Patriarche"],
    era: "19e-18e Siècle av. J.-C.",
    keyLocations: ["Canaan", "Haran", "Égypte"],
    shortSummary: "Le fils d'Isaac dont les douze fils sont devenus les fondateurs des douze tribus d'Israël.",
    detailedBio: "Il a pris la bénédiction de son frère aîné Ésaü. Fuyant sa colère, il a travaillé 14 ans à Haran pour épouser les sœurs Léa et Rachel. Il a lutté avec Dieu, qui a changé son nom de Jacob ('trompeur') en Israël ('celui qui lutte avec Dieu').",
    keyScriptures: [
      { reference: "Genèse 27", event: "Jacob prend la bénédiction d'Ésaü" },
      { reference: "Genèse 28", event: "Le Rêve de l'Échelle de Jacob" },
      { reference: "Genèse 32", event: "La Lutte avec Dieu" }
    ],
    relatedCharacters: ["isaac", "esau", "rachel", "leah", "joseph_son_of_jacob"],
    tags: ["Patriarche"]
  },
  {
    id: "joshua",
    name: "Josué",
    imageUrl: "/images/characters/joshua.png",
    roles: ["Leader", "Commandant Militaire"],
    era: "13e Siècle av. J.-C.",
    keyLocations: ["Égypte", "Désert", "Jéricho", "Canaan"],
    shortSummary: "L'assistant et successeur de Moïse qui a dirigé les Israélites lors de la conquête de Canaan.",
    detailedBio: "Gespion envoyé en Canaan, Caleb et lui furent les seuls à faire confiance à Dieu. Après la mort de Moïse, Josué a mené les Israélites à travers le Jourdain, conquérant Jéricho et divisant la terre entre les tribus.",
    keyScriptures: [
      { reference: "Josué 1", event: "L'Ordre de Dieu: 'Fortifie-toi et prends courage'" },
      { reference: "Josué 3", event: "La Traversée du Jourdain" },
      { reference: "Josué 6", event: "La Chute de Jéricho" }
    ],
    relatedCharacters: ["moses", "caleb", "rahab"],
    tags: ["Leader", "Juge"]
  },
  {
    id: "stephen",
    name: "Étienne",
    imageUrl: "/images/characters/stephen.png",
    roles: ["Diacre", "Martyr"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Jérusalem"],
    shortSummary: "Le premier martyr chrétien, connu pour sa défense audacieuse de la foi devant le Sanhédrin.",
    detailedBio: "Choisi comme l'un des sept premiers diacres pour s'occuper des veuves, Étienne a été accusé de blasphème et lapidé à mort, sous les yeux d'un jeune homme nommé Saul (plus tard Paul).",
    keyScriptures: [
      { reference: "Actes 6", event: "Choisi comme diacre" },
      { reference: "Actes 7", event: "Discours et Martyre" }
    ],
    relatedCharacters: ["paul_apostle", "peter_apostle"],
    tags: ["Leader", "Autre"]
  },
  {
    id: "gideon",
    name: "Gédéon",
    imageUrl: "/images/characters/gideon.png",
    roles: ["Juge", "Guerrier"],
    era: "12e Siècle av. J.-C.",
    keyLocations: ["Ophra", "Vallée de Jizreel"],
    shortSummary: "Un juge réticent qui a délivré Israël des Madianites avec seulement 300 hommes.",
    detailedBio: "Appelé par un ange, Gédéon a demandé des signes (la toison) pour confirmer l'appel de Dieu. Dieu lui ordonna de réduire son armée à seulement 300 hommes, battant les Madianites en utilisant des trompettes et des cruches avec des torches.",
    keyScriptures: [
      { reference: "Juges 6", event: "L'Appel de Gédéon et la Toison" },
      { reference: "Juges 7", event: "Vaincre Madian avec 300 hommes" }
    ],
    relatedCharacters: [],
    tags: ["Juge", "Leader"]
  },
  {
    id: "nehemiah",
    name: "Néhémie",
    imageUrl: "/images/characters/nehemiah.png",
    roles: ["Gouverneur", "Bâtisseur"],
    era: "5e Siècle av. J.-C.",
    keyLocations: ["Suse", "Jérusalem"],
    shortSummary: "L'échanson du roi perse revenu à Jérusalem pour reconstruire ses murailles en ruines.",
    detailedBio: "Servant comme échanson du roi Artaxerxès, Néhémie a obtenu la permission de retourner à Jérusalem. Il a brillamment organisé le peuple et supervisé la reconstruction des murailles en seulement 52 jours.",
    keyScriptures: [
      { reference: "Néhémie 1", event: "La Prière de Néhémie pour Jérusalem" },
      { reference: "Néhémie 2", event: "L'Inspection des Murailles" },
      { reference: "Néhémie 6", event: "La Muraille Achevée" }
    ],
    relatedCharacters: ["ezra"],
    tags: ["Leader", "Autre"]
  },
  {
    id: "daniel",
    name: "Daniel",
    imageUrl: "/images/characters/daniel.png",
    roles: ["Prophète", "Homme d'État"],
    era: "6e Siècle av. J.-C.",
    keyLocations: ["Jérusalem", "Babylone"],
    shortSummary: "Jeune juif emmené captif à Babylone, devenu haut fonctionnaire tout en restant fidèle à Dieu.",
    detailedBio: "Exilé à Babylone, Daniel s'est distingué par son refus de manger la nourriture du roi. Capable d'interpréter les rêves, il a survécu à la fosse aux lions pour son refus de cesser de prier.",
    keyScriptures: [
      { reference: "Daniel 2", event: "Le Songe de la Statue de Nebucadnetsar" },
      { reference: "Daniel 5", event: "L'Écriture sur le Mur" },
      { reference: "Daniel 6", event: "Daniel dans la Fosse aux Lions" }
    ],
    relatedCharacters: ["shadrach", "meshach", "abednego"],
    tags: ["Prophète", "Leader"]
  },
  {
    id: "mary_magdalene",
    name: "Marie-Madeleine",
    imageUrl: "/images/characters/mary_magdalene.png",
    roles: ["Disciple"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Galilée", "Jérusalem"],
    shortSummary: "Un des premiers témoins de la résurrection de Jésus.",
    detailedBio: "Jésus a chassé sept démons de Marie, après quoi elle l'a suivi. Présente à la crucifixion et à l'enterrement, elle fut la première à découvrir le tombeau vide.",
    keyScriptures: [
      { reference: "Luc 8", event: "Guérie de Sept Démons" },
      { reference: "Jean 19", event: "Présent à la Crucifixion" },
      { reference: "Jean 20", event: "Rencontre du Christ Ressuscité" }
    ],
    relatedCharacters: ["jesus_christ", "peter_apostle", "mary"],
    tags: ["Disciple", "Autre"]
  },
  {
    id: "barnabas",
    name: "Barnabas",
    imageUrl: "/images/characters/barnabas.png",
    roles: ["Missionnaire", "Enseignant"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Chypre", "Antioche", "Jérusalem"],
    shortSummary: "Chef chrétien dont le nom signifie 'Fils d'Encouragement', connu pour avoir soutenu le jeune converti Paul.",
    detailedBio: "Lévite de Chypre connu pour sa générosité. Quand les apôtres avaient peur de Saul (Paul), Barnabas s'est porté garant de lui et a co-dirigé le premier grand voyage missionnaire.",
    keyScriptures: [
      { reference: "Actes 4", event: "Barnabas vend un champ pour l'Église" },
      { reference: "Actes 9", event: "Barnabas se porte garant de Saul" },
      { reference: "Actes 13", event: "Envoyé lors du premier voyage missionnaire" }
    ],
    relatedCharacters: ["paul_apostle", "john_mark"],
    tags: ["Leader", "Enseignant"]
  },
  {
    id: "samson",
    name: "Samson",
    imageUrl: "/images/characters/samson.png",
    roles: ["Juge", "Guerrier"],
    era: "12e Siècle av. J.-C.",
    keyLocations: ["Tsorea", "Thimna", "Gaza"],
    shortSummary: "Juge d'Israël si fort dont la puissance venait de son vœu de naziréen et de ses cheveux longs.",
    detailedBio: "Possédant une force surnaturelle contre les Philistins. Sa chute est venue par son attirance fatale pour Dalila.",
    keyScriptures: [
      { reference: "Juges 14", event: "Samson et le Lion" },
      { reference: "Juges 16", event: "Samson et Dalila" },
      { reference: "Juges 16", event: "La Mort de Samson" }
    ],
    relatedCharacters: ["delilah"],
    tags: ["Juge"]
  },
  {
    id: "luke",
    name: "Luc",
    imageUrl: "/images/characters/luke.png",
    roles: ["Médecin", "Historien", "Auteur"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Antioche", "Rome", "Divers (Voyages)"],
    shortSummary: "Médecin et compagnon de voyage de Paul qui a rédigé l'Évangile de Luc et les Actes des Apôtres.",
    detailedBio: "Chrétien païen et médecin, Luc a voyagé avec l'Apôtre Paul et est l'auteur du troisième Évangile.",
    keyScriptures: [
      { reference: "Luc 1", event: "Prologue adressé à Théophile" },
      { reference: "Actes 16", event: "Rejoint Paul à Troas" },
      { reference: "Colossiens 4", event: "Paul le qualifie de 'médecin bien-aimé'" }
    ],
    relatedCharacters: ["paul_apostle"],
    tags: ["Auteur", "Autre"]
  },
  {
    id: "jonathan",
    name: "Jonathan",
    imageUrl: "/images/characters/jonathan.png",
    roles: ["Prince", "Guerrier"],
    era: "11e Siècle av. J.-C.",
    keyLocations: ["Guibéa", "Mont Guilboa"],
    shortSummary: "Fils aîné du roi Saül, ami loyal de David.",
    detailedBio: "Chef militaire courageux. Sachant que David était oint pour le trône, Jonathan conclut une alliance d'amitié profonde avec David pour le protéger de la jalousie de Saül.",
    keyScriptures: [
      { reference: "1 Samuel 14", event: "L'Attaque audacieuse de Jonathan sur les Philistins" },
      { reference: "1 Samuel 18", event: "L'Alliance entre David et Jonathan" },
      { reference: "2 Samuel 1", event: "La Complainte de David sur Saül et Jonathan" }
    ],
    relatedCharacters: ["david", "saul"],
    tags: ["Leader", "Autre"]
  },
  {
    id: "timothy",
    name: "Timothée",
    imageUrl: "/images/characters/timothy.png",
    roles: ["Pasteur", "Missionnaire"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Lystre", "Éphèse"],
    shortSummary: "Jeune compagnon et protégé de l'Apôtre Paul, devenu pasteur de l'église d'Éphèse.",
    detailedBio: "Rejoignit Paul lors de son deuxième voyage missionnaire. Paul lui a adressé deux épîtres pastorales, l'appelant son 'véritable enfant dans la foi'.",
    keyScriptures: [
      { reference: "Actes 16", event: "Timothée rejoint Paul et Silas" },
      { reference: "1 Timothée 4", event: "L'Ordre de Paul : 'Que personne ne méprise ta jeunesse'" },
      { reference: "2 Timothée 1", event: "Paul loue Loïs et Eunice" }
    ],
    relatedCharacters: ["paul_apostle"],
    tags: ["Leader", "Enseignant"]
  },
  {
    id: "andrew_apostle",
    name: "André",
    imageUrl: "/images/characters/andrew.png",
    roles: ["Apôtre", "Pêcheur"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Bethsaïda", "Capharnaüm"],
    shortSummary: "Frère de Simon Pierre et le premier disciple appelé par Jésus.",
    detailedBio: "Initialement disciple de Jean le Baptiste, André a présenté son frère Simon (Pierre) à Jésus en déclarant : 'Nous avons trouvé le Messie'. Il est souvent décrit comme amenant des personnes à Jésus, y compris le garçon avec les pains et les poissons.",
    keyScriptures: [
      { reference: "Jean 1", event: "André amène Pierre à Jésus" },
      { reference: "Jean 6", event: "Trouve le garçon avec les pains et les poissons" }
    ],
    relatedCharacters: ["jesus_christ", "peter_apostle", "john_baptist"],
    tags: ["Apôtre"]
  },
  {
    id: "james_apostle_zebedee",
    name: "Jacques (fils de Zébédée)",
    imageUrl: "/images/characters/james_apostle_zebedee.png",
    roles: ["Apôtre", "Pêcheur", "Martyr"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Galilée", "Jérusalem"],
    shortSummary: "L'un des trois disciples les plus proches de Jésus et le premier apôtre martyr.",
    detailedBio: "Avec son frère Jean, Jésus les surnomma 'Boanerges' (Fils du tonnerre). Jacques faisait partie du cercle intime de Jésus, présent à la Transfiguration et à Gethsémani. Il fut exécuté par l'épée sous le roi Hérode Agrippa Ier.",
    keyScriptures: [
      { reference: "Marc 3", event: "Nommé Fils du tonnerre" },
      { reference: "Marc 9", event: "Présent à la Transfiguration" },
      { reference: "Actes 12", event: "Martyrisé par Hérode" }
    ],
    relatedCharacters: ["jesus_christ", "john_apostle", "peter_apostle"],
    tags: ["Apôtre", "Leader"]
  },
  {
    id: "philip_apostle",
    name: "Philippe",
    imageUrl: "/images/characters/philip_apostle.png",
    roles: ["Apôtre"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Bethsaïda"],
    shortSummary: "L'un des douze originaux, qui a amené Nathanaël (Barthélemy) à Jésus.",
    detailedBio: "De Bethsaïda (comme Pierre et André), Jésus a appelé directement Philippe en disant 'Suis-moi'. Philippe a ensuite trouvé Nathanaël et l'a invité à 'venir et voir' Jésus. Plus tard, il a célèbrement demandé à Jésus de 'nous montrer le Père'.",
    keyScriptures: [
      { reference: "Jean 1", event: "Philippe amène Nathanaël à Jésus" },
      { reference: "Jean 14", event: "Philippe demande à voir le Père" }
    ],
    relatedCharacters: ["jesus_christ", "bartholomew_apostle"],
    tags: ["Apôtre"]
  },
  {
    id: "bartholomew_apostle",
    name: "Barthélemy (Nathanaël)",
    imageUrl: "/images/characters/bartholomew_apostle.png",
    roles: ["Apôtre"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Cana"],
    shortSummary: "Un apôtre souvent identifié comme Nathanaël, que Jésus a décrit comme un 'Israélite en qui il n'y a point de fraude'.",
    detailedBio: "Quand Philippe lui a parlé de Jésus de Nazareth, Nathanaël a demandé : 'Peut-il venir de Nazareth quelque chose de bon ?' Cependant, en rencontrant Jésus, il L'a immédiatement reconnu comme le Fils de Dieu et le Roi d'Israël.",
    keyScriptures: [
      { reference: "Jean 1", event: "Jésus rencontre Nathanaël" }
    ],
    relatedCharacters: ["jesus_christ", "philip_apostle"],
    tags: ["Apôtre"]
  },
  {
    id: "thomas_apostle",
    name: "Thomas",
    imageUrl: "/images/characters/thomas_apostle.png",
    roles: ["Apôtre"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Galilée", "Jérusalem", "Tradition: Inde"],
    shortSummary: "Célèbre pour avoir exigé des preuves physiques de la Résurrection.",
    detailedBio: "Bien que connu pour ses doutes, Thomas était d'une loyauté féroce, exhortant un jour les disciples à aller avec Jésus en Judée 'afin que nous mourions avec lui'. Quand il a finalement vu le Christ ressuscité, il a prononcé la profonde confession : 'Mon Seigneur et mon Dieu !'",
    keyScriptures: [
      { reference: "Jean 11", event: "Allons aussi, afin de mourir avec lui" },
      { reference: "Jean 20", event: "Thomas doute, puis croit" }
    ],
    relatedCharacters: ["jesus_christ"],
    tags: ["Apôtre"]
  },
  {
    id: "matthew_apostle",
    name: "Matthieu (Lévi)",
    imageUrl: "/images/characters/matthew_apostle.png",
    roles: ["Apôtre", "Auteur", "Collecteur d'impôts"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Capharnaüm"],
    shortSummary: "Un collecteur d'impôts méprisé qui a tout quitté pour suivre Jésus et a écrit l'Évangile de Matthieu.",
    detailedBio: "Travaillant à un bureau de péage à Capharnaüm, Matthieu (aussi appelé Lévi) était haï par ses compatriotes juifs. Jésus l'a appelé, et Matthieu a immédiatement organisé un grand banquet pour Jésus avec d'autres collecteurs d'impôts, démontrant la grâce du Christ envers les marginaux.",
    keyScriptures: [
      { reference: "Matthieu 9", event: "L'Appel de Matthieu" },
      { reference: "Luc 5", event: "Lévi organise un banquet pour Jésus" }
    ],
    relatedCharacters: ["jesus_christ"],
    tags: ["Apôtre", "Auteur"]
  },
  {
    id: "james_apostle_alphaeus",
    name: "Jacques (fils d'Alphée)",
    imageUrl: "/images/characters/james_apostle_alphaeus.png",
    roles: ["Apôtre"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Galilée"],
    shortSummary: "L'un des douze apôtres, parfois appelé Jacques le Mineur.",
    detailedBio: "Très peu de choses sont enregistrées sur Jacques fils d'Alphée dans les Évangiles, au-delà de son inclusion dans les listes des douze apôtres. Il a fidèlement servi aux côtés des autres.",
    keyScriptures: [
      { reference: "Matthieu 10", event: "Listé parmi les Douze" }
    ],
    relatedCharacters: ["jesus_christ"],
    tags: ["Apôtre"]
  },
  {
    id: "thaddaeus_apostle",
    name: "Thaddée (Jude)",
    imageUrl: "/images/characters/thaddaeus_apostle.png",
    roles: ["Apôtre", "Auteur"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Galilée"],
    shortSummary: "Également connu sous le nom de Judas (non Iscariote) ou Lebbée ; un apôtre et probablement l'auteur de l'Épître de Jude.",
    detailedBio: "Pendant la Cène, il a demandé à Jésus pourquoi il avait l'intention de se révéler aux disciples et non au monde. La tradition soutient qu'il a prêché l'Évangile avec passion avant de mourir martyr.",
    keyScriptures: [
      { reference: "Jean 14", event: "Judas (non Iscariote) pose une question à Jésus" }
    ],
    relatedCharacters: ["jesus_christ"],
    tags: ["Apôtre", "Auteur"]
  },
  {
    id: "simon_zealot_apostle",
    name: "Simon le Zélote",
    imageUrl: "/images/characters/simon_zealot_apostle.png",
    roles: ["Apôtre"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Galilée"],
    shortSummary: "Un apôtre qui appartenait auparavant à une faction politique juive ardente.",
    detailedBio: "Avant de suivre Jésus, Simon était un Zélote — un groupe radical dédié au renversement violent de la domination romaine en Israël. Son inclusion parmi les disciples aux côtés de Matthieu (un collecteur d'impôts travaillant pour Rome) souligne le pouvoir unificateur du Christ.",
    keyScriptures: [
      { reference: "Luc 6", event: "Listé parmi les Douze" }
    ],
    relatedCharacters: ["jesus_christ", "matthew_apostle"],
    tags: ["Apôtre"]
  },
  {
    id: "judas_iscariot",
    name: "Judas Iscariote",
    imageUrl: "/images/characters/judas_iscariot.png",
    roles: ["Apôtre", "Traître"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Jérusalem"],
    shortSummary: "Le disciple qui a célèbrement trahi Jésus-Christ aux autorités religieuses pour trente pièces d'argent.",
    detailedBio: "Judas a servi comme trésorier pour les disciples mais volait souvent dans la bourse. Poussé par la cupidité et Satan, il a conduit les autorités à Jésus à Gethsémani, l'identifiant par un baiser. Rongé par les remords, il a tragiquement mis fin à ses jours.",
    keyScriptures: [
      { reference: "Matthieu 26", event: "Judas accepte de trahir Jésus" },
      { reference: "Luc 22", event: "La Trahison par un Baiser" },
      { reference: "Matthieu 27", event: "Remords et mort de Judas" }
    ],
    relatedCharacters: ["jesus_christ", "matthias_apostle"],
    tags: ["Apôtre"]
  },
  {
    id: "matthias_apostle",
    name: "Matthias",
    imageUrl: "/images/characters/matthias_apostle.png",
    roles: ["Apôtre"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Jérusalem"],
    shortSummary: "Le disciple choisi pour remplacer Judas Iscariote comme l'un des Douze Apôtres.",
    detailedBio: "Après l'ascension de Jésus, les croyants ont ressenti le besoin de remplacer Judas pour restaurer le nombre d'apôtres à douze. Matthias, qui avait été avec Jésus depuis son baptême, a été choisi par tirage au sort sous la direction de Pierre.",
    keyScriptures: [
      { reference: "Actes 1", event: "Matthias choisi pour remplacer Judas" }
    ],
    relatedCharacters: ["peter_apostle", "judas_iscariot"],
    tags: ["Apôtre"]
  },
  {
    id: "adam",
    name: "Adam",
    imageUrl: "/images/characters/adam.png",
    roles: ["Premier Homme", "Patriarche"],
    era: "Période Antédiluvienne",
    keyLocations: ["Jardin d'Éden"],
    shortSummary: "Le premier être humain créé par Dieu à partir de la poussière de la terre.",
    detailedBio: "Créé à l'image de Dieu, Adam a été placé dans le jardin d'Éden pour en prendre soin. Il a nommé les animaux et a reçu une compagne, Ève. Cependant, trompés par le serpent, ils ont désobéi à Dieu en mangeant de l'Arbre de la Connaissance du Bien et du Mal, ce qui a entraîné leur expulsion du jardin et l'introduction du péché dans le monde.",
    keyScriptures: [
      { reference: "Genèse 2", event: "La Création d'Adam" },
      { reference: "Genèse 3", event: "La Chute de l'Homme" }
    ],
    relatedCharacters: ["eve", "cain", "abel"],
    tags: ["Patriarche", "Autre"]
  },
  {
    id: "eve",
    name: "Ève",
    imageUrl: "/images/characters/eve.png",
    roles: ["Première Femme", "Matriarche"],
    era: "Période Antédiluvienne",
    keyLocations: ["Jardin d'Éden"],
    shortSummary: "La première femme, créée à partir de la côte d'Adam, et la 'mère de tous les vivants'.",
    detailedBio: "Créée par Dieu pour être une aide semblable et une compagne pour Adam. Elle fut la première à être trompée par le serpent et mangea le fruit défendu, l'offrant ensuite à Adam. Après la Chute, Dieu a déclaré qu'elle connaîtrait la douleur lors de l'accouchement, mais a célèbrement promis que sa descendance écraserait un jour la tête du serpent.",
    keyScriptures: [
      { reference: "Genèse 2", event: "La Création d'Ève" },
      { reference: "Genèse 3", event: "La Tromperie d'Ève" }
    ],
    relatedCharacters: ["adam", "cain", "abel"],
    tags: ["Matriarche", "Autre"]
  },
  {
    id: "cain",
    name: "Caïn",
    imageUrl: "/images/characters/cain.png",
    roles: ["Agriculteur", "Premier Meurtrier"],
    era: "Période Antédiluvienne",
    keyLocations: ["Est d'Éden", "Pays de Nod"],
    shortSummary: "Le premier-né d'Adam et Ève, qui a assassiné son frère Abel par jalousie.",
    detailedBio: "Un travailleur de la terre dont l'offrande à Dieu manquait de la foi et de la nature acceptable de l'offrande de son frère Abel. Submergé par la jalousie et la colère lorsque Dieu a favorisé le sacrifice d'Abel, Caïn a assassiné son frère dans un champ. En guise de punition, Dieu l'a exilé pour être un vagabond errant sur la terre.",
    keyScriptures: [
      { reference: "Genèse 4", event: "Le Premier Meurtre" }
    ],
    relatedCharacters: ["adam", "eve", "abel"],
    tags: ["Autre"]
  },
  {
    id: "abel",
    name: "Abel",
    imageUrl: "/images/characters/abel.png",
    roles: ["Berger"],
    era: "Période Antédiluvienne",
    keyLocations: ["Est d'Éden"],
    shortSummary: "Le deuxième fils juste d'Adam et Ève, célèbrement assassiné par son frère aîné Caïn.",
    detailedBio: "Un gardien de troupeaux qui a offert à Dieu les meilleures parties des premiers-nés de son troupeau. Parce qu'elle a été offerte avec foi, Dieu a regardé avec faveur Abel et son offrande. Tragiquement, sa justice a provoqué la jalousie de son frère Caïn, conduisant à son meurtre — devenant le premier humain à mourir.",
    keyScriptures: [
      { reference: "Genèse 4", event: "Un Sacrifice Agréable à Dieu" },
      { reference: "Hébreux 11", event: "Loué pour sa Foi" }
    ],
    relatedCharacters: ["adam", "eve", "cain"],
    tags: ["Autre"]
  },
  {
    id: "job",
    name: "Job",
    imageUrl: "/images/characters/job.png",
    roles: ["Patriarche"],
    era: "Période Patriarcale",
    keyLocations: ["Pays d'Uts"],
    shortSummary: "Un homme profondément juste qui a enduré des souffrances catastrophiques mais a refusé de maudire Dieu.",
    detailedBio: "Décrit comme irréprochable, droit, et extrêmement riche. Dieu a permis à Satan d'éprouver la foi de Job en le frappant dans ses enfants, sa richesse et sa santé. Malgré un chagrin accablant et les conseils inutiles de ses amis, Job a conservé son intégrité. Finalement, Dieu lui a répondu du milieu de la tempête et a restauré sa fortune au double.",
    keyScriptures: [
      { reference: "Job 1", event: "Satan éprouve Job" },
      { reference: "Job 38", event: "Dieu parle du milieu de la tempête" },
      { reference: "Job 42", event: "Les biens de Job sont restaurés" }
    ],
    relatedCharacters: [],
    tags: ["Patriarche", "Autre"]
  },
  {
    id: "elisha",
    name: "Élisée",
    imageUrl: "/images/characters/elisha.png",
    roles: ["Prophète"],
    era: "9e Siècle av. J.-C.",
    keyLocations: ["Royaume du Nord (Israël)", "Samarie"],
    shortSummary: "Le successeur dévoué du prophète Élie, connu pour avoir accompli deux fois plus de miracles.",
    detailedBio: "Appelé par Élie alors qu'il labourait un champ. Il a demandé une 'double portion' de l'esprit d'Élie avant que son maître ne soit enlevé au ciel. Le ministère d'Élisée s'est étendu sur plus de 50 ans et a inclus de nombreux miracles incroyables, tels que la guérison de la lèpre de Naaman, la multiplication de l'huile d'une veuve, et la résurrection du fils d'une Sunamite.",
    keyScriptures: [
      { reference: "1 Rois 19", event: "L'Appel d'Élisée" },
      { reference: "2 Rois 2", event: "Recevant le manteau d'Élie" },
      { reference: "2 Rois 5", event: "La Guérison de la lèpre de Naaman" }
    ],
    relatedCharacters: ["elijah", "ahab"],
    tags: ["Prophète"]
  },
  {
    id: "caleb",
    name: "Caleb",
    imageUrl: "/images/characters/caleb.png",
    roles: ["Espion", "Leader", "Guerrier"],
    era: "15e-14e Siècle av. J.-C.",
    keyLocations: ["Kadès-Barnéa", "Hébron"],
    shortSummary: "L'un des douze espions envoyés en Canaan, qui s'est distingué en faisant confiance à Dieu malgré des ennemis géants.",
    detailedBio: "Représentant de la tribu de Juda, Caleb et Josué ont été les deux seuls espions qui ont exhorté Israël à conquérir la Terre Promise, croyant que Dieu la leur livrerait. En raison de sa foi totale, Caleb a survécu aux 40 années d'errance dans le désert et a réclamé avec succès la région montagneuse d'Hébron à 85 ans.",
    keyScriptures: [
      { reference: "Nombres 13", event: "Exploration de Canaan en tant qu'espion" },
      { reference: "Nombres 14", event: "Caleb calme le peuple" },
      { reference: "Josué 14", event: "Réclame Hébron à 85 ans" }
    ],
    relatedCharacters: ["joshua", "moses"],
    tags: ["Leader"]
  },
  {
    id: "deborah",
    name: "Débora",
    imageUrl: "/images/characters/deborah.png",
    roles: ["Prophétesse", "Juge", "Chef Militaire"],
    era: "12e Siècle av. J.-C.",
    keyLocations: ["Mont Thabor", "Éphraïm"],
    shortSummary: "Une prophétesse sage et la seule femme juge d'Israël, qui a mené son peuple à d'une victoire militaire massive.",
    detailedBio: "Elle siégeait sous 'le palmier de Débora' en Éphraïm. Poussée par Dieu, elle ordonna au chef militaire Barak de marcher contre l'oppresseur cananéen Sisera. Elle monta célèbrement au combat avec Barak, et après leur étonnante victoire, composa 'Le Cantique de Débora', l'un des plus anciens poèmes de l'Écriture.",
    keyScriptures: [
      { reference: "Juges 4", event: "Débora commande Barak parfaitement" },
      { reference: "Juges 5", event: "Le Cantique de Débora" }
    ],
    relatedCharacters: [],
    tags: ["Prophète", "Juge", "Leader"]
  },
  {
    id: "saul",
    name: "Le Roi Saül",
    imageUrl: "/images/characters/saul.png",
    roles: ["Roi", "Guerrier"],
    era: "11e Siècle av. J.-C.",
    keyLocations: ["Guibéa", "Guilgal", "Mont Guilboa"],
    shortSummary: "Le grand et marquant premier roi d'un Israël uni, dont le règne tragique fut marqué par la désobéissance et la jalousie.",
    detailedBio: "Oint par Samuel sur l'ordre de Dieu lorsque les Israélites ont exigé un roi. Il a connu des succès militaires initiaux mais a usurpé à plusieurs reprises les fonctions sacerdotales et désobéi aux ordres clairs de Dieu (par exemple, épargnant le roi Agag). Dieu l'a rejeté comme roi, ce qui a conduit Saül à sombrer dans la folie et à poursuivre David de manière implacable et paranoïaque.",
    keyScriptures: [
      { reference: "1 Samuel 9", event: "Saül choisi comme Roi" },
      { reference: "1 Samuel 15", event: "Le Seigneur rejette Saül" },
      { reference: "1 Samuel 18", event: "La jalousie de Saül envers David commence" }
    ],
    relatedCharacters: ["samuel", "david", "jonathan"],
    tags: ["Roi"]
  },
  {
    id: "hezekiah",
    name: "Ézéchias",
    imageUrl: "/images/characters/hezekiah.png",
    roles: ["Roi"],
    era: "8e-7e Siècle av. J.-C.",
    keyLocations: ["Jérusalem"],
    shortSummary: "L'un des rois les plus fidèles de Juda qui a institué de profondes réformes religieuses et mis sa confiance en Dieu lors d'un siège assyrien.",
    detailedBio: "Contrairement à son méchant père Achaz, Ézéchias détruisit les sanctuaires d'idoles et purifia le Temple. Lorsque le puissant roi assyrien Sanchérib assiégea Jérusalem et se moqua de Dieu, Ézéchias pria avec ferveur. En réponse, Dieu envoya un ange pour décimer le camp assyrien. Plus tard, face à une maladie mortelle, Dieu lui accorda 15 années de vie supplémentaires.",
    keyScriptures: [
      { reference: "2 Rois 18", event: "Ézéchias détruit le serpent d'airain" },
      { reference: "2 Rois 19", event: "Délivrance de l'Assyrie" },
      { reference: "Ésaïe 38", event: "Maladie et guérison d'Ézéchias" }
    ],
    relatedCharacters: ["isaiah"],
    tags: ["Roi"]
  },
  {
    id: "josiah",
    name: "Josias",
    imageUrl: "/images/characters/josiah.png",
    roles: ["Roi"],
    era: "7e Siècle av. J.-C.",
    keyLocations: ["Jérusalem"],
    shortSummary: "Un roi juste de Juda qui est monté sur le trône à huit ans et a initié de profondes réformes religieuses.",
    detailedBio: "Pendant la réparation du Temple négligé, le Livre de la Loi a été redécouvert. En l'entendant lire, Josias déchira ses vêtements en signe de repentance. Il a éradiqué les autels d'adoration païens, réinstitué la Pâque, et a passionnément ramené la nation à Yahvé. Tragiquement, il mourut au combat en s'opposant au pharaon Néco d'Égypte.",
    keyScriptures: [
      { reference: "2 Rois 22", event: "Le Livre de la Loi retrouvé" },
      { reference: "2 Rois 23", event: "Les vastes réformes de Josias" }
    ],
    relatedCharacters: [],
    tags: ["Roi"]
  },
  {
    id: "miriam",
    name: "Miriam",
    imageUrl: "/images/characters/miriam.png",
    roles: ["Prophétesse", "Leader"],
    era: "15e-13e Siècle av. J.-C.",
    keyLocations: ["Égypte", "Désert", "Mer Rouge"],
    shortSummary: "La sœur de Moïse qui a joué un rôle clé dans l'Exode mais a lutté contre la jalousie envers son leadership.",
    detailedBio: "Jeune fille, elle s'est intelligemment arrangée pour que la propre mère de Moïse l'allaite après qu'il a été trouvé par la fille du Pharaon dans le Nil. Après la traversée de la mer Rouge, elle a conduit les femmes israélites dans une danse de victoire au tambourin. Plus tard, elle a été frappée de lèpre pour s'être rebellée contre l'autorité de Moïse, mais fut guérie après que Moïse a intercédé.",
    keyScriptures: [
      { reference: "Exode 2", event: "Veillant sur le bébé Moïse" },
      { reference: "Exode 15", event: "Le Cantique de Miriam" },
      { reference: "Nombres 12", event: "Miriam et Aaron s'opposent à Moïse" }
    ],
    relatedCharacters: ["moses", "aaron"],
    tags: ["Prophète", "Leader"]
  },
  {
    id: "martha",
    name: "Marthe",
    imageUrl: "/images/characters/martha.png",
    roles: ["Disciple", "Hôtesse"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Béthanie"],
    shortSummary: "Une disciple dévouée de Jésus, réputée pour son hospitalité et sa profonde confession de foi.",
    detailedBio: "Sœur de Marie et Lazare. Elle a fréquemment accueilli Jésus chez elle. Bien que célèbrement et doucement réprimandée par Jésus pour s'être trop laissée distraire par le service pendant que sa sœur Marie s'asseyait à Ses pieds, Marthe a plus tard fait preuve d'une foi incroyable avant que Lazare ne soit ressuscité, déclarant Jésus comme le Messie, le Fils de Dieu.",
    keyScriptures: [
      { reference: "Luc 10", event: "Marthe et Marie accueillent Jésus" },
      { reference: "Jean 11", event: "La confession de foi de Marthe: 'Tu es le Messie'" }
    ],
    relatedCharacters: ["jesus_christ", "mary_of_bethany", "lazarus"],
    tags: ["Disciple", "Autre"]
  },
  {
    id: "mary_of_bethany",
    name: "Marie de Béthanie",
    imageUrl: "/images/characters/mary_of_bethany.png",
    roles: ["Disciple"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Béthanie"],
    shortSummary: "Une disciple profondément dévouée de Jésus qui s'est célèbrement assise à Ses pieds et L'a oint d'un parfum onéreux.",
    detailedBio: "Sœur de Marthe et Lazare. Elle se caractérise par sa profonde dévotion à Jésus. Lors de Sa visite chez elles, elle a choisi la 'meilleure part' en s'asseyant à Ses pieds pour L'écouter plutôt que de servir. Peu avant Sa crucifixion, elle a versé un vase de nard incroyablement cher sur les pieds de Jésus, les essuyant avec ses cheveux.",
    keyScriptures: [
      { reference: "Luc 10", event: "Assise aux pieds de Jésus" },
      { reference: "Jean 12", event: "Oignant les pieds de Jésus avec du parfum" }
    ],
    relatedCharacters: ["jesus_christ", "martha", "lazarus"],
    tags: ["Disciple", "Autre"]
  },
  {
    id: "lazarus",
    name: "Lazare",
    imageUrl: "/images/characters/lazarus.png",
    roles: ["Disciple", "Ami de Jésus"],
    era: "1er Siècle ap. J.-C.",
    keyLocations: ["Béthanie"],
    shortSummary: "Un ami proche de Jésus que le Christ a miraculeusement ressuscité d'entre les morts après quatre jours.",
    detailedBio: "Frère de Marie et Marthe. Il est tombé gravement malade et est mort avant l'arrivée de Jésus. Jésus a pleuré devant son tombeau avant d'ordonner qu'on ôte la pierre et d'appeler 'Lazare, sors !' Le miracle fut si indéniable que de nombreux Juifs crurent en Jésus, poussant les principaux sacrificateurs à comploter pour tuer Jésus et Lazare.",
    keyScriptures: [
      { reference: "Jean 11", event: "Jésus ressuscite Lazare d'entre les morts" },
      { reference: "Jean 12", event: "Le complot pour tuer Lazare" }
    ],
    relatedCharacters: ["jesus_christ", "martha", "mary_of_bethany"],
    tags: ["Disciple", "Autre"]
  }
];
