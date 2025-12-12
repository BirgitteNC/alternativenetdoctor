const fetch = require('node-fetch');

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = '6dc322c63853d72c421adc626e70a8e949a02eccd25f416e00658508f796fa4a6bfd5a085a30192bdc4cd654c8505da3cfcbb8905b35aea431d806d644393bb60544cb32faa5c992c2213e75d4c4809250bb2080f5b4b0fa287c626bbea1671a5855a2daed1142ed86eddd4a1119c9da36bddc7335c16f62f85f686867ceff69';

async function testCreateArticle() {
  console.log('\n=== TESTING: Create ONE article ===\n');

  const articleData = {
    data: {
      title: 'Test Article',
      slug: 'test-article-' + Date.now(),
      content: 'This is a test article.',
      publishedAt: new Date().toISOString()
    }
  };

  console.log('1. Sending data to:', API_URL + '/articles');
  console.log('2. Using token (first 50 chars):', API_TOKEN.substring(0, 50) + '...');
  console.log('3. Article data:', JSON.stringify(articleData, null, 2));
  console.log('\n4. Making POST request...\n');

  const response = await fetch(`${API_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify(articleData)
  });

  console.log('5. Response status:', response.status, response.statusText);
  console.log('6. Response headers:', JSON.stringify([...response.headers.entries()], null, 2));

  const responseText = await response.text();
  console.log('7. Response body (raw text):');
  console.log(responseText);

  if (response.ok) {
    console.log('\n✅ SUCCESS - Article created!');
    try {
      const data = JSON.parse(responseText);
      console.log('Article ID:', data.data?.id);
    } catch (e) {
      console.log('Could not parse response as JSON');
    }
  } else {
    console.log('\n❌ FAILED - Article NOT created');
    try {
      const errorData = JSON.parse(responseText);
      console.log('\nError details:');
      console.log(JSON.stringify(errorData, null, 2));
    } catch (e) {
      console.log('Response is not JSON');
    }
  }
}

testCreateArticle().catch(err => {
  console.log('\n💥 SCRIPT CRASHED:');
  console.log(err);
});
