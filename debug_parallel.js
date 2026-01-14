require('dotenv').config({ path: '.env.local' });
const { chromium } = require('playwright');
const { load } = require('cheerio');

async function debugParallel() {
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
  
  console.log('Current URL after login:', page.url());
  
  // Get dashboard HTML
  const dashboardHtml = await page.content();
  const $ = load(dashboardHtml);
  
  // Find all subject links
  const links = [];
  $('a[href*="task=ciedetails"]').each((i, el) => {
    const href = $(el).attr('href');
    console.log(`Raw href #${i}:`, href);
    
    // Build full URL
    let fullUrl;
    if (href.startsWith('http')) {
      fullUrl = href;
    } else if (href.startsWith('/')) {
      fullUrl = 'https://crce-students.contineo.in' + href;
    } else {
      fullUrl = page.url().replace(/\/[^/]*$/, '/') + href;
    }
    console.log(`Full URL #${i}:`, fullUrl);
    links.push(fullUrl);
  });
  
  console.log(`\nFound ${links.length} subject URLs\n`);
  
  if (links.length > 0) {
    // Test navigating to first URL
    console.log('Testing navigation to first URL...');
    const tab2 = await context.newPage();
    await tab2.goto(links[0], { waitUntil: 'domcontentloaded' });
    
    const content = await tab2.content();
    const $2 = load(content);
    
    console.log('Page title:', $2('title').text());
    console.log('Caption text:', $2('caption').first().text());
    console.log('H3 texts:', $2('h3').map((_, el) => $2(el).text().trim()).get().slice(0, 3));
    
    // Check for marks
    const rows = [];
    $2('tr').each((_, tr) => {
      const cells = $2(tr).find('td').map((_, td) => $2(td).text().trim()).get();
      const hasMarks = cells.some(c => c.match(/\d+(\.\d+)?\s*\/\s*\d+/));
      if (hasMarks) {
        rows.push(cells);
      }
    });
    console.log('Rows with marks:', rows.length);
    if (rows.length > 0) {
      console.log('First row:', rows[0]);
    }
    
    await tab2.close();
  }
  
  await browser.close();
  console.log('\nDone!');
}

debugParallel().catch(console.error);
