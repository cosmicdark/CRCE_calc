import fetch from 'node-fetch';

const credentials = { 
  prn: 'MU0341120240233054', 
  dob: '10-03-2006',
  forceRefresh: true  // Force fresh scrape
};

async function testParallelScraping() {
  console.log('🚀 Testing 3-tab parallel scraping (FRESH SCRAPE)...\n');
  const startTime = Date.now();

  try {
    const response = await fetch('http://localhost:3000/api/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    const reader = response.body;
    let result = null;

    for await (const chunk of reader) {
      const text = chunk.toString();
      const lines = text.split('\n').filter(line => line.startsWith('data: '));
      
      for (const line of lines) {
        const data = JSON.parse(line.slice(6));
        
        if (data.type === 'progress') {
          console.log(`⏱️  ${data.message}`);
        } else if (data.type === 'result') {
          result = data.data;
        } else if (data.type === 'error') {
          throw new Error(data.error);
        }
      }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('\n========== RESULTS ==========');
    console.log(`⏱️  Total Time: ${duration}s`);
    console.log(`📚 Subjects Found: ${result?.subjects?.length || 0}`);
    console.log(`🎯 SGPA: ${result?.sgpa || 'N/A'}`);
    console.log(`📊 Total Marks: ${result?.totalMarksAll}/${result?.maxMarksAll}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testParallelScraping();
