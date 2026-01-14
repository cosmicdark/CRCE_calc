const { chromium } = require('playwright');
const { load } = require('cheerio');

// Mock getCredits
const getCredits = (name) => 2; // Default for debug

async function parseMark(raw) {
  if (!raw) return null; raw = raw.trim(); if (!raw.includes("/")) return null;
  const parts = raw.split("/");
  const obt = Number(parts[0].replace(/[^\d.]/g, ""));
  const max = Number(parts[1].replace(/[^\d.]/g, ""));
  if (Number.isFinite(obt) && Number.isFinite(max)) return { obtained: obt, max };
  return null;
}

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
        console.log("Logging in...");
        await page.goto("https://crce-students.contineo.in/parents");
        await page.fill("#username", "MU0341120240233054");
        await page.selectOption("#dd", "10 "); 
        await page.selectOption("#mm", "03");
        await page.selectOption("#yyyy", "2006");
        
        await Promise.all([
          page.click(".cn-login-btn"),
          page.waitForNavigation()
        ]);

        const links = await page.locator('a[href*="task=ciedetails"]').all();
        console.log(`Found ${links.length} exam links.`);
        
        const subjects = [];

        for (let i = 0; i < links.length; i++) {
            console.log(`Processing link ${i+1}...`);
            // IDK if the link reference stays valid after navigation, so re-query
            const currentLink = page.locator('a[href*="task=ciedetails"]').nth(i);
            await Promise.all([
                currentLink.click(),
                page.waitForNavigation()
            ]);
            
            const content = await page.content();
            const $ = load(content);
            
            // Name extraction logic from route.ts
            let subjectName = $("caption").first().text().trim();
            if (!subjectName) {
                $("h3, .uk-h3").each((_, el) => {
                    const t = $(el).text().trim();
                     if (t.match(/\d{2}[A-Z]{2,3}\d{2}[A-Z]{2}\d{2}/) || t.length > 5) {
                        subjectName = t; return false;
                    }
                });
            }
            console.log(`  Name: ${subjectName}`);
            
            // Check skip logic
            if (subjectName.includes("25DM")) {
                console.log("  SKIPPED due to '25DM' filter");
            }

            let foundMarks = [];
            $("tr").each((_, tr) => {
                const cells = $(tr).find("td").map((_, td) => $(td).text().trim()).get();
                const parsedRow = cells.filter(c => c.match(/\d+(\.\d+)?\s*\/\s*\d+/))
                      .map(m => parseMark(m)).filter(x => x !== null);
                if (parsedRow.length > 0) {
                    foundMarks = parsedRow;
                    return false;
                }
            });
            console.log(`  Marks Found: ${foundMarks.length}`);
            
            subjects.push({ name: subjectName, marks: foundMarks });
            
            await page.goBack(); 
        }

        const fs = require('fs');
        fs.writeFileSync('output_local.json', JSON.stringify(subjects, null, 2));
        console.log("Done. Saved to output_local.json");

    } catch (e) {
        console.error(e);
    } finally {
        // await browser.close();
    }
})();
