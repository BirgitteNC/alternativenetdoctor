const fetch = require('node-fetch');

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = '6dc322c63853d72c421adc626e70a8e949a02eccd25f416e00658508f796fa4a6bfd5a085a30192bdc4cd654c8505da3cfcbb8905b35aea431d806d644393bb60544cb32faa5c992c2213e75d4c4809250bb2080f5b4b0fa287c626bbea1671a5855a2daed1142ed86eddd4a1119c9da36bddc7335c16f62f85f686867ceff69';

async function testSymptomAPI() {
  console.log('\n=== TESTING SYMPTOM API ===\n');

  // Test 1: Try to GET existing symptoms
  console.log('Test 1: Trying to fetch existing symptoms...');
  try {
    const response = await fetch(`${API_URL}/symptom-conditions`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });

    console.log('GET Response status:', response.status, response.statusText);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ GET works! Found', data.data?.length || 0, 'symptoms');
    } else {
      const errorText = await response.text();
      console.log('❌ GET failed');
      console.log('Error:', errorText);
    }
  } catch (error) {
    console.log('❌ GET request failed:', error.message);
  }

  console.log('\n---\n');

  // Test 2: Try to POST a new symptom
  console.log('Test 2: Trying to create a test symptom...');
  
  const testSymptom = {
    data: {
      name: 'TEST Symptom ' + Date.now(),
      slug: 'test-symptom-' + Date.now(),
      Beskrivelse: 'This is a test symptom description',
      publishedAt: new Date().toISOString()
    }
  };

  console.log('Sending:', JSON.stringify(testSymptom, null, 2));

  try {
    const response = await fetch(`${API_URL}/symptom-conditions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify(testSymptom)
    });

    console.log('POST Response status:', response.status, response.statusText);
    
    const responseText = await response.text();
    
    if (response.ok) {
      console.log('✅ POST works!');
      const data = JSON.parse(responseText);
      console.log('Created symptom ID:', data.data?.id);
    } else {
      console.log('❌ POST failed');
      console.log('Full error response:');
      console.log(responseText);
      
      try {
        const errorData = JSON.parse(responseText);
        console.log('\nParsed error:');
        console.log(JSON.stringify(errorData, null, 2));
      } catch (e) {
        // Not JSON
      }
    }
  } catch (error) {
    console.log('❌ POST request failed:', error.message);
  }

  console.log('\n=== TEST COMPLETE ===\n');
}

testSymptomAPI();
