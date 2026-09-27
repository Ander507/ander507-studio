import type { Locale } from "./i18n";

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalDocument {
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export type LegalKind = "terms" | "privacy";

const LAST_UPDATED = { da: "Senest opdateret 27. september 2026", en: "Last updated 27 September 2026" };

const termsDa: LegalDocument = {
  title: "Handelsbetingelser",
  description: "Betingelser for hjemmesider, webapps og andre opgaver fra ander507.dev.",
  updated: LAST_UPDATED.da,
  intro:
    "Disse betingelser gælder, når du bestiller en hjemmeside, en webapp, rettelser eller hosting hos mig (Anders, ander507.dev). Står der noget andet i dit skriftlige tilbud, gælder tilbuddet.",
  sections: [
    {
      heading: "1. Tilbud og aftale",
      paragraphs: [
        "Før vi starter, får du et skriftligt tilbud med opgaven, prisen og en tidsplan. Aftalen er indgået, når du har accepteret tilbuddet skriftligt, fx på mail eller Discord.",
        "Tilbuddet gælder i 30 dage. Arbejde, der ikke står i tilbuddet, laves kun efter aftale og afregnes til timeprisen eller en ny fast pris.",
      ],
    },
    {
      heading: "2. Priser og betaling",
      paragraphs: [
        "Alle priser på siden er ekskl. moms. Fakturaer sendes via Factofly, som lægger moms på, hvor det kræves.",
        "Medmindre andet er aftalt, betales 50 % ved start og 50 % når siden er klar til at gå live. Små opgaver betales samlet, når de er færdige. Betalingsfristen er 8 dage.",
        "Hvis en faktura ikke betales til tiden, kan jeg sætte arbejdet på pause, indtil den er betalt.",
      ],
    },
    {
      heading: "3. Dit indhold",
      paragraphs: [
        "Du sørger for tekster, billeder, logoer og andet indhold, medmindre vi har aftalt, at jeg laver det. Du står inde for, at du har ret til at bruge det indhold, du sender mig.",
        "Hvis indhold eller feedback bliver forsinket, rykker tidsplanen tilsvarende.",
      ],
    },
    {
      heading: "4. Rettelser og godkendelse",
      paragraphs: [
        "Du får et link til en forhåndsvisning undervejs. Antallet af rettelsesrunder står i tilbuddet. Ekstra runder eller ændringer, der ligger uden for tilbuddet, afregnes til timeprisen.",
        "Når du har godkendt siden, eller den har været online i 14 dage uden indsigelser, regnes opgaven som leveret.",
      ],
    },
    {
      heading: "5. Ejerskab",
      paragraphs: [
        "Når alt er betalt, ejer du hjemmesiden, dit indhold og den kode, jeg har skrevet til dig. Du får adgang til koden og alle login.",
        "Open source-biblioteker og værktøjer, som siden er bygget med, følger deres egne licenser.",
        "Jeg må vise projektet i min portfolio, medmindre du beder mig lade være.",
      ],
    },
    {
      heading: "6. Fejl efter lancering",
      paragraphs: [
        "Fejl i mit arbejde retter jeg gratis i 30 dage efter lancering. Det dækker ikke nye ønsker, ændringer du selv har lavet, eller fejl hos andre tjenester som hosting, domæneudbydere eller betalingsløsninger.",
      ],
    },
    {
      heading: "7. Hosting og vedligeholdelse",
      paragraphs: [
        "Hvis du har valgt hosting og opdateringer, faktureres det forud for den aftalte periode. Det kan opsiges med 1 måneds varsel til udgangen af en betalt periode.",
        "Domæne og hosting sættes så vidt muligt op i dit eget navn. Udgifter til domæne og eventuelle betalte tjenester betaler du selv, medmindre andet er aftalt.",
      ],
    },
    {
      heading: "8. Fortrydelsesret for private",
      paragraphs: [
        "Er du privatperson, har du 14 dages fortrydelsesret fra den dag, aftalen blev indgået. Skriv til ander507inc@gmail.com, hvis du vil fortryde.",
        "Beder du mig om at starte arbejdet inden for de 14 dage, og fortryder du derefter, betaler du for det arbejde, der allerede er lavet. Er opgaven helt færdig inden for de 14 dage efter din udtrykkelige anmodning, bortfalder fortrydelsesretten.",
      ],
    },
    {
      heading: "9. Opsigelse af et projekt",
      paragraphs: [
        "Du kan stoppe et projekt når som helst. Du betaler for det arbejde, der er lavet indtil da, og beløb, der allerede er betalt for udført arbejde, refunderes ikke.",
      ],
    },
    {
      heading: "10. Ansvar",
      paragraphs: [
        "Jeg laver arbejdet omhyggeligt og efter bedste evne. Mit samlede ansvar er begrænset til det beløb, du har betalt for den pågældende opgave. Jeg er ikke ansvarlig for indirekte tab, fx tabt omsætning, eller for nedbrud og fejl hos tredjeparter som hosting- og domæneudbydere.",
        "Begrænsningerne gælder ikke, hvis andet følger af ufravigelig lovgivning, fx forbrugerbeskyttelse.",
      ],
    },
    {
      heading: "11. Uenigheder",
      paragraphs: [
        "Dansk ret gælder. Vi prøver altid først at finde en løsning sammen. Er du privatperson, kan du også klage til Nævnenes Hus (naevneneshus.dk).",
      ],
    },
  ],
};

const termsEn: LegalDocument = {
  title: "Terms of service",
  description: "Terms for websites, web apps, and other work from ander507.dev.",
  updated: LAST_UPDATED.en,
  intro:
    "These terms apply when you order a website, a web app, fixes, or hosting from me (Anders, ander507.dev). If your written quote says something different, the quote applies.",
  sections: [
    {
      heading: "1. Quote and agreement",
      paragraphs: [
        "Before we start, you get a written quote with the scope, price, and timeline. The agreement is made when you accept the quote in writing, for example by email or on Discord.",
        "A quote is valid for 30 days. Work outside the quote is only done if we agree on it, at the hourly rate or a new fixed price.",
      ],
    },
    {
      heading: "2. Prices and payment",
      paragraphs: [
        "All prices on the site exclude VAT. Invoices are sent through Factofly, which adds VAT where required.",
        "Unless agreed otherwise, 50% is paid when we start and 50% when the site is ready to go live. Small jobs are paid in full when finished. Payment is due within 8 days.",
        "If an invoice isn't paid on time, I may pause the work until it is.",
      ],
    },
    {
      heading: "3. Your content",
      paragraphs: [
        "You provide texts, images, logos, and other content unless we've agreed that I make them. You confirm that you have the right to use the content you send me.",
        "If content or feedback is delayed, the timeline moves accordingly.",
      ],
    },
    {
      heading: "4. Changes and approval",
      paragraphs: [
        "You get a preview link along the way. The number of revision rounds is stated in the quote. Extra rounds or changes outside the quote are charged at the hourly rate.",
        "The work counts as delivered when you approve it, or when the site has been live for 14 days without objections.",
      ],
    },
    {
      heading: "5. Ownership",
      paragraphs: [
        "Once everything is paid, you own the website, your content, and the code I wrote for you. You get access to the code and all logins.",
        "Open source libraries and tools used to build the site keep their own licenses.",
        "I may show the project in my portfolio unless you ask me not to.",
      ],
    },
    {
      heading: "6. Bugs after launch",
      paragraphs: [
        "I fix bugs in my own work for free for 30 days after launch. This doesn't cover new requests, changes you've made yourself, or problems with other services such as hosting, domain providers, or payment providers.",
      ],
    },
    {
      heading: "7. Hosting and maintenance",
      paragraphs: [
        "If you've chosen hosting and updates, it's invoiced in advance for the agreed period. You can cancel with 1 month's notice, effective at the end of a paid period.",
        "Where possible, the domain and hosting are set up in your own name. You pay for the domain and any paid services yourself unless agreed otherwise.",
      ],
    },
    {
      heading: "8. Right of withdrawal for consumers",
      paragraphs: [
        "If you're a private individual in the EU, you can withdraw from the agreement within 14 days of making it. Email ander507inc@gmail.com to withdraw.",
        "If you ask me to start within those 14 days and then withdraw, you pay for the work already done. If the work is fully completed within the 14 days at your explicit request, the right of withdrawal no longer applies.",
      ],
    },
    {
      heading: "9. Stopping a project",
      paragraphs: [
        "You can stop a project at any time. You pay for the work done up to that point, and amounts already paid for completed work aren't refunded.",
      ],
    },
    {
      heading: "10. Liability",
      paragraphs: [
        "I do the work carefully and to the best of my ability. My total liability is limited to the amount you paid for the job in question. I'm not liable for indirect losses, such as lost revenue, or for outages and errors at third parties such as hosting and domain providers.",
        "These limits don't apply where mandatory law, such as consumer protection law, says otherwise.",
      ],
    },
    {
      heading: "11. Disputes",
      paragraphs: [
        "Danish law applies. We'll always try to find a solution together first. Consumers in Denmark can also complain to Nævnenes Hus (naevneneshus.dk).",
      ],
    },
  ],
};

const privacyDa: LegalDocument = {
  title: "Privatlivspolitik",
  description: "Hvilke oplysninger ander507.dev indsamler, hvorfor, og hvad dine rettigheder er.",
  updated: LAST_UPDATED.da,
  intro:
    "Jeg indsamler så få oplysninger som muligt. Her kan du se præcis hvad, hvorfor og hvor længe. Dataansvarlig er Anders (ander507.dev), som du kan kontakte på ander507inc@gmail.com.",
  sections: [
    {
      heading: "Når du skriver via kontaktformularen",
      paragraphs: [
        "Jeg modtager dit navn, din e-mail, hvilken type opgave du har brug for, dit budget og din besked. Jeg bruger det kun til at svare dig og give dig et tilbud. Grundlaget er, at du selv har bedt om at blive kontaktet (GDPR art. 6, stk. 1, litra b).",
        "Beskeden leveres til en privat Discord-kanal, som kun jeg har adgang til. Discord er et amerikansk firma. Henvendelser, der ikke bliver til en opgave, sletter jeg senest 12 måneder efter.",
      ],
    },
    {
      heading: "Når du bliver kunde",
      paragraphs: [
        "For at kunne fakturere bruger jeg Factofly, som får dit navn, din adresse, din e-mail og eventuelt dit CVR-nummer. Factofly gemmer fakturaer i 5 år, som bogføringsloven kræver. Grundlaget er aftalen mellem os og lovkrav (art. 6, stk. 1, litra b og c).",
        "Vores korrespondance om opgaven gemmer jeg, så længe vi arbejder sammen, og op til 3 år efter, i tilfælde af spørgsmål eller reklamationer.",
      ],
    },
    {
      heading: "Når du besøger siden",
      paragraphs: [
        "Siden hostes hos Vercel. Som alle webservere registrerer de teknisk information som IP-adresse og browser i en kort periode for at kunne drive og beskytte siden.",
        "Jeg bruger Vercel Web Analytics til at se, hvor mange der besøger siderne. Det bruger ikke cookies og kan ikke bruges til at genkende dig på tværs af sider eller dage.",
        "Skrifttypen ligger på min egen server, så din browser kontakter ikke Google Fonts.",
      ],
    },
    {
      heading: "Cookies og lokal lagring",
      paragraphs: [
        "Siden bruger ingen cookies til reklame eller sporing, og derfor er der ingen cookie-banner. Der gemmes kun to ting i din browser, og kun for at huske dine valg:",
      ],
      list: [
        "Cookien \"lang\" husker, om du vil se siden på dansk eller engelsk (gemmes i 1 år).",
        "\"theme\" i din browsers lokale lagring husker, om du har valgt lyst eller mørkt tema.",
      ],
    },
    {
      heading: "NoteForge AI",
      paragraphs: [
        "Bruger du NoteForge AI på /noteai, sendes de filer og den tekst, du uploader, til Googles Gemini-tjeneste for at lave dine noter. Upload ikke fortrolige eller personfølsomme oplysninger.",
      ],
    },
    {
      heading: "Tjenester uden for EU",
      paragraphs: [
        "Discord, Vercel og Google er amerikanske virksomheder. Overførsel af oplysninger til dem sker efter de lovlige overførselsgrundlag, de stiller til rådighed, fx EU-U.S. Data Privacy Framework eller EU-Kommissionens standardkontraktbestemmelser. Jeg sælger aldrig dine oplysninger og deler dem ikke med andre end de tjenester, der står her.",
      ],
    },
    {
      heading: "Dine rettigheder",
      paragraphs: ["Skriv til ander507inc@gmail.com, hvis du vil bruge en af dine rettigheder. Du har ret til at:"],
      list: [
        "få at vide, hvilke oplysninger jeg har om dig, og få en kopi",
        "få forkerte oplysninger rettet",
        "få dine oplysninger slettet, når jeg ikke længere skal gemme dem",
        "gøre indsigelse mod eller begrænse behandlingen",
        "få dine oplysninger udleveret i et almindeligt format",
        "klage til Datatilsynet (datatilsynet.dk)",
      ],
    },
    {
      heading: "Ændringer",
      paragraphs: ["Hvis jeg ændrer, hvordan jeg bruger dine oplysninger, opdaterer jeg denne side og datoen øverst."],
    },
  ],
};

const privacyEn: LegalDocument = {
  title: "Privacy policy",
  description: "What information ander507.dev collects, why, and what your rights are.",
  updated: LAST_UPDATED.en,
  intro:
    "I collect as little information as possible. This page explains exactly what, why, and for how long. The data controller is Anders (ander507.dev), who you can reach at ander507inc@gmail.com.",
  sections: [
    {
      heading: "When you use the contact form",
      paragraphs: [
        "I receive your name, email, the type of project, your budget, and your message. I only use it to reply to you and give you a quote. The legal basis is that you asked to be contacted (GDPR Art. 6(1)(b)).",
        "The message is delivered to a private Discord channel that only I can access. Discord is a US company. Enquiries that don't turn into a project are deleted within 12 months.",
      ],
    },
    {
      heading: "When you become a client",
      paragraphs: [
        "To send invoices I use Factofly, which receives your name, address, email, and company number if you have one. Factofly keeps invoices for 5 years as required by Danish bookkeeping law. The legal basis is our agreement and legal obligations (Art. 6(1)(b) and (c)).",
        "I keep our correspondence about the project while we work together and for up to 3 years afterwards, in case of questions or complaints.",
      ],
    },
    {
      heading: "When you visit the site",
      paragraphs: [
        "The site is hosted by Vercel. Like any web server, it briefly logs technical information such as your IP address and browser to run and protect the site.",
        "I use Vercel Web Analytics to see how many people visit the pages. It doesn't use cookies and can't recognise you across sites or days.",
        "The font is served from my own server, so your browser doesn't contact Google Fonts.",
      ],
    },
    {
      heading: "Cookies and local storage",
      paragraphs: [
        "The site uses no advertising or tracking cookies, which is why there's no cookie banner. Only two things are stored in your browser, and only to remember your choices:",
      ],
      list: [
        "The \"lang\" cookie remembers whether you want the site in Danish or English (kept for 1 year).",
        "\"theme\" in your browser's local storage remembers whether you chose the light or dark theme.",
      ],
    },
    {
      heading: "NoteForge AI",
      paragraphs: [
        "If you use NoteForge AI at /noteai, the files and text you upload are sent to Google's Gemini service to create your notes. Don't upload confidential or sensitive personal information.",
      ],
    },
    {
      heading: "Services outside the EU",
      paragraphs: [
        "Discord, Vercel, and Google are US companies. Information is transferred to them under the legal transfer mechanisms they provide, such as the EU-U.S. Data Privacy Framework or the European Commission's standard contractual clauses. I never sell your information and only share it with the services listed here.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: ["Email ander507inc@gmail.com to use any of your rights. You have the right to:"],
      list: [
        "find out what information I have about you and get a copy",
        "have incorrect information corrected",
        "have your information deleted when I no longer need to keep it",
        "object to or restrict how it's used",
        "get your information in a common, portable format",
        "complain to the Danish Data Protection Agency (datatilsynet.dk)",
      ],
    },
    {
      heading: "Changes",
      paragraphs: ["If I change how I use your information, I'll update this page and the date at the top."],
    },
  ],
};

const LEGAL: Record<Locale, Record<LegalKind, LegalDocument>> = {
  da: { terms: termsDa, privacy: privacyDa },
  en: { terms: termsEn, privacy: privacyEn },
};

export function getLegal(kind: LegalKind, locale: Locale): LegalDocument {
  return LEGAL[locale][kind];
}
