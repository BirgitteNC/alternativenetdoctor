const fetch = require('node-fetch');

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = '6dc322c63853d72c421adc626e70a8e949a02eccd25f416e00658508f796fa4a6bfd5a085a30192bdc4cd654c8505da3cfcbb8905b35aea431d806d644393bb60544cb32faa5c992c2213e75d4c4809250bb2080f5b4b0fa287c626bbea1671a5855a2daed1142ed86eddd4a1119c9da36bddc7335c16f62f85f686867ceff69';

const categories = [
  { name: 'Årsager', slug: 'causes' },
  { name: 'Livsstilsråd', slug: 'lifestyle-advice' },
  { name: 'Naturlige Tilgange', slug: 'natural-approaches' },
  { name: 'Korte Forklaringer', slug: 'short-explanations' },
  { name: 'Symptomer', slug: 'symptoms' },
  { name: 'Test & Forskning', slug: 'tests-research' },
  { name: 'Behandlinger', slug: 'treatments' }
];

async function seedCategories() {
  console.log('\n=== SEEDING CATEGORIES ===\n');
  
  let created = 0;
  let errors = 0;

  for (const category of categories) {
    try {
      const response = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({ data: category })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✓ Created: ${category.name} (ID: ${data.data.id})`);
        created++;
      } else {
        const errorText = await response.text();
        console.log(`✗ Failed: ${category.name}`);
        console.log(`  Error: ${errorText}`);
        errors++;
      }
    } catch (error) {
      console.log(`✗ Failed: ${category.name}`);
      console.log(`  Error: ${error.message}`);
      errors++;
    }
  }

  console.log('\n=== CATEGORIES COMPLETE ===');
  console.log(`Created: ${created}`);
  console.log(`Errors: ${errors}`);
  
  return { created, errors };
}

module.exports = seedCategories;

if (require.main === module) {
  seedCategories().then(() => process.exit(0)).catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}
