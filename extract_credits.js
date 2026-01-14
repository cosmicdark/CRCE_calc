/**
 * Extract credit scores from FRCRCE syllabus PDFs
 * Covers all branches: CE, CSE, ECS, MECH, AI&DS
 * All years: FE, SE, TE, BE
 */

const axios = require('axios');
const pdfParse = require('pdf-parse');
const fs = require('fs');

// All syllabus PDF URLs organized by year and branch
const SYLLABUS_PDFS = {
  "2025-26": {
    "FE": {
      "CE": "http://www.frcrce.ac.in/images/2025/AutonomousSyllabus/CE/currirulum_FE_FrCRCE_CE_2025_26-v2-aug25.pdf",
      "CSE": "http://www.frcrce.ac.in/images/2025/AutonomousSyllabus/CS/currirulum_FE_FrCRCE_CS_2025_26_new_final1.pdf",
      "ECS": "http://www.frcrce.ac.in/images/2025/AutonomousSyllabus/ECS/curriculum_FE_FrCRCE_ECS_2025_26.pdf",
      "MECH": "http://www.frcrce.ac.in/images/2025/AutonomousSyllabus/ME/FE_Curriculum_Mechanical_UG_2025-26.pdf"
    },
    "SE": {
      "CE": "http://www.frcrce.ac.in/images/2025/AutonomousSyllabus/CE/currirulum_SE_FrCRCE-1_CE_v5_AC_1_updated_21jun25-final.pdf",
      "CSE": "http://www.frcrce.ac.in/images/2025/AutonomousSyllabus/CS/SE_CSE_2025_26_new1.pdf",
      "ECS": "http://www.frcrce.ac.in/images/2025/AutonomousSyllabus/ECS/curriculum_SE_FrCRCE_ECS20250303.pdf",
      "MECH": "http://www.frcrce.ac.in/images/2025/AutonomousSyllabus/ME/12_09_25_V8_SE_MECH_2025_26_Rev2_Detailed_Syllabus.pdf"
    },
    "TE": {
      "CE": "http://www.frcrce.ac.in/images/2025/AutonomousSyllabus/CE/TE_Comp_2025_26_Rev2_2_03march_v5_1.pdf",
      "AIDS": "http://www.frcrce.ac.in/images/2025/AutonomousSyllabus/CS/TE_AIDS_2025_26.pdf",
      "ECS": "http://www.frcrce.ac.in/images/2025/AutonomousSyllabus/ECS/currriculum_TE_FrCRCE_ECS_20250303.pdf",
      "MECH": "http://www.frcrce.ac.in/images/2025/AutonomousSyllabus/ME/V6_TE_VMECH_2025_26_Rev2_Detailed_Syllabus.pdf"
    },
    "BE": {
      "CE": "http://www.frcrce.ac.in/images/2025/AutonomousSyllabus/CE/CE_BE_syllabus_25-26.pdf",
      "AIDS": "http://www.frcrce.ac.in/images/2025/AutonomousSyllabus/CS/BE_Curriculum.pdf",
      "ECS": "http://www.frcrce.ac.in/images/2025/AutonomousSyllabus/ECS/curriculum_BE_FrCRCE_ECS_1.pdf",
      "MECH": "http://www.frcrce.ac.in/images/2024/autonomous_curriculum/syllabus/MECH/currirulum_BE_FrCRCE-1_ME.pdf"
    }
  }
};

// Extract credit information from PDF text
function extractCredits(text, branch, year) {
  const credits = [];
  
  // Common patterns for credit extraction in syllabus PDFs
  // Pattern 1: Subject Code | Subject Name | L | T | P | Credits
  // Pattern 2: Credits column in table format
  
  const lines = text.split('\n');
  
  // Look for table rows with credit information
  // Credit values are typically 1-4 for individual subjects
  const creditPatterns = [
    // Pattern: Code (with branch identifier) followed by numbers including credits
    /([A-Z0-9]{2,}[A-Z]{2,}[0-9]{2,})\s+.*?(\d)\s*$/gm,
    // Pattern: Subject code with L T P C format
    /([A-Z0-9]+)\s+([^\d]+)\s+(\d)\s+(\d)\s+(\d)\s+(\d)/g,
    // Pattern: Looking for "Credits: X" or "Credit: X"
    /[Cc]redits?\s*[:=]?\s*(\d)/g
  ];
  
  // Extract subject codes and try to find credits
  const subjectCodePattern = /\b(25[A-Z]{2,4}\d{2}[A-Z]{2}\d{2})\b/g;
  let match;
  
  while ((match = subjectCodePattern.exec(text)) !== null) {
    const code = match[1];
    
    // Find the line containing this code
    for (const line of lines) {
      if (line.includes(code)) {
        // Try to find credit value (usually last single digit in the row, 1-4)
        const numbers = line.match(/\b(\d)\b/g);
        if (numbers && numbers.length > 0) {
          // The credit is usually the last single digit
          const credit = parseInt(numbers[numbers.length - 1]);
          if (credit >= 1 && credit <= 8) {
            credits.push({
              code: code,
              credit: credit,
              line: line.trim().substring(0, 100)
            });
          }
        }
        break;
      }
    }
  }
  
  return credits;
}

async function downloadAndParsePDF(url, branch, year, semester) {
  try {
    console.log(`Downloading: ${semester} ${branch} (${year})...`);
    
    const response = await axios.get(url, { 
      responseType: 'arraybuffer',
      timeout: 30000 
    });
    
    const data = await pdfParse(response.data);
    const credits = extractCredits(data.text, branch, year);
    
    console.log(`  Found ${credits.length} subjects with credits`);
    
    return {
      branch,
      year,
      semester,
      url,
      credits,
      rawTextPreview: data.text.substring(0, 500)
    };
  } catch (error) {
    console.error(`  Error: ${error.message}`);
    return { branch, year, semester, url, error: error.message };
  }
}

async function extractAllCredits() {
  console.log("=== FRCRCE Syllabus Credit Extractor ===\n");
  
  const allCredits = {};
  
  for (const [academicYear, semesters] of Object.entries(SYLLABUS_PDFS)) {
    console.log(`\nAcademic Year: ${academicYear}`);
    console.log("─".repeat(40));
    
    allCredits[academicYear] = {};
    
    for (const [semester, branches] of Object.entries(semesters)) {
      allCredits[academicYear][semester] = {};
      
      for (const [branch, url] of Object.entries(branches)) {
        const result = await downloadAndParsePDF(url, branch, academicYear, semester);
        allCredits[academicYear][semester][branch] = result;
      }
    }
  }
  
  // Save results
  const outputPath = './syllabus_credits.json';
  fs.writeFileSync(outputPath, JSON.stringify(allCredits, null, 2));
  console.log(`\n✅ Results saved to ${outputPath}`);
  
  // Generate credit map for the scraper
  generateCreditMap(allCredits);
  
  return allCredits;
}

function generateCreditMap(allCredits) {
  console.log("\n=== Generating Credit Map for Scraper ===\n");
  
  const creditMap = {};
  
  for (const [year, semesters] of Object.entries(allCredits)) {
    for (const [semester, branches] of Object.entries(semesters)) {
      for (const [branch, data] of Object.entries(branches)) {
        if (data.credits) {
          for (const subject of data.credits) {
            creditMap[subject.code] = {
              credit: subject.credit,
              branch,
              semester,
              year
            };
          }
        }
      }
    }
  }
  
  // Save as TypeScript-ready format
  const tsContent = `// Auto-generated credit map from FRCRCE syllabus PDFs
// Generated on: ${new Date().toISOString()}

export const CREDIT_MAP: Record<string, number> = {
${Object.entries(creditMap).map(([code, info]) => `  "${code}": ${info.credit},`).join('\n')}
};

export function getCreditsFromCode(subjectCode: string): number {
  // Try exact match
  if (CREDIT_MAP[subjectCode]) return CREDIT_MAP[subjectCode];
  
  // Try partial match (for subject codes embedded in names)
  for (const [code, credit] of Object.entries(CREDIT_MAP)) {
    if (subjectCode.includes(code)) return credit;
  }
  
  // Default credit value
  return 2;
}
`;

  fs.writeFileSync('./src/lib/creditMap.ts', tsContent);
  console.log(`✅ Credit map saved to ./src/lib/creditMap.ts`);
  console.log(`   Total subjects: ${Object.keys(creditMap).length}`);
}

// Run extraction
extractAllCredits().catch(console.error);
