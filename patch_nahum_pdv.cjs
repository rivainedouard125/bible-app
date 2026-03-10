const fs = require('fs');

const nahumData = [
  {
    chapter: 1,
    verses: [
      { verse: 1, text: "Ce livre contient un message sur la ville de Ninive. Dieu a fait connaître ce message dans une vision au prophète Nahoum, du village d'Elcoch. Le Seigneur, un Dieu redoutable et bon." },
      { verse: 2, text: "Le SEIGNEUR est un Dieu exigeant, il punit ses ennemis, sa colère est terrible. Il punit ses adversaires, il n'oublie pas le mal qu'ils font." },
      { verse: 3, text: "Le SEIGNEUR est patient, sa puissance est grande, mais il ne laisse pas le coupable sans punition. Quand il passe, une violente tempête apparaît. Les nuages sont la poussière que ses pas soulèvent." },
      { verse: 4, text: "Il menace la mer, et elle devient sèche, il vide toutes les rivières. Alors les pâturages du Bachan et la montagne du Carmel perdent toute vie, les fleurs du Liban se fanent." },
      { verse: 5, text: "Les montagnes tremblent à cause de lui, et les collines sont secouées. Devant lui, la terre est bouleversée, le monde entier et tous ses habitants." },
      { verse: 6, text: "Qui peut tenir devant sa colère ? Qui peut rester vivant quand cette colère brûle tout ? Elle se répand comme un incendie, les rochers se fendent devant lui." },
      { verse: 7, text: "Le SEIGNEUR est bon. Il est un abri quand tout va mal. Il prend soin de ceux qui comptent sur lui," },
      { verse: 8, text: "quand le malheur passe comme un torrent. Mais il détruit ses ennemis et il les chasse dans la nuit de la mort." },
      { verse: 9, text: "Messages successifs pour Juda et pour Ninive. Qu'est-ce que vous pensez du SEIGNEUR ? Lui, il détruit ses ennemis, ils ne vous écraseront pas une deuxième fois." },
      { verse: 10, text: "Ils sont pareils à un buisson d'épines emmêlées, eux qui boivent comme des ivrognes. Ils seront complètement brûlés comme de la paille sèche." },
      { verse: 11, text: "Quelqu'un qui prépare de mauvais coups contre le SEIGNEUR, un homme qui a des projets destructeurs est sorti de toi, Ninive." },
      { verse: 12, text: "Voici ce que le SEIGNEUR dit aux gens de Juda : « Même si vos ennemis sont nombreux et puissants, ils seront détruits, ils disparaîtront. Je vous ai abaissés, je ne le ferai plus." },
      { verse: 13, text: "Maintenant, je brise le pouvoir qui vous écrase et je détache vos chaînes. »" },
      { verse: 14, text: "Contre vous, habitants de Ninive, voici ce que le SEIGNEUR décide : « Vous n'aurez plus d'enfants qui porteront votre nom. Dans le temple de vos dieux, je détruirai vos statues en bois ou en métal. Je prépare votre tombe, parce que vous êtes peu de chose. »" }
    ]
  },
  {
    chapter: 2,
    verses: [
      { verse: 1, text: "Habitants de Juda, un messager qui apporte une bonne nouvelle arrive sur les montagnes : il annonce la paix ! Organisez vos fêtes, tenez vos promesses envers Dieu. L'homme aux projets destructeurs ne passera plus jamais chez vous. Il n'a plus de forces." },
      { verse: 2, text: "Une armée monte pour t'attaquer, Ninive. Soldats, gardez les murs de défense, surveillez les routes, préparez-vous pour la bataille, rassemblez toutes vos forces." },
      { verse: 3, text: "Des bandits ont pillé ceux qui sont nés de Jacob. Ils ont détruit les branches de cette vigne. Or, le SEIGNEUR lui rend sa fierté, oui, il rend sa fierté à Israël." },
      { verse: 4, text: "Les soldats de l'armée ennemie portent des boucliers peints en rouge et des habits rouges. Les chars alignés pour le combat brillent comme des flammes, les lances commencent à bouger." },
      { verse: 5, text: "Les chars foncent pour attaquer à travers les rues et les places. Ils ressemblent à des torches allumées, ils vont aussi vite que l'éclair." },
      { verse: 6, text: "Le roi de Ninive fait appel à ses chefs d'armée, mais ils avancent en hésitant. Les ennemis courent vers les murs de défense, ils se mettent derrière un abri." },
      { verse: 7, text: "Tout à coup, les portes qui donnent sur les fleuves sont enfoncées, le palais du roi s’écroule." },
      { verse: 8, text: "Dans l'eau, ses pierres se répandent, on emmène la princesse en exil. Ses suivantes gémissent comme des colombes plaintives ; elles se frappent la poitrine." },
      { verse: 9, text: "Ninive est comme un bassin fissuré qui ne retient plus l'eau dont il était rempli. Les voilà qui s'enfuient. « Arrêtez ! Arrêtez ! » Mais nul ne se retourne." },
      { verse: 10, text: "Pillez tout son argent et raflez tout son or ! Ses richesses sont sans limite, elle est remplie d'objets précieux de toutes sortes." },
      { verse: 11, text: "Sac, saccage et carnage ! Hélas ! Les cœurs défaillent et les genoux flageolent. Les voilà angoissés, tremblant de tout leur corps. Les visages de tous sont blancs comme des linges." },
      { verse: 12, text: "Qu'est devenu cet antre du lion, ce domaine où les lionceaux se repaissaient des proies que le lion était allé chercher, sans qu'ils soient troublés ?" },
      { verse: 13, text: "Le lion déchirait pour ses petits et étranglait pour ses lionnes. Et il remplissait ses tanières avec des proies et ses repaires avec des bêtes déchiquetées." },
      { verse: 14, text: "Voici, je suis contre toi, déclare le SEIGNEUR de l'univers, et je réduirai tes chars en fumée, et l'épée dévorera tes lionceaux, et je retrancherai ta proie de la terre. Et la voix de tes messagers ne sera plus entendue." }
    ]
  },
  {
    chapter: 3,
    verses: [
      { verse: 1, text: "Quel malheur pour Ninive, la ville où le sang coule ! Elle est remplie de mensonge, de violence, et les pillages ne cessent pas !" },
      { verse: 2, text: "Et voici que dans la ville, les fouets claquent, les roues se heurtent, les chevaux galopent, les chars de guerre bondissent." },
      { verse: 3, text: "Les cavaliers s'élancent, les armes brillent comme des flammes, les lances étincellent. Il y a des morts partout, les corps s'entassent, personne ne peut les compter, les soldats heurtent les corps !" },
      { verse: 4, text: "Ninive s'est prostituée des milliers de fois. Elle était belle et gracieuse, elle utilisait ses charmes comme une magicienne. Par sa prostitution et ses charmes, elle a rendu esclaves des peuples nombreux." },
      { verse: 5, text: "Le Seigneur de l'univers lui déclare : « Je vais agir contre toi. Je relèverai ton vêtement jusqu'à ton visage, je te montrerai toute nue aux autres peuples. Ainsi les autres royaumes verront ta honte. »" },
      { verse: 6, text: "Je vais te couvrir d'ordures pour enlever ton honneur. Je ferai de toi un exemple." },
      { verse: 7, text: "Alors tous ceux qui te verront fuiront en criant : « Ninive est détruite ! Qui aura pitié d'elle ? Où trouver pour toi, Ninive, des gens qui te rendent courage ? »" },
      { verse: 8, text: "Ninive, est-ce que tu vaux mieux que Thèbes ? Cette ville était située sur les canaux du Nil, entourée d'eau. Le Nil la protégeait aussi solidement qu'un mur de défense." },
      { verse: 9, text: "L'Éthiopie et l'Égypte faisaient sa puissance, qui était immense. Les gens de Pouth et de Libye étaient ses alliés." },
      { verse: 10, text: "Pourtant, les habitants de Thèbes, eux aussi, ont dû partir en exil comme prisonniers. Leurs ennemis ont écrasé même les jeunes enfants de la ville. On a tiré au sort ses hommes les plus nobles pour les réduire en esclavage, on a chargé de chaînes ceux qui gouvernaient tout le peuple." },
      { verse: 11, text: "Toi aussi, à ton tour, tu seras enivrée, tu devras te cacher. Toi aussi, tu devras chercher à t'abriter contre tes ennemis." },
      { verse: 12, text: "Toutes tes forteresses sont comme des figuiers tout chargés des premières figues : à la moindre secousse, elles se mettent à tomber dans une bouche prête à les manger." },
      { verse: 13, text: "Voici, ton peuple, ce sont des femmes au milieu de toi ; Les portes de ton pays s'ouvrent à tes ennemis ; Le feu consume tes verrous." },
      { verse: 14, text: "Puise de l'eau en vue du siège, renforce ta défense. Va prendre de l'argile, pétris la glaise, mets en état ton four pour fabriquer des briques !" },
      { verse: 15, text: "Là, le feu te consumera, l'épée te détruira, et elle te dévorera comme des sauterelles. Que ta population pullule comme les sauterelles et comme les criquets !" },
      { verse: 16, text: "Tu as multiplié tes commis voyageurs, ils surpassent en nombre les étoiles du ciel, tout comme des criquets qui se répandent sur le sol et prennent leur envol." },
      { verse: 17, text: "Tes princes sont comme des sauterelles, tes capitaines comme une nuée de criquets qui se posent sur les haies par un jour de froid. Dès que le soleil brille, ils s'envolent tous on ne sait où. Où sont-ils ?" },
      { verse: 18, text: "Roi d'Assyrie, tes chefs se sont endormis, tes généraux ne bougent plus, ton peuple est parti de tous côtés, dans les montagnes, et personne ne le rassemble." },
      { verse: 19, text: "Ta défaite est définitive, tes blessures ne peuvent être guéries. Tous ceux qui entendront parler de toi battront des mains sur toi ; car quel est celui que ta méchanceté n'a pas atteint ?" }
    ]
  }
];

function run() {
  const JSON_PATH = 'src/data/bible-fr.json';
  const bibleData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
  const ot = bibleData['Old Testament'];
  const nahumIndex = ot.findIndex(b => b.name === 'Nahum');
  
  if (nahumIndex !== -1) {
    ot[nahumIndex].chapters = nahumData;
    fs.writeFileSync(JSON_PATH, JSON.stringify(bibleData, null, 2));
    console.log("Successfully patched Nahum with Parole de Vie text!");
  }
}

run();
