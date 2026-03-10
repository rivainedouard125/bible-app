export type EventCategory = 'creation' | 'covenant' | 'miracle' | 'battle' | 'prophecy' | 'general' | 'jesus';

export interface TimelineEvent {
  id: string;
  title: string;
  displayDate: string;
  sortValue: number; // Negative for BC, positive for AD
  era: string;
  category: EventCategory;
  description: string;
  scriptureLink: {
    bookName: string;
    chapter: number;
    verse?: number;
  };
  imageUrl?: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'creation',
    title: 'Creation of the World',
    displayDate: 'Beginning of Time',
    sortValue: -4000,
    era: 'The Beginning',
    category: 'creation',
    description: 'God creates the heavens, the earth, and all living things in six days.',
    scriptureLink: { bookName: 'Genesis', chapter: 1 },
  },
  {
    id: 'the-fall',
    title: 'The Fall of Humanity',
    displayDate: 'Beginning of Time',
    sortValue: -3900,
    era: 'The Beginning',
    category: 'general',
    description: 'Adam and Eve eat from the tree of the knowledge of good and evil.',
    scriptureLink: { bookName: 'Genesis', chapter: 3 },
  },
  {
    id: 'abraham-covenant',
    title: 'God\'s Covenant with Abraham',
    displayDate: 'c. 2100 BC',
    sortValue: -2100,
    era: 'The Patriarchs',
    category: 'covenant',
    description: 'God promises Abraham that he will be the father of a great nation.',
    scriptureLink: { bookName: 'Genesis', chapter: 12 },
  },
  {
    id: 'exodus-red-sea',
    title: 'Parting of the Red Sea',
    displayDate: 'c. 1446 BC',
    sortValue: -1446,
    era: 'Exodus & Wanderings',
    category: 'miracle',
    description: 'Moses parts the Red Sea, allowing the Israelites to escape from Egypt.',
    scriptureLink: { bookName: 'Exodus', chapter: 14 },
  },
  {
    id: 'ten-commandments',
    title: 'The Ten Commandments',
    displayDate: 'c. 1446 BC',
    sortValue: -1445,
    era: 'Exodus & Wanderings',
    category: 'covenant',
    description: 'God gives Moses the law on Mount Sinai.',
    scriptureLink: { bookName: 'Exodus', chapter: 20 },
  },
  {
    id: 'david-goliath',
    title: 'David Defeats Goliath',
    displayDate: 'c. 1025 BC',
    sortValue: -1025,
    era: 'The United Kingdom',
    category: 'battle',
    description: 'Young David defeats the Philistine giant Goliath with a sling and a stone.',
    scriptureLink: { bookName: '1 Samuel', chapter: 17 },
  },
  {
    id: 'solomon-temple',
    title: 'Solomon Builds the Temple',
    displayDate: 'c. 959 BC',
    sortValue: -959,
    era: 'The United Kingdom',
    category: 'general',
    description: 'King Solomon completes the first permanent temple in Jerusalem.',
    scriptureLink: { bookName: '1 Kings', chapter: 6 },
  },
  {
    id: 'elijah-carmel',
    title: 'Elijah on Mount Carmel',
    displayDate: 'c. 860 BC',
    sortValue: -860,
    era: 'The Divided Kingdom',
    category: 'miracle',
    description: 'God answers Elijah\'s prayer with fire, defeating the prophets of Baal.',
    scriptureLink: { bookName: '1 Kings', chapter: 18 },
  },
  {
    id: 'babylonian-exile',
    title: 'The Fall of Jerusalem',
    displayDate: '586 BC',
    sortValue: -586,
    era: 'Exile & Return',
    category: 'battle',
    description: 'Babylon destroys Jerusalem and the Temple, leading to the exile.',
    scriptureLink: { bookName: '2 Kings', chapter: 25 },
  },
  {
    id: 'daniel-lions-den',
    title: 'Daniel in the Lions\' Den',
    displayDate: 'c. 539 BC',
    sortValue: -539,
    era: 'Exile & Return',
    category: 'miracle',
    description: 'God protects Daniel from lions after he is thrown into their den for praying.',
    scriptureLink: { bookName: 'Daniel', chapter: 6 },
  },
  {
    id: 'jesus-birth',
    title: 'Birth of Jesus',
    displayDate: 'c. 4 BC',
    sortValue: -4,
    era: 'The Gospels',
    category: 'jesus',
    description: 'Jesus Christ is born in Bethlehem.',
    scriptureLink: { bookName: 'Luke', chapter: 2 },
  },
  {
    id: 'jesus-baptism',
    title: 'Baptism of Jesus',
    displayDate: 'c. 26 AD',
    sortValue: 26,
    era: 'The Gospels',
    category: 'jesus',
    description: 'Jesus is baptized by John the Baptist.',
    scriptureLink: { bookName: 'Matthew', chapter: 3 },
  },
  {
    id: 'sermon-on-mount',
    title: 'The Sermon on the Mount',
    displayDate: 'c. 28 AD',
    sortValue: 28,
    era: 'The Gospels',
    category: 'jesus',
    description: 'Jesus delivers his most famous sermon, including the Beatitudes.',
    scriptureLink: { bookName: 'Matthew', chapter: 5 },
  },
  {
    id: 'jesus-crucifixion',
    title: 'Crucifixion and Death',
    displayDate: 'c. 30 AD',
    sortValue: 30,
    era: 'The Gospels',
    category: 'jesus',
    description: 'Jesus is crucified at Golgotha.',
    scriptureLink: { bookName: 'Matthew', chapter: 27 },
  },
  {
    id: 'jesus-resurrection',
    title: 'The Resurrection',
    displayDate: 'c. 30 AD',
    sortValue: 31,
    era: 'The Gospels',
    category: 'miracle', // Also jesus, but let's highlight miracle
    description: 'Jesus rises from the dead on the third day.',
    scriptureLink: { bookName: 'Matthew', chapter: 28 },
  },
  {
    id: 'pentecost',
    title: 'Pentecost',
    displayDate: 'c. 30 AD',
    sortValue: 32,
    era: 'The Early Church',
    category: 'miracle',
    description: 'The Holy Spirit descends upon the apostles.',
    scriptureLink: { bookName: 'Acts', chapter: 2 },
  },
  {
    id: 'paul-conversion',
    title: 'Conversion of Saul (Paul)',
    displayDate: 'c. 33 AD',
    sortValue: 33,
    era: 'The Early Church',
    category: 'miracle',
    description: 'Saul encounters the risen Christ on the road to Damascus.',
    scriptureLink: { bookName: 'Acts', chapter: 9 },
  },
  {
    id: 'john-revelation',
    title: 'John\'s Vision on Patmos',
    displayDate: 'c. 95 AD',
    sortValue: 95,
    era: 'The Early Church',
    category: 'prophecy',
    description: 'John receives the Revelation of Jesus Christ.',
    scriptureLink: { bookName: 'Revelation', chapter: 1 },
  }
];
