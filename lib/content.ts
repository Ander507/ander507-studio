import type { Locale } from "./i18n";

export interface PriceRow {
  name: string;
  price: string;
  /** Numeric starting price for structured data. */
  amount: number;
  description: string;
  includes: string[];
}

export interface Content {
  meta: { title: string; description: string };
  nav: {
    work: string;
    services: string;
    prices: string;
    faq: string;
    cta: string;
    switchTo: string;
    theme: string;
  };
  hero: {
    title: string;
    body: string;
    cta: string;
    secondary: string;
    location: string;
    placeholderDomain: string;
    placeholderText: string;
    placeholderCta: string;
    tryLabel: string;
    tryPlaceholder: string;
    tryStyle: string;
    tldSuffix: string;
    mock: { links: string[]; tagline: string; button: string };
  };
  services: { title: string; items: { name: string; description: string }[] };
  work: { title: string; all: string };
  process: { title: string; steps: { name: string; description: string }[] };
  prices: {
    title: string;
    intro: string;
    from: string;
    currency: "USD" | "DKK";
    rows: PriceRow[];
    hourly: string;
  };
  calculator: {
    title: string;
    intro: string;
    typeLabel: string;
    extrasLabel: string;
    extras: { id: string; label: string; amount: number }[];
    hostingLabel: string;
    hostingAmount: number;
    perMonth: string;
    resultLabel: string;
    note: string;
    appNote: string;
    send: string;
    briefIntro: string;
  };
  faq: { title: string; items: { q: string; a: string }[] };
  contact: {
    title: string;
    body: string;
    discordPrefix: string;
    discordLink: string;
    emailPrefix: string;
    form: {
      name: string;
      email: string;
      type: string;
      types: string[];
      budget: string;
      budgets: string[];
      /** Upper limits (exclusive) for budgets[1], budgets[2], budgets[3]; anything above is budgets[4]. */
      budgetLimits: number[];
      details: string;
      detailsPlaceholder: string;
      submit: string;
      sending: string;
      replyNote: string;
      privacyNote: string;
      privacyLink: string;
      sentTitle: string;
      sentBody: string;
      genericError: string;
    };
  };
  projectsPage: { title: string; body: string; all: string; ctaTitle: string; ctaBody: string; cta: string };
  project: {
    back: string;
    about: string;
    features: string;
    type: string;
    status: string;
    builtWith: string;
    enlarge: string;
    viewer: string;
    close: string;
    prev: string;
    next: string;
  };
  bio: { tagline: string; hire: string; socials: string; work: string };
  footer: { contact: string; terms: string; privacy: string };
}

const en: Content = {
  meta: {
    title: "Freelance web developer for small businesses · Ander507",
    description:
      "Get a custom website or web app from a freelance developer in Denmark. Websites from $350 with a fixed price, direct contact, and full ownership of the code.",
  },
  nav: { work: "Work", services: "Services", prices: "Prices", faq: "FAQ", cta: "Get a quote", switchTo: "Dansk", theme: "Switch light/dark mode" },
  hero: {
    title: "I'm Anders, and I build websites.",
    body: "Custom websites and web apps for small businesses and creators. You talk to me directly, get a fixed price before anything starts, and own everything when it's done.",
    cta: "Get a quote",
    secondary: "See what I've built",
    location: "Based in Denmark, working with clients anywhere.",
    placeholderDomain: "yourbusiness.com",
    placeholderText: "Your site could be the next one here.",
    placeholderCta: "Get a quote",
    tryLabel: "Try it with your business name",
    tryPlaceholder: "e.g. Hansen's Bakery",
    tryStyle: "Change style",
    tldSuffix: ".com",
    mock: { links: ["About", "Prices", "Contact"], tagline: "Good to see you. Come by, or book a time online.", button: "Book now" },
  },
  services: {
    title: "What I make",
    items: [
      {
        name: "Landing pages",
        description:
          "One page that explains what you do and gets people to call, book, or sign up. Good for a new business, a product launch, or an event.",
      },
      {
        name: "Business websites",
        description:
          "A proper site for your company, shop, or practice, with the pages you need and content you can update yourself.",
      },
      {
        name: "Web apps",
        description:
          "Booking systems, dashboards, internal tools, and anything with logins, a database, payments, or AI.",
      },
      {
        name: "Fixes and redesigns",
        description:
          "Your current site is slow, broken on phones, or looks dated. I fix what's wrong without starting from scratch.",
      },
    ],
  },
  work: { title: "Things I've built", all: "All projects" },
  process: {
    title: "How it works",
    steps: [
      { name: "You send a short brief", description: "What you need, who it's for, and when. A few lines is plenty." },
      { name: "I send a fixed price", description: "Scope, price, and timeline in writing within a couple of days." },
      { name: "I build it", description: "You get a preview link early and can give feedback as it comes together." },
      { name: "We launch", description: "It goes live on your domain, and you get the code and all the logins." },
    ],
  },
  prices: {
    title: "Prices",
    intro:
      "These are starting prices. Every project gets a fixed price up front, so the number you agree to is the number you pay. Excl. VAT.",
    from: "from",
    currency: "USD",
    rows: [
      {
        name: "Landing page",
        price: "$350",
        amount: 350,
        description: "One page with your offer, a contact form, and the basics for Google.",
        includes: ["Custom design", "Contact form", "Hosting setup on your domain"],
      },
      {
        name: "Website",
        price: "$900",
        amount: 900,
        description: "A full site of up to 8 pages that you can update yourself.",
        includes: ["Custom design", "Easy content editing", "Analytics and Google setup", "Two rounds of changes"],
      },
      {
        name: "Web app",
        price: "$2,200",
        amount: 2200,
        description: "Anything with accounts, data, payments, or AI. We scope it together first.",
        includes: ["Next.js and React", "Database, login, and payments", "Admin pages where needed"],
      },
    ],
    hourly: "Small changes and fixes on an existing site: $45 per hour.",
  },
  calculator: {
    title: "What would mine cost?",
    intro: "Pick what you need and see a rough price right away.",
    typeLabel: "Type",
    extrasLabel: "Extras",
    extras: [
      { id: "booking", label: "Online booking", amount: 300 },
      { id: "shop", label: "Web shop (up to 20 products)", amount: 600 },
      { id: "blog", label: "Blog or news", amount: 220 },
      { id: "language", label: "Extra language", amount: 220 },
      { id: "copy", label: "I write the texts for you", amount: 150 },
      { id: "brand", label: "Help with logo and colors", amount: 150 },
    ],
    hostingLabel: "Hosting and updates after launch",
    hostingAmount: 20,
    perMonth: "/month",
    resultLabel: "Around",
    note: "Excl. VAT. The final price is fixed once I know the details.",
    appNote: "Excl. VAT. Web apps vary a lot, so treat this as a starting point.",
    send: "Send this as a request",
    briefIntro: "From the price calculator:",
  },
  faq: {
    title: "Questions",
    items: [
      {
        q: "How long does it take?",
        a: "A landing page usually takes about a week. A full website takes 2–4 weeks. Apps depend on the scope, and you get a timeline with the price.",
      },
      {
        q: "How do I pay?",
        a: "You get an invoice by email and pay by bank transfer. Half when we start and half when the site goes live. Small jobs are paid in full at the end. Prices are excl. VAT, which is added to the invoice where required.",
      },
      {
        q: "Do I own the website?",
        a: "Yes. The domain, hosting, and code are set up on your own accounts, and you get the full source code.",
      },
      {
        q: "Can I change the text and images myself?",
        a: "Yes. If you need to update content, I set it up so you can do that without touching code.",
      },
      {
        q: "What if something breaks after launch?",
        a: "I fix bugs in my own work for free for 30 days after launch. After that, I can help with changes at the hourly rate.",
      },
    ],
  },
  contact: {
    title: "Tell me about your project",
    body: "I'll reply within 1–2 days with questions or a fixed price. Asking is free.",
    discordPrefix: "Rather chat?",
    discordLink: "Message me on Discord",
    emailPrefix: "or email",
    form: {
      name: "Name",
      email: "Email",
      type: "What do you need?",
      types: ["Landing page", "Website", "Web app", "Fix or redesign", "Something else"],
      budget: "Budget",
      budgets: ["Not sure yet", "Under $500", "$500–1,200", "$1,200–3,000", "Over $3,000"],
      budgetLimits: [500, 1200, 3000],
      details: "About the project",
      detailsPlaceholder: "What does your business do, what should the site do, and when do you need it?",
      submit: "Send",
      sending: "Sending…",
      replyNote: "I usually reply within 1–2 days.",
      privacyNote: "I only use your details to reply to you.",
      privacyLink: "Privacy policy",
      sentTitle: "Sent. Thanks!",
      sentBody: "I'll get back to you within 1–2 days.",
      genericError: "The message didn't go through. Try again, or message me on Discord.",
    },
  },
  projectsPage: {
    title: "Everything I've built",
    body: "Websites, web apps, desktop tools, and a few Minecraft projects.",
    all: "All",
    ctaTitle: "Want something built?",
    ctaBody: "Send a short brief and get a fixed price.",
    cta: "Get a quote",
  },
  project: {
    back: "All projects",
    about: "About the project",
    features: "What it does",
    type: "Type",
    status: "Status",
    builtWith: "Built with",
    enlarge: "Enlarge screenshot",
    viewer: "Screenshot viewer",
    close: "Close",
    prev: "Previous screenshot",
    next: "Next screenshot",
  },
  bio: { tagline: "Websites and web apps for hire.", hire: "Hire me for a website", socials: "Socials", work: "Projects" },
  footer: { contact: "Contact", terms: "Terms", privacy: "Privacy" },
};

const da: Content = {
  meta: {
    title: "Få lavet en hjemmeside · Webudvikler til små virksomheder · Ander507",
    description:
      "Få lavet en hjemmeside eller webapp af en freelance webudvikler i Danmark. Hjemmesider fra 2.500 kr. til fast pris, med direkte kontakt, og du ejer koden.",
  },
  nav: { work: "Projekter", services: "Ydelser", prices: "Priser", faq: "Spørgsmål", cta: "Få et tilbud", switchTo: "English", theme: "Skift mellem lyst og mørkt tema" },
  hero: {
    title: "Jeg hedder Anders, og jeg laver hjemmesider.",
    body: "Hjemmesider og webapps til små virksomheder og selvstændige. Du taler direkte med mig, får en fast pris før vi går i gang, og ejer det hele bagefter.",
    cta: "Få et tilbud",
    secondary: "Se hvad jeg har lavet",
    location: "Bor i Danmark og arbejder for kunder overalt.",
    placeholderDomain: "ditfirma.dk",
    placeholderText: "Din side kunne være den næste her.",
    placeholderCta: "Få et tilbud",
    tryLabel: "Prøv med dit eget firmanavn",
    tryPlaceholder: "fx Bager Hansen",
    tryStyle: "Skift stil",
    tldSuffix: ".dk",
    mock: { links: ["Om os", "Priser", "Kontakt"], tagline: "Godt at se dig. Kig forbi, eller book en tid online.", button: "Book tid" },
  },
  services: {
    title: "Det laver jeg",
    items: [
      {
        name: "Landingssider",
        description:
          "Én side, der forklarer hvad du laver og får folk til at ringe, booke eller skrive sig op. God til en ny virksomhed, et produkt eller et event.",
      },
      {
        name: "Hjemmesider til virksomheder",
        description:
          "En ordentlig hjemmeside til din virksomhed, butik eller klinik, med de sider du har brug for, og indhold du selv kan rette.",
      },
      {
        name: "Webapps",
        description:
          "Bookingsystemer, dashboards, interne værktøjer og alt med login, database, betaling eller AI.",
      },
      {
        name: "Rettelser og redesign",
        description:
          "Din nuværende side er langsom, virker dårligt på mobil eller ser gammel ud. Jeg retter det, uden at starte forfra.",
      },
    ],
  },
  work: { title: "Det har jeg lavet", all: "Alle projekter" },
  process: {
    title: "Sådan foregår det",
    steps: [
      { name: "Du skriver kort hvad du har brug for", description: "Hvad, til hvem og hvornår. Et par linjer er nok." },
      { name: "Jeg sender en fast pris", description: "Opgave, pris og tidsplan på skrift inden for et par dage." },
      { name: "Jeg bygger siden", description: "Du får et link til en forhåndsvisning tidligt og kan komme med feedback undervejs." },
      { name: "Vi går live", description: "Siden kommer online på dit domæne, og du får koden og alle login." },
    ],
  },
  prices: {
    title: "Priser",
    intro:
      "Det her er startpriser. Alle opgaver får en fast pris på forhånd, så den pris vi aftaler, er den du betaler. Ekskl. moms.",
    from: "fra",
    currency: "DKK",
    rows: [
      {
        name: "Landingsside",
        price: "2.500 kr.",
        amount: 2500,
        description: "Én side med dit tilbud, en kontaktformular og det basale til Google.",
        includes: ["Eget design", "Kontaktformular", "Opsætning på dit domæne"],
      },
      {
        name: "Hjemmeside",
        price: "6.000 kr.",
        amount: 6000,
        description: "En hel hjemmeside på op til 8 sider, som du selv kan opdatere.",
        includes: ["Eget design", "Nem redigering af indhold", "Statistik og Google-opsætning", "To rettelsesrunder"],
      },
      {
        name: "Webapp",
        price: "15.000 kr.",
        amount: 15000,
        description: "Alt med brugere, data, betaling eller AI. Vi afgrænser opgaven sammen først.",
        includes: ["Next.js og React", "Database, login og betaling", "Administrationssider efter behov"],
      },
    ],
    hourly: "Små ændringer og rettelser på en eksisterende side: 300 kr. i timen.",
  },
  calculator: {
    title: "Hvad koster min?",
    intro: "Vælg hvad du har brug for, og se en cirkapris med det samme.",
    typeLabel: "Type",
    extrasLabel: "Tilvalg",
    extras: [
      { id: "booking", label: "Online booking", amount: 2000 },
      { id: "shop", label: "Webshop (op til 20 varer)", amount: 4000 },
      { id: "blog", label: "Blog eller nyheder", amount: 1500 },
      { id: "language", label: "Ekstra sprog", amount: 1500 },
      { id: "copy", label: "Jeg skriver teksterne for dig", amount: 1000 },
      { id: "brand", label: "Hjælp med logo og farver", amount: 1000 },
    ],
    hostingLabel: "Hosting og opdateringer efter lancering",
    hostingAmount: 150,
    perMonth: "/md.",
    resultLabel: "Cirka",
    note: "Ekskl. moms. Den endelige pris ligger fast, når jeg kender detaljerne.",
    appNote: "Ekskl. moms. Webapps varierer meget, så se det her som et udgangspunkt.",
    send: "Send det her som forespørgsel",
    briefIntro: "Fra prisberegneren:",
  },
  faq: {
    title: "Spørgsmål",
    items: [
      {
        q: "Hvor lang tid tager det?",
        a: "En landingsside tager typisk omkring en uge. En hel hjemmeside tager 2–4 uger. Apps afhænger af opgaven, og du får en tidsplan sammen med prisen.",
      },
      {
        q: "Hvordan betaler jeg?",
        a: "Du får en faktura på mail og betaler med bankoverførsel. Halvdelen når vi starter, og resten når siden går live. Små opgaver betales samlet til sidst. Priserne er ekskl. moms, som lægges på fakturaen.",
      },
      {
        q: "Ejer jeg hjemmesiden?",
        a: "Ja. Domæne, hosting og kode sættes op på dine egne konti, og du får hele kildekoden.",
      },
      {
        q: "Kan jeg selv rette tekst og billeder?",
        a: "Ja. Hvis du har brug for at opdatere indhold, sætter jeg det op, så du kan gøre det uden at røre koden.",
      },
      {
        q: "Hvad hvis noget går i stykker efter lancering?",
        a: "Fejl i mit eget arbejde retter jeg gratis i 30 dage efter lancering. Derefter hjælper jeg gerne til timeprisen.",
      },
    ],
  },
  contact: {
    title: "Fortæl om dit projekt",
    body: "Jeg svarer inden for 1–2 dage med spørgsmål eller en fast pris. Det er gratis at spørge.",
    discordPrefix: "Vil du hellere skrive?",
    discordLink: "Skriv til mig på Discord",
    emailPrefix: "eller send en mail til",
    form: {
      name: "Navn",
      email: "E-mail",
      type: "Hvad har du brug for?",
      types: ["Landingsside", "Hjemmeside", "Webapp", "Rettelse eller redesign", "Noget andet"],
      budget: "Budget",
      budgets: ["Ved ikke endnu", "Under 3.000 kr.", "3.000–8.000 kr.", "8.000–20.000 kr.", "Over 20.000 kr."],
      budgetLimits: [3000, 8000, 20000],
      details: "Om projektet",
      detailsPlaceholder: "Hvad laver din virksomhed, hvad skal siden kunne, og hvornår skal den være klar?",
      submit: "Send",
      sending: "Sender…",
      replyNote: "Jeg svarer normalt inden for 1–2 dage.",
      privacyNote: "Jeg bruger kun dine oplysninger til at svare dig.",
      privacyLink: "Privatlivspolitik",
      sentTitle: "Sendt. Tak!",
      sentBody: "Jeg vender tilbage inden for 1–2 dage.",
      genericError: "Beskeden blev ikke sendt. Prøv igen, eller skriv til mig på Discord.",
    },
  },
  projectsPage: {
    title: "Alt hvad jeg har lavet",
    body: "Hjemmesider, webapps, desktop-programmer og et par Minecraft-projekter.",
    all: "Alle",
    ctaTitle: "Skal du have lavet noget?",
    ctaBody: "Skriv kort hvad du har brug for, og få en fast pris.",
    cta: "Få et tilbud",
  },
  project: {
    back: "Alle projekter",
    about: "Om projektet",
    features: "Det kan den",
    type: "Type",
    status: "Status",
    builtWith: "Bygget med",
    enlarge: "Forstør skærmbillede",
    viewer: "Billedfremviser",
    close: "Luk",
    prev: "Forrige skærmbillede",
    next: "Næste skærmbillede",
  },
  bio: { tagline: "Hjemmesider og webapps på bestilling.", hire: "Få lavet en hjemmeside", socials: "Sociale medier", work: "Projekter" },
  footer: { contact: "Kontakt", terms: "Handelsbetingelser", privacy: "Privatliv" },
};

const CONTENT: Record<Locale, Content> = { en, da };

export function getContent(locale: Locale): Content {
  return CONTENT[locale];
}
