export interface BiblicalCharacter {
  id: string;
  name: string;
  roles: string[];
  era: string;
  keyLocations: string[];
  shortSummary: string;
  detailedBio: string;
  keyScriptures: { reference: string; event: string }[];
  relatedCharacters: string[]; // Links to other character IDs
  tags: string[];
  imageUrl?: string;
}

export const CHARACTERS: BiblicalCharacter[] = [
  {
    id: "jesus_christ",
    name: "Jesus Christ",
    imageUrl: "/images/characters/jesus_christ.png", // already there
    roles: ["Messiah", "Son of God", "Teacher"], // fixed roles? no, I'll just check Sarah
    era: "1st Century AD",
    keyLocations: ["Bethlehem", "Nazareth", "Jerusalem", "Sea of Galilee"],
    shortSummary: "The central figure of Christianity, whom the teachings of most Christian denominations hold to be the Son of God.",
    detailedBio: "Born in Bethlehem to Mary, Jesus of Nazareth is the founder of Christianity. The Gospels describe his miraculous birth, his teachings, his miracles, and his ultimate crucifixion under Pontius Pilate, followed by his resurrection. His life and teachings form the basis of the New Testament.",
    keyScriptures: [
      { reference: "Matthew 5", event: "The Sermon on the Mount" },
      { reference: "Luke 2", event: "The Birth of Jesus" },
      { reference: "John 3", event: "Conversation with Nicodemus" },
      { reference: "Mark 16", event: "The Resurrection" }
    ],
    relatedCharacters: ["mary", "peter_apostle", "john_apostle", "paul_apostle", "john_baptist"],
    tags: ["Leader", "Teacher"]
  },
  {
    id: "moses",
    name: "Moses",
    imageUrl: "/images/characters/moses.png",
    roles: ["Prophet", "Lawgiver", "Leader"],
    era: "15th-13th Century BC",
    keyLocations: ["Egypt", "Midian", "Mount Sinai", "Moab"],
    shortSummary: "The most important prophet in Judaism, who led the Israelites out of Egyptian slavery and received the Torah.",
    detailedBio: "Born an Israelite but raised as an Egyptian prince, Moses fled to Midian after killing an abusive taskmaster. God called to him from a burning bush, sending him back to Egypt to demand the release of the Israelites. He led the Exodus, parted the Red Sea, and received the Ten Commandments on Mount Sinai.",
    keyScriptures: [
      { reference: "Exodus 3", event: "The Burning Bush" },
      { reference: "Exodus 14", event: "Crossing the Red Sea" },
      { reference: "Exodus 20", event: "The Ten Commandments" }
    ],
    relatedCharacters: ["aaron", "miriam", "joshua", "pharaoh"],
    tags: ["Prophet", "Leader"]
  },
  {
    id: "abraham",
    name: "Abraham",
    imageUrl: "/images/characters/abraham.png",
    roles: ["Patriarch"],
    era: "20th-18th Century BC",
    keyLocations: ["Ur", "Haran", "Canaan", "Egypt"],
    shortSummary: "The common patriarch of the Abrahamic religions: Judaism, Christianity, and Islam.",
    detailedBio: "Originally called Abram, he was called by God to leave his home in Ur and journey to a new land (Canaan) which God promised to give to his descendants. God made a covenant with him, promising him descendants as numerous as the stars, despite his wife Sarah's advanced age.",
    keyScriptures: [
      { reference: "Genesis 12", event: "The Call of Abram" },
      { reference: "Genesis 15", event: "God's Covenant with Abram" },
      { reference: "Genesis 22", event: "The Binding of Isaac" }
    ],
    relatedCharacters: ["sarah", "isaac", "ishmael", "lot"],
    tags: ["Patriarch"]
  },
  {
    id: "david",
    name: "David",
    imageUrl: "/images/characters/david.png",
    roles: ["King", "Warrior", "Musician"],
    era: "10th Century BC",
    keyLocations: ["Bethlehem", "Jerusalem", "Hebron"],
    shortSummary: "The second king of the united Kingdom of Israel and Judah, known for killing Goliath and writing many Psalms.",
    detailedBio: "A young shepherd from Bethlehem, David defeated the Philistine giant Goliath with a sling and stone. He became the greatest king of Israel, uniting the tribes and establishing Jerusalem as his capital. Though flawed—most notably in his affair with Bathsheba—he was described as a man after God's own heart.",
    keyScriptures: [
      { reference: "1 Samuel 17", event: "David and Goliath" },
      { reference: "2 Samuel 11", event: "David and Bathsheba" },
      { reference: "Psalm 23", event: "The Lord is My Shepherd" }
    ],
    relatedCharacters: ["saul", "jonathan", "bathsheba", "solomon", "samuel"],
    tags: ["King"]
  },
  {
    id: "paul_apostle",
    name: "Paul the Apostle",
    imageUrl: "/images/characters/paul.png",
    roles: ["Apostle", "Missionary", "Theologian"],
    era: "1st Century AD",
    keyLocations: ["Tarsus", "Jerusalem", "Antioch", "Rome", "Corinth"],
    shortSummary: "A Jewish Pharisee who converted to Christianity and became its most important early missionary.",
    detailedBio: "Originally named Saul of Tarsus, he vigorously persecuted the early Christian church. While traveling to Damascus, he experienced a dramatic vision of the resurrected Jesus, leading to his conversion. He went on three major missionary journeys, establishing churches across the Mediterranean, and authored much of the New Testament.",
    keyScriptures: [
      { reference: "Acts 9", event: "Conversion on the Road to Damascus" },
      { reference: "Acts 17", event: "Preaching in Athens" },
      { reference: "Romans 8", event: "Life in the Spirit" }
    ],
    relatedCharacters: ["jesus_christ", "peter_apostle", "barnabas", "timothy", "luke"],
    tags: ["Apostle", "Leader", "Author"]
  },
  {
    id: "peter_apostle",
    name: "Simon Peter",
    imageUrl: "/images/characters/peter.png",
    roles: ["Apostle", "Fisherman", "Leader"],
    era: "1st Century AD",
    keyLocations: ["Bethsaida", "Capernaum", "Jerusalem", "Rome"],
    shortSummary: "One of the Twelve Apostles of Jesus, often acting as their spokesperson, and an early leader of the Christian church.",
    detailedBio: "A fisherman on the Sea of Galilee, Peter (originally Simon) was called by Jesus to be a 'fisher of men'. He was known for his impulsiveness—walking on water but sinking, declaring Jesus as the Messiah, yet denying him three times before the crucifixion. He was restored by Jesus and became a pillar of the early church.",
    keyScriptures: [
      { reference: "Matthew 16", event: "Peter's Confession of Christ" },
      { reference: "Matthew 26", event: "Peter Denies Jesus" },
      { reference: "Acts 2", event: "Peter's Sermon at Pentecost" }
    ],
    relatedCharacters: ["jesus_christ", "andrew", "james_apostle", "john_apostle", "paul_apostle"],
    tags: ["Apostle", "Leader"]
  },
  {
    id: "mary",
    name: "Mary, Mother of Jesus",
    imageUrl: "/images/characters/mary.png",
    roles: ["Mother"],
    era: "1st Century BC - 1st Century AD",
    keyLocations: ["Nazareth", "Bethlehem", "Jerusalem", "Egypt"],
    shortSummary: "The mother of Jesus, who miraculously conceived him by the Holy Spirit.",
    detailedBio: "A young Jewish woman in Nazareth who was engaged to Joseph. The angel Gabriel announced to her that she would conceive a son by the Holy Spirit. She gave birth to Jesus in Bethlehem, raised him in Nazareth, and was present at his crucifixion. She is highly revered across many Christian traditions.",
    keyScriptures: [
      { reference: "Luke 1", event: "The Annunciation" },
      { reference: "Luke 2", event: "The Birth of Jesus" },
      { reference: "John 19", event: "At the foot of the Cross" }
    ],
    relatedCharacters: ["jesus_christ", "joseph_husband", "john_baptist", "elizabeth"],
    tags: ["Matriarch", "Other"]
  },
  {
    id: "john_apostle",
    name: "John the Apostle",
    imageUrl: "/images/characters/john_apostle.png",
    roles: ["Apostle", "Author"],
    era: "1st Century AD",
    keyLocations: ["Galilee", "Jerusalem", "Ephesus", "Patmos"],
    shortSummary: "Known as the 'disciple whom Jesus loved,' an apostle and author of a Gospel, Epistles, and Revelation.",
    detailedBio: "The brother of James, John was one of the inner circle of Jesus' disciples. He was present at the Transfiguration and the crucifixion. He outlived the other apostles, spending his later years in Ephesus and enduring exile on the island of Patmos, where he received the visions recorded in the Book of Revelation.",
    keyScriptures: [
      { reference: "John 1", event: "The Word Became Flesh (Prologue)" },
      { reference: "John 19", event: "Jesus entrusts Mary to John" },
      { reference: "Revelation 1", event: "John's Vision on Patmos" }
    ],
    relatedCharacters: ["jesus_christ", "james_apostle", "peter_apostle", "mary"],
    tags: ["Apostle", "Author"]
  },
  {
    id: "elijah",
    name: "Elijah",
    imageUrl: "/images/characters/elijah.png",
    roles: ["Prophet"],
    era: "9th Century BC",
    keyLocations: ["Northern Kingdom (Israel)", "Mt. Carmel", "Mt. Horeb"],
    shortSummary: "A powerful prophet in the northern kingdom of Israel who defended the worship of Yahweh over the Canaanite deity Baal.",
    detailedBio: "During the reign of King Ahab and Queen Jezebel, Elijah called a drought upon the land and dramatically proved Yahweh's supremacy on Mount Carmel when God sent fire from heaven. He did not die naturally but was taken up to heaven in a whirlwind by chariots of fire.",
    keyScriptures: [
      { reference: "1 Kings 18", event: "Elijah on Mount Carmel" },
      { reference: "1 Kings 19", event: "The Still Small Voice" },
      { reference: "2 Kings 2", event: "Elijah Taken up to Heaven" }
    ],
    relatedCharacters: ["ahab", "jezebel", "elisha"],
    tags: ["Prophet"]
  },
  {
    id: "solomon",
    name: "Solomon",
    imageUrl: "/images/characters/solomon.png",
    roles: ["King", "Author"],
    era: "10th Century BC",
    keyLocations: ["Jerusalem"],
    shortSummary: "The son of David and third king of Israel, renowned for his immense wisdom, wealth, and building the First Temple.",
    detailedBio: "When God offered him anything, Solomon asked for wisdom to govern his people. His wisdom became legendary. He built the magnificent First Temple in Jerusalem. However, his many foreign wives led his heart away from God toward idolatry in his later years, leading to the division of the kingdom after his death.",
    keyScriptures: [
      { reference: "1 Kings 3", event: "Solomon Asks for Wisdom" },
      { reference: "1 Kings 6", event: "Building the Temple" },
      { reference: "1 Kings 10", event: "The Queen of Sheba Visits" }
    ],
    relatedCharacters: ["david", "bathsheba", "queen_of_sheba", "rehoboam"],
    tags: ["King"]
  },
  {
    id: "noah",
    name: "Noah",
    imageUrl: "/images/characters/noah.png",
    roles: ["Patriarch"],
    era: "Antediluvian Period",
    keyLocations: ["Mesopotamia", "Mount Ararat"],
    shortSummary: "The righteous man chosen by God to survive the great flood by building an ark.",
    detailedBio: "When the earth was filled with violence, God decided to send a flood. Noah, an honorable man, was instructed to build a massive ark to save his family and male/female pairs of all animals. After the flood, God made a covenant with Noah, symbolized by the rainbow, never to destroy the earth by water again.",
    keyScriptures: [
      { reference: "Genesis 6", event: "God Instructs Noah to Build the Ark" },
      { reference: "Genesis 8", event: "The Flood Subsides" },
      { reference: "Genesis 9", event: "God's Covenant and the Rainbow" }
    ],
    relatedCharacters: ["shem", "ham", "japheth"],
    tags: ["Patriarch"]
  },
  {
    id: "sarah",
    name: "Sarah",
    imageUrl: "/images/characters/sarah.png",
    roles: ["Matriarch"],
    era: "20th-18th Century BC",
    keyLocations: ["Ur", "Canaan", "Egypt"],
    shortSummary: "The wife of Abraham and the mother of Isaac, miraculously giving birth in her old age.",
    detailedBio: "Originally named Sarai, she journeyed with Abraham from Ur. Being barren into old age, she initially sought a child through her servant Hagar (who bore Ishmael). However, God promised Sarah would have a son herself. At age 90, she gave birth to Isaac, fulfilling the promise of a great nation.",
    keyScriptures: [
      { reference: "Genesis 12", event: "Journey to Egypt" },
      { reference: "Genesis 18", event: "The Three Visitors Promise a Son" },
      { reference: "Genesis 21", event: "The Birth of Isaac" }
    ],
    relatedCharacters: ["abraham", "isaac", "hagar", "ishmael"],
    tags: ["Matriarch"]
  },
  {
    id: "joseph_son_of_jacob",
    name: "Joseph",
    imageUrl: "/images/characters/joseph_son_of_jacob.png",
    roles: ["Ruler", "Dream Interpreter"],
    era: "19th-17th Century BC",
    keyLocations: ["Canaan", "Egypt"],
    shortSummary: "Favored son of Jacob who was sold into slavery by his brothers but rose to become the second most powerful man in Egypt.",
    detailedBio: "Jacob's favorite son, gifted with an ornate robe and prophetic dreams. His jealous brothers sold him into slavery in Egypt. After enduring false imprisonment, his ability to interpret Pharaoh's dreams led to his elevation as vizier, where he saved Egypt and his reunited family from a severe famine.",
    keyScriptures: [
      { reference: "Genesis 37", event: "Joseph Sold by His Brothers" },
      { reference: "Genesis 41", event: "Joseph Interprets Pharaoh's Dreams" },
      { reference: "Genesis 45", event: "Joseph Reveals His Identity" }
    ],
    relatedCharacters: ["jacob", "benjamin", "judah", "pharaoh"],
    tags: ["Leader", "Patriarch"]
  },
  {
    id: "ruth",
    name: "Ruth",
    imageUrl: "/images/characters/ruth.png",
    roles: ["Ancestor of David"],
    era: "12th Century BC (Time of the Judges)",
    keyLocations: ["Moab", "Bethlehem"],
    shortSummary: "A Moabite woman whose loyalty to her Israelite mother-in-law, Naomi, led her to become the great-grandmother of King David.",
    detailedBio: "After her husband died, Ruth, a Moabite, chose to stay with her Israelite mother-in-law Naomi, saying, 'Your people will be my people and your God my God.' They returned to Bethlehem, where Ruth gleaned barley in the fields of Boaz, who eventually married her as a kinsman-redeemer.",
    keyScriptures: [
      { reference: "Ruth 1", event: "Ruth's Loyalty to Naomi" },
      { reference: "Ruth 2", event: "Ruth Meets Boaz" },
      { reference: "Ruth 4", event: "Boaz Marries Ruth" }
    ],
    relatedCharacters: ["naomi", "boaz", "david"],
    tags: ["Matriarch"]
  },
  {
    id: "john_baptist",
    name: "John the Baptist",
    imageUrl: "/images/characters/john_baptist.png",
    roles: ["Prophet", "Forerunner"],
    era: "1st Century BC - 1st Century AD",
    keyLocations: ["Judean Wilderness", "Jordan River"],
    shortSummary: "A prophet who preached repentance and baptized people in the Jordan River, preparing the way for Jesus.",
    detailedBio: "The son of Zechariah and Elizabeth (a relative of Mary). He lived an ascetic lifestyle in the wilderness, fulfilling prophecies of a messenger heralding the Messiah. He baptized Jesus in the Jordan River but was later imprisoned and beheaded by Herod Antipas.",
    keyScriptures: [
      { reference: "Luke 3", event: "John's Preaching of Repentance" },
      { reference: "Matthew 3", event: "The Baptism of Jesus" },
      { reference: "Mark 6", event: "The Death of John the Baptist" }
    ],
    relatedCharacters: ["jesus_christ", "elizabeth", "mary", "herod_antipas"],
    tags: ["Prophet"]
  },
  {
    id: "samuel",
    name: "Samuel",
    imageUrl: "/images/characters/samuel.png",
    roles: ["Prophet", "Judge"],
    era: "11th Century BC",
    keyLocations: ["Shiloh", "Ramah", "Mizpah"],
    shortSummary: "The last of the Israelite judges and the first of the major prophets who anointed Israel's first two kings.",
    detailedBio: "Dedicated to the Lord by his mother Hannah, Samuel grew up under the priest Eli. He judged Israel for years and, when the people demanded a king, he reluctantly anointed Saul as the first king. Later, when Saul disobeyed God, Samuel was directed to anoint a young David as the future king.",
    keyScriptures: [
      { reference: "1 Samuel 3", event: "God Calls the Boy Samuel" },
      { reference: "1 Samuel 8", event: "Israel Asks for a King" },
      { reference: "1 Samuel 16", event: "Samuel Anoints David" }
    ],
    relatedCharacters: ["hannah", "eli", "saul", "david"],
    tags: ["Prophet", "Judge"]
  },
  {
    id: "esther",
    name: "Esther (Hadassah)",
    imageUrl: "/images/characters/esther.png",
    roles: ["Queen"],
    era: "5th Century BC",
    keyLocations: ["Susa (Persia)"],
    shortSummary: "A Jewish orphan who became Queen of Persia and saved her people from genocide.",
    detailedBio: "Raised by her cousin Mordecai, she was chosen for her beauty to become the bride of the Persian King Ahasuerus (Xerxes). When the king's vizier, Haman, plotted to annihilate the Jewish population, Esther risked her life by approaching the king unsummoned to expose the plot and save her people.",
    keyScriptures: [
      { reference: "Esther 2", event: "Esther Chosen as Queen" },
      { reference: "Esther 4", event: "Mordecai's Plea: 'For such a time as this'" },
      { reference: "Esther 7", event: "Haman's Plot Revealed" }
    ],
    relatedCharacters: ["mordecai", "ahasuerus", "haman"],
    tags: ["Leader", "Other"]
  },
  {
    id: "isaiah",
    name: "Isaiah",
    imageUrl: "/images/characters/isaiah.png",
    roles: ["Prophet"],
    era: "8th Century BC",
    keyLocations: ["Jerusalem", "Judah"],
    shortSummary: "A major prophet of Judah whose writings contain profound prophecies concerning the coming Messiah.",
    detailedBio: "Prophesying during the reigns of Uzziah, Jotham, Ahaz, and Hezekiah, Isaiah warned Judah of impending judgment due to their moral decay while also offering soaring promises of ultimate restoration. His prophecies concerning the 'Suffering Servant' are centrally quoted in the New Testament regarding Jesus.",
    keyScriptures: [
      { reference: "Isaiah 6", event: "Isaiah's Vision of the Lord's Holiness" },
      { reference: "Isaiah 9", event: "Prophecy of the Prince of Peace" },
      { reference: "Isaiah 53", event: "The Suffering Servant" }
    ],
    relatedCharacters: ["hezekiah", "ahaz"],
    tags: ["Prophet", "Author"]
  },
  {
    id: "jacob",
    name: "Jacob (Israel)",
    imageUrl: "/images/characters/jacob.png",
    roles: ["Patriarch"],
    era: "19th-18th Century BC",
    keyLocations: ["Canaan", "Haran", "Egypt"],
    shortSummary: "The son of Isaac whose twelve sons became the founders of the Twelve Tribes of Israel.",
    detailedBio: "A twin outsmarted his older brother Esau for their father's blessing. Fleeing Esau's wrath, he worked 14 years in Haran to marry sisters Leah and Rachel. During his return, he famously wrestled with God, who changed his name from Jacob ('deceiver') to Israel ('struggles with God').",
    keyScriptures: [
      { reference: "Genesis 27", event: "Jacob Takes Esau's Blessing" },
      { reference: "Genesis 28", event: "Jacob's Ladder Dream" },
      { reference: "Genesis 32", event: "Wrestling with God" }
    ],
    relatedCharacters: ["isaac", "esau", "rachel", "leah", "joseph_son_of_jacob"],
    tags: ["Patriarch"]
  },
  {
    id: "joshua",
    name: "Joshua",
    imageUrl: "/images/characters/joshua.png",
    roles: ["Leader", "Military Commander"],
    era: "13th Century BC",
    keyLocations: ["Egypt", "Wilderness", "Jericho", "Canaan"],
    shortSummary: "Moses' assistant and successor who led the Israelites in the conquest of Canaan.",
    detailedBio: "One of the twelve spies sent into Canaan, he and Caleb were the only two who trusted God to conquer the land. After Moses' death, Joshua led the Israelites across the Jordan River, famously conquering Jericho, and distributed the land among the Israelite tribes.",
    keyScriptures: [
      { reference: "Joshua 1", event: "God Commands Joshua: 'Be Strong and Courageous'" },
      { reference: "Joshua 3", event: "Crossing the Jordan" },
      { reference: "Joshua 6", event: "The Fall of Jericho" }
    ],
    relatedCharacters: ["moses", "caleb", "rahab"],
    tags: ["Leader", "Judge"]
  },
  {
    id: "stephen",
    name: "Stephen",
    imageUrl: "/images/characters/stephen.png",
    roles: ["Deacon", "Martyr"],
    era: "1st Century AD",
    keyLocations: ["Jerusalem"],
    shortSummary: "The first Christian martyr, known for his bold defense of the faith before the Sanhedrin.",
    detailedBio: "Chosen as one of the original seven deacons of the early Jerusalem church to care for the widows, Stephen was full of the Holy Spirit and performed great wonders. Falsely accused of blasphemy, he delivered a powerful speech summarizing Israel's history before being stoned to death, while a young Saul (later Paul) looked on.",
    keyScriptures: [
      { reference: "Acts 6", event: "Chosen as a Deacon" },
      { reference: "Acts 7", event: "Speech and Martyrdom" }
    ],
    relatedCharacters: ["paul_apostle", "peter_apostle"],
    tags: ["Leader", "Other"]
  },
  {
    id: "gideon",
    name: "Gideon",
    imageUrl: "/images/characters/gideon.png",
    roles: ["Judge", "Warrior"],
    era: "12th Century BC",
    keyLocations: ["Ophrah", "Jezreel Valley"],
    shortSummary: "A reluctant judge who delivered Israel from the Midianites with only 300 men.",
    detailedBio: "Called by an angel while threshing wheat in winepress to hide from Midianites, Gideon asked for signs (the fleece) to confirm God's call. God instructed him to reduce his army from 32,000 to just 300 men, defeating the massive Midianite camp using trumpets and smashed jars with torches.",
    keyScriptures: [
      { reference: "Judges 6", event: "The Call of Gideon and the Fleece" },
      { reference: "Judges 7", event: "Defeating Midian with 300 Men" }
    ],
    relatedCharacters: [],
    tags: ["Judge", "Leader"]
  },
  {
    id: "nehemiah",
    name: "Nehemiah",
    imageUrl: "/images/characters/nehemiah.png",
    roles: ["Governor", "Builder"],
    era: "5th Century BC",
    keyLocations: ["Susa", "Jerusalem"],
    shortSummary: "The cupbearer to the Persian king who returned to Jerusalem to rebuild its ruined walls.",
    detailedBio: "Serving as cupbearer to King Artaxerxes, Nehemiah was heartbroken to hear that Jerusalem's walls were still in ruins decades after the exile ended. Granted permission to return, he brilliantly organized the people and oversaw the rebuilding of the walls in just 52 days despite immense opposition from local enemies.",
    keyScriptures: [
      { reference: "Nehemiah 1", event: "Nehemiah's Prayer for Jerusalem" },
      { reference: "Nehemiah 2", event: "Inspecting the Walls" },
      { reference: "Nehemiah 6", event: "The Wall Completed" }
    ],
    relatedCharacters: ["ezra"],
    tags: ["Leader", "Other"]
  },
  {
    id: "daniel",
    name: "Daniel",
    imageUrl: "/images/characters/daniel.png",
    roles: ["Prophet", "Statesman"],
    era: "6th Century BC",
    keyLocations: ["Jerusalem", "Babylon"],
    shortSummary: "A Jewish youth taken captive to Babylon who rose to high government office while remaining fiercely faithful to God.",
    detailedBio: "Exiled to Babylon as a teenager, Daniel distinguished himself by his refusal to eat the king's rich food. Given the ability to interpret dreams, he counseled kings like Nebuchadnezzar and Belshazzar. He famously survived being thrown into a den of lions for his refusal to stop praying to Yahweh.",
    keyScriptures: [
      { reference: "Daniel 2", event: "Interpreting Nebuchadnezzar's Statue Dream" },
      { reference: "Daniel 5", event: "The Writing on the Wall" },
      { reference: "Daniel 6", event: "Daniel in the Lions' Den" }
    ],
    relatedCharacters: ["shadrach", "meshach", "abednego"],
    tags: ["Prophet", "Leader"]
  },
  {
    id: "mary_magdalene",
    name: "Mary Magdalene",
    imageUrl: "/images/characters/mary_magdalene.png",
    roles: ["Disciple"],
    era: "1st Century AD",
    keyLocations: ["Galilee", "Jerusalem"],
    shortSummary: "A devoted follower of Jesus who was the first recorded witness of his resurrection.",
    detailedBio: "Jesus cast seven demons out of Mary Magdalene, after which she became a leading figure among his followers, helping support his ministry. She was present at his crucifixion, witnessed his burial, and was the first person to discover the empty tomb and see the resurrected Christ, who sent her to tell the apostles.",
    keyScriptures: [
      { reference: "Luke 8", event: "Healed of Seven Demons" },
      { reference: "John 19", event: "Present at the Crucifixion" },
      { reference: "John 20", event: "Encountering the Risen Christ" }
    ],
    relatedCharacters: ["jesus_christ", "peter_apostle", "mary"],
    tags: ["Disciple", "Other"]
  },
  {
    id: "barnabas",
    name: "Barnabas",
    imageUrl: "/images/characters/barnabas.png",
    roles: ["Missionary", "Teacher"],
    era: "1st Century AD",
    keyLocations: ["Cyprus", "Antioch", "Jerusalem"],
    shortSummary: "An early Christian leader whose name means 'Son of Encouragement,' known for vouching for the newly converted Paul.",
    detailedBio: "A Levite from Cyprus, Barnabas was known for his generosity and encouragement. When the apostles were afraid of the newly converted Saul (Paul), Barnabas vouched for him. He co-led the first major missionary journey with Paul before parting ways over a disagreement regarding John Mark.",
    keyScriptures: [
      { reference: "Acts 4", event: "Barnabas Sells a Field for the Church" },
      { reference: "Acts 9", event: "Barnabas Vouches for Saul" },
      { reference: "Acts 13", event: "Sent Out on the First Missionary Journey" }
    ],
    relatedCharacters: ["paul_apostle", "john_mark"],
    tags: ["Leader", "Teacher"]
  },
  {
    id: "samson",
    name: "Samson",
    imageUrl: "/images/characters/samson.png",
    roles: ["Judge", "Warrior"],
    era: "12th Century BC",
    keyLocations: ["Zorah", "Timnah", "Gaza"],
    shortSummary: "A famously strong judge of Israel whose power derived from his Nazirite vow and uncut hair.",
    detailedBio: "Dedicated as a Nazirite from birth, Samson possessed supernatural strength used repeatedly against the Philistines (such as slaying a lion barehanded and striking down 1,000 men with a donkey's jawbone). His downfall came through his fatal attraction to Delilah, who betrayed the secret of his strength. Blinded and captured, he destroyed the Philistine temple of Dagon in his final act.",
    keyScriptures: [
      { reference: "Judges 14", event: "Samson and the Lion" },
      { reference: "Judges 16", event: "Samson and Delilah" },
      { reference: "Judges 16", event: "Samson's Death" }
    ],
    relatedCharacters: ["delilah"],
    tags: ["Judge"]
  },
  {
    id: "luke",
    name: "Luke",
    imageUrl: "/images/characters/luke.png",
    roles: ["Physician", "Historian", "Author"],
    era: "1st Century AD",
    keyLocations: ["Antioch", "Rome", "Various (Traveling)"],
    shortSummary: "A physician and traveling companion of Paul who authored the Gospel of Luke and the Acts of the Apostles.",
    detailedBio: "A Gentile Christian and doctor by trade, Luke traveled extensively with the Apostle Paul. He is the author of the third Gospel and its two-volume companion, the Acts of the Apostles, which provides the most detailed historical account of the early Christian church. He was known for his compassionate focus on women, the poor, and outcasts.",
    keyScriptures: [
      { reference: "Luke 1", event: "Prologue Addressed to Theophilus" },
      { reference: "Acts 16", event: "Joins Paul at Troas ('We' passages)" },
      { reference: "Colossians 4", event: "Paul calls him 'the beloved physician'" }
    ],
    relatedCharacters: ["paul_apostle"],
    tags: ["Author", "Other"]
  },
  {
    id: "jonathan",
    name: "Jonathan",
    imageUrl: "/images/characters/jonathan.png",
    roles: ["Prince", "Warrior"],
    era: "11th Century BC",
    keyLocations: ["Gibeah", "Mount Gilboa"],
    shortSummary: "The eldest son of King Saul, remembered for his profound loyalty and friendship with David.",
    detailedBio: "A courageous military leader who initiated a bold raid against a Philistine garrison. Despite knowing David was anointed to take the throne instead of him, Jonathan made a covenant of devoted friendship with David, repeatedly protecting him from his father Saul's murderous jealousy. He tragically died alongside Saul in battle at Mount Gilboa.",
    keyScriptures: [
      { reference: "1 Samuel 14", event: "Jonathan's Bold Attack on the Philistines" },
      { reference: "1 Samuel 18", event: "The Covenant Between David and Jonathan" },
      { reference: "2 Samuel 1", event: "David's Lament for Saul and Jonathan" }
    ],
    relatedCharacters: ["david", "saul"],
    tags: ["Leader", "Other"]
  },
  {
    id: "timothy",
    name: "Timothy",
    imageUrl: "/images/characters/timothy.png",
    roles: ["Pastor", "Missionary"],
    era: "1st Century AD",
    keyLocations: ["Lystra", "Ephesus"],
    shortSummary: "A young companion and protégé of the Apostle Paul, who became the pastor of the church in Ephesus.",
    detailedBio: "Raised by his Jewish mother Eunice and grandmother Lois, Timothy joined Paul on his second missionary journey. Despite his youth and frequent ailments, Paul entrusted him with crucial missions to various churches. Paul addressed two beloved pastoral epistles (1 and 2 Timothy) directly to him, calling him his 'true child in the faith.'",
    keyScriptures: [
      { reference: "Acts 16", event: "Timothy Joins Paul and Silas" },
      { reference: "1 Timothy 4", event: "Paul's Charge: 'Let no one despise your youth'" },
      { reference: "2 Timothy 1", event: "Paul Commends Lois and Eunice" }
    ],
    relatedCharacters: ["paul_apostle"],
    tags: ["Leader", "Teacher"]
  },
  {
    id: "andrew_apostle",
    name: "Andrew",
    imageUrl: "/images/characters/andrew.png",
    roles: ["Apostle", "Fisherman"],
    era: "1st Century AD",
    keyLocations: ["Bethsaida", "Capernaum"],
    shortSummary: "The brother of Simon Peter and the first disciple called by Jesus.",
    detailedBio: "Originally a disciple of John the Baptist, Andrew introduced his brother Simon (Peter) to Jesus, declaring 'We have found the Messiah.' He is often depicted bringing people to Jesus, including the boy with the loaves and fishes.",
    keyScriptures: [
      { reference: "John 1", event: "Andrew brings Peter to Jesus" },
      { reference: "John 6", event: "Finding the boy with loaves and fishes" }
    ],
    relatedCharacters: ["jesus_christ", "peter_apostle", "john_baptist"],
    tags: ["Apostle"]
  },
  {
    id: "james_apostle_zebedee",
    name: "James (son of Zebedee)",
    imageUrl: "/images/characters/james_apostle_zebedee.png",
    roles: ["Apostle", "Fisherman", "Martyr"],
    era: "1st Century AD",
    keyLocations: ["Galilee", "Jerusalem"],
    shortSummary: "One of Jesus' closest three disciples, and the first apostle to be martyred.",
    detailedBio: "Along with his brother John, Jesus nicknamed them 'Boanerges' (Sons of Thunder). James was part of Jesus' inner circle, present at the Transfiguration and in Gethsemane. He was executed by sword under King Herod Agrippa I.",
    keyScriptures: [
      { reference: "Mark 3", event: "Named a Son of Thunder" },
      { reference: "Mark 9", event: "Present at the Transfiguration" },
      { reference: "Acts 12", event: "Martyred by Herod" }
    ],
    relatedCharacters: ["jesus_christ", "john_apostle", "peter_apostle"],
    tags: ["Apostle", "Leader"]
  },
  {
    id: "philip_apostle",
    name: "Philip",
    imageUrl: "/images/characters/philip_apostle.png",
    roles: ["Apostle"],
    era: "1st Century AD",
    keyLocations: ["Bethsaida"],
    shortSummary: "One of the original twelve, who brought Nathanael (Bartholomew) to Jesus.",
    detailedBio: "From Bethsaida (like Peter and Andrew), Jesus directly called Philip by saying 'Follow me.' Philip then found Nathanael and invited him to 'Come and see' Jesus. Later, he famously asked Jesus to 'show us the Father.'",
    keyScriptures: [
      { reference: "John 1", event: "Philip brings Nathanael to Jesus" },
      { reference: "John 14", event: "Philip asks to see the Father" }
    ],
    relatedCharacters: ["jesus_christ", "bartholomew_apostle"],
    tags: ["Apostle"]
  },
  {
    id: "bartholomew_apostle",
    name: "Bartholomew (Nathanael)",
    imageUrl: "/images/characters/bartholomew_apostle.png",
    roles: ["Apostle"],
    era: "1st Century AD",
    keyLocations: ["Cana"],
    shortSummary: "An apostle often identified as Nathanael, whom Jesus described as an 'Israelite in whom there is no deceit.'",
    detailedBio: "When Philip told him about Jesus of Nazareth, Nathanael famously asked 'Can anything good come from Nazareth?' However, upon meeting Jesus, he immediately recognized Him as the Son of God and the King of Israel.",
    keyScriptures: [
      { reference: "John 1", event: "Jesus meets Nathanael" }
    ],
    relatedCharacters: ["jesus_christ", "philip_apostle"],
    tags: ["Apostle"]
  },
  {
    id: "thomas_apostle",
    name: "Thomas",
    imageUrl: "/images/characters/thomas_apostle.png",
    roles: ["Apostle"],
    era: "1st Century AD",
    keyLocations: ["Galilee", "Jerusalem", "Tradition: India"],
    shortSummary: "Famously known as 'Doubting Thomas' for demanding physical proof of the Resurrection.",
    detailedBio: "Though known for his doubt, Thomas was fiercely loyal, once urging the disciples to go with Jesus to Judea 'that we may die with him.' When he finally saw the resurrected Christ, he delivered the profound confession: 'My Lord and my God!'",
    keyScriptures: [
      { reference: "John 11", event: "Let us also go, that we may die with him" },
      { reference: "John 20", event: "Thomas doubts, then believes" }
    ],
    relatedCharacters: ["jesus_christ"],
    tags: ["Apostle"]
  },
  {
    id: "matthew_apostle",
    name: "Matthew (Levi)",
    imageUrl: "/images/characters/matthew_apostle.png",
    roles: ["Apostle", "Author", "Tax Collector"],
    era: "1st Century AD",
    keyLocations: ["Capernaum"],
    shortSummary: "A despised tax collector who left everything to follow Jesus, and authored the Gospel of Matthew.",
    detailedBio: "Working at a tax booth in Capernaum, Matthew (also called Levi) was hated by his fellow Jews. Jesus called him, and Matthew immediately hosted a great banquet for Jesus with other tax collectors, showing Christ's grace to outcasts.",
    keyScriptures: [
      { reference: "Matthew 9", event: "The Calling of Matthew" },
      { reference: "Luke 5", event: "Levi holds a banquet for Jesus" }
    ],
    relatedCharacters: ["jesus_christ"],
    tags: ["Apostle", "Author"]
  },
  {
    id: "james_apostle_alphaeus",
    name: "James (son of Alphaeus)",
    imageUrl: "/images/characters/james_apostle_alphaeus.png",
    roles: ["Apostle"],
    era: "1st Century AD",
    keyLocations: ["Galilee"],
    shortSummary: "One of the twelve apostles, sometimes referred to as James the Less.",
    detailedBio: "Very little is recorded about James the son of Alphaeus in the Gospels beyond his inclusion in the lists of the twelve apostles. He faithfully served alongside the others.",
    keyScriptures: [
      { reference: "Matthew 10", event: "Listed among the Twelve" }
    ],
    relatedCharacters: ["jesus_christ"],
    tags: ["Apostle"]
  },
  {
    id: "thaddaeus_apostle",
    name: "Thaddaeus (Jude)",
    imageUrl: "/images/characters/thaddaeus_apostle.png",
    roles: ["Apostle", "Author"],
    era: "1st Century AD",
    keyLocations: ["Galilee"],
    shortSummary: "Also known as Judas (not Iscariot) or Lebbaeus; an apostle and likely the author of the Epistle of Jude.",
    detailedBio: "During the Last Supper, he asked Jesus why He intended to reveal Himself to the disciples and not to the world. Tradition holds he preached the gospel passionately before being martyred.",
    keyScriptures: [
      { reference: "John 14", event: "Judas (not Iscariot) asks Jesus a question" }
    ],
    relatedCharacters: ["jesus_christ"],
    tags: ["Apostle", "Author"]
  },
  {
    id: "simon_zealot_apostle",
    name: "Simon the Zealot",
    imageUrl: "/images/characters/simon_zealot_apostle.png",
    roles: ["Apostle"],
    era: "1st Century AD",
    keyLocations: ["Galilee"],
    shortSummary: "An apostle who formerly belonged to a fiery Jewish political faction.",
    detailedBio: "Before following Jesus, Simon was a Zealot—a radical group dedicated to violently overthrowing Roman rule in Israel. His inclusion among the disciples alongside Matthew (a tax collector working for Rome) highlights the unifying power of Christ.",
    keyScriptures: [
      { reference: "Luke 6", event: "Listed among the Twelve" }
    ],
    relatedCharacters: ["jesus_christ", "matthew_apostle"],
    tags: ["Apostle"]
  },
  {
    id: "judas_iscariot",
    name: "Judas Iscariot",
    imageUrl: "/images/characters/judas_iscariot.png",
    roles: ["Apostle", "Traitor"],
    era: "1st Century AD",
    keyLocations: ["Jerusalem"],
    shortSummary: "The disciple who famously betrayed Jesus Christ to the religious authorities for thirty pieces of silver.",
    detailedBio: "Judas served as the treasurer for the disciples but often stole from the money bag. Driven by greed and Satan, he led the authorities to Jesus in Gethsemane, identifying Him with a kiss. Overcome with remorse, he tragicially ended his own life.",
    keyScriptures: [
      { reference: "Matthew 26", event: "Judas agrees to betray Jesus" },
      { reference: "Luke 22", event: "The Betrayal with a Kiss" },
      { reference: "Matthew 27", event: "Judas's regret and death" }
    ],
    relatedCharacters: ["jesus_christ", "matthias_apostle"],
    tags: ["Apostle"]
  },
  {
    id: "matthias_apostle",
    name: "Matthias",
    imageUrl: "/images/characters/matthias_apostle.png",
    roles: ["Apostle"],
    era: "1st Century AD",
    keyLocations: ["Jerusalem"],
    shortSummary: "The disciple chosen to replace Judas Iscariot as one of the Twelve Apostles.",
    detailedBio: "After Jesus' ascension, the believers felt the need to replace Judas to restore the number of apostles to twelve. Matthias, who had been with Jesus since His baptism, was chosen by casting lots under Peter's leadership.",
    keyScriptures: [
      { reference: "Acts 1", event: "Matthias chosen to replace Judas" }
    ],
    relatedCharacters: ["peter_apostle", "judas_iscariot"],
    tags: ["Apostle"]
  },
  {
    id: "adam",
    name: "Adam",
    imageUrl: "/images/characters/adam.png",
    roles: ["First Man", "Patriarch"],
    era: "Antediluvian Period",
    keyLocations: ["Garden of Eden"],
    shortSummary: "The first human being created by God from the dust of the ground.",
    detailedBio: "Created in the image of God, Adam was placed in the Garden of Eden to care for it. He named the animals and was given a companion, Eve. However, deceived by the serpent, they disobeyed God by eating from the Tree of Knowledge of Good and Evil, which resulted in their expulsion from the Garden and the introduction of sin into the world.",
    keyScriptures: [
      { reference: "Genesis 2", event: "The Creation of Adam" },
      { reference: "Genesis 3", event: "The Fall of Man" }
    ],
    relatedCharacters: ["eve", "cain", "abel"],
    tags: ["Patriarch", "Other"]
  },
  {
    id: "eve",
    name: "Eve",
    imageUrl: "/images/characters/eve.png",
    roles: ["First Woman", "Matriarch"],
    era: "Antediluvian Period",
    keyLocations: ["Garden of Eden"],
    shortSummary: "The first woman, created from Adam's rib, and the 'mother of all the living.'",
    detailedBio: "Created by God as a suitable helper and companion for Adam. She was the first to be deceived by the serpent and ate the forbidden fruit, subsequently offering it to Adam. After the Fall, God declared that she would experience pain in childbirth, but famously promised that her offspring would eventually crush the serpent's head.",
    keyScriptures: [
      { reference: "Genesis 2", event: "The Creation of Eve" },
      { reference: "Genesis 3", event: "The Deception of Eve" }
    ],
    relatedCharacters: ["adam", "cain", "abel"],
    tags: ["Matriarch", "Other"]
  },
  {
    id: "cain",
    name: "Cain",
    imageUrl: "/images/characters/cain.png",
    roles: ["Farmer", "First Murderer"],
    era: "Antediluvian Period",
    keyLocations: ["East of Eden", "Land of Nod"],
    shortSummary: "The firstborn son of Adam and Eve, who murdered his brother Abel out of jealousy.",
    detailedBio: "A worker of the soil whose subsequent offering to God lacked the faith and acceptable nature of his brother Abel's offering. Overcome with jealousy and anger when God favored Abel's sacrifice, Cain murdered his brother in a field. As punishment, God exiled him to be a restless wanderer on the earth.",
    keyScriptures: [
      { reference: "Genesis 4", event: "The First Murder" }
    ],
    relatedCharacters: ["adam", "eve", "abel"],
    tags: ["Other"]
  },
  {
    id: "abel",
    name: "Abel",
    imageUrl: "/images/characters/abel.png",
    roles: ["Shepherd"],
    era: "Antediluvian Period",
    keyLocations: ["East of Eden"],
    shortSummary: "The righteous second son of Adam and Eve, famously murdered by his older brother Cain.",
    detailedBio: "A keeper of flocks who brought the best portions of his firstborn flock as an offering to God. Because it was offered in faith, God looked with favor on Abel and his offering. Tragically, his righteousness provoked his brother Cain's jealousy, leading to his murder—becoming the first human to die.",
    keyScriptures: [
      { reference: "Genesis 4", event: "A Pleasing Sacrifice to God" },
      { reference: "Hebrews 11", event: "Commended for his Faith" }
    ],
    relatedCharacters: ["adam", "eve", "cain"],
    tags: ["Other"]
  },
  {
    id: "job",
    name: "Job",
    imageUrl: "/images/characters/job.png",
    roles: ["Patriarch"],
    era: "Patriarchal Period",
    keyLocations: ["Land of Uz"],
    shortSummary: "A profoundly righteous man who endured catastrophic suffering yet refused to curse God.",
    detailedBio: "Described as blameless, upright, and extremely wealthy. God allowed Satan to test Job's faith by striking down his children, his wealth, and his health. Despite overwhelming grief and the unhelpful advice of his friends, Job maintained his integrity. Eventually, God answered him out of a whirlwind, restoring his fortunes twofold.",
    keyScriptures: [
      { reference: "Job 1", event: "Satan tests Job" },
      { reference: "Job 38", event: "God speaks out of the whirlwind" },
      { reference: "Job 42", event: "Job's fortunes are restored" }
    ],
    relatedCharacters: [],
    tags: ["Patriarch", "Other"]
  },
  {
    id: "elisha",
    name: "Elisha",
    imageUrl: "/images/characters/elisha.png",
    roles: ["Prophet"],
    era: "9th Century BC",
    keyLocations: ["Northern Kingdom (Israel)", "Samaria"],
    shortSummary: "The devoted successor to the prophet Elijah, known for performing twice as many miracles.",
    detailedBio: "Called by Elijah while plowing a field. He requested a 'double portion' of Elijah's spirit before his master was taken to heaven. Elisha's ministry spanned over 50 years and included numerous incredible miracles, such as healing Naaman's leprosy, multiplying a widow's oil, and raising a Shunammite's son from the dead.",
    keyScriptures: [
      { reference: "1 Kings 19", event: "The Call of Elisha" },
      { reference: "2 Kings 2", event: "Receiving the mantel of Elijah" },
      { reference: "2 Kings 5", event: "Healing Naaman's Leprosy" }
    ],
    relatedCharacters: ["elijah", "ahab"],
    tags: ["Prophet"]
  },
  {
    id: "caleb",
    name: "Caleb",
    imageUrl: "/images/characters/caleb.png",
    roles: ["Spy", "Leader", "Warrior"],
    era: "15th-14th Century BC",
    keyLocations: ["Kadesh Barnea", "Hebron"],
    shortSummary: "One of the twelve spies sent into Canaan, who distinguished himself by trusting God despite giant enemies.",
    detailedBio: "Representing the tribe of Judah, Caleb and Joshua were the only two spies who urged Israel to conquer the Promised Land, believing God would deliver it. Because of his wholehearted faith, Caleb survived the 40-year wilderness wandering and successfully claimed the treacherous hill country of Hebron at 85 years old.",
    keyScriptures: [
      { reference: "Numbers 13", event: "Exploring Canaan as a spy" },
      { reference: "Numbers 14", event: "Caleb quiets the people" },
      { reference: "Joshua 14", event: "Claiming Hebron at 85 years old" }
    ],
    relatedCharacters: ["joshua", "moses"],
    tags: ["Leader"]
  },
  {
    id: "deborah",
    name: "Deborah",
    imageUrl: "/images/characters/deborah.png",
    roles: ["Prophetess", "Judge", "Military Leader"],
    era: "12th Century BC",
    keyLocations: ["Mount Tabor", "Ephraim"],
    shortSummary: "A wise prophetess and the only female judge of Israel, who led her people to a massive military victory.",
    detailedBio: "She held court under the 'Palm of Deborah' in Ephraim. Prompted by God, she commanded the military commander Barak to march against the Canaanite oppressor Sisera. She famously rode into battle with Barak, and after their stunning victory, composed 'The Song of Deborah,' one of the oldest poems in Scripture.",
    keyScriptures: [
      { reference: "Judges 4", event: "Deborah commands Barak perfectly" },
      { reference: "Judges 5", event: "The Song of Deborah" }
    ],
    relatedCharacters: [],
    tags: ["Prophet", "Judge", "Leader"]
  },
  {
    id: "saul",
    name: "King Saul",
    imageUrl: "/images/characters/saul.png",
    roles: ["King", "Warrior"],
    era: "11th Century BC",
    keyLocations: ["Gibeah", "Gilgal", "Mount Gilboa"],
    shortSummary: "The tall, striking first king of a united Israel whose tragic reign was marked by disobedience and jealousy.",
    detailedBio: "Anointed by Samuel at God's command when the Israelites demanded a king. He had early military successes but repeatedly usurped priestly duties and disobeyed God's clear commands (e.g., sparing King Agag). God rejected him as king, leading to Saul's descent into madness and his relentless, paranoid pursuit of David.",
    keyScriptures: [
      { reference: "1 Samuel 9", event: "Saul chosen as King" },
      { reference: "1 Samuel 15", event: "The Lord rejects Saul" },
      { reference: "1 Samuel 18", event: "Saul's jealousy of David begins" }
    ],
    relatedCharacters: ["samuel", "david", "jonathan"],
    tags: ["King"]
  },
  {
    id: "hezekiah",
    name: "Hezekiah",
    imageUrl: "/images/characters/hezekiah.png",
    roles: ["King"],
    era: "8th-7th Century BC",
    keyLocations: ["Jerusalem"],
    shortSummary: "One of Judah's most faithful kings who instituted sweeping religious reforms and trusted God during an Assyrian siege.",
    detailedBio: "Unlike his wicked father Ahaz, Hezekiah destroyed idol shrines and cleansed the Temple. When the powerful Assyrian king Sennacherib besieged Jerusalem and taunted God, Hezekiah prayed fervently. In response, God sent an angel to decimate the Assyrian camp. Later, when facing a fatal illness, God granted him 15 more years of life.",
    keyScriptures: [
      { reference: "2 Kings 18", event: "Hezekiah destroys the bronze serpent" },
      { reference: "2 Kings 19", event: "Deliverance from Assyria" },
      { reference: "Isaiah 38", event: "Hezekiah's illness and healing" }
    ],
    relatedCharacters: ["isaiah"],
    tags: ["King"]
  },
  {
    id: "josiah",
    name: "Josiah",
    imageUrl: "/images/characters/josiah.png",
    roles: ["King"],
    era: "7th Century BC",
    keyLocations: ["Jerusalem"],
    shortSummary: "A righteous king of Judah who took the throne at eight years old and initiated profound religious reforms.",
    detailedBio: "During the repair of the neglected Temple, the Book of the Law was rediscovered. Upon hearing it read, Josiah tore his clothes in repentance. He eradicated pagan worship altars, reinstituted the Passover, and passionately turned the nation back to Yahweh. Tragically, he died in battle opposing Pharaoh Necho of Egypt.",
    keyScriptures: [
      { reference: "2 Kings 22", event: "The Book of the Law found" },
      { reference: "2 Kings 23", event: "Josiah's sweeping reforms" }
    ],
    relatedCharacters: [],
    tags: ["King"]
  },
  {
    id: "miriam",
    name: "Miriam",
    imageUrl: "/images/characters/miriam.png",
    roles: ["Prophetess", "Leader"],
    era: "15th-13th Century BC",
    keyLocations: ["Egypt", "Wilderness", "Red Sea"],
    shortSummary: "The sister of Moses who played a key role in the Exodus but struggled with jealousy of his leadership.",
    detailedBio: "As a young girl, she intelligently arranged for Moses' own mother to nurse him after he was found by Pharaoh's daughter in the Nile. After crossing the Red Sea, she led the Israelite women in a tambourine dance of victory. Later, she was struck with leprosy for rebelling against Moses' authority, but was healed after Moses interceded.",
    keyScriptures: [
      { reference: "Exodus 2", event: "Watching over baby Moses" },
      { reference: "Exodus 15", event: "The Song of Miriam" },
      { reference: "Numbers 12", event: "Miriam and Aaron oppose Moses" }
    ],
    relatedCharacters: ["moses", "aaron"],
    tags: ["Prophet", "Leader"]
  },
  {
    id: "martha",
    name: "Martha",
    imageUrl: "/images/characters/martha.png",
    roles: ["Disciple", "Hostess"],
    era: "1st Century AD",
    keyLocations: ["Bethany"],
    shortSummary: "A devoted follower of Jesus, renowned for her hospitality and profound confession of faith.",
    detailedBio: "The sister of Mary and Lazarus. She frequently hosted Jesus in her home. Though famously gently rebuked by Jesus for being overly distracted with serving while her sister Mary sat at His feet, Martha later showcased incredible faith before Lazarus was raised, declaring Jesus as the Messiah, the Son of God.",
    keyScriptures: [
      { reference: "Luke 10", event: "Martha and Mary host Jesus" },
      { reference: "John 11", event: "Martha's confession of faith: 'You are the Messiah'" }
    ],
    relatedCharacters: ["jesus_christ", "mary_of_bethany", "lazarus"],
    tags: ["Disciple", "Other"]
  },
  {
    id: "mary_of_bethany",
    name: "Mary of Bethany",
    imageUrl: "/images/characters/mary_of_bethany.png",
    roles: ["Disciple"],
    era: "1st Century AD",
    keyLocations: ["Bethany"],
    shortSummary: "A deeply devoted follower of Jesus who famously sat at His feet and anointed Him with expensive perfume.",
    detailedBio: "Sister of Martha and Lazarus. She is characterized by her profound devotion to Jesus. When Jesus visited their home, she chose the 'better part' by sitting at His feet listening rather than serving. Shortly before His crucifixion, she poured an incredibly expensive jar of nard over Jesus' feet, drying them with her hair.",
    keyScriptures: [
      { reference: "Luke 10", event: "Sitting at the feet of Jesus" },
      { reference: "John 12", event: "Anointing Jesus' feet with perfume" }
    ],
    relatedCharacters: ["jesus_christ", "martha", "lazarus"],
    tags: ["Disciple", "Other"]
  },
  {
    id: "lazarus",
    name: "Lazarus",
    imageUrl: "/images/characters/lazarus.png",
    roles: ["Disciple", "Friend of Jesus"],
    era: "1st Century AD",
    keyLocations: ["Bethany"],
    shortSummary: "A close friend of Jesus whom Christ miraculously raised from the dead after four days.",
    detailedBio: "The brother of Mary and Martha. He grew severely ill and died before Jesus arrived. Jesus wept at his tomb before ordering the stone removed and calling 'Lazarus, come out!' The miracle was so undeniable that many Jews believed in Jesus, prompting the chief priests to plot to kill both Jesus and Lazarus.",
    keyScriptures: [
      { reference: "John 11", event: "Jesus raises Lazarus from the dead" },
      { reference: "John 12", event: "The plot to kill Lazarus" }
    ],
    relatedCharacters: ["jesus_christ", "martha", "mary_of_bethany"],
    tags: ["Disciple", "Other"]
  }
];
