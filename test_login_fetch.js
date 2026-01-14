
// Native fetch is available in Node 18+
async function testLogin() {
  const loginUrl = "https://crce-students.contineo.in/parents/";
  
  try {
    // 1. GET Login Page to get cookies and token
    const resp1 = await fetch(loginUrl);
    const html1 = await resp1.text();
    const cookies = resp1.headers.get('set-cookie'); // might be multiple?
    
    // Extract CSRF Token (usually name="md5hash" value="1")
    const tokenMatch = html1.match(/<input type="hidden" name="([a-f0-9]{32})" value="1"/);
    const tokenName = tokenMatch ? tokenMatch[1] : null;
    
    // Extract `return` field if exists
    const returnMatch = html1.match(/<input type="hidden" name="return" value="([^"]+)"/);
    const returnValue = returnMatch ? returnMatch[1] : "";

    console.log(`Token: ${tokenName}`);
    console.log(`Return: ${returnValue}`);
    console.log(`Cookie: ${cookies}`);

    if (!tokenName) {
        console.error("Could not find CSRF token");
        return;
    }

    // 2. Prepare POST data
    const params = new URLSearchParams();
    params.append("username", "MU0341120240233054"); // User provided PRN
    // User credentials: DOB 10-03-2006
    params.append("dd", "10"); // Try without space first? or with space? Original had space.
    params.append("mm", "03");
    params.append("yyyy", "2006");
    params.append("option", "com_user");
    params.append("task", "login");
    params.append("return", returnValue);
    params.append(tokenName, "1");
    // Add other potential hidden fields from a standard Joomla login?
    // Maybe not needed.

    // 3. POST Login
    // Note: The form action might be slightly different, let's assume index.php?option=com_user&task=login
    const postUrl = "https://crce-students.contineo.in/parents/index.php?option=com_user&task=login";
    
    // We need to pass the cookies we got
    const resp2 = await fetch(postUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": cookies || "",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        },
        body: params.toString(),
        redirect: 'manual' // We want to see the redirect
    });

    console.log(`Login Status: ${resp2.status}`);
    console.log(`Login Loc: ${resp2.headers.get('location')}`);
    
    // If redirected, follow it with cookies
    if (resp2.status === 302 || resp2.status === 303) {
        const nextUrl = resp2.headers.get('location');
        // Likely need to merge cookies if Set-Cookie was present in resp2
        const cookies2 = resp2.headers.get('set-cookie');
        const finalCookies = (cookies || "") + (cookies2 ? "; " + cookies2 : ""); // Naive merge
        
        const resp3 = await fetch(nextUrl, {
             headers: { 
                 "Cookie": finalCookies,
                 "User-Agent": "Mozilla/5.0"
             }
        });
        const html3 = await resp3.text();
        const isLoggedIn = html3.includes("Logout") || html3.includes("Welcome") || html3.includes("task=ciedetails");
        console.log(`LOGGED IN: ${isLoggedIn}`);
        if (isLoggedIn) console.log("LOGIN SUCCESS");
        else console.log("LOGIN FAILED: " + html3.substring(0, 200));
        
        // If logged in, we can try to fetch the marks page too?
        // To verify we can get the data.
    } else {
        const html2 = await resp2.text();
        console.log("Login Body:", html2.substring(0, 500));
    }

  } catch (e) {
    console.error(e);
  }
}

testLogin();
