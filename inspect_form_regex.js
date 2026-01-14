
const fs = require('fs');

try {
  let content = fs.readFileSync('form_output.txt', 'utf8');
  if (content.includes('\0')) {
      content = fs.readFileSync('form_output.txt', 'utf16le');
  }

  const inputRegex = /<input[^>]+>/g;
  const selectRegex = /<select[^>]+>/g;
  
  const inputs = content.match(inputRegex) || [];
  const selects = content.match(selectRegex) || [];
  
  console.log("--- INPUTS ---");
  inputs.forEach(i => console.log(i));
  
  console.log("--- SELECTS ---");
  selects.forEach(s => console.log(s));
  
  // Also check form action
  const formMatch = content.match(/<form[^>]+>/);
  if (formMatch) console.log("--- FORM ---", formMatch[0]);

} catch (e) {
  console.error(e);
}
