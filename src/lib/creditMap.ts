// Auto-generated credit map for FRCRCE subjects
// Covers all branches: CE, CSE, ECS, MECH, AI&DS
// All years: FE, SE, TE, BE

/**
 * Credit mapping based on subject code patterns:
 * - Subject codes follow format: 25XXXYYZZ where:
 *   - 25 = Academic year prefix
 *   - XXX = Category (BSC=Basic Science, PCC=Program Core, OE=Open Elective, etc.)
 *   - YY = Branch code (CE, CS, EC, ME, etc.)
 *   - ZZ = Subject number
 * 
 * Standard credit patterns:
 * - BSC (Basic Science Core): 2-3 credits
 * - PCC (Program Core Course): 1-4 credits depending on L-T-P
 * - OE (Open Elective): 2 credits
 * - MDM (Multi-Disciplinary Minor): 2 credits
 * - AEC (Ability Enhancement Course): 2 credits
 * - VEC (Value Education Course): 2 credits
 * - CEP (Community Engagement Project): 2 credits
 * - LLC (Liberal Learning Course): 2 credits
 * - PW (Project Work): 2-4 credits
 * - INT (Internship): 2-4 credits
 */

export const CREDIT_MAP: Record<string, number> = {
  // ========== COMMON SUBJECTS (All Branches) ==========
  // Basic Sciences
  "25BSC12CE01": 3, // Engineering Mathematics I
  "25BSC12CE02": 3, // Engineering Mathematics II
  "25BSC12CE03": 3, // Engineering Mathematics III
  "25BSC12CE04": 3, // Engineering Mathematics IV
  "25BSC12CE05": 2, // Physics/Chemistry
  
  // ========== COMPUTER ENGINEERING (CE) ==========
  // SE CE
  "25PCC12CE01": 3, // Data Structures
  "25PCC12CE02": 3, // Computer Organization
  "25PCC12CE03": 3, // Discrete Mathematics
  "25PCC12CE04": 3, // Operating Systems
  "25PCC12CE05": 3, // Database Management
  "25PCC12CE06": 4, // Data Structures (with Lab)
  "25PCC12CE07": 1, // OOP with Java (Lab only)
  "25PCC12CE08": 3, // Computer Networks
  "25PCC12CE09": 3, // Software Engineering
  "25PCC12CE10": 4, // Web Development
  
  // TE CE
  "25PCC13CE01": 4, // Machine Learning
  "25PCC13CE02": 4, // Artificial Intelligence
  "25PCC13CE03": 3, // Information Security
  "25PCC13CE04": 3, // Cloud Computing
  "25PCC13CE05": 4, // Big Data Analytics
  
  // BE CE
  "25PCC14CE01": 4, // Deep Learning
  "25PCC14CE02": 4, // Distributed Systems
  "25PCC14CE03": 3, // Blockchain Technology
  
  // ========== CSE / AI&DS ==========
  "25PCC12CS01": 3, // Programming Fundamentals
  "25PCC12CS02": 3, // Data Structures
  "25PCC12CS03": 3, // Algorithms
  "25PCC12CS04": 4, // Machine Learning
  "25PCC12CS05": 3, // Deep Learning
  
  // ========== ELECTRONICS & COMPUTER SCIENCE (ECS) ==========
  "25PCC12EC01": 3, // Digital Electronics
  "25PCC12EC02": 3, // Microprocessors
  "25PCC12EC03": 3, // Signal Processing
  "25PCC12EC04": 4, // Embedded Systems
  "25PCC12EC05": 3, // VLSI Design
  
  // ========== MECHANICAL ENGINEERING (MECH) ==========
  "25PCC12ME01": 3, // Thermodynamics
  "25PCC12ME02": 3, // Fluid Mechanics
  "25PCC12ME03": 4, // Machine Design
  "25PCC12ME04": 3, // Manufacturing Processes
  "25PCC12ME05": 3, // Heat Transfer
  
  // ========== ELECTIVES & MINORS ==========
  // Open Electives (2 credits each)
  "25OE13CE01": 2,
  "25OE13CE02": 2,
  "25OE13CE03": 2,
  "25OE13CE04": 2,
  "25OE13CE05": 2,
  "25OE13CE06": 2,
  "25OE13CE07": 2,
  "25OE13CE08": 2,
  "25OE13CE09": 2,
  "25OE13CE10": 2,
  "25OE13CE11": 2,
  "25OE13CE12": 2,
  
  // Multi-Disciplinary Minors (2 credits each)
  "25MDM12BM01": 2, // Business Minor
  "25MDM12BM02": 2,
  "25MDMBM1": 2, // Financial Accounting
  "25MDMBM2": 2, // Economics for Business
  
  // Ability Enhancement Courses (2 credits)
  "25AEC12CE01": 2,
  "25AEC12CE02": 2,
  
  // Value Education Courses (2 credits)
  "25VEC12CE01": 2, // Human Values
  "25VEC12CE02": 2,
  
  // Community Engagement Projects (2 credits)
  "25CEP12CE01": 2,
  "25CEP12CE02": 2,
  
  // Liberal Learning Courses (2 credits)
  "25LLC12CE01": 2,
  "25LLC12CE02": 2,
};

/**
 * Pattern-based credit lookup for subjects not in the explicit map
 */
const PATTERN_CREDITS: Array<{ pattern: RegExp; credit: number; description: string }> = [
  // Audit courses (0 credits) - DM = Double Minor
  { pattern: /25DM/, credit: 0, description: "Double Minor (Audit)" },
  
  // Basic Sciences (2-3 credits)
  { pattern: /25BSC/, credit: 2, description: "Basic Science Core" },
  
  // Program Core with Labs (4 credits)
  { pattern: /25PCC.*06/, credit: 4, description: "Core with Lab Component" },
  
  // Program Core Lab only (1 credit)
  { pattern: /25PCC.*07/, credit: 1, description: "Lab Only" },
  
  // Program Core Theory (3 credits)
  { pattern: /25PCC/, credit: 3, description: "Program Core Course" },
  
  // Open Electives (2 credits)
  { pattern: /25OE/, credit: 2, description: "Open Elective" },
  
  // Multi-Disciplinary Minors (2 credits)
  { pattern: /25MDM/, credit: 2, description: "Multi-Disciplinary Minor" },
  
  // Ability Enhancement (2 credits)
  { pattern: /25AEC/, credit: 2, description: "Ability Enhancement Course" },
  
  // Value Education (2 credits)
  { pattern: /25VEC/, credit: 2, description: "Value Education Course" },
  
  // Community Engagement (2 credits)
  { pattern: /25CEP/, credit: 2, description: "Community Engagement Project" },
  
  // Liberal Learning (2 credits)
  { pattern: /25LLC/, credit: 2, description: "Liberal Learning Course" },
  
  // Project Work (4 credits)
  { pattern: /25PW/, credit: 4, description: "Project Work" },
  
  // Internship (2 credits)
  { pattern: /25INT/, credit: 2, description: "Internship" },
  
  // Honors courses (4 credits)
  { pattern: /25HON/, credit: 4, description: "Honors Course" },
  
  // Minor specialization (3 credits)
  { pattern: /25MIN/, credit: 3, description: "Minor Specialization" },
];

/**
 * Get credits for a subject based on its code
 * Uses explicit mapping first, then pattern matching
 */
export function getCreditsFromCode(subjectCode: string): { credit: number; source: string } {
  // Normalize the code - remove spaces, make uppercase
  const normalizedCode = subjectCode.replace(/\s/g, '').toUpperCase();
  
  // 1. Try exact match
  if (CREDIT_MAP[normalizedCode]) {
    return { credit: CREDIT_MAP[normalizedCode], source: 'exact' };
  }
  
  // 2. Try to find the code within the subject name (e.g., "Subject Name (25PCC12CE06)")
  for (const [code, credit] of Object.entries(CREDIT_MAP)) {
    if (normalizedCode.includes(code) || subjectCode.includes(code)) {
      return { credit, source: 'embedded' };
    }
  }
  
  // 3. Try pattern matching
  for (const { pattern, credit, description } of PATTERN_CREDITS) {
    if (pattern.test(normalizedCode) || pattern.test(subjectCode)) {
      return { credit, source: `pattern:${description}` };
    }
  }
  
  // 4. Default value
  return { credit: 2, source: 'default' };
}

/**
 * Simple function that returns just the credit number
 */
export function getCredits(subjectName: string): number {
  const { credit } = getCreditsFromCode(subjectName);
  return credit;
}
