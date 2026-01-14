const axios = require('axios');
const cheerio = require('cheerio');

async function testExtraction() {
    const baseUrl = "https://crce-students.contineo.in/parents";
    const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
    // Replace with the one from browser subagent
    const finalCookies = "5bd4aa82278a9392700cda732bf3f9eb=fe77f52087a415f0411e4cc3e32a989a";

    try {
        console.log("Fetching dashboard...");
        const dashResp = await axios.get(`${baseUrl}/index.php?option=com_contineo&task=dashboard`, {
            headers: { "Cookie": finalCookies, "User-Agent": userAgent, "Referer": baseUrl + "/" }
        });
        
        const $ = cheerio.load(dashResp.data);
        const cieLinks = $('a').map((_, el) => $(el).attr('href')).get()
            .filter(h => h && h.includes('task=ciedetails'));
            
        console.log(`Links found: ${cieLinks.length}`);
        
        if (cieLinks.length === 0) {
            console.log("HTML length:", dashResp.data.length);
            console.log("Snippet:", dashResp.data.substring(0, 500));
            return;
        }

        const link = cieLinks[0];
        const url = link.startsWith("http") ? link : (new URL(link, baseUrl + "/").href);
        console.log("Fetching subject:", url);
        const subResp = await axios.get(url, {
            headers: { "Cookie": finalCookies, "User-Agent": userAgent, "Referer": baseUrl + "/index.php" }
        });
        
        const $$ = cheerio.load(subResp.data);
        console.log("Subject Name:", $$("caption").first().text().trim());
        const row = $$("table.cn-cie-table tbody tr").first();
        console.log("First Row Text:", row.text().trim());

    } catch (e) {
        console.error("FAILED:", e.message);
    }
}

testExtraction();
