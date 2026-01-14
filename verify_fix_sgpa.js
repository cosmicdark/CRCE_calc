const { chromium } = require('playwright');
const { load } = require('cheerio');

// MOCK CREDIT MAP (Based on current creditMap.ts)
const CREDIT_MAP = {
    // Core CE Sem III
    "25BSC12CE05": 2, // Discrete Math
    "25PCC12CE05": 3, // COA
    "25PCC12CE06": 4, // DS
    "25PCC12CE07": 1, // JAVA
    "25OE13CE1X": 2,  // Law
    "25MDMX1": 2,     // MDM 1 (Assuming resolved to X1)
    "25MDMX2": 2,     // MDM 2
    "25MDMXX1": 2,     // Double X variant
    "25MDMXX2": 2,     // Double X variant
    "25AEC12CE02X": 2,// Modern Indian Lang
    "25VEC12CE01": 2, // Human Values
    "25CEP12CE01": 2, // CEP
    "25DMX1": 4,      // Double Minor
    "25DM31": 4,      // CADCAM (Added Fix)
    "25HR02": 4,      // Honors
};

const PATTERNS = [
    { regex: /25BSC/, credit: 2 },
    { regex: /25PCC.*06/, credit: 4 },
    { regex: /25PCC.*07/, credit: 1 },
    { regex: /25PCC/, credit: 3 },
    { regex: /25OE/, credit: 2 },
    { regex: /25MDM/, credit: 2 },
    { regex: /25AEC/, credit: 2 },
    { regex: /25VEC/, credit: 2 },
    { regex: /25CEP/, credit: 2 },
    { regex: /25PW/, credit: 4 },
    { regex: /25INT/, credit: 2 },
    { regex: /25HON/, credit: 4 },
    { regex: /25MIN/, credit: 3 },
];

function getCredits(subjectName) {
    // Extract code
    let code = "";
    const match = subjectName.match(/\((.*?)\)/);
    if (match) code = match[1].trim(); // e.g., 25BSC12CE05
    else {
         const parts = subjectName.split(" ");
         code = parts[parts.length - 1];
    }
    
    code = code.replace(/\s/g, '').toUpperCase();
    
    // 1. Exact
    if (CREDIT_MAP[code]) return CREDIT_MAP[code];

    // 2. Embedded
    for (const [k, v] of Object.entries(CREDIT_MAP)) {
        if (code.includes(k)) return v;
    }

    // 3. Pattern
    for (const p of PATTERNS) {
        if (p.regex.test(code)) return p.credit;
    }

    return 2; // Default
}

function parseMark(raw) {
  if (!raw) return null; 
  raw = raw.trim(); 
  if (!raw.includes("/")) return null;
  const parts = raw.split("/");
  const obt = Number(parts[0].replace(/[^\d.]/g, ""));
  const max = Number(parts[1].replace(/[^\d.]/g, ""));
  if (Number.isFinite(obt) && Number.isFinite(max)) return { obtained: obt, max };
  return null;
}

const percentToGrade = (p) => {
  if (p === null || p === undefined) return "NA";
  if (p >= 85) return "O"; if (p >= 80) return "A"; if (p >= 70) return "B"; if (p >= 60) return "C";
  if (p >= 50) return "D"; if (p >= 45) return "E"; if (p >= 40) return "P"; return "F";
};

const gradeToPoint = { O: 10, A: 9, B: 8, C: 7, D: 6, E: 5, P: 4, F: 0, NA: null };

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        console.log("Logging in...");
        await page.goto("https://crce-students.contineo.in/parents");
        await page.fill("#username", "MU0341120240233054");
        await page.selectOption("#dd", "10 ");
        await page.selectOption("#mm", "03");
        await page.selectOption("#yyyy", "2006");
        
        await page.click(".cn-login-btn");
        await page.waitForNavigation();

        const links = await page.locator('a[href*="task=ciedetails"]').all();
        console.log(`Found ${links.length} exam links.`);
        
        const subjects = [];
        
        for (let i = 0; i < links.length; i++) {
            const currentLink = page.locator('a[href*="task=ciedetails"]').nth(i);
            await currentLink.click();
            await page.waitForNavigation({ timeout: 60000 }); // Wait for page load with increased timeout
            
            const content = await page.content();
            const $ = load(content);
            
            let subjectName = $("caption").first().text().trim();
             // Fallback name logic if caption is empty
            if (!subjectName) {
                // Try h3 logic
                 $("h3").each((_, el) => {
                    const t = $(el).text().trim();
                    if (t.includes("(")) subjectName = t; 
                 });
            }
            if(!subjectName) subjectName = "UNKNOWN " + i;

            // NO SKIPPING LOGIC HERE ANYMORE (Fixed)

            let totalObt = 0;
            let totalMax = 0;
            
            $("tr").each((_, tr) => {
                const cells = $(tr).find("td").map((_, td) => $(td).text().trim()).get();
                 const parsedRow = cells.filter(c => c.match(/\d+(\.\d+)?\s*\/\s*\d+/))
                      .map(m => parseMark(m)).filter(x => x !== null);
                
                if (parsedRow.length > 0) {
                     parsedRow.forEach(m => { totalObt += m.obtained; totalMax += m.max; });
                     return false; // Break after finding marks row
                }
            });

            if (totalMax > 0) {
                const percentage = (totalObt / totalMax) * 100;
                const grade = percentToGrade(percentage);
                const point = gradeToPoint[grade];
                const credit = getCredits(subjectName);
                
                console.log(`SUBJECT: ${subjectName}`);
                console.log(`  -- Marks: ${totalObt}/${totalMax} (${percentage.toFixed(2)}%)`);
                console.log(`  -- Grade: ${grade} (${point} pts)`);
                console.log(`  -- Credits: ${credit}`);
                
                subjects.push({ point, credit, totalObt, totalMax });
            }
            
            await page.goBack(); 
        }

        // CALCULATE SGPA
        let totalCredits = 0;
        let totalPoints = 0;
        let totalMarks = 0;
        let totalMaxMarks = 0;

        subjects.forEach(s => {
            totalPoints += (s.point * s.credit);
            totalCredits += s.credit;
            totalMarks += s.totalObt;
            totalMaxMarks += s.totalMax;
        });
        
        const sgpa = totalPoints / totalCredits;

        console.log("\n--- RESULT ---");
        console.log(`Total Credits: ${totalCredits}`);
        console.log(`Total Points: ${totalPoints}`);
        console.log(`SGPA: ${sgpa.toFixed(2)}`);
        console.log(`Total Marks: ${totalMarks} / ${totalMaxMarks}`);

    } catch (e) {
        console.error(e);
    } finally {
       // await browser.close();
    }
})();
