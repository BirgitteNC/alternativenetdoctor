const { spawn } = require('child_process');
const path = require('path');

function runTest(scriptName) {
  return new Promise((resolve) => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Running: ${scriptName}`);
    console.log('='.repeat(60));
    
    const child = spawn('node', [scriptName], {
      stdio: 'inherit',
      cwd: __dirname
    });

    child.on('close', (code) => {
      resolve(code === 0);
    });

    child.on('error', (err) => {
      console.error(`Failed to run ${scriptName}:`, err);
      resolve(false);
    });
  });
}

async function runAllTests() {
  console.log('\n' + '='.repeat(60));
  console.log('🧪 TESTING ALL FIXED SCRIPTS');
  console.log('='.repeat(60));
  console.log('\nThis will test the 3 content types that failed:');
  console.log('1. Products (was 92/100)');
  console.log('2. Supplements (was 0/50)');
  console.log('3. Symptoms (was 37/40)');
  console.log('\nEach test creates ONE entry with unique slug (timestamp)');
  console.log('This will NOT affect your existing 211 entries.');
  console.log('');

  const results = {
    product: false,
    supplement: false,
    symptom: false
  };

  // Test 1: Product
  results.product = await runTest('test-product.js');
  
  // Test 2: Supplement
  results.supplement = await runTest('test-supplement.js');
  
  // Test 3: Symptom
  results.symptom = await runTest('test-symptom.js');

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('='.repeat(60));
  console.log(`Product test:     ${results.product ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Supplement test:  ${results.supplement ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Symptom test:     ${results.symptom ? '✅ PASS' : '❌ FAIL'}`);
  console.log('');

  const allPassed = results.product && results.supplement && results.symptom;

  if (allPassed) {
    console.log('✅ ALL TESTS PASSED!');
    console.log('');
    console.log('The fixes are correct. You can now safely:');
    console.log('1. Delete all existing entries in Strapi admin');
    console.log('2. Run: node seed-all.js');
    console.log('3. Expect 272/272 entries to be created successfully');
  } else {
    console.log('❌ SOME TESTS FAILED');
    console.log('');
    console.log('The scripts still have errors and need more fixes.');
    console.log('Do NOT delete existing data yet.');
  }
  
  console.log('='.repeat(60) + '\n');

  process.exit(allPassed ? 0 : 1);
}

runAllTests();
