
// Native fetch in Node 18+
async function testScrape() {
  const url = "http://localhost:3000/api/scrape";
  const body = {
    prn: "MU0341120240233054",
    dob: "10-03-2006"
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
        console.error(`Error: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.error(text);
        return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n\n");
      buffer = lines.pop() || ""; // keep incomplete chunk

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const jsonStr = line.replace("data: ", "").trim();
          try {
             const msg = JSON.parse(jsonStr);
             if (msg.type === 'progress') {
                 console.log(`[PROGRESS] ${msg.message} (${msg.current}/${msg.total || '?'})`);
                 if (msg.message.startsWith('DEBUG')) console.log(`[RAW DEBUG] ${msg.message}`);
             } else if (msg.type === 'result') {
                 console.log("--- RESULT ---");
                 console.log(`SGPA: ${msg.data.sgpa}`);
                 console.log(`Total Marks: ${msg.data.totalMarksAll} / ${msg.data.maxMarksAll}`);
                 msg.data.subjects.forEach(s => {
                     console.log(`- ${s.subjectName.substring(0, 30)}... | Obt: ${s.totalObt}/${s.totalMax} | Gr: ${s.grade} | Cr: ${s.credits}`);
                 });
             } else if (msg.type === 'error') {
                 console.error(`[ERROR] ${msg.error}`);
             }
          } catch (e) {
             console.error("Parse error:", e);
          }
        }
      }
    }

    fs.writeFileSync('debug_scrapeork.txt', bufferFull);
  } catch (e) {
    console.error("Fetch failed (is server running?):", e);
  }
}

const fs = require('fs');
let bufferFull = "";
const originalLog = console.log;
console.log = (...args) => {
    bufferFull += args.join(' ') + "\n";
    originalLog(...args);
};
const originalErr = console.error;
console.error = (...args) => {
    bufferFull += args.join(' ') + "\n";
    originalErr(...args);
};

testScrape();
