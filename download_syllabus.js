/**
 * Extract credit scores from FRCRCE syllabus PDFs using pdfjs-dist
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// All syllabus PDF URLs
const SYLLABUS_PDFS = {
  "2025-26": {
    "SE": {
      "CE": "http://www.frcrce.ac.in/images/2025/AutonomousSyllabus/CE/currirulum_SE_FrCRCE-1_CE_v5_AC_1_updated_21jun25-final.pdf",
    }
  }
};

async function downloadPDF(url, outputPath) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  fs.writeFileSync(outputPath, response.data);
  return outputPath;
}

async function main() {
  console.log("Downloading SE CE syllabus PDF...");
  
  const url = SYLLABUS_PDFS["2025-26"]["SE"]["CE"];
  const outputPath = path.join(__dirname, 'temp_syllabus.pdf');
  
  try {
    await downloadPDF(url, outputPath);
    console.log("Downloaded successfully!");
    console.log("PDF saved to:", outputPath);
    console.log("\nPlease open this PDF manually and share the credit table structure.");
    console.log("The script will then be updated to parse it correctly.");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
