
const fs = require('fs');

try {
  // Try reading as utf8 first, if it looks garbage, try utf16le
  let content = fs.readFileSync('form_output.txt', 'utf8');
  if (content.includes('\0')) {
      content = fs.readFileSync('form_output.txt', 'utf16le');
  }

  const lines = content.split('\n');
  lines.forEach(line => {
    if (line.toLowerCase().includes('<form') || line.toLowerCase().includes('<input') || line.toLowerCase().includes('<select')) {
      console.log(line.trim());
    }
  });
} catch (e) {
  console.error(e);
}
