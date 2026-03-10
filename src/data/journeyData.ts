export type LocationData = {
  name: string;
  modern: string;
  x: number;
  y: number;
};

export type TextSegment = { type: 'text'; content: string };

export type VerseSegment = {
  type: 'verse';
  label: string;
  reference: string;
  text: string;
  book: string;
  chapter: number;
};

export type Segment = TextSegment | VerseSegment;

export type StoryChapter = {
  id: string;
  number: number;
  title: string;
  period: string;
  age: string;
  location: LocationData;
  image: string;
  prophecy: { text: string; reference: string; fulfillment: string };
  harmony: string[];
  quickFacts: { label: string; value: string }[];
  intro: string;
  segments: Segment[];
  keyPeople: string[];
  pullQuote: { text: string; reference: string };
  deeper: { label: string; book: string; chapter: number }[];
};

export const LOC: Record<string, LocationData> = {
  bethlehem:  { name: 'Bethlehem',       modern: 'West Bank',              x: 48, y: 77 },
  nazareth:   { name: 'Nazareth',        modern: 'Northern Israel',        x: 44, y: 31 },
  jordan:     { name: 'Jordan River',    modern: 'Border of Israel/Jordan', x: 58, y: 48 },
  desert:     { name: 'Judean Desert',   modern: 'Southern Israel',        x: 52, y: 68 },
  galilee:    { name: 'Galilee Hills',   modern: 'Northern Israel',        x: 42, y: 22 },
  seaGalilee: { name: 'Sea of Galilee',  modern: 'Lake Kinneret',           x: 58, y: 27 },
  jerusalem:  { name: 'Jerusalem',       modern: 'Capital of Israel',      x: 48, y: 75 },
  golgotha:   { name: 'Golgotha',        modern: 'Old City Jerusalem',     x: 47.5, y: 74.5 },
  tomb:       { name: 'Garden Tomb',     modern: 'Jerusalem',              x: 47, y: 74 },
};

export const IMAGES = {
  map:        '/images/jesus/holy_land_map.png',
  ch1:        '/images/jesus/ch1.png',
  ch2:        '/images/jesus/ch2.png',
  ch3:        '/images/jesus/ch3.png',
  ch4:        '/images/jesus/ch4.png',
  ch5:        '/images/jesus/ch5.png',
  ch6:        '/images/jesus/ch6.png',
  ch7:        '/images/jesus/ch7.png',
  ch8:        '/images/jesus/ch8.png',
  ch9:        '/images/jesus/ch9.png',
};

const STORY_EN: StoryChapter[] = [
  {
    id: 'birth', number: 1,
    title: 'The Word Made Flesh', period: '~4 BC', age: 'Birth',
    location: LOC.bethlehem,
    image: IMAGES.ch1,
    prophecy: { text: 'The virgin will conceive and give birth to a son, and will call him Immanuel.', reference: 'Isaiah 7:14', fulfillment: 'Matthew 1:22–23' },
    harmony: ['Mt', 'Lk', 'Jn'],
    quickFacts: [
      { label: 'Primary Theme', value: 'Incarnation' },
      { label: 'Prophecy Met', value: 'Micah 5:2' }
    ],
    keyPeople: ['Mary', 'Joseph', 'The Magi', 'Shepherds'],
    pullQuote: { text: "The Word became flesh and made his dwelling among us. We have seen his glory.", reference: 'John 1:14' },
    deeper: [{ label: 'The Birth Narrative', book: 'Luke', chapter: 2 }],
    intro: 'Jesus does not begin in a manger — the story of the Christ begins in eternity, before the foundations of the world were laid.',
    segments: [
      { type: 'verse', label: 'In the beginning was the Word', reference: 'John 1:1', text: 'In the beginning was the Word, and the Word was with God, and the Word was God.', book: 'John', chapter: 1 },
      { type: 'text', content: ' — and this eternal Word entered his own creation. Born not in a palace, but in a humble stable in Bethlehem, Jesus entered time as a vulnerable infant. His arrival was marked by celestial signs and the worship of both lowly shepherds and wealthy scholars from the East, fulfilling centuries of Jewish anticipation.' },
    ],
  },
  {
    id: 'youth', number: 2,
    title: 'The Hidden Years', period: '~4 BC – AD 27', age: 'Ages 0–30',
    location: LOC.nazareth,
    image: IMAGES.ch2,
    prophecy: { text: 'Out of Egypt I called my son.', reference: 'Hosea 11:1', fulfillment: 'Matthew 2:15' },
    harmony: ['Mt', 'Lk'],
    quickFacts: [
      { label: 'Location', value: 'Nazareth' },
      { label: 'Occupation', value: 'Tekton (Artisan)' }
    ],
    keyPeople: ['Mary', 'Joseph', 'Temple Teachers'],
    pullQuote: { text: 'And Jesus grew in wisdom and stature, and in favor with God and man.', reference: 'Luke 2:52' },
    deeper: [{ label: 'Jesus at Age 12', book: 'Luke', chapter: 2 }],
    intro: 'He grew up in the obscurity of Galilee — a carpenter\'s son in a small town, living a life of perfect obedience while masked by the ordinary.',
    segments: [
      { type: 'text', content: 'For three decades, the King of the universe lived as a common laborer. He understood the sweat of the brow and the weight of human duty. Only once during this time do the scriptures pull back the veil: when a twelve-year-old Jesus stayed behind in Jerusalem to discuss the Law with the greatest minds of Israel. Even then, his priorities were clear: ' },
      { type: 'verse', label: '"Didn\'t you know I had to be in my Father\'s house?"', reference: 'Luke 2:49', text: '"Why were you searching for me? Didn\'t you know I had to be in my Father\'s house?"', book: 'Luke', chapter: 2 },
    ],
  },
  {
    id: 'baptism', number: 3,
    title: 'Baptism & Silence', period: '~AD 27', age: 'Age ~30',
    location: LOC.jordan,
    image: IMAGES.ch3,
    prophecy: { text: 'A voice of one calling in the wilderness: "Prepare the way for the Lord."', reference: 'Isaiah 40:3', fulfillment: 'Matthew 3:3' },
    harmony: ['Mt', 'Mk', 'Lk', 'Jn'],
    quickFacts: [
      { label: 'Event', value: 'John\'s Baptism' },
      { label: 'Key Symbols', value: 'Dove, Voice' }
    ],
    keyPeople: ['John the Baptist', 'The Holy Spirit'],
    pullQuote: { text: '"This is my Son, whom I love; with him I am well pleased."', reference: 'Matthew 3:17' },
    deeper: [{ label: 'The Baptism', book: 'Matthew', chapter: 3 }],
    intro: 'The long silence is broken by a cry in the wilderness. Jesus steps from the shadows of Nazareth to the waters of the Jordan.',
    segments: [
      { type: 'text', content: 'His public ministry began not with a sermon, but with an act of humility. As Jesus was baptized by John, a herald of repentance, the skies themselves confirmed his identity. Following this divine affirmation, Jesus was led by the Spirit into the Judean desert. There, in forty days of fasting and isolation, he faced the same adversary we face, yet he prevailed.' },
      { type: 'verse', label: 'the Holy Spirit descended like a dove', reference: 'Matthew 3:16', text: 'At that moment heaven was opened, and he saw the Spirit of God descending like a dove.', book: 'Matthew', chapter: 3 },
    ],
  },
  {
    id: 'calling', number: 4,
    title: 'The First Disciples', period: '~AD 28', age: 'Age ~30-31',
    location: LOC.seaGalilee,
    image: IMAGES.ch4,
    prophecy: { text: 'The people walking in darkness have seen a great light.', reference: 'Isaiah 9:2', fulfillment: 'Matthew 4:13–16' },
    harmony: ['Mt', 'Mk', 'Lk', 'Jn'],
    quickFacts: [
      { label: 'Region', value: 'Galilee' },
      { label: 'First Four', value: 'Fishermen' }
    ],
    keyPeople: ['Peter', 'Andrew', 'James', 'John'],
    pullQuote: { text: '"Come, follow me, and I will make you fishers of men."', reference: 'Matthew 4:19' },
    deeper: [{ label: 'The Call', book: 'Matthew', chapter: 4 }],
    intro: 'Jesus chose the unlikely to change the world. He walked the shores of Lake Kinneret, calling ordinary men to a supernatural task.',
    segments: [
      { type: 'text', content: 'His method was simple but life-altering: companionship. He did not call the elite or the religious authorities; he called fishermen and tax collectors. To Peter and Andrew, who were cast into their daily toil, he offered a new vocation. "Come, follow me," he said, and without hesitation, they left their nets and the life they knew for a journey they could not yet imagine.' },
      { type: 'verse', label: '"Come, follow me"', reference: 'Matthew 4:19', text: '"Come, follow me," Jesus said, "and I will send you out to fish for people."', book: 'Matthew', chapter: 4 },
    ],
  },
  {
    id: 'sermon', number: 5,
    title: 'The Sermon on the Mount', period: '~AD 28', age: 'Age ~31',
    location: LOC.galilee,
    image: IMAGES.ch5,
    prophecy: { text: 'The Spirit of the Sovereign Lord is on me, because the Lord has anointed me to proclaim good news to the poor.', reference: 'Isaiah 61:1', fulfillment: 'Luke 4:18–21' },
    harmony: ['Mt', 'Lk'],
    quickFacts: [
      { label: 'Primary Text', value: 'Matthew 5-7' },
      { label: 'Core Message', value: 'Upside-down Kingdom' }
    ],
    keyPeople: ['Large Crowds', 'The Twelve'],
    pullQuote: { text: '"Blessed are the pure in heart, for they will see God."', reference: 'Matthew 5:8' },
    deeper: [{ label: 'The Sermon', book: 'Matthew', chapter: 5 }],
    intro: 'Seated on a verdant hillside, Jesus spoke words that would dismantle centuries of religious pretense and reveal the heart of God.',
    segments: [
      { type: 'text', content: 'This was the manifesto of his kingdom. He redefined what it means to be blessed, moving beyond external ritual to internal transformation. He spoke of salt and light, of loving enemies, and of a Father who sees in secret. He concluded with a warning that continues to echo: those who hear these words and do not act upon them are building their lives on shifting sand.' },
      { type: 'verse', label: '"Our Father in heaven"', reference: 'Matthew 6:9', text: '"Our Father in heaven, hallowed be your name."', book: 'Matthew', chapter: 6 },
    ],
  },
  {
    id: 'miracles', number: 6,
    title: 'Signs & Wonders', period: '~AD 28-30', age: 'Ages 31-33',
    location: LOC.seaGalilee,
    image: IMAGES.ch6,
    prophecy: { text: 'Then the eyes of the blind will be opened and the ears of the deaf unstopped.', reference: 'Isaiah 35:5', fulfillment: 'Matthew 11:4–5' },
    harmony: ['Mt', 'Mk', 'Lk', 'Jn'],
    quickFacts: [
      { label: 'Total Recorded', value: '35+ Miracles' },
      { label: 'Greatest Sign', value: 'Lazarus' }
    ],
    keyPeople: ['Lazarus', 'Mary of Bethany', 'Thomas'],
    pullQuote: { text: '"Take courage! It is I. Don\'t be afraid."', reference: 'Matthew 14:27' },
    deeper: [{ label: 'Lazarus Raised', book: 'John', chapter: 11 }],
    intro: 'Miracles were not mere spectacles; they were signs that the King had arrived to reclaim and restore what was broken.',
    segments: [
      { type: 'text', content: 'During these years, Jesus traversed the region, demonstrating authority over nature, disease, and death itself. He walked on storm-tossed waters, multiplied loaves for thousands, and gave sight to the born blind. Yet his most profound sign occurred at Bethany, where he confronted the final enemy. Before a mourning crowd, he challenged the gravity of the grave: ' },
      { type: 'verse', label: '"Lazarus, come out!"', reference: 'John 11:43', text: 'Jesus called in a loud voice, "Lazarus, come out!"', book: 'John', chapter: 11 },
    ],
  },
  {
    id: 'supper', number: 7,
    title: 'The Last Supper', period: 'AD 30', age: 'Age 33',
    location: LOC.jerusalem,
    image: IMAGES.ch7,
    prophecy: { text: 'See, your king comes to you, righteous and victorious, lowly and riding on a donkey.', reference: 'Zechariah 9:9', fulfillment: 'Matthew 21:1–9' },
    harmony: ['Mt', 'Mk', 'Lk', 'Jn'],
    quickFacts: [
      { label: 'Last Command', value: 'Love one another' },
      { label: 'Symbolism', value: 'Passover fulfilled' }
    ],
    keyPeople: ['The Twelve', 'Judas'],
    pullQuote: { text: '"This is my body, given for you. Do this in remembrance of me."', reference: 'Luke 22:19' },
    deeper: [{ label: 'The Passion', book: 'Luke', chapter: 22 }],
    intro: 'The upper room in Jerusalem served as the setting for the final Passover meal — a night of deep intimacy and impending betrayal.',
    segments: [
      { type: 'text', content: 'In these final hours, Jesus washed his disciples\' feet, modelling the service that characterizes his kingdom. As they ate, he took traditional Passover elements and gave them a new, radical meaning. He spoke of a new covenant, sealed not with the blood of bulls, but with his own life. Even knowing the path ahead, he gave thanks and prepared his heart for Gethsemane.' },
      { type: 'verse', label: '"This cup is the new covenant"', reference: 'Luke 22:20', text: '"This cup is the new covenant in my blood, which is poured out for you."', book: 'Luke', chapter: 22 },
    ],
  },
  {
    id: 'cross', number: 8,
    title: 'The Cross', period: 'Friday AD 30', age: 'Age 33',
    location: LOC.golgotha,
    image: IMAGES.ch8,
    prophecy: { text: 'They pierced my hands and my feet. They divide my clothes among them.', reference: 'Psalm 22:16–18', fulfillment: 'John 19:23–24' },
    harmony: ['Mt', 'Mk', 'Lk', 'Jn'],
    quickFacts: [
      { label: 'Hour', value: 'Noon to 3 PM' },
      { label: 'Sacrifice', value: 'Atonement' }
    ],
    keyPeople: ['Pontius Pilate', 'Mary Magdalene', 'John'],
    pullQuote: { text: '"It is finished."', reference: 'John 19:30' },
    deeper: [{ label: 'The Crucifixion', book: 'John', chapter: 19 }],
    intro: 'Condemned by men but committed to the Father, Jesus took the weight of the world upon himself at Calvary.',
    segments: [
      { type: 'text', content: 'The crucifixion was the ultimate expression of divine love and justice meeting in a single point of time. Mocked, beaten, and forsaken, Jesus endured the cross for the joy set before him. Even in his agony, he offered forgiveness to his executioners and hope to the thief beside him. As the curtain of the Temple was torn from top to bottom, he uttered his final cry of triumph: ' },
      { type: 'verse', label: '"It is finished"', reference: 'John 19:30', text: '"It is finished." With that, he bowed his head and gave up his spirit.', book: 'John', chapter: 19 },
    ],
  },
  {
    id: 'resurrection', number: 9,
    title: 'The Resurrection', period: 'Sunday AD 30+', age: 'Beyond Time',
    location: LOC.tomb,
    image: IMAGES.ch9,
    prophecy: { text: 'For you will not abandon my soul to the grave, nor will you let your Holy One see decay.', reference: 'Psalm 16:10', fulfillment: 'Acts 2:24–28' },
    harmony: ['Mt', 'Mk', 'Lk', 'Jn'],
    quickFacts: [
      { label: 'Evidence', value: 'Empty Tomb' },
      { label: 'Mission', value: 'Great Commission' }
    ],
    keyPeople: ['Mary Magdalene', 'Peter', 'Thomas', 'The Disciples'],
    pullQuote: { text: '"I am the Resurrection and the Life. He who believes in me will live."', reference: 'John 11:25' },
    deeper: [{ label: 'The Empty Tomb', book: 'John', chapter: 20 }],
    intro: 'Death could not hold him. The stone was rolled away, not to let him out, but to show us that he was gone.',
    segments: [
      { type: 'text', content: 'Early on the first day of the week, the story took its most dramatic turn. The tomb was empty. Over the following forty days, Jesus appeared to hundreds of witnesses, proving his victory over death. He empowered his followers with a global mission and ascended to the right hand of the Father, where he reigns today, interceding for us and preparing a place for those who call him Lord.' },
      { type: 'verse', label: '"I am with you always"', reference: 'Matthew 28:20', text: '"And surely I am with you always, to the very end of the age."', book: 'Matthew', chapter: 28 },
    ],
  },
];

const STORY_FR: StoryChapter[] = [
  {
    ...STORY_EN[0],
    title: 'La Parole Faite Chair',
    age: 'Naissance',
    prophecy: { text: 'La vierge concevra, elle mettra au monde un fils et l\'appellera Emmanuel.', reference: 'Ésaïe 7:14', fulfillment: 'Matthieu 1:22–23' },
    quickFacts: [
      { label: 'Thème Principal', value: 'Incarnation' },
      { label: 'Prophétie Accomplie', value: 'Michée 5:2' }
    ],
    keyPeople: ['Marie', 'Joseph', 'Les Mages', 'Les Bergers'],
    pullQuote: { text: "La Parole a été faite chair, et elle a habité parmi nous, pleine de grâce et de vérité.", reference: 'Jean 1:14' },
    deeper: [{ label: 'Le Récit de la Naissance', book: 'Luc', chapter: 2 }],
    intro: 'Jésus ne commence pas dans une crèche — l\'histoire du Christ commence dans l\'éternité, avant la fondation du monde.',
    segments: [
      { type: 'verse', label: 'Au commencement était la Parole', reference: 'Jean 1:1', text: 'Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.', book: 'Jean', chapter: 1 },
      { type: 'text', content: ' — et cette Parole éternelle est entrée dans sa propre création. Né non dans un palais, mais dans une humble étable à Bethléem, Jésus est entré dans le temps en tant que nourrisson vulnérable. Son arrivée fut marquée par des signes célestes et l\'adoration de bergers et de savants de l\'Orient, accomplissant des siècles d\'anticipation.' },
    ],
  },
  {
    ...STORY_EN[1],
    title: 'Les Années Cachées',
    age: 'Âges 0–30',
    prophecy: { text: 'J\'ai appelé mon fils hors d\'Égypte.', reference: 'Osée 11:1', fulfillment: 'Matthieu 2:15' },
    quickFacts: [
      { label: 'Lieu', value: 'Nazareth' },
      { label: 'Profession', value: 'Charpentier' }
    ],
    keyPeople: ['Marie', 'Joseph', 'Les Docteurs du Temple'],
    pullQuote: { text: 'Et Jésus croissait en sagesse, en stature, et en grâce, devant Dieu et devant les hommes.', reference: 'Luc 2:52' },
    deeper: [{ label: 'Jésus à 12 Ans', book: 'Luc', chapter: 2 }],
    intro: 'Il a grandi dans l\'obscurité de la Galilée — fils d\'un charpentier d\'un petit village, vivant une vie de parfaite obéissance tout en étant masqué par l\'ordinaire.',
    segments: [
      { type: 'text', content: 'Pendant trois décennies, le Roi de l\'univers a vécu comme un simple ouvrier. Il a compris la sueur du front et le poids du devoir humain. Une seule fois pendant cette période, les Écritures soulèvent le voile : lorsqu\'un Jésus de douze ans est resté à Jérusalem pour discuter de la Loi avec les plus grands esprits d\'Israël.' },
      { type: 'verse', label: '"Ne saviez-vous pas qu\'il faut que je m\'occupe des affaires de mon Père?"', reference: 'Luc 2:49', text: '"Pourquoi me cherchiez-vous ? Ne saviez-vous pas qu\'il faut que je m\'occupe des affaires de mon Père?"', book: 'Luc', chapter: 2 },
    ],
  },
  {
    ...STORY_EN[2],
    title: 'Baptême & Désert',
    age: 'Âge ~30',
    prophecy: { text: 'Une voix crie dans le désert: "Préparez le chemin du Seigneur."', reference: 'Ésaïe 40:3', fulfillment: 'Matthieu 3:3' },
    quickFacts: [
      { label: 'Événement', value: 'Baptême de Jean' },
      { label: 'Symboles', value: 'Colombe, Voix céleste' }
    ],
    keyPeople: ['Jean-Baptiste', 'Le Saint-Esprit'],
    pullQuote: { text: '"Celui-ci est mon Fils bien-aimé, en qui j\'ai mis toute mon affection."', reference: 'Matthieu 3:17' },
    deeper: [{ label: 'Le Baptême', book: 'Matthieu', chapter: 3 }],
    intro: 'Le long silence est rompu par un cri dans le désert. Jésus sort de l\'ombre de Nazareth pour se rendre aux eaux du Jourdain.',
    segments: [
      { type: 'text', content: 'Son ministère public a commencé non par un sermon, mais par un acte d\'humilité. Alors que Jésus était baptisé par Jean, un héraut de la repentance, les cieux eux-mêmes ont confirmé son identité. Après cette affirmation divine, Jésus a été conduit par l\'Esprit dans le désert de Judée. Là, pendant quarante jours de jeûne et d\'isolement, il a affronté le même adversaire que nous, mais a prévalu.' },
      { type: 'verse', label: 'le Saint-Esprit est descendu comme une colombe', reference: 'Matthieu 3:16', text: 'À cet instant, les cieux s\'ouvrirent, et il vit l\'Esprit de Dieu descendre comme une colombe.', book: 'Matthieu', chapter: 3 },
    ],
  },
  {
    ...STORY_EN[3],
    title: 'Les Premiers Disciples',
    age: 'Âge ~30-31',
    prophecy: { text: 'Le peuple qui marchait dans les ténèbres a vu une grande lumière.', reference: 'Ésaïe 9:2', fulfillment: 'Matthieu 4:13–16' },
    quickFacts: [
      { label: 'Région', value: 'Galilée' },
      { label: 'Les Quatre Premiers', value: 'Des Pêcheurs' }
    ],
    keyPeople: ['Pierre', 'André', 'Jacques', 'Jean'],
    pullQuote: { text: '"Suivez-moi, et je vous ferai pêcheurs d\'hommes."', reference: 'Matthieu 4:19' },
    deeper: [{ label: 'L\'Appel', book: 'Matthieu', chapter: 4 }],
    intro: 'Jésus a choisi des hommes improbables pour changer le monde. Il a marché sur les rives de la mer de Galilée, appelant des hommes ordinaires à une mission surnaturelle.',
    segments: [
      { type: 'text', content: 'Sa méthode était simple mais bouleversante : la compagnie (l\'amitié). Il n\'a pas appelé l\'élite ou les autorités religieuses ; il a appelé des pêcheurs et des collecteurs d\'impôts. À Pierre et André, engagés dans leur labeur quotidien, il a offert une nouvelle vocation. "Suivez-moi," a-t-il dit, et sans hésitation, ils ont laissé leurs filets pour un voyage qu\'ils ne pouvaient pas encore imaginer.' },
      { type: 'verse', label: '"Suivez-moi"', reference: 'Matthieu 4:19', text: 'Il leur dit : "Suivez-moi, et je vous ferai pêcheurs d\'hommes."', book: 'Matthieu', chapter: 4 },
    ],
  },
  {
    ...STORY_EN[4],
    title: 'Le Sermon sur la Montagne',
    age: 'Âge ~31',
    prophecy: { text: 'L\'Esprit du Seigneur, l\'Éternel, est sur moi, car l\'Éternel m\'a oint pour porter de bonnes nouvelles aux malheureux.', reference: 'Ésaïe 61:1', fulfillment: 'Luc 4:18–21' },
    quickFacts: [
      { label: 'Texte Principal', value: 'Matthieu 5-7' },
      { label: 'Message Central', value: 'Le Royaume de Dieu' }
    ],
    keyPeople: ['Les Foules', 'Les Douze Disciples'],
    pullQuote: { text: '"Heureux ceux qui ont le cœur pur, car ils verront Dieu!"', reference: 'Matthieu 5:8' },
    deeper: [{ label: 'Le Sermon', book: 'Matthieu', chapter: 5 }],
    intro: 'Assis sur une colline verdoyante, Jésus a prononcé des mots qui allaient démanteler des siècles de prétention religieuse et révéler le cœur de Dieu.',
    segments: [
      { type: 'text', content: 'C\'était le manifeste de son royaume. Il a redéfini ce que signifie être béni, allant au-delà du rituel externe vers la transformation interne. Il a parlé du sel et de la lumière, d\'aimer ses ennemis et d\'un Père qui voit en secret. Il a conclu par un avertissement : ceux qui entendent ces mots et ne les mettent pas en pratique bâtissent leur vie sur du sable mouvant.' },
      { type: 'verse', label: '"Notre Père qui es aux cieux"', reference: 'Matthieu 6:9', text: 'Voici donc comment vous devez prier : "Notre Père qui es aux cieux! Que ton nom soit sanctifié..."', book: 'Matthieu', chapter: 6 },
    ],
  },
  {
    ...STORY_EN[5],
    title: 'Miracles et Signes',
    age: 'Âges 31-33',
    prophecy: { text: 'Alors s\'ouvriront les yeux des aveugles, s\'ouvriront les oreilles des sourds.', reference: 'Ésaïe 35:5', fulfillment: 'Matthieu 11:4–5' },
    quickFacts: [
      { label: 'Total Enregistré', value: '35+ Miracles' },
      { label: 'Le Plus Grand Signe', value: 'Lazare' }
    ],
    keyPeople: ['Lazare', 'Marie de Béthanie', 'Thomas'],
    pullQuote: { text: '"Rassurez-vous, c\'est moi; n\'ayez pas peur!"', reference: 'Matthieu 14:27' },
    deeper: [{ label: 'Résurrection de Lazare', book: 'Jean', chapter: 11 }],
    intro: 'Les miracles n\'étaient pas de simples spectacles ; c\'étaient des signes que le Roi était arrivé pour réclamer et restaurer ce qui était brisé.',
    segments: [
      { type: 'text', content: 'Durant ces années, Jésus a traversé la région, démontrant son autorité sur la nature, la maladie et la mort elle-même. Il a marché sur des eaux agitées par la tempête, multiplié des pains pour des milliers, et donné la vue à l\'aveugle-né. Son miracle le plus profond s\'est produit à Béthanie, où il a défié la mort face à une foule en deuil : ' },
      { type: 'verse', label: '"Lazare, sors!"', reference: 'Jean 11:43', text: 'Ayant dit cela, il cria d\'une voix forte : "Lazare, sors!"', book: 'Jean', chapter: 11 },
    ],
  },
  {
    ...STORY_EN[6],
    title: 'La Cène',
    age: 'Âge 33',
    prophecy: { text: 'Voici, ton roi vient à toi; Il est juste et victorieux, Il est humble et monté sur un âne.', reference: 'Zacharie 9:9', fulfillment: 'Matthieu 21:1–9' },
    quickFacts: [
      { label: 'Dernier Commandement', value: 'Aimez-vous les uns les autres' },
      { label: 'Symbolisme', value: 'La Pâque accomplie' }
    ],
    keyPeople: ['Les Douze', 'Judas'],
    pullQuote: { text: '"Ceci est mon corps, qui est donné pour vous; faites ceci en mémoire de moi."', reference: 'Luc 22:19' },
    deeper: [{ label: 'La Passion (Commencement)', book: 'Luc', chapter: 22 }],
    intro: 'La chambre haute à Jérusalem a servi de décor pour le dernier repas de la Pâque — une nuit d\'intimité profonde et de trahison imminente.',
    segments: [
      { type: 'text', content: 'Dans ces dernières heures, Jésus a lavé les pieds de ses disciples, modelant le service qui caractérise son royaume. Pendant le repas, il donna au pain et au vin une signification nouvelle et radicale. Il a parlé d\'une nouvelle alliance, scellée non par le sang des taureaux, mais par sa propre vie. Même connaissant le chemin à venir, il rendit grâces et prépara son cœur pour Gethsémané.' },
      { type: 'verse', label: '"Cette coupe est la nouvelle alliance"', reference: 'Luc 22:20', text: 'Il prit de même la coupe, après le souper, et la leur donna, en disant: "Cette coupe est la nouvelle alliance en mon sang, qui est répandu pour vous."', book: 'Luc', chapter: 22 },
    ],
  },
  {
    ...STORY_EN[7],
    title: 'La Croix',
    age: 'Âge 33',
    period: 'Vendredi, An ~30',
    prophecy: { text: 'Ils ont percé mes mains et mes pieds... Ils se partagent mes vêtements.', reference: 'Psaume 22:16–18', fulfillment: 'Jean 19:23–24' },
    quickFacts: [
      { label: 'Heure', value: 'Midi à 15h00' },
      { label: 'Sacrifice', value: 'Expiation' }
    ],
    keyPeople: ['Ponce Pilate', 'Marie de Magdala', 'Jean'],
    pullQuote: { text: '"Tout est accompli."', reference: 'Jean 19:30' },
    deeper: [{ label: 'La Crucifixion', book: 'Jean', chapter: 19 }],
    intro: 'Condamné par les hommes mais soumis au Père, Jésus a pris le poids du monde sur lui au Calvaire.',
    segments: [
      { type: 'text', content: 'La crucifixion fut l\'expression ultime de l\'amour et de la justice divines se rencontrant en un seul instant. Moqué, battu et abandonné, Jésus a enduré la croix. Même dans son agonie, il a offert le pardon à ses bourreaux. Alors que le voile du Temple se déchirait de haut en bas, il poussa son dernier cri de victoire : ' },
      { type: 'verse', label: '"Tout est accompli"', reference: 'Jean 19:30', text: 'Quand Jésus eut pris le vinaigre, il dit : "Tout est accompli." Et, baissant la tête, il rendit l\'esprit.', book: 'Jean', chapter: 19 },
    ],
  },
  {
    ...STORY_EN[8],
    title: 'La Résurrection',
    period: 'Dimanche, An ~30',
    age: 'Éternité',
    prophecy: { text: 'Car tu ne livreras pas mon âme au séjour des morts, tu ne permettras pas que ton bien-aimé voie la corruption.', reference: 'Psaume 16:10', fulfillment: 'Actes 2:24–28' },
    quickFacts: [
      { label: 'Preuve', value: 'Le Tombeau Vide' },
      { label: 'Mission', value: 'La Grande Commission' }
    ],
    keyPeople: ['Marie de Magdala', 'Pierre', 'Thomas', 'Les Disciples'],
    pullQuote: { text: '"Je suis la résurrection et la vie. Celui qui croit en moi vivra..."', reference: 'Jean 11:25' },
    deeper: [{ label: 'Le Tombeau Vide', book: 'Jean', chapter: 20 }],
    intro: 'La mort ne pouvait pas le retenir. La pierre a été roulée, non pour le laisser sortir, mais pour nous montrer qu\'il n\'était plus là.',
    segments: [
      { type: 'text', content: 'Tôt le premier jour de la semaine, l\'histoire a pris son tournant le plus radical. Le tombeau était vide. Pendant les quarante jours suivants, Jésus est apparu à des centaines de témoins, prouvant sa victoire sur la mort. Il a confié à ses disciples une mission mondiale avant de monter à la droite du Père, où il règne aujourd\'hui.' },
      { type: 'verse', label: '"Je suis avec vous tous les jours"', reference: 'Matthieu 28:20', text: '"Et voici, je suis avec vous tous les jours, jusqu\'à la fin du monde."', book: 'Matthieu', chapter: 28 },
    ],
  },
];

export function getJourneyStory(lang: 'en' | 'fr' | string): StoryChapter[] {
  return lang === 'fr' ? STORY_FR : STORY_EN;
}
