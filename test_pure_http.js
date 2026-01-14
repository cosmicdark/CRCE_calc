// Test if pure HTTP requests can maintain session with CRCE portal
const axios = require('axios');
const cheerio = require('cheerio');

async function testPureHTTP() {
  const baseUrl = "https://crce-students.contineo.in/parents";
  const prn = "MU0341120240233054";
  const dob = "10-03-2006";
  const parts = dob.split("-");

  console.log("1. Fetching login page...");
  const loginPage = await axios.get(baseUrl + "/", { 
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/143.0.0.0" }
  });
  
  const cookies = loginPage.headers['set-cookie']?.map(c => c.split(';')[0]).join('; ') || '';
  console.log("   Cookies:", cookies.substring(0, 50) + "...");

  console.log("2. Submitting login...");
  const formData = new URLSearchParams({
    username: prn,
    dd: parts[0] + " ",  // Trailing space required
    mm: parts[1],
    yyyy: parts[2],
    log: "Login",
    MNP: "1"
  });

  const loginResponse = await axios.post(baseUrl + "/index.php", formData.toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": cookies,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/143.0.0.0",
      "Referer": baseUrl + "/"
    },
    maxRedirects: 5,
    validateStatus: () => true
  });

  console.log("   Status:", loginResponse.status);
  console.log("   Final URL:", loginResponse.request?.res?.responseUrl || "N/A");
  
  const $ = cheerio.load(loginResponse.data);
  const hasDashboard = $('a[href*="task=ciedetails"]').length > 0;
  const hasLoginForm = $('#username').length > 0;
  
  console.log("3. Result:");
  console.log("   Has CIE links (dashboard):", hasDashboard);
  console.log("   Has login form:", hasLoginForm);
  
  if (hasDashboard) {
    console.log("\n✅ PURE HTTP WORKS! Can scale to 1000+ users.");
    const cieCount = $('a[href*="task=ciedetails"]').length;
    console.log("   Found", cieCount, "CIE links");
  } else {
    console.log("\n❌ PURE HTTP FAILS - Session requires browser.");
  }
}

testPureHTTP().catch(e => console.error("Error:", e.message));
