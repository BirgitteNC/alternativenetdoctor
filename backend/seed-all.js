const seedCategories = require('./seed-categories');
const seedArticles = require('./seed-articles');
const seedProducts = require('./seed-products');
const seedSupplements = require('./seed-supplements');
const seedSymptoms = require('./seed-symptoms');

async function seedAll() {
  console.log('\n' + '='.repeat(60));
  console.log('🌱 STARTING COMPLETE DATABASE SEEDING');
  console.log('='.repeat(60));
  
  const startTime = Date.now();
  const results = {
    categories: { created: 0, errors: 0 },
    articles: { created: 0, errors: 0 },
    products: { created: 0, errors: 0 },
    supplements: { created: 0, errors: 0 },
    symptoms: { created: 0, errors: 0 }
  };

  try {
    // Step 1: Categories (required for articles)
    console.log('\n📁 Step 1/5: Categories');
    results.categories = await seedCategories();

    // Step 2: Articles (depends on categories)
    console.log('\n📝 Step 2/5: Articles');
    results.articles = await seedArticles();

    // Step 3: Products
    console.log('\n💊 Step 3/5: Products');
    results.products = await seedProducts();

    // Step 4: Supplements/Herbs
    console.log('\n🌿 Step 4/5: Supplements & Herbs');
    results.supplements = await seedSupplements();

    // Step 5: Symptoms/Conditions
    console.log('\n🏥 Step 5/5: Symptoms & Conditions');
    results.symptoms = await seedSymptoms();

  } catch (error) {
    console.error('\n❌ FATAL ERROR during seeding:');
    console.error(error);
    process.exit(1);
  }

  // Calculate totals
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  const totalCreated = 
    results.categories.created +
    results.articles.created +
    results.products.created +
    results.supplements.created +
    results.symptoms.created;
  
  const totalErrors =
    results.categories.errors +
    results.articles.errors +
    results.products.errors +
    results.supplements.errors +
    results.symptoms.errors;

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('✅ ALL SEEDING COMPLETE!');
  console.log('='.repeat(60));
  console.log('\nSummary:');
  console.log(`• Categories: ${results.categories.created} created, ${results.categories.errors} errors`);
  console.log(`• Articles: ${results.articles.created} created, ${results.articles.errors} errors`);
  console.log(`• Products: ${results.products.created} created, ${results.products.errors} errors`);
  console.log(`• Supplements/Herbs: ${results.supplements.created} created, ${results.supplements.errors} errors`);
  console.log(`• Symptoms/Conditions: ${results.symptoms.created} created, ${results.symptoms.errors} errors`);
  console.log(`\nTotal: ${totalCreated} entries created`);
  console.log(`Total errors: ${totalErrors}`);
  console.log(`Duration: ${duration} seconds`);
  
  console.log('\n' + '='.repeat(60));
  console.log('Next steps:');
  console.log('1. Visit http://localhost:1337/admin to verify data');
  console.log('2. Visit http://localhost:3000/da to see frontend');
  console.log('3. Manually add/improve content as needed');
  console.log('='.repeat(60) + '\n');
}

seedAll().then(() => {
  process.exit(0);
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
