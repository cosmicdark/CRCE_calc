import fetch from 'node-fetch';

async function quickTest() {
  console.log('Testing parallel scraping...\n');
  
  const response = await fetch('http://localhost:3000/api/scrape', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      prn: 'MU0341120240233054', 
      dob: '10-03-2006',
      forceRefresh: true
    })
  });

  for await (const chunk of response.body) {
    const text = chunk.toString();
    console.log(text);
  }
}

quickTest();
