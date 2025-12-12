const fetch = require('node-fetch');

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = '6dc322c63853d72c421adc626e70a8e949a02eccd25f416e00658508f796fa4a6bfd5a085a30192bdc4cd654c8505da3cfcbb8905b35aea431d806d644393bb60544cb32faa5c992c2213e75d4c4809250bb2080f5b4b0fa287c626bbea1671a5855a2daed1142ed86eddd4a1119c9da36bddc7335c16f62f85f686867ceff69';

// Article templates organized by category (75 total articles)
const articleTemplates = {
  'causes': [
    { title: 'Stress og dets indflydelse på immunforsvaret', content: 'Kronisk stress kan have en betydelig indvirkning på immunsystemet og føre til øget modtagelighed for sygdomme. Når kroppen er under konstant stress, frigives cortisol og andre stresshormoner, som over tid kan svække immunforsvaret.' },
    { title: 'Søvnmangel: En skjult årsag til mange helbredsproblemer', content: 'Utilstrækkelig søvn kan føre til en lang række sundhedsmæssige udfordringer. Under søvn reparerer og regenererer kroppen sig, og mangel på søvn påvirker alt fra immunforsvar til hormonbalance.' },
    { title: 'Inflammationens rolle i kroniske sygdomme', content: 'Kronisk inflammation er en underliggende faktor i mange moderne sygdomme som hjertesygdomme, diabetes og autoimmune tilstande. Forskellige faktorer kan udløse og opretholde inflammation.' },
    { title: 'Toksiner i hverdagen: Skjulte sundhedsrisici', content: 'Vi udsættes dagligt for en række miljøtoksiner fra plast, kosmetik, rengøringsmidler og forurenet luft. Disse stoffer kan akkumulere i kroppen og påvirke hormonbalance og cellesundhed.' },
    { title: 'Hormonel ubalance: Årsager og konsekvenser', content: 'Hormoner spiller en central rolle i kroppens regulering af stofskifte, energi, søvn og humør. Ubalancer kan opstå på grund af stress, dårlig kost, miljøtoksiner og livsstilsfaktorer.' },
    { title: 'D-vitaminmangel: En undervurderet årsag til mange symptomer', content: 'D-vitamin er essentielt for knogle sundhed, immunforsvar og cellevækst. Mangel er udbredt især i nordlige lande og kan manifestere sig som træthed, dårligt humør og øget sygdomsmodtagelighed.' },
    { title: 'Tarmbakteriers betydning for helbredet', content: 'Tarmfloraen har større betydning end tidligere antaget. De billioner af bakterier i tarmen påvirker fordøjelse, immunforsvar, humør og endda vægt gennem komplekse mekanismer.' },
    { title: 'Dehydrering og dets påvirkning af kroppen', content: 'Mange undervurderer betydningen af tilstrækkelig væskeindtagelse. Selv let dehydrering kan påvirke koncentration, energiniveau og kropslige funktioner negativt.' },
    { title: 'Sukkerforbrug: Moderne tiders sundhedsrisiko', content: 'Overdreven sukkerkonsumtion bidrager til inflammation, fedtlever, insulinresistens og mange andre helbredsproblemer. Sukker skjuler sig i mange forarbejdede fødevarer.' },
    { title: 'Elektromagnetisk stråling: Moderne påvirkning på helbredet', content: 'Vi udsættes konstant for elektromagnetiske felter fra WiFi, mobiltelefoner og andre enheder. Forskning undersøger mulige påvirkninger af søvn, cellesundhed og langsigtede effekter.' },
    { title: 'Passionsblomsst: Glemt urt mod angst og søvnproblemer', content: 'Passionsblomst (Passiflora incarnata) har været brugt i århundreder mod angst og søvnløshed. Denne klatreplante indeholder aktive forbindelser der virker beroligende på nervesystemet.' }
  ],
  'lifestyle-advice': [
    { title: 'Morgenyoga: Start dagen med energi', content: 'En simpel yogaroutine om morgenen kan give mange fordele. Blid strækning aktiverer kroppen, øger blodcirkulationen og sætter en positiv tone for dagen.' },
    { title: 'Kolde brusebade: Sundhedsfordele og teknikker', content: 'Kolde brusebade kan styrke immunforsvaret, øge energi og forbedre humør. Start gradvist med korte perioder og byg langsomt op til længere eksponering.' },
    { title: 'Mindful spisning: Fordøjelsens bedste ven', content: 'At spise langsomt og bevidst kan forbedre fordøjelsen markant. Tyg grundigt, undgå distraktioner og lyt til kroppens mæthedssignaler for bedre næringsopta gelse.' },
    { title: 'Daglig motion: Find din personlige tilgang', content: 'Regelmæssig bevægelse er afgørende for helbredet. Find aktiviteter du nyder - gåture, dans, svømning eller styrketræning - og gør dem til en naturlig del af hverdagen.' },
    { title: 'Søvnhygiejne: Optimér din nattesøvn', content: 'Gode søvnvaner kan transformere dit helbred. Etablér faste rutiner, reducér blåt lys før sengetid, hold soveværelset køligt og mørkt.' },
    { title: 'Stresshåndtering: Praktiske teknikker til hverdagen', content: 'Effektiv stresshåndtering er essentiel i moderne liv. Prøv vejrtrækningsøvelser, meditation, naturophold eller kreative aktiviteter for at finde balance.' },
    { title: 'Naturlige rengøringsmidler i hjemmet', content: 'Reducer kemikalieeksponering ved at bruge naturlige alternativer. Eddike, natron og citron kan erstatte mange traditionelle rengøringsmidler effektivt og sikkert.' },
    { title: 'Digital detox: Balance din skærmtid', content: 'For meget skærmtid kan påvirke søvn, øjensundhed og mental velvære. Sæt grænser, tag pauser og prioritér ansigt-til-ansigt interaktion.' },
    { title: 'Gåture i naturen: Sundhedsfordelene ved friluftsliv', content: 'Tid i naturen har dokumenterede positive effekter. Frisk luft, sollys og grønne omgivelser reducerer stress, forbedrer humør og styrker immunforsvaret.' },
    { title: 'Intervalfaste: En praktisk guide', content: 'Intervalfaste kan have mange sundhedsmæssige fordele. Start med et 12 timers fastenvindue og tilpas gradvist efter hvad der fungerer for dig.' },
    { title: 'Rhodiola Rosea: Adaptogen til mental udholdenhed', content: 'Rhodiola Rosea er en adaptogen plante der har været brugt i århundreder, især i Rusland og Skandinavien. Planten vokser i kolde bjergområder og har vist sig at kunne hjælpe kroppen med at tilpasse sig stress.' }
  ],
  'natural-approaches': [
    { title: 'Urtemedicin: Traditionel visdom møder moderne videnskab', content: 'Urtemedicin har været brugt i tusinder af år på tværs af kulturer. Moderne forskning bekræfter nu mange traditionelle anvendelser og identificerer aktive forbindelser.' },
    { title: 'Akupunktur: Fordele og anvendelser', content: 'Denne gamle kinesiske teknik får stigende anerkendelse. Akupunktur kan hjælpe med smerter, stress og forskellige kroniske tilstande gennem stimulering af specifikke punkter.' },
    { title: 'Aromaterapi: Æteriske oliers helbredende egenskaber', content: 'Æteriske olier kan bruges til mange formål. Fra lavendel til afslapning til pebermynte til hovedpine - aromaterapien tilbyder naturlige løsninger.' },
    { title: 'Ayurveda: Indiens holistiske sundhedssystem', content: 'Ayurveda tilbyder en omfattende tilgang til sundhed baseret på konstitutionstyper og balance. Dette 5000 år gamle system kombinerer kost, urter og livsstil.' },
    { title: 'Homøopati: Princip og anvendelse', content: 'Homøopati bygger på princippet om "det lignende helbreder det lignende". Stærkt fortyndede stoffer bruges til at stimulere kroppens selvhelbredende evner.' },
    { title: 'Massage: Mere end bare afslapning', content: 'Massage har mange sundhedsmæssige fordele ud over afslapning. Det forbedrer cirkulation, reducerer muskelsænding og kan lindre kroniske smerter.' },
    { title: 'Meditation: Sindsro og sundhed', content: 'Meditation kan reducere stress, forbedre fokus og fremme ro. Forskellige teknikker som mindfulness, transcendental meditation og guidede meditationer tilbyder forskellige tilgange.' },
    { title: 'Naturopati: Holistisk tilgang til sundhed', content: 'Naturopati fokuserer på kroppens evne til at helbrede sig selv. Ved at støtte naturlige processer gennem kost, urter og livsstil fremmes optimal sundhed.' },
    { title: 'Refleksologi: Fodzoneterapi og dens virkninger', content: 'Refleksologi arbejder med zonepunkter i fødderne som forbindes med forskellige organer. Denne teknik kan fremme afslapning og støtte kroppens balance.' },
    { title: 'Kinesiologi: Muskeltest som diagnostisk værktøj', content: 'Kinesiologi bruger muskeltest til at identificere ubalancer og stressfaktorer. Denne holistiske tilgang kan afsløre skjulte problemer.' }
  ],
  'short-explanations': [
    { title: 'Hvad er autoimmune sygdomme?', content: 'Autoimmune sygdomme opstår når immunsystemet fejlagtigt angriber kroppens egne celler og væv. Over 80 forskellige autoimmune tilstande er identificeret, herunder leddegigt, lupus og cøliaki.' },
    { title: 'Forklaring: Kronisk træthedssyndrom', content: 'Kronisk træthedssyndrom (CFS/ME) er karakteriseret ved vedvarende, invaliderende udmattelse som ikke forbedres med hvile. Tilstanden påvirker både fysisk og kognitiv funktion.' },
    { title: 'Hvad er leaky gut syndrom?', content: 'Leaky gut (øget tarmpermeabilitet) refererer til en tilstand hvor tarmvæggen bliver unormalt gennemtrængelig. Dette kan føre til at ufordøjede fødevarepartikler og toksiner trænger ind i blodbanen.' },
    { title: 'Forklaring: Adrenal fatigue', content: 'Adrenal fatigue (binyreudmattelse) beskriver en tilstand hvor binyrerne har svært ved at producere tilstrækkelige mængder hormoner, især cortisol, ofte efter længere perioder med stress.' },
    { title: 'Hvad er candida overvækst?', content: 'Candida er en gærsvamp som naturligt findes i kroppen. Overvækst kan opstå når balancen i tarmfloraen forstyrres, hvilket kan give symptomer som træthed, fordøjelsesproblemer og tåge i hovedet.' },
    { title: 'Forklaring: Histaminintolerance', content: 'Histaminintolerance opstår når kroppen ikke kan nedbryde histamin tilstrækkeligt hurtigt. Dette kan føre til symptomer som hovedpine, hudproblemer, fordøjelsesbesvær og mere.' },
    { title: 'Hvad er SIBO?', content: 'SIBO står for Small Intestinal Bacterial Overgrowth - bakterieovervækst i tyndtarmen. Denne tilstand kan forårsage oppustethed, diarré, træthed og mangel på næringsstoffer.' },
    { title: 'Forklaring: Methylering', content: 'Methylering er en biokemisk proces hvor en methylgruppe tilføjes til forskellige molekyler. Denne proces er afgørende for DNA-reparation, detoxifikation og neurotransmitter-produktion.' },
    { title: 'Hvad er mitokondrie dysfunktion?', content: 'Mitokondrier er cellernes "kraftværker" som producerer energi. Mitokondrie dysfunktion betyder reduceret energiproduktion, hvilket kan manifestere sig som træthed og muskelsvaghed.' },
    { title: 'Forklaring: Oxidativt stress', content: 'Oxidativt stress opstår når der er ubalance mellem frie radikaler og antioxidanter i kroppen. Dette kan beskadige celler og bidrage til aldring og forskellige sygdomstilstande.' },
    { title: 'Stress og cortisol: Forstå kroppens stressrespons', content: 'Cortisol er kroppens primære stresshormon, produceret af binyrerne. Når vi oplever stress, frigives cortisol for at mobilisere energi og hjælpe os med at håndtere udfordringen.' }
  ],
  'symptoms': [
    { title: 'Træthed: Årsager og naturlige løsninger', content: 'Vedvarende træthed kan have mange underliggende årsager - fra søvnmangel og stress til næringsstofmangel og hormonelle ubalancer. Identifikation af årsagen er første skridt til forbedring.' },
    { title: 'Hovedpine: Typer og naturlig lindring', content: 'Forskellige typer hovedpine - spændingshovedpine, migræne, klyngehovedpine - kræver forskellige tilgange. Naturlige strategier inkluderer hydrering, søvn, stresshåndtering og visse kosttilskud.' },
    { title: 'Fordøjelsesproblemer: Naturlige tilgange', content: 'Fordøjelsesbesvær er et udbredt problem med mange løsninger. Fra forbedret tyggning og mindful spisning til probiotika og fordøjelsesenzymer - flere strategier kan hjælpe.' },
    { title: 'Søvnproblemer: Find årsagerne', content: 'Søvnforstyrrelser kan have mange forskellige årsager. Identificér mulige faktorer som stress, blåt lys, koffein, søvnmiljø og hormonelle ubalancer for at finde løsninger.' },
    { title: 'Hudproblemer: Holistische løsninger', content: 'Huden afspejler ofte indre ubalancer. Fra akne til eksem kan forbedring af tarmflora, reduktion af inflammation og optimering af næringsstoffer give resultater.' },
    { title: 'Angstsymptomer: Naturlige strategier', content: 'Angst kan håndteres med forskellige naturlige metoder. Vejrtrækningsteknikker, motion, magnesium, omega-3 og adaptogene urter kan alle bidrage til lindring.' },
    { title: 'Ledsmerter: Årsager og lindring', content: 'Ledsmerter kan have både inflammatoriske og strukturelle årsager. Antiinflammatorisk kost, specifikke kosttilskud som glucosamin og kurkuma, samt blid bevægelse kan hjælpe.' },
    { title: 'Koncentrationsbesvær: Naturlig forbedring', content: 'Dårlig koncentration kan skyldes mange faktorer. Blodsukkerbalance, tilstrækkelig søvn, hydrering og specifikke næringsstoffer som omega-3 og B-vitaminer er vigtige.' },
    { title: 'Energimangel om eftermiddagen', content: 'Eftermiddagstræthed er ofte relateret til blodsukkerudsving efter frokost. Stabile blodsukkerniveauer gennem rigtig kost og regulære måltider kan hjælpe.' },
    { title: 'Hormonelle symptomer: Balance naturligt', content: 'Hormonelle ubalancer kan manifestere sig som PMS, uregelmæssige menstruationer, vægtudsving og humørsvingninger. Naturlig balancering involverer kost, stresshåndtering og specifikke urter.' },
    { title: 'Søvnhygiejne: 10 gode vaner for bedre nattesøvn', content: 'God søvn er fundamental for helbred og velvære. Mange af os kæmper med søvnproblemer, men ofte kan simple ændringer i vores vaner og rutiner gøre en stor forskel.' }
  ],
  'tests-research': [
    { title: 'Blodprøver: Hvad fortæller de?', content: 'Forskellige blodprøver kan afsløre vigtig information. Fra CBC til hormoner og næringsstoffer - forståelse af resultaterne hjælper med at identificere ubalancer tidligt.' },
    { title: 'Tarmfloratest: Indsigt i mikrobiommet', content: 'Analyse af tarmfloraen kan give værdifuld information om bakteriebalance, betændelsesmarkører og fordøjelseskapacitet. Dette kan guide specifikke interventioner.' },
    { title: 'Fødevareintolerancetest: Metoder og fortolkning', content: 'Der findes forskellige måder at teste for fødevareintolerance. IgG-tests, eliminationsdiæt og reintroduktion kan alle give information om problematiske fødevarer.' },
    { title: 'Hormontests: Hvornår og hvorfor', content: 'Hormontestning kan afsløre ubalancer der påvirker energi, søvn, vægt og humør. Timing af testning er vigtig for korrekt fortolkning.' },
    { title: 'Tungmetaltest: Påvisning af toksisk belastning', content: 'Tungmetaller kan akkumulere i kroppen og påvirke helbredet. Tests kan identificere belastning med bly, kviksølv, cadmium og andre toksiske metaller.' },
    { title: 'Vitamin D-niveau: Optimal testning', content: 'D-vitamin-testning er vigtig for at vurdere status. Optimale niveauer ligger højere end traditionelt anbefalet for mange sundhedsmæssige fordele.' },
    { title: 'Skjoldbruskkirteltest: Komplet evaluering', content: 'Skjoldbruskkirtlen bør evalueres med flere markører inklusiv TSH, frie T3 og T4, samt antistoffer. Dette giver et fuldt billede af skjoldbruskkirtelfunktionen.' },
    { title: 'Oxidativ stress-markører', content: 'Måling af oxidativt stress kan give indsigt i cellulær sundhed og antioxidantstatus. Markører som 8-OH-dG kan vise skade fra frie radikaler.' },
    { title: 'Inflammationsmarkører: CRP og mere', content: 'Forskellige markører kan måle inflammation. Højsensitivt CRP, ESR og cytokiner giver information om inflammatoriske processer i kroppen.' },
    { title: 'Genetiske tests: Personaliseret medicin', content: 'Genetisk testning kan afsløre sårbarheder og styrker. SNPs relateret til methylering, detoxifikation og næringsstofmetabolisme kan guide personaliserede strategier.' }
  ],
  'treatments': [
    { title: 'Lavt blodsukker (Hypoglykæmi): Genkendelse og håndtering', content: 'Lavt blodsukker (hypoglykæmi) opstår når blodsukkerniveauet falder under det normale. Symptomerne kan omfatte sved, rysten, hjertebanken, forvirring og træthed.' },
    { title: 'Naturlig behandling af forhøjet blodtryk', content: 'Højt blodtryk kan ofte påvirkes positivt med livsstilsændringer. Reduceret saltindtag, øget kaliumindtag, regelmæssig motion og stresshåndtering er effektive strategier.' },
    { title: 'Tarmslimhindegendannelse: Protokol', content: 'At hele tarmslimhinden kræver en systematisk tilgang. Fjernelse af irriterende fødevarer, tilføjelse af helende næringsstoffer som glutamin og zink, og genopbygning af tarmfloraen er centrale.' },
    { title: 'Detoxprotokoller: Sikker giftfjernelse', content: 'Detox skal udføres omhyggeligt. Start med at støtte eliminationsvejen e (lever, nyrer, tarm), tilføj bindere og gå gradvist frem for at undgå overbelastning.' },
    { title: 'Antiinflammatorisk kost: Praktisk guide', content: 'En antiinflammatorisk kost kan reducere mange symptomer. Fokusér på flerumættede fedtsyrer, farverige grøntsager, krydderier som kurkuma og ingefær, og undgå forarbejdede fødevarer.' },
    { title: 'Naturlig hormonbalancering', content: 'Hormoner kan balanceres gennem forskellige naturlige metoder. Stresshåndtering, tilstrækkelig søvn, næringsstoffer som magnesium og zink, samt specifikke urter som Vitex.' },
    { title: 'Immunsystemsstyrkning: Holistisk tilgang', content: 'Et stærkt immunforsvar kræver flere indsatsområder. God søvn, ernæring med fokus på C-vitamin, D-vitamin og zink, samt stresshåndtering er fundamentale.' },
    { title: 'Stressreduktion: Behandlingsplan', content: 'Stress skal håndteres på flere niveauer. Daglige stresshåndteringsteknikker, adaptogene urter som ashwagandha, magnesium og B-vitaminer støtter nervesystemet.' },
    { title: 'Søvnforbedring: Omfattende program', content: 'God søvn kræver opmærksomhed på flere faktorer. Etablér faste rutiner, optimér søvnmiljøet, undgå stimulanser sent på dagen, og overvej magnesium eller melatonin hvis nødvendigt.' },
    { title: 'Fordøjelsesoptimering: Step-by-step', content: 'Forbedring af fordøjelsen følger en logisk rækkefølge. Start med langsom spisning og grundig tygning, overvej fordøjelsesenzymer, genopbyg tarmfloraen med probiotika, og adressér mulig SIBO eller dysbiose.' },
    { title: 'Yoga og åndedrøtsøvelser: Naturlig stresslindring', content: 'Yoga kombinerer fysisk bevægelse, åndedrætsteknikker og mindfulness til en kraftfuld praksis for både krop og sind. Selvom mange tænker på yoga som primært en form for træning, er det egentlig meget mere.' }
  ]
};

async function getCategoryIds() {
  const response = await fetch(`${API_URL}/categories`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  const data = await response.json();
  const categoryMap = {};
  
  data.data.forEach(cat => {
    categoryMap[cat.attributes.slug] = cat.id;
  });
  
  return categoryMap;
}

async function seedArticles() {
  console.log('\n=== SEEDING ARTICLES ===\n');
  
  console.log('Fetching category IDs...');
  const categoryIds = await getCategoryIds();
  console.log('Categories found:', Object.keys(categoryIds).length);
  console.log('');
  
  let created = 0;
  let errors = 0;

  for (const [categorySlug, articles] of Object.entries(articleTemplates)) {
    const categoryId = categoryIds[categorySlug];
    
    if (!categoryId) {
      console.log(`⚠ Warning: Category "${categorySlug}" not found, skipping articles`);
      continue;
    }

    console.log(`--- Category: ${categorySlug} (${articles.length} articles) ---`);

    for (const article of articles) {
      try {
        const slug = article.title
          .toLowerCase()
          .replace(/æ/g, 'ae')
          .replace(/ø/g, 'oe')
          .replace(/å/g, 'aa')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');

        const articleData = {
          data: {
            title: article.title,
            slug: slug,
            content: article.content,
            category: categoryId,
            publishedAt: new Date().toISOString()
          }
        };

        const response = await fetch(`${API_URL}/articles`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`
          },
          body: JSON.stringify(articleData)
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`  ✓ ${article.title.substring(0, 60)}...`);
          created++;
        } else {
          const errorText = await response.text();
          console.log(`  ✗ Failed: ${article.title.substring(0, 50)}`);
          console.log(`    ${errorText.substring(0, 100)}`);
          errors++;
        }
      } catch (error) {
        console.log(`  ✗ Failed: ${article.title.substring(0, 50)}`);
        console.log(`    ${error.message}`);
        errors++;
      }
    }
    console.log('');
  }

  console.log('=== ARTICLES COMPLETE ===');
  console.log(`Created: ${created}`);
  console.log(`Errors: ${errors}`);
  
  return { created, errors };
}

module.exports = seedArticles;

if (require.main === module) {
  seedArticles().then(() => process.exit(0)).catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}
