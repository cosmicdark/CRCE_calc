# 🎓 CRCE Results Checker

A modern, beautiful web application for checking academic results from Fr. Conceicao Rodrigues College of Engineering (CRCE). Built with Next.js, TypeScript, and Playwright for automated result scraping.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Playwright](https://img.shields.io/badge/Playwright-1.57-45ba4b?style=flat-square&logo=playwright)

## ✨ Features

- 🔐 **Secure Authentication** - Login with PRN and Date of Birth
- 📊 **Real-time Progress** - Server-sent events for live scraping updates
- 🌓 **Dark Mode** - Beautiful dark/light theme toggle
- 📱 **Mobile-First Design** - Optimized for mobile devices with a native app feel
- ⚡ **Fast & Efficient** - Streaming responses and optimized scraping
- 🎯 **SGPA Calculation** - Credit-weighted SGPA computation
- 📈 **Subject-wise Breakdown** - Detailed marks and grades for each subject
- 🎨 **Modern UI** - Clean, gradient-based design with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd CRCE
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**

   ```bash
   npx playwright install chromium
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
CRCE/
├── src/
│   └── app/
│       ├── api/
│       │   └── scrape/
│       │       └── route.ts      # API endpoint for result scraping
│       ├── about/
│       │   └── page.tsx          # About page
│       ├── page.tsx              # Main home page
│       ├── layout.tsx            # Root layout
│       └── globals.css           # Global styles
├── public/
│   ├── icon.png                  # App icon
│   ├── cir_logo.jpeg            # CRCE logo
│   └── ...                       # Other static assets
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
├── Dockerfile                    # Docker configuration
└── README.md                     # This file
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **Scraping**: [Playwright](https://playwright.dev/) - Browser automation
- **Parsing**: [Cheerio](https://cheerio.js.org/) - HTML parsing
- **Deployment**: [Vercel](https://vercel.com/) - Serverless deployment

## 🎯 How It Works

1. **User Input** - Student enters PRN and Date of Birth
2. **Authentication** - Playwright automates login to CRCE portal
3. **Scraping** - Iterates through subjects and extracts marks
4. **Processing** - Calculates percentages, grades, and SGPA
5. **Streaming** - Real-time progress updates via Server-Sent Events
6. **Display** - Beautiful results with subject-wise breakdown

## 📊 SGPA Calculation

The app uses a credit-weighted SGPA calculation:

```
SGPA = Σ(Grade Points × Credits) / Σ Credits
```

**Grade Mapping**:

- O (Outstanding): 10 points - 85%+
- A (Excellent): 9 points - 80-84%
- B (Very Good): 8 points - 70-79%
- C (Good): 7 points - 60-69%
- D (Satisfactory): 6 points - 50-59%
- E (Pass): 5 points - 45-49%
- P (Pass): 4 points - 40-44%
- F (Fail): 0 points - Below 40%

## 🐳 Docker Support

Build and run with Docker:

```bash
# Build the image
docker build -t crce-results .

# Run the container
docker run -p 3000:3000 crce-results
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Ensure **Root Directory** is set to `.` (project root)
4. Deploy!

The app is optimized for Vercel's serverless environment with:

- Edge runtime support
- Automatic serverless functions
- 60-second timeout for scraping operations

### Other Platforms

The app can be deployed to any platform supporting Node.js 20+ and Docker:

- Railway
- Render
- AWS (EC2, ECS, Lambda)
- Google Cloud Run
- Azure Container Apps

## 📝 Environment Variables

No environment variables are required for basic operation. The app uses Playwright's bundled Chromium browser.

## 🔒 Security & Privacy

- **No Data Storage** - Results are not stored on the server
- **Secure Connections** - All communication uses HTTPS
- **Session Isolation** - Each request uses an isolated browser context
- **No Credentials Stored** - Login credentials are never saved

## ⚙️ Configuration

### Next.js Config

The `next.config.ts` includes:

```typescript
serverExternalPackages: ["playwright", "@sparticuz/chromium"];
```

This ensures Playwright works correctly in serverless environments.

### API Timeout

The scraping endpoint has a 60-second timeout:

```typescript
export const maxDuration = 60;
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Developer

**Sai Balkawade**  
Tech Member - Project Cell CRCE

- [LinkedIn](https://www.linkedin.com/in/sai-balkawade-141ba4310/)

## 🏢 About Project Cell

[Project Cell CRCE](https://project-cell-crce.vercel.app/) is the innovation and development hub at Fr. Conceicao Rodrigues College of Engineering, dedicated to building impactful technology solutions.

- 🌐 [Website](https://project-cell-crce.vercel.app/)
- 📷 [Instagram](https://www.instagram.com/project_cell.crce)
- 💻 [GitHub](https://github.com/Project-Cell-CRCE)

## 📄 License

This project is open source and available for educational purposes.

## ⚠️ Disclaimer

This SGPA calculator provides an estimate (±0.1). Official results may differ. Always refer to official university portals for final grades and results.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Playwright team for robust browser automation
- Tailwind CSS for beautiful styling utilities
- CRCE for the education and opportunities

---

Made with 💚 by Sai Balkawade | Project Cell CRCE
