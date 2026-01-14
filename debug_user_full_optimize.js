const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false }); // Headless: false to see what happens
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log("Logging in...");
    await page.goto("https://crce-students.contineo.in/parents");
    await page.fill("#username", "MU0341120240233054");
    
    // Select DOB: 10-03-2006
    await page.selectOption("#dd", { value: "10 " }); // Note: value might need space? Check previous code. 
    // Previous code used: (dd.length < 2 ? "0" + dd : dd) + " " -> "10 "
    
    await page.selectOption("#mm", "03");
    await page.selectOption("#yyyy", "2006");

    await Promise.all([
      page.click(".cn-login-btn"),
      page.waitForNavigation({ waitUntil: "domcontentloaded" })
    ]);

    if (page.url().includes("login")) {
      console.error("Login failed!");
      return;
    }

    console.log("Login successful. Analyzing Dashboard...");
    
    // 1. Capture Dashboard HTML to debug missing links
    // const fs = require('fs');
    // fs.writeFileSync('dashboard_dump.html', await page.content());

    // 2. Find ALL links that look like subjects
    const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a')).map(a => ({
            text: a.innerText.trim(),
            href: a.href
        }));
    });
    
    const subjectLinks = links.filter(l => l.href.includes("task=ciedetails"));
    console.log(`Found ${subjectLinks.length} subject links:`);
    subjectLinks.forEach(l => console.log(` - ${l.text} -> ${l.href}`));

    // 3. Test DIRECT NAVIGATION Speed & Safety
    console.log("\nTesting Direct Navigation Optimization...");
    const start = Date.now();
    
    if (subjectLinks.length > 0) {
        const testLink = subjectLinks[0].href;
        console.log(`Directly visiting: ${testLink}`);
        
        // Navigate directly without clicking/going back
        await page.goto(testLink, { waitUntil: "domcontentloaded" });
        
        const content = await page.content();
        const firstSubjectName = await page.locator("caption").first().innerText().catch(() => "N/A");
        console.log(`Loaded Subject Page! Caption: ${firstSubjectName}`);
        
        if (content.includes("Login") || page.url().includes("login")) {
            console.error("❌ Direct Navigation FAILED (Redirected to Login)");
        } else {
            console.log("✅ Direct Navigation WORKED! (Session preserved)");
        }
    } else {
        console.log("No subject links found to test.");
    }

    const duration = (Date.now() - start) / 1000;
    console.log(`Direct navigation check took ${duration}s`);

  } catch (e) {
    console.error("Error:", e);
  } finally {
    // await browser.close(); // Keep open to inspect if needed
  }
})();
