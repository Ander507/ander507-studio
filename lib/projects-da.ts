export interface ProjectTranslation {
  description: string;
  longDescription: string;
  features: string[];
  /** Link labels, in the same order as `links` in projects.ts. */
  linkLabels: string[];
  /** Screenshot descriptions, in the same order as `screenshots` in projects.ts. */
  screenshotAlts?: string[];
}

export const PROJECTS_DA: Record<string, ProjectTranslation> = {
  portsentinel: {
    description:
      "Holder øje med hvilke programmer på din Windows-pc der åbner netværksporte, og giver besked når noget nyt dukker op.",
    longDescription:
      "PortSentinel er et lille Windows-program i systembakken til udviklere og IT-folk. Det sammenligner de porte, der lytter på maskinen, med en gemt baseline og giver besked, når en baggrundstjeneste, en Docker-container eller et ukendt program åbner en port. Du kan se kommandolinje, sti og digital signatur for hver proces, uden at køre som administrator. Derudover kan det finde enheder på netværket, pause overvågningen og lukke processer med ét klik, med en liste over beskyttede processer man ikke kan lukke ved en fejl.",
    features: [
      "Sammenligning med baseline: uændret, ny og lukket port",
      "Viser kommandolinje og sti for hver proces",
      "Tjek af digital signatur med WinVerifyTrust",
      "Overvågning fra systembakken med samlede notifikationer",
      "Åbn filplacering, kopier adresse eller luk processen",
      "Fluent-design med Acrylic på Windows 11",
    ],
    linkLabels: ["Download til Windows", "GitHub", "Støt på Ko-fi"],
    screenshotAlts: ["PortSentinel viser lyttende TCP-porte med status i forhold til baseline", "Skjold for en proces med gyldig digital signatur", "Skjold for en proces uden eller med ukendt signatur"],
  },
  ztionix: {
    description:
      "En samling eksperimenter og små webværktøjer, blandt andet Sakovajo Protocol, der oversætter tekst til internet-brainrot.",
    longDescription:
      "Ztionix er min legeplads for webværktøjer og sideprojekter. Den samler værktøjer til sikker kommunikation, små eksperimenter og Sakovajo Protocol, der oversætter almindelig tekst til kaotisk internetsprog. Det er et sted, hvor idéer bliver udgivet hurtigt og nogle gange går i stykker med vilje.",
    features: [
      "Sakovajo Protocol-oversætteren",
      "Værktøjer til sikker kommunikation",
      "Eksperimentelle webværktøjer og demoer",
      "Bygget med Next.js og hostet på Vercel",
    ],
    linkLabels: ["Besøg Ztionix"],
    screenshotAlts: ["Ztionix' forside", "Sakovajo Protocol-oversætteren"],
  },
  zlib: {
    description:
      "Del filer, tekst og links sikkert. Alt krypteres i browseren, og links kan slette sig selv efter de er læst.",
    longDescription:
      "zlib.lol er en tjeneste til at dele filer og links, hvor serveren aldrig kan læse indholdet. Træk filer ind, indsæt tekst eller forkort et link. Alt bliver krypteret i browseren, før det sendes. Links kan slettes efter første visning, udløbe efter et stykke tid eller blive liggende, til du selv sletter dem. Ingen konti og ingen sporing.",
    features: [
      "Kryptering i browseren før upload",
      "Sletning efter læsning og tidsbegrænsede links",
      "Del filer med træk og slip",
      "Linkforkorter med privatlivsindstillinger",
    ],
    linkLabels: ["Åbn zlib.lol"],
    screenshotAlts: ["zlib.lol's forside", "Et link er oprettet", "Visning af en delt tekst"],
  },
  noteai: {
    description:
      "Upload forelæsninger, PDF'er eller slides og få pæne noter i Markdown, klar til Obsidian, på få sekunder.",
    longDescription:
      "NoteForge AI laver rodet undervisningsmateriale om til overskuelige noter. Upload PDF'er, slides, billeder eller tekst, og Gemini laver det om til Markdown med overskrifter, punktlister og matematik i LaTeX. Bygget til studerende, der hellere vil bruge tiden på at lære end på at formatere.",
    features: [
      "Upload PDF'er, slides, billeder eller tekst",
      "Markdown klar til Obsidian",
      "Matematik vises med KaTeX",
      "Drevet af Google Gemini",
    ],
    linkLabels: ["Prøv NoteForge AI"],
    screenshotAlts: ["NoteForge AI's uploadskærm"],
  },
  packetspy: {
    description:
      "Et Minecraft-mod der logger alle netværkspakker og viser dem på en lokal hjemmeside, så man kan fejlfinde.",
    longDescription:
      "PacketSpy er et Minecraft-mod til udviklere, der vil se trafikken mellem klient og server. Det logger alle pakker, der sendes og modtages, og viser dem på et lokalt dashboard over WebSockets, hvor man kan filtrere og undersøge dem live. Nyttigt for mod- og serverudviklere, der vil se, hvad der faktisk bliver sendt.",
    features: [
      "Logger pakker i realtid",
      "Lokalt web-dashboard over WebSockets",
      "Filtrer og undersøg protokoldata",
      "Lavet til fejlfinding af mods og servere",
    ],
    linkLabels: ["Se på Modrinth"],
    screenshotAlts: ["PacketSpys dashboard i terminalen", "Pakkelog med udfoldet indhold"],
  },
  catzycraft: {
    description:
      "En Minecraft-modpakke med en blanding af fjollet sjov og teknik, lavet til at spille med vennerne.",
    longDescription:
      "CatzyCraft er en håndplukket Minecraft-modpakke, der blander fjollet kattetema med rigtig teknik: Create, lagersystemer og mods der gør hverdagen nemmere. Den er sat op til multiplayer med venner og er nem at installere.",
    features: [
      "God balance mellem sjove mods og teknik",
      "Optimeret til multiplayer",
      "Create og automatisering",
      "Installeres med ét klik via Modrinth",
    ],
    linkLabels: ["Download på Modrinth"],
  },
  snipclip: {
    description:
      "Udklipsholder-historik og skærmklip i ét lille Windows-program, med tegneværktøjer og sløring.",
    longDescription:
      "SnipClip er et Windows-program lavet til Stardance / Hack Club med Tauri, Rust og React. Det gemmer alt, du kopierer, i en lokal SQLite-database og har et værktøj til skærmklip med pen, pile, markering, sløring af pixels, zoom og panorering. Programmet ligger i systembakken: Ctrl+Shift+V åbner historikken, og Ctrl+Shift+S tager et skærmklip.",
    features: [
      "Historik for tekst, links og billeder i SQLite",
      "Skærmklip med tegning, sløring, zoom og panorering",
      "Rediger gamle skærmbilleder fra historikken",
      "Genvejstaster og kørsel i systembakken",
      "Rydder automatisk historik, der ikke er fastgjort",
    ],
    linkLabels: ["Download til Windows", "GitHub"],
    screenshotAlts: ["Udklipshistorik filtreret på billeder", "Markering af område til skærmklip", "Indstillinger for opstart, genveje og oprydning", "SnipClip-ikonet"],
  },
  aurawatch: {
    description:
      "Find film, serier, anime og musik ud fra dit humør. Beskriv stemningen og få forslag, der faktisk passer.",
    longDescription:
      "AuraWatch er en anbefalingstjeneste lavet til Stardance / Hack Club. Vælg format og genrer, beskriv en stemning eller søg efter noget, der minder om en titel du kan lide, og få en håndfuld forslag med plakater og hvor du kan streame dem. Der er to temaer, streamingtjenester tilpasset dit land via TMDB og lyttelinks til sange via iTunes.",
    features: [
      "Film, serier, anime, sange eller det hele",
      "Søg på stemning eller lignende titler",
      "Viser streamingtjenester for dit land",
      "To temaer, som huskes i browseren",
      "Gemini og TMDB med lokalt katalog som backup",
    ],
    linkLabels: ["Åbn AuraWatch", "GitHub"],
    screenshotAlts: ["AuraWatch med minimalt tema", "Sangforslag i AuraWatch"],
  },
  "ztionix-os": {
    description:
      "Et helt skrivebord i browseren med opstartsskærm, vinduer du kan trække rundt, et rigtigt filsystem og en masse små apps.",
    longDescription:
      "ZtionixOS er et styresystem i browseren lavet til Stardance / Hack Club. Du starter på en loginskærm og lander på et skrivebord med topbar, dock og vinduer. Filsystemet gemmes i IndexedDB, du kan trække filer ind, og der er apps til filer, terminal, editor, browser, tegning, musik og video, tekstbehandling, regneark, præsentationer, Snake, Doom og meget mere.",
    features: [
      "Vinduer der kan flyttes, ændres og snappes",
      "Filsystem der gemmes i IndexedDB",
      "Dock, temaer og baggrunde i indstillinger",
      "Tekstbehandling, regneark og præsentationer",
      "Doom, Snake, Photo Booth og andre påskeæg",
    ],
    linkLabels: ["Åbn ZtionixOS", "GitHub"],
    screenshotAlts: ["ZtionixOS-skrivebord med åbne apps"],
  },
  omnitab: {
    description: "En ny fane der faktisk er nyttig: ét felt til søgning, links og Gemini.",
    longDescription:
      "OmniTab erstatter den tomme nye fane med et felt, der kan søge, åbne adresser eller spørge Gemini med skråstregs-kommandoer. Der er hurtigopkald, som kan sorteres med træk og slip, import af bogmærker, en notesblok og valgfrie widgets til ur, vejr, fokus, nyheder og dagens citat. Ingen login. Alt gemmes i browseren.",
    features: [
      "Ét felt til søgning, adresser og Gemini",
      "Vælg søgemaskine eller brug @genveje",
      "Hurtigopkald med Ctrl+1–9",
      "Notesblok og valgfrie widgets",
      "Gemini-nøgler holdes sikkert på serveren",
    ],
    linkLabels: ["Åbn OmniTab", "GitHub"],
    screenshotAlts: ["OmniTabs opsætningsguide ved første start"],
  },
};
