require('dotenv').config({ path: '.env.local' });
const { chromium } = require('playwright');
const { load } = require('cheerio');

async function testHybridApproach() {
  const prn = 'MU0341120240233054';
  const dob = '10-03-2006';
  const baseUrl = 'https://crce-students.contineo.in/parents';
  
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Login
  console.log('Logging in...');
  await page.goto(baseUrl + '/');
  await page.fill('#username', prn);
  
  const parts = dob.split('-');
  await page.selectOption('#dd', { value: parts[0] + ' ' });
  await page.selectOption('#mm', { value: parts[1] });
  await page.selectOption('#yyyy', { value: parts[2] });
  
  await Promise.all([
    page.click('.cn-login-btn'),
    page.waitForNavigation()
  ]);
  
  console.log('Logged in! URL:', page.url());
  
  // Get cookies
  const cookies = await context.cookies();
  console.log('Got', cookies.length, 'cookies');
  
  // Build cookie string for fetch
  const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');
  
  // Get dashboard HTML to find URLs
  const dashboardHtml = await page.content();
  const $ = load(dashboardHtml);
  
  // Collect all subject URLs
  const urls = [];
  $('a[href*="task=ciedetails"]').each((i, el) => {
    const href = $(el).attr('href');
    let fullUrl;
    if (href.startsWith('http')) {
      fullUrl = href;
    } else if (href.startsWith('/')) {
      fullUrl = 'https://crce-students.contineo.in' + href;
    } else {
      fullUrl = baseUrl + '/' + href;
    }
    urls.push(fullUrl);
  });
  
  console.log(`Found ${urls.length} subject URLs`);
  
  // Test fetching first URL with cookies
  console.log('\nTesting fetch with cookies...');
  const testUrl = urls[0];
  
  const response = await fetch(testUrl, {
    headers: {
      'Cookie': cookieHeader,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0'
    }
  });
  
  const html = await response.text();
  const $2 = load(html);
  
  console.log('Fetch response status:', response.status);
  console.log('Page title:', $2('title').text().substring(0, 50));
  console.log('Caption:', $2('caption').first().text().substring(0, 50));
  
  // Check for login page
  if (html.includes('Login to Your Account')) {
    console.log('❌ Fetch failed - redirected to login page');
  } else {
    console.log('✅ Fetch successful - got content!');
    
    // Check for marks
    let marksFound = false;
    $2('tr').each((_, tr) => {
      const text = $2(tr).text();
      if (text.match(/\d+(\.\d+)?\s*\/\s*\d+/) && !marksFound) {
        console.log('Found marks row!');
        marksFound = true;
      }
    });
  }
  
  await browser.close();
  console.log('\nDone!');
}

testHybridApproach().catch(console.error);
