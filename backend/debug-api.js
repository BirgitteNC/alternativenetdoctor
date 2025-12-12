const fetch = require('node-fetch');

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = '6dc322c63853d72c421adc626e70a8e949a02eccd25f416e00658508f796fa4a6bfd5a085a30192bdc4cd654c8505da3cfcbb8905b35aea431d806d644393bb60544cb32faa5c992c2213e75d4c4809250bb2080f5b4b0fa287c626bbea1671a5855a2daed1142ed86eddd4a1119c9da36bddc7335c16f62f85f686867ceff69';

async function debugTest() {
  console.log('\n' + '='.repeat(60));
  console.log('🔍 STRAPI API DEBUG TEST');
  console.log('='.repeat(60) + '\n');

  // Test 1: Check Strapi is running
  console.log('TEST 1: Checking if Strapi is running...');
  try {
    const healthCheck = await fetch(`${API_URL}`);
    if (healthCheck.ok) {
      console.log('✅ Strapi is running on http://localhost:1337\n');
    } else {
      console.log('❌ Strapi responded but with error:', healthCheck.status);
      console.log('   Response:', await healthCheck.text());
      return;
    }
  } catch (error) {
    console.log('❌ Cannot connect to Strapi');
    console.log('   Error:', error.message);
    console.log('   Make sure Strapi is running with: npm run develop');
    return;
  }

  // Test 2: Check API Token
  console.log('TEST 2: Checking API token...');
  console.log('Token (first 50 chars):', API_TOKEN.substring(0, 50) + '...');
  console.log('Token length:', API_TOKEN.length, 'characters\n');

  // Test 3: Try to fetch existing categories
  console.log('TEST 3: Trying to fetch categories (read permission)...');
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });

    console.log('Response status:', response.status, response.statusText);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Can read from API');
      console.log('   Found', data.data?.length || 0, 'categories\n');
    } else {
      const error = await response.text();
      console.log('❌ Cannot read from API');
      console.log('   Error response:', error, '\n');
      return;
    }
  } catch (error) {
    console.log('❌ Fetch failed');
    console.log('   Error:', error.message, '\n');
    return;
  }

  // Test 4: Try to CREATE a category
  console.log('TEST 4: Trying to CREATE a test category (write permission)...');
  const testCategory = {
    data: {
      name: 'Debug Test Category',
      slug: 'debug-test-' + Date.now()
    }
  };

  console.log('Sending data:', JSON.stringify(testCategory, null, 2));

  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify(testCategory)
    });

    console.log('Response status:', response.status, response.statusText);
    
    const responseText = await response.text();
    
    if (response.ok) {
      console.log('✅ Successfully created category!');
      const data = JSON.parse(responseText);
      console.log('   Category ID:', data.data?.id);
      console.log('   Category name:', data.data?.attributes?.name, '\n');
      
      // Clean up - delete test category
      if (data.data?.id) {
        console.log('Cleaning up: Deleting test category...');
        await fetch(`${API_URL}/categories/${data.data.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`
          }
        });
        console.log('✅ Test category deleted\n');
      }
    } else {
      console.log('❌ Failed to create category');
      console.log('   Full error response:');
      console.log(responseText);
      
      // Try to parse error as JSON
      try {
        const errorData = JSON.parse(responseText);
        console.log('\n   Parsed error:');
        console.log('   Message:', errorData.error?.message);
        console.log('   Details:', JSON.stringify(errorData.error?.details, null, 2));
      } catch (e) {
        // Response is not JSON
      }
      console.log('');
      return;
    }
  } catch (error) {
    console.log('❌ Request failed');
    console.log('   Error:', error.message, '\n');
    return;
  }

  // Test 5: Try to CREATE an article
  console.log('TEST 5: Trying to CREATE a test article...');
  const testArticle = {
    data: {
      title: 'Debug Test Article',
      slug: 'debug-test-' + Date.now(),
      content: 'This is a test article created by debug script.',
      publishedAt: new Date().toISOString()
    }
  };

  console.log('Sending data:', JSON.stringify(testArticle, null, 2));

  try {
    const response = await fetch(`${API_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify(testArticle)
    });

    console.log('Response status:', response.status, response.statusText);
    
    const responseText = await response.text();
    
    if (response.ok) {
      console.log('✅ Successfully created article!');
      const data = JSON.parse(responseText);
      console.log('   Article ID:', data.data?.id);
      console.log('   Article title:', data.data?.attributes?.title, '\n');
      
      // Clean up
      if (data.data?.id) {
        console.log('Cleaning up: Deleting test article...');
        await fetch(`${API_URL}/articles/${data.data.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`
          }
        });
        console.log('✅ Test article deleted\n');
      }
    } else {
      console.log('❌ Failed to create article');
      console.log('   Full error response:');
      console.log(responseText);
      
      try {
        const errorData = JSON.parse(responseText);
        console.log('\n   Parsed error:');
        console.log('   Message:', errorData.error?.message);
        console.log('   Details:', JSON.stringify(errorData.error?.details, null, 2));
      } catch (e) {
        // Not JSON
      }
      console.log('');
      return;
    }
  } catch (error) {
    console.log('❌ Request failed');
    console.log('   Error:', error.message, '\n');
    return;
  }

  // All tests passed
  console.log('='.repeat(60));
  console.log('✅ ALL TESTS PASSED!');
  console.log('='.repeat(60));
  console.log('\n💡 API connection and permissions are working correctly.');
  console.log('   You can now run: node seed-all.js\n');
}

debugTest();
