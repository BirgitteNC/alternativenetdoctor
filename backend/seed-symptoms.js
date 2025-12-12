const fetch = require('node-fetch');

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = '6dc322c63853d72c421adc626e70a8e949a02eccd25f416e00658508f796fa4a6bfd5a085a30192bdc4cd654c8505da3cfcbb8905b35aea431d806d644393bb60544cb32faa5c992c2213e75d4c4809250bb2080f5b4b0fa287c626bbea1671a5855a2daed1142ed86eddd4a1119c9da36bddc7335c16f62f85f686867ceff69';

const symptoms = [
  { name: 'Kronisk træthed', beskrivelse: 'Vedvarende udmattelse som ikke forbedres med hvile. Kan indikere CFS/ME, hormonubalancer eller næringsstofmangel.' },
  { name: 'Hovedpine', beskrivelse: 'Forskellige typer fra spændingshovedpine til migræne. Kan udløses af fødevarer, stress, dehydrering eller hormoner.' },
  { name: 'Fordøjelsesproblemer', beskrivelse: 'Oppustethed, diarré, forstoppelse eller mavesmerter. Kan relateres til SIBO, IBS eller fødevareintolerancer.' },
  { name: 'Søvnforstyrrelser', beskrivelse: 'Problemer med at falde i søvn eller gennemsove natten. Kan skyldes stress, hormoner eller livsstilsfaktorer.' },
  { name: 'Angst', beskrivelse: 'Vedvarende bekymring, nervøsitet eller panikfølelse. Kan have både psykologiske og fysiologiske årsager.' },
  { name: 'Depression', beskrivelse: 'Vedvarende nedtrykthed, tab af interesse og energi. Kan relateres til neurotransmitter-ubalancer og inflammation.' },
  { name: 'Ledsmerter', beskrivelse: 'Smerter i led med eller uden hævelse. Kan være inflammatorisk eller degenerativ.' },
  { name: 'Muskelsmerter', beskrivelse: 'Diffuse eller lokaliserede muskelsmerter. Kan relateres til fibromyalgi, inflammation eller mangel.' },
  { name: 'Tåge i hovedet', beskrivelse: 'Dårlig koncentration, glemsomhed og mental træthed. Ofte set ved inflammation og hormonsbalancer.' },
  { name: 'Vægtstigning', beskrivelse: 'Uforklarlig vægtøgning trods uændrede vaner. Kan indikere metaboliske eller hormonelle problemer.' },
  { name: 'Vægttab', beskrivelse: 'Utilsigtet vægttab. Kan skyldes hyperthyroidisme, stress, malabsorption eller andre tilstande.' },
  { name: 'Hudproblemer', beskrivelse: 'Akne, eksem, psoriasis eller tør hud. Afspejler ofte indre ubalancer.' },
  { name: 'Hårtab', beskrivelse: 'Øget hårtab eller tyndere hår. Kan relateres til hormoner, stress eller næringsstofmangel.' },
  { name: 'Hedeture', beskrivelse: 'Pludselige varmebølger, ofte natlige. Klassisk menopause-symptom men også andre årsager.' },
  { name: 'Koldsvedtendens', beskrivelse: 'Konstant frysende eller kuldeskær. Kan indikere nedsat stofskifte eller dårlig cirkulation.' },
  { name: 'Hjertebanken', beskrivelse: 'Følelse af uregelmæssig eller hård hjerterytme. Kan skyldes stress, koffein eller hormonelle faktorer.' },
  { name: 'Svimmelhed', beskrivelse: 'Følelse af ubalance eller at omgivelserne drejer. Mange mulige årsager.' },
  { name: 'Synsforstyrrelser', beskrivelse: 'Sløret syn, flimmer eller prikker. Kan være neurologisk eller metabolisk.' },
  { name: 'Tinnitus', beskrivelse: 'Ringen, summen eller anden lyd i ørerne uden ekstern kilde.' },
  { name: 'Øget tørst', beskrivelse: 'Unormal tørst trods tilstrækkelig væskeindtagelse. Kan indikere diabetes.' },
  { name: 'Hyppig vandladning', beskrivelse: 'Behov for at urinere oftere end normalt, især om natten.' },
  { name: 'Forstoppelse', beskrivelse: 'Sjældne eller besværlige afføringer. Kan skyldes kost, mangel på motion eller andre faktorer.' },
  { name: 'Diarré', beskrivelse: 'Hyppige, løse afføringer. Kan være akut eller kronisk.' },
  { name: 'Kvalme', beskrivelse: 'Utilpashed med evt. opkastning. Mange mulige årsager.' },
  { name: 'Halsbrand', beskrivelse: 'Brændende følelse i brystet fra mavesyre. Reflux.' },
  { name: 'Oppustethed', beskrivelse: 'Følelse af fuld eller oppustet mave. Ofte relateret til tarmproblemer.' },
  { name: 'Menstruationssmerter', beskrivelse: 'Smerter under menstruation. Kan være normalt eller indikere endometriose.' },
  { name: 'Uregelmæssig menstruation', beskrivelse: 'Menstruationscyklus uden forudsigelig mønster.' },
  { name: 'Kraftesløshed', beskrivelse: 'Generel svaghed og mangel på styrke.' },
  { name: 'Kramper', beskrivelse: 'Muskelkramper, især i ben eller fødder.' },
  { name: 'Hævelse', beskrivelse: 'Væskeophobning i væv, ofte ben og fødder.' },
  { name: 'Tør mund', beskrivelse: 'Mangel på spyt. Kan påvirke tænder og smagsoplevelse.' },
  { name: 'Ondt i halsen', beskrivelse: 'Halssmerte eller irritation. Ofte infektiøst men også andre årsager.' },
  { name: 'Hoste', beskrivelse: 'Vedvarende hoste uden forkølelse. Kan være tør eller produktiv.' },
  { name: 'Kortåndethed', beskrivelse: 'Åndedrætsbesvær ved hvile eller anstrengelse.' },
  { name: 'Brystsmerter', beskrivelse: 'Smerte i brystet. Kræver udredning for at udelukke hjertesygdom.' },
  { name: 'Rygsmerte', beskrivelse: 'Smerter i ryg, nederste del mest almindelig.' },
  { name: 'Nakkesmerter', beskrivelse: 'Smerte og stivhed i nakke.' },
  { name: 'Uro i benene', beskrivelse: 'Ubehagelig følelse i ben med trang til at bevæge dem, især om aftenen.' },
  { name: 'Følelsesløshed', beskrivelse: 'Tab af følelse eller prikkende fornemmelse i hænder/fødder.' }
];

async function seedSymptoms() {
  console.log('\n=== SEEDING SYMPTOMS/CONDITIONS ===\n');
  console.log(`Total items to create: ${symptoms.length}\n`);
  
  let created = 0;
  let errors = 0;

  for (const symptom of symptoms) {
    try {
      const slug = symptom.name
        .toLowerCase()
        .replace(/æ/g, 'ae')
        .replace(/ø/g, 'oe')
        .replace(/å/g, 'aa')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Rich Text Blocks format for Strapi
      const beskrivelseBlocks = [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: symptom.beskrivelse
            }
          ]
        }
      ];

      const symptomData = {
        data: {
          name: symptom.name,
          slug: slug,
          Beskrivelse: beskrivelseBlocks,
          publishedAt: new Date().toISOString()
        }
      };

      const response = await fetch(`${API_URL}/symptom-conditions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify(symptomData)
      });

      if (response.ok) {
        console.log(`✓ ${symptom.name}`);
        created++;
      } else {
        const errorText = await response.text();
        console.log(`✗ Failed: ${symptom.name}`);
        console.log(`  ${errorText.substring(0, 200)}`);
        errors++;
      }
    } catch (error) {
      console.log(`✗ Failed: ${symptom.name}`);
      console.log(`  ${error.message}`);
      errors++;
    }
  }

  console.log('\n=== SYMPTOMS/CONDITIONS COMPLETE ===');
  console.log(`Created: ${created}`);
  console.log(`Errors: ${errors}`);
  
  return { created, errors };
}

module.exports = seedSymptoms;

if (require.main === module) {
  seedSymptoms().then(() => process.exit(0)).catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}
