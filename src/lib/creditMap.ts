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
  // Global Audits / Double Minors (Audit - 0 Credits)
  "25DMX1": 0,
  "25DM01": 0,
  "25DMX2": 0, // Adding this to avoid future dupes
  
  // Basic Sciences
  "25BSC12CE01": 3, // Engineering Mathematics I
  "25BSC12CE02": 3, // Engineering Mathematics II
  "25BSC12CE03": 3, // Engineering Mathematics III
  "25BSC12CE04": 3, // Engineering Mathematics IV
  
  // ========== COMPUTER ENGINEERING (CE) ==========
  // Sem I
  "25BSC11CE01": 3,
  "25BSC11CE04": 3,
  "25ESC11CE03": 4,
  "25PCC11CE03": 3,
  "25PCC11CE01": 1,
  "25PCC11CE04": 2,
  "25PCC11CE02": 2,
  "25IKS11CE01": 2,
  
  // Sem II
  "25BSC11CE03": 3,
  "25ESC11CE01": 3,
  "25ESC11CE04": 1,
  "25ESC11CE02": 4,
  "25VSE11CE02": 2,
  "25VSE11CE01": 2,
  "25AEC11CE01": 2,

  // ========== COMPUTER ENGINEERING (CE) - SEM III & BEYOND ==========
  // Sem III (Verified from Syllabus Image)
  // Sem III (Verified from Syllabus Image)
  "25BSC12CE05": 2, // Discrete Mathematics and Graph Theory
  "25PCC12CE05": 3, // Computer Organization and Architecture
  "25PCC12CE06": 4, // Data Structures
  "25PCC12CE07": 1, // Object Oriented Programming with JAVA
  "25OE13CE1X": 2,  // Law for Engineers (Financial Planning, Taxation and Investment)
  "25MDMXX1": 2,    // MDM Course-1
  "25MDMXX2": 2,    // MDM Course-2
  "25AEC12CE02X": 2,// Modern Indian Languages
  "25VEC12CE01": 2, // Human Values and Professional Ethics
  "25CEP12CE01": 2, // Community Engagement Project
  // "25DMX1": 0, // Moved to Global
  // "25DM01": 0, // Moved to Global
  "25DM31": 0,      // Introduction to CADCAM (Double Minor - Audit)
  "25DM21": 0,      // Sensors and Actuators (Double Minor - Audit)
  "25DM41": 0,      // Design Thinking for Sustainability (Double Minor - Audit)
  "25HR01": 4,      // Honors with Research 1
  "25HR02": 4,      // Honors with Research

  // Sem IV (Verified)
  "25BSC12CE06": 2, // Linear Algebra
  "25PCC12CE08": 3, // DBMS
  "25PCC12CE09": 4, // Analysis of Algo
  "25PCC12CE10": 3, // Operating Systems
  "25OE13CE2X": 2,  // Emerging Tech
  "25MDMXX3": 2,    // MDM 3
  "25VSE12CE03": 2, // Full Stack
  "25EEM12CE02": 2, // Tech Entrepreneurship
  "25VEC12CE02": 2, // Tech Innovation

  // Excluded (Audit/Honors)
  // 25DMX2 moved to Global. 25HR03 kept here (or move global if needed, but 25HR03 0 is consistent)
  "25HR03": 0, "BC": 0,
  
  // TE CE
  // Sem V
  "25PCC13CE11": 3,
  "25PCC13CE12": 3,
  "25PCC13CE13": 3,
  "25PCC13CE14": 3,
  "25PEC13CE1X": 3, // PEC (Elective)
  "25PECL13CE1X": 1, // PEC Lab
  "25MDM4X": 2,
  "25OE04X": 2,
  "HXXXCS01": 4, // Honors

  // Sem VI
  "25PCC13CE15": 3,
  "25PCC13CE16": 3,
  "25PCC13CE17": 1,
  "25PCC13CE18": 1,
  "25VSE13CE04": 2,
  "25PCC13CE19": 3,
  "25PEC13CE2X": 3,
  "25PECL13CE2X": 1,
  "25PCC13CE20": 1,
  "25MDM05": 2,

  // Legacy/Other TE CE
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
  // ========== CSE / AI&DS / AI&ML ==========
  // Sem I (First Year)
  "25BSC11CS01": 3,
  "25BSC11EC02": 3, // Engineering Physics / Applied Physics
  "25ESC11CS01": 3, // Engineering Science Core I
  "25ESC11CS02": 4, // Engineering Science Core II
  "25PCC11CS01": 1, // Innovation and Design Thinking
  "25PCC11CS02": 2, // Essential Computing Skills for Engineers
  "25VSE11CS01": 2, // Measuring Instruments and Testing Tools
  "25AEC11CS01": 2, // Ability Enhancement Course

  // Sem II (First Year)
  "25BSC11CS03": 3,
  "25BSC11CS04": 3,
  "25ESC11CS03": 4,
  "25ESC11CS04": 1,
  "25PCC11CS03": 3,
  "25PCC11CS04": 2,
  "25VSE11CS02": 2,
  "25IKS11CS01": 2,
  
  // Sem II & Beyond
  "25PCC12CS01": 3, // Programming Fundamentals
  "25PCC12CS02": 3, // Data Structures
  "25PCC12CS03": 3, // Algorithms
  "25PCC12CS04": 4, // Machine Learning

  
  // Sem III (Verified UG CSE)
  "25BSC12CS05": 2, // Discrete Maths & Statistics
  "25PCC12CS05": 3, // Analysis of Algorithms
  "25PCC12CS06": 4, // Data Structure
  "25PCC12CS07": 1, // OOP with Java
  "25OE01": 2,      // Law/Financial Planning
  // MDMXX1 & MDMXX2 covered generally (2cr)
  "25AEC12CS02": 2, // MIL
  "25VEC12CS01": 2, // Human Values
  "25CEP12CS01": 2, // Community Engagement
  
  // Audits/Honors (Excluded)
  // Audits (25DMX1, 25DM01 global; 25HR0x are 4 credits)
  // "25DMX1": 0, "25HR02": 0, "25DM01": 0, "25HR01": 0,

  // Sem V
  "25PCC13CS11": 3,
  "25PCC13CS12": 3,
  "25PCC13CS13": 3,
  "25PCC13CS14": 1,
  "25PCC13CS15": 3,
  "25PEC13CSXX": 3,
  "25MDM03X": 2,
  "25OECS3X": 2,
  "25HXXXCS01": 4, // Honors

  // Sem VI
  "25PCC13CS16": 3,
  "25PCC13CS17": 3,
  "25PCC13CS18": 1,
  "25PCC13CS19": 3,
  "25PEC2CSXX": 3,
  "25PEC3CSXX": 3,
  "25PECL2CSXX": 1,
  "25PCC13CS20": 1,
  "25MDM04": 2,
  
  // ========== ELECTRONICS & COMPUTER SCIENCE (ECS) ==========
  // Sem III
  "25PCC12EC05": 3, // Electronic Devices
  "25PCC12EC06": 3, // Computer Organization and Architecture
  "25PCC12EC07": 3, // Database Management System
  "25PCC12EC08": 1, // OOP with Java
  "25VEC12EC01": 2, // Human Values and Professional Ethics
  "25CEP12EC01": 2, // Community Engagement Project
  "25PCC12EC01": 3, // Digital Electronics (Preserved if used elsewhere)
  "25PCC12EC02": 3, // Microprocessors (Preserved if used elsewhere)
  "25PCC12EC03": 3, // Signal Processing (Preserved if used elsewhere)
  "25PCC12EC04": 4, // Embedded Systems (Preserved if used elsewhere)

  // Sem IV (Verified)
  "25BSC12EC05": 3, // Maths & Numerical Methods
  "25PCC12EC09": 3, // Analog Electronic Circuits
  "25PCC12EC10": 3, // Discrete Structures
  "25PCC12EC11": 1, // Web Tech Lab
  "25OE2X": 2,      // Emerging Technology & Law
  "25VSE12EC03": 4, // Data Structures
  "25EEM12EC02": 2, // Tech Entrepreneurship
  "25VEC12EC02": 2, // Technology Innovation
  
  
  // ========== MECHANICAL ENGINEERING (MECH) ==========
  // Sem I & II (First Year)
  "25BSC11ME01": 3,
  "25BSC11ME04": 3,
  "25ESC11ME03": 4,
  "25PCC11ME03": 3,
  "25PCC11ME01": 1,
  "25PCC11ME04": 2,
  "25PCC11ME02": 2,
  "25IKS11ME01": 2, // Indian Knowledge System

  // Sem III & Beyond
  "25PCC12ME01": 3, // Thermodynamics
  "25PCC12ME02": 3, // Fluid Mechanics
  "25PCC12ME03": 4, // Machine Design
  "25PCC12ME04": 3, // Manufacturing Processes
  "25PCC12ME05": 2, // Heat Transfer
  
  // Sem III (Verified)
  "25BSC12ME05": 3, // Statistical Techniques

  "25PCC12ME06": 4, // Engineering Mechanics
  "25PCC12ME07": 1, // Machine Shop Practice
  "25OE01X": 2,     // Open Elective


  "25AEC12ME02X": 2,// Modern Indian Language
  "25VEC12ME01": 2, // Human Values
  "25CEP12ME01": 2, // Community Engagement

  // Sem IV (Verified)
  "25BSC12ME06": 3, // Thermodynamics
  "25PCC12ME08": 4, // Mechanics of Solids
  "25PCC12ME09": 3, // Materials Science
  "25PCC12ME10": 1, // Material Testing Lab
  "25PCC12ME11": 1, // Thermal Engineering Lab
  "25OE02X": 2,     // Engineering Technology & Law
  "25VSE12ME03": 2, // Computer Aided Machine Drawing
  // "25MDMXX3": 2, // Duplicate (Defined in Sem IV CE)
  "25EEM12ME02": 2, // Technology Entrepreneurship
  "25VEC12ME02": 2, // Technology Innovation
  
  // Excluded/Audit (0 credits to skip in scrape)
  "25RM01": 0,
  // "25DMX2": 0, "25HR03": 0, "MOOC": 0, // Cleaned up duplicates
  "MOOC": 0,
  
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
  // "25VEC12CE02": 2,
  
  // Community Engagement Projects (2 credits)
  "25CEP12CE02": 2,
  
  // Liberal Learning Courses (2 credits)
  "25LLC12CE01": 2,
  "25LLC12CE02": 2,
  
  // ========== VERIFIED FROM SYLLABUS (Other Fragments) ==========

  "25PCC13CE22": 1, // Competitive Coding PR
  "25PECL3CEX": 1, // Program Elective Lab
  "25MDMXX05": 2, // MDM Course
  "25EEM12CS02": 2, // Tech Entrepreneurship (CS)
  // "25EEM12EC1X" - Removed (Duplicate)
  // "25PCC12EC11" - Removed (Duplicate)
  // "25EEM12EC02" - Removed (Duplicate)
  // "25VSE12ME03" - Removed (Duplicate)
  // "25EEM12ME02" - Removed (Duplicate)
  // "25BSC12ME06" - Removed (Duplicate)
  // "25PCC12ME08" - Removed (Duplicate)
  // "25PCC12ME11" - Removed (Duplicate)

  // Sem V
  "25PCC13EC11": 3,
  "25PCC13EC12": 3,
  "25PCC13EC13": 3,
  "25PCC13EC14": 1,
  "25PCC13EC15": 2,
  "25PEC13ECXX": 3,
  "25PECL13ECXX": 1,
  "25MDM03": 2,

  "25OEEC41": 2,
  "25HXXXEC501": 4, // Honors

  // Sem VI
  "25PCC13EC16": 3,
  "25PCC13EC17": 3,
  "25PCC13EC18": 1,
  "25PCC13EC19": 1,
  "25PCC13EC20": 1,
  // 25PEC13ECXX: 3, // Already defined above
  "25PEC13EC1X": 3,
  // 25PECL13ECXX: 1, // Already defined above
  "25PECL13EC1X": 1,
  // "25MDM05": 2, // Duplicate (Defined in TE CE Sem VI)

  "25HXXXEC601": 4, // Honors
  // Sem V
  "25PCC13ME11": 3,
  "25PCC13ME12": 3,
  "25PCC13ME13": 2, // Metrology
  "25PCC13ME14": 3,
  "25PCC13ME15": 1, // FEA Lab
  "25MDM0X": 2,
  "25OE03X": 2,

  // Sem VI
  "25PCC13ME16": 3,
  "25PCC13ME17": 3,
  "25PCC13ME18": 1,
  "25PCC13ME19": 1, // Hydraulics Lab
  "25VSE13ME04": 1,
  "25VSE13ME05": 1,
  
  // Note: 25PEC13MEXX and 25PECL13MEXX are covered by generic patterns or above entries

  // ========== M.Tech (Mechanical) Sem I & II (User Verified) ==========
  // Sem I
  "PCC21ME01": 4, // Computer Aided Design
  "PCC21ME02": 4, // Mechatronics and Automation
  "PEC21ME01X": 3,
  "PEC21ME02X": 3,
  "OE21X": 3,
  "CCL21ME01": 1,
  "SBL21ME01": 2,

  // Sem II
  "PCC21ME03": 4, // Industrial Robotics
  "PCC21ME04": 4, // CAM
  "PEC21ME03X": 3,
  "PEC21ME04X": 3,
  "OE21X2": 3,
  "CCL21ME02": 1,
  "SBL21ME02": 2,

  // ========== FINAL YEAR ECS (Sem VII) [User Verified] ==========
  "ECC701": 3,    // VLSI Design
  "ECC702": 3,    // Internet of Things
  "ECCDO701": 3,  // Dept Level Optional Course - III
  "ECCDO702": 3,  // Dept Level Optional Course - IV
  "ECCIO701": 3,  // Institute Level Optional Course - I
  "ECL701": 1,    // VLSI Design Lab
  "ECL702": 1,    // Internet of Things Lab
  "ECL703": 1,    // Dept Level Optional Course - III Lab
  "ECP701": 3,    // Major Project - I
  
  // ========== CS / AI&DS SEM VII & VIII (Verified) ==========
  // Sem VII
  "CSC701": 3,    // Machine Learning
  "CSC702": 3,    // Big Data Analysis
  "CSDC701": 3,   // Dept. Optional Course-3 (Generalized)
  "CSDC702": 3,   // Dept. Optional Course-4 (Generalized)
  "ILO701": 3,    // Institute Level Optional Course-1
  "CSL701": 1,    // Machine Learning Lab
  "CSL702": 1,    // Big Data Analytics Lab
  // "CSDL701": 1,   // Dept. Optional Course-3 Lab
  // "CSDL702": 1,   // Dept. Optional Course-4 Lab
  "CSP701": 3,    // Major Project-1
  // Variations with 'X' suffix
  "CSDC701X": 3,
  "CSDC702X": 3,
  "ILO701X": 3,
  "CSDL701X": 1,
  "CSDL702X": 1,
  // New pattern variations (CSDO)
  "CSDO701X": 3,
  "CSDO702X": 3,
  "CSDL701": 1, // Fallback
  "CSDL702": 1, 
  
  // Note: Lab versions of CSDO might appear as just CSDO701X in the portal but carry 1 credit? 
  // If the code is identical, we can't map two credits to it. 
  // Assuming strict codes, we'll add specific lab codes if they differ.
  // If they share the same code 'CSDO701X' for both theory and lab, we have an ambiguity problem.
  // Standard pattern usually has 'L' for lab.


  // Sem VIII
  "CSC801": 3,    // Distributed Computing
  "CSDC801": 3,   // Dept. Optional Course-5
  "CSDC802": 3,   // Dept. Optional Course-6
  "ILO801": 3,    // Institute Level Optional Course-2
  "CSL801": 1,    // Distributed Computing Lab
  "CSDL801": 1,   // Dept. Optional Course-5 Lab
  "CSDL802": 1,   // Dept. Optional Course-6 Lab
  "CSP801": 6,    // Major Project-2
  // Variations with 'X' suffix
  "CSDC801X": 3,
  "CSDC802X": 3,
  "ILO801X": 3,
  "CSDL801X": 1,
  "CSDL802X": 1,
  // New pattern variations (CSDO)
  "CSDO801X": 3,
  "CSDO802X": 3,
  "CSDOL801X": 1,
  "CSDOL802X": 1,
  // Add plausible variations just in case
  "25ECC701": 3,
  "25ECC702": 3,
  "25ECCDO701": 3,
  "25ECCDO702": 3,
  "25ECCIO701": 3,
  "25ECL701": 1,
  "25ECL702": 1,
  "25ECL703": 1,
  "25ECP701": 3,

  // ========== ECS SEM VIII (Verified) ==========
  "ECC801": 3,    // Robotics
  "ECCDO801": 3,  // Dept Level Optional Course-V
  "ECCDO802": 3,  // Dept Level Optional Course-VI
  "ECCIO801": 3,  // Institute Level Optional Course-II
  "ECL801": 1,    // Robotics Lab
  "ECL802": 1,    // Dept. Optional Course-V Lab
  "ECP801": 6,    // Major Project-II
  // Variations
  "25ECC801": 3,
  "25ECCDO801": 3,
  "25ECCDO802": 3,
  "25ECCIO801": 3,
  "25ECL801": 1,
  "25ECL802": 1,
  "25ECP801": 6,

  // ========== HONORS & MINORS (PYTHON SCRAPED) ==========
  "HIEC501": 4, // Transport Infrastructure
  "HIEC601": 4, // Energy and IT Infrastructure
  "HIEC701": 4, // Geographic Information Systems
  "HIESBL701": 2, // Geographic Information System – Lab
  "HIEC801": 4, // Infrastructural planning and management
  "HSCC501": 4, // Smart City Planning and Development
  "HSCC601": 4, // Smart City-Project Management
  "HSCC701": 4, // Smart Urban Infrastructures
  "HSCSBL701": 2, // Smart City-Project Management
  "HSCC801": 4, // Smart Management of Smart Urban Infrastructures
  "HWTSBL701": 1, // Unknown
  "HWTC501": 4, // Waterways and Ports
  "HWTC601": 4, // Design of Ports and Harbour structures
  "HWTC701": 4, // Port and Harbour Operations and Services
  "HWTC801": 4, // Construction and Management of Port and Harbour
  "HPSC501": 4, // Concrete Consultant Practices
  "HPSC601": 4, // Formwork Design Practices
  "HPSC701": 4, // Structural Consultant Practice-1
  "HPSSBL701": 2, // Structural Consultant Practice-Lab
  "HPSC801": 4, // Structural Consultant Practice-II
  "HGSC501": 4, // Green Technologies and Practices
  "HGSC601": 4, // Green Building and Infrastructure Engineering
  "HGSC701": 4, // Fundamentals of Sustainable Engineering
  "HGSSBL601": 2, // Green Building and Infrastructure Engineering
  "HGSC801": 4, // Sustainable Built Environment Engineering
  "HCWC501": 4, // SOLID AND HAZARDOUS WASTE MANAGEMENT
  "HCWC601": 4, // LIQUID EFFLUENT MANAGEMENT
  "HCWC701": 4, // WASTE VALORIZATION I
  "HCWSBL701": 2, // WASTE TECHNOLOGY SKILL BASED LAB
  "HCWC801": 4, // WASTE VALORIZATION II
  "HEVC501": 4, // Vehicular Systems and Dynamics 04 - 04 -
  "HEVSBL701": 2, // Electric Vehicles Lab 04 -- 02
  "HEVC801": 4, // Electric Vehicle System Design 04 - 04 -
  "HMTC501": 4, // Futuristic Power Systems 04 - 04 -
  "HMTSBL701": 2, // Microgrid and RES Lab -- 04 -- 02
  "HMTC801": 4, // Microgrid System Design 04 - 04 -
  "HRBC501": 4, // Industrial Robotics
  "HRBC601": 4, // Mechatronics & IoT
  "HRBC701": 4, // Artificial Intelligence and Data Analytics
  "HRBSBL701": 2, // Robotics and Automation Lab
  "HRBC801": 4, // Autonomous Vehicle Systems
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
  { pattern: /25PECL/, credit: 1, description: "Program Elective Lab" },

  // Program Electives (3 credits)
  { pattern: /25PEC/, credit: 3, description: "Program Elective" },
  
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
/**
 * Get credits for a subject based on its code
 * Uses explicit mapping first, then pattern matching
 */

// ✅ Core Rule: SGPA includes ONLY regular credit-bearing courses.
// Honors / Minor / Double Minor / MOOC / Audit courses are NOT included in SGPA.
const EXCLUDED_FROM_SGPA = [
  /^25HR/,        // Honors
  /^HXXX/,        // Honors generic
  /^25DM/,        // Double Minor
  /^25MIN/,       // Minor
  /^MOOC$/,       // MOOCs
  /^BC$/,         // Bridge Courses
  /\bHonors\b/i,  // "Honors" in name
  /\bAudit\b/i,   // "Audit" in name
  /\$/            // Marked with $ in some contexts
];

function isExcludedFromSGPA(code: string): boolean {
  return EXCLUDED_FROM_SGPA.some(rx => rx.test(code));
}


/**
 * Returns credit details including whether it counts towards SGPA.
 */
export function getCreditsFromCode(
  subjectCode: string
): { credit: number; source: string; countInSGPA: boolean } {
  // Normalize: remove spaces, keep alphanumeric but allow some special chars if needed
  // Note: Your map keys are clean (e.g., "25PCC12CE06"), so stripping non-alphanumeric might be safer for lookup
  const normalizedCode = subjectCode.trim().toUpperCase();

  // 1. Exact match (Fastest & Most reliable)
  if (normalizedCode in CREDIT_MAP) {
    const isExcluded = isExcludedFromSGPA(normalizedCode) || CREDIT_MAP[normalizedCode] === 0;
    return { 
      credit: CREDIT_MAP[normalizedCode], 
      source: 'exact', 
      countInSGPA: !isExcluded 
    };
  }
  
  // 2. Try to find the code within the subject name (Embedded Code Search)
  for (const [code, credit] of Object.entries(CREDIT_MAP)) {
    const safeCode = code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${safeCode}\\b`);
    
    if (regex.test(normalizedCode)) {
      const isExcluded = isExcludedFromSGPA(code) || credit === 0;
      return { 
        credit, 
        source: 'embedded',
        countInSGPA: !isExcluded
      };
    }
  }
  
  // 3. Try pattern matching (Heuristics)
  for (const { pattern, credit, description } of PATTERN_CREDITS) {
    if (pattern.test(normalizedCode)) {
      const isExcluded = isExcludedFromSGPA(normalizedCode);
      return { 
        credit, 
        source: `pattern:${description}`,
        countInSGPA: !isExcluded
      };
    }
  }
  
  // 4. Default: Unknown
  return { credit: 0, source: 'unknown', countInSGPA: false };
}

/**
 * Helper: Only returns credits if they count towards SGPA.
 * If excluded (Honors/DM/Audit), returns 0.
 * This ensures the SGPA calculator in `scrape/route.ts` works safely without extra checks.
 */
export function getCredits(subjectName: string): number {
  const info = getCreditsFromCode(subjectName);
  return info.countInSGPA ? info.credit : 0;
}
