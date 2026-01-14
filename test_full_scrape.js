const axios = require('axios');
const cheerio = require('cheerio');

async function testFullScrape() {
    const baseUrl = "https://crce-students.contineo.in/parents";
    const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
    let cookieMap = {};

    function cleanCookies(raw) {
        if (!raw) return {};
        const cookies = {};
        const rawArray = Array.isArray(raw) ? raw : [raw];
        rawArray.forEach(c => {
            const part = c.split(';')[0].trim();
            const idx = part.indexOf('=');
            if (idx > 0) cookies[mainPart = part.substring(0, idx)] = part.substring(idx + 1);
        });
        return cookies;
    }

    function serializeCookies(map) {
        return Object.entries(map).map(([k,v]) => `${k}=${v}`).join('; ');
    }

    try {
        console.log("1. Initial GET...");
        const r1 = await axios.get(baseUrl + "/", { headers: { "User-Agent": userAgent } });
        cookieMap = { ...cookieMap, ...cleanCookies(r1.headers["set-cookie"]) };
        
        const tokenMatch = r1.data.match(/<input type="hidden" name="([a-f0-9]{32})" value="1"/);
        const tokenName = tokenMatch ? tokenMatch[1] : null;
        const returnVal = r1.data.match(/<input type="hidden" name="return" value="([^"]+)"/)[1];

        console.log(`2. Login POST... Token: ${tokenName}`);
        const params = new URLSearchParams();
        params.append("username", "MU0341120240233054");
        params.append("dd", "10");
        params.append("mm", "03");
        params.append("yyyy", "2006");
        params.append("option", "com_user");
        params.append("task", "login");
        params.append("return", returnVal);
        params.append(tokenName, "1");

        const r2 = await axios.post(`${baseUrl}/index.php?option=com_user&task=login`, params.toString(), {
            headers: { 
                "Content-Type": "application/x-www-form-urlencoded", 
                "Cookie": serializeCookies(cookieMap),
                "User-Agent": userAgent,
                "Referer": baseUrl + "/"
            },
            maxRedirects: 0,
            validateStatus: s => s < 400
        });

        cookieMap = { ...cookieMap, ...cleanCookies(r2.headers["set-cookie"]) };
        const loc = r2.headers["location"];
        console.log(`3. Following Redirect... Status: ${r2.status}, Loc: ${loc}`);

        const r3 = await axios.get(loc.startsWith("http") ? loc : (new URL(loc, baseUrl + "/").href), {
            headers: { "Cookie": serializeCookies(cookieMap), "User-Agent": userAgent, "Referer": baseUrl + "/" }
        });

        const $ = cheerio.load(r3.data);
        const links = $('a').map((_, el) => $(el).attr('href')).get().filter(h => h && h.includes('task=ciedetails'));
        console.log(`Links found: ${links.length}`);
        if (links.length > 0) console.log(`First link: ${links[0]}`);
        else console.log(`HTML Snippet: ${r3.data.substring(0, 500)}`);

    } catch (e) {
        console.error("FAILED:", e.message);
    }
}

testFullScrape();
