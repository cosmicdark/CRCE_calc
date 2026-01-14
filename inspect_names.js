
const fs = require('fs');

try {
  let content = fs.readFileSync('form_output.txt', 'utf8');
  if (content.includes('\0')) {
      content = fs.readFileSync('form_output.txt', 'utf16le');
  }

  const inputs = content.match(/<input[^>]+>/g) || [];
  
  console.log("--- FIELDS ---");
  inputs.forEach(i => {
      const name = (i.match(/name=["']([^"']+)["']/) || [])[1];
      const value = (i.match(/value=["']([^"']+)["']/) || [])[1];
      const type = (i.match(/type=["']([^"']+)["']/) || [])[1];
      if (name) console.log(`${name} (${type}): ${value || ''}`);
  });
  
  const selects = content.match(/<select[^>]+>/g) || [];
  selects.forEach(s => {
      const name = (s.match(/name=["']([^"']+)["']/) || [])[1];
      if (name) console.log(`SELECT: ${name}`);
  });

} catch (e) {
  console.error(e);
}
