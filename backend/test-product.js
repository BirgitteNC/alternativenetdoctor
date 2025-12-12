const fetch = require('node-fetch');

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = '6dc322c63853d72c421adc626e70a8e949a02eccd25f416e00658508f796fa4a6bfd5a085a30192bdc4cd654c8505da3cfcbb8905b35aea431d806d644393bb60544cb32faa5c992c2213e75d4c4809250bb2080f5b4b0fa287c626bbea1671a5855a2daed1142ed86eddd4a1119c9da36bddc7335c16f62f85f686867ceff69';

async function testProduct() {
  console.log('\n=== TESTING PRODUCT CREATION ===\n');

  const timestamp = Date.now();
  const testProduct = {
    name: 'TEST Vitamin C ' + timestamp,
    slug: 'test-vitamin-c-' + timestamp,
    description: 'This is a test product to verify field structure',
    price: 99
  };

  console.log('Sending product data:');
  console.log(JSON.stringify(testProduct, null, 2));
  console.log('');

  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          ...testProduct,
          publishedAt: new Date().toISOString()
        }
      })
    });

    console.log('Response status:', response.status, response.statusText);
    
    const responseText = await response.text();
    
    if (response.ok) {
      console.log('\n✅ SUCCESS - Product created!');
      const data = JSON.parse(responseText);
      console.log('Product ID:', data.data?.id);
      console.log('Product name:', data.data?.attributes?.name);
      console.log('\n✅ PRODUCT SCRIPT IS WORKING CORRECTLY');
      return true;
    } else {
      console.log('\n❌ FAILED - Product NOT created');
      console.log('Full error response:');
      console.log(responseText);
      
      try {
        const errorData = JSON.parse(responseText);
        console.log('\nParsed error:');
        console.log(JSON.stringify(errorData, null, 2));
      } catch (e) {
        // Not JSON
      }
      return false;
    }
  } catch (error) {
    console.log('\n❌ Request failed');
    console.log('Error:', error.message);
    return false;
  }
}

testProduct().then(success => {
  process.exit(success ? 0 : 1);
});
