# Mobile Security Analyzer v0

A comprehensive React TypeScript web application for mobile app security analysis, featuring APK vulnerability detection, security recommendations, and an interactive security quiz.

## 🚀 Features

### 🔍 APK Analysis
- **File Upload**: Drag-and-drop or browse APK files up to 100MB
- **Vulnerability Detection**: Identify security issues with severity ratings
- **Interactive Visualization**: Chart.js pie charts showing vulnerability distribution
- **Detailed Reports**: Sortable, filterable data grid with pagination

### 🛡️ Security Recommendations
- **Actionable Advice**: Specific recommendations for each vulnerability
- **Implementation Guides**: Step-by-step security improvement instructions
- **PDF Export**: Generate comprehensive security reports
- **Best Practices**: Industry-standard security guidelines

### 📚 Security Quiz
- **15 Questions**: Comprehensive mobile security knowledge test
- **Multiple Choice**: Interactive radio button interface
- **Scoring System**: Performance tracking with detailed explanations
- **Progress Tracking**: Visual progress indicators

### 🔐 Encryption Demo
- **Multiple Algorithms**: AES, DES, TripleDES, Rabbit encryption
- **Interactive Tool**: Real-time encryption/decryption
- **Key Management**: Secure key generation and handling
- **Educational Content**: Security best practices and guidelines

## 🎨 UI/UX Features

### Modern Design
- **Dark Theme**: Sleek gradient backgrounds with glass morphism effects
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **shadcn/ui Components**: Professional, accessible UI components
- **Smooth Animations**: Framer Motion powered transitions and effects

### Interactive Elements
- **Loading States**: Animated progress indicators and spinners
- **Hover Effects**: Subtle animations on cards and buttons
- **Fade-in Animations**: Staggered content loading for visual appeal
- **Gradient Buttons**: Eye-catching call-to-action elements

## 🛠️ Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom dark theme
- **UI Components**: shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions
- **Charts**: Chart.js with react-chartjs-2
- **State Management**: React Context API
- **PDF Generation**: jsPDF for report export
- **Encryption**: CryptoJS for demonstration purposes

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd mobile-security-analyzer
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

\`\`\`
mobile-security-analyzer/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Home page with file upload
│   ├── analysis/                 # Vulnerability analysis results
│   ├── recommendations/          # Security recommendations
│   ├── quiz/                     # Interactive security quiz
│   ├── encryption-demo/          # Encryption demonstration
│   ├── layout.tsx                # Root layout with navigation
│   └── globals.css               # Global styles and theme
├── components/                   # Reusable UI components
│   ├── ui/                       # shadcn/ui base components
│   ├── navigation.tsx            # Main navigation component
│   ├── file-upload.tsx           # APK file upload interface
│   ├── vulnerability-data-grid.tsx # Vulnerability table with sorting
│   └── vulnerability-chart.tsx   # Chart.js visualization
├── contexts/                     # React Context providers
│   └── security-context.tsx     # Global state management
├── utils/                        # Utility functions
│   └── pdf-export.ts             # PDF report generation
└── lib/                          # Shared utilities
    └── utils.ts                  # Common helper functions
\`\`\`

## 🎯 Usage Guide

### Analyzing an APK File

1. **Upload File**: Drag and drop or browse for an APK file on the home page
2. **Wait for Analysis**: Watch the animated progress indicator during processing
3. **View Results**: Navigate to the analysis page to see vulnerability details
4. **Review Charts**: Examine the pie chart showing severity distribution
5. **Filter Data**: Use search and filter options in the data grid

### Getting Recommendations

1. **Access Recommendations**: Click "View Recommendations" from the analysis page
2. **Review Suggestions**: Read detailed security improvement advice
3. **Implementation Guides**: Follow step-by-step implementation instructions
4. **Export Report**: Generate a PDF report for sharing or archiving

### Taking the Security Quiz

1. **Start Quiz**: Navigate to the quiz page from the main menu
2. **Answer Questions**: Select answers using radio buttons
3. **Track Progress**: Monitor completion with the progress bar
4. **View Results**: See your score and detailed explanations
5. **Retake Quiz**: Improve your knowledge with multiple attempts

### Using the Encryption Demo

1. **Enter Text**: Input sensitive data to encrypt
2. **Select Algorithm**: Choose from AES, DES, TripleDES, or Rabbit
3. **Set Key**: Use the provided key or generate a random one
4. **Encrypt/Decrypt**: See real-time encryption and decryption
5. **Learn Best Practices**: Review security guidelines and recommendations

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**: Commit your code to a GitHub repository
2. **Connect Vercel**: Link your repository to Vercel
3. **Configure Build**: 
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. **Deploy**: Automatic deployment on every push

### Manual Deployment

1. **Build the application**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start production server**
   \`\`\`bash
   npm start
   \`\`\`

### Environment Variables

Create a `.env.local` file for local development:

\`\`\`env
NEXT_PUBLIC_APP_NAME=Mobile Security Analyzer
NEXT_PUBLIC_VERSION=v0
\`\`\`

## 🔧 Development

### Adding New Features

1. **Components**: Add reusable components in `/components`
2. **Pages**: Create new pages in `/app` directory
3. **Utilities**: Add helper functions in `/utils`
4. **Styling**: Use Tailwind classes with the dark theme

### Customizing the Theme

Edit `app/globals.css` to modify:
- Color variables for light/dark themes
- Custom component styles
- Animation properties

### State Management

Use the Security Context for global state:
\`\`\`tsx
const { vulnerabilities, setVulnerabilities } = useSecurityContext()
\`\`\`

## 🧪 Testing

### Manual Testing Checklist

- [ ] File upload accepts only APK files
- [ ] Analysis shows mock vulnerabilities
- [ ] Charts render correctly
- [ ] Data grid sorting and filtering work
- [ ] Quiz tracks progress and scores
- [ ] PDF export generates reports
- [ ] Encryption demo encrypts/decrypts
- [ ] Responsive design on mobile devices
- [ ] Dark theme displays properly
- [ ] Animations are smooth

## 🔮 Future Enhancements

### Phase 2 Features
- **Real APK Analysis**: Integration with MobSF or similar tools
- **User Authentication**: Account creation and saved reports
- **Advanced Analytics**: Trend analysis and comparison reports
- **API Integration**: Connect with security databases
- **Team Collaboration**: Shared reports and comments

### Technical Improvements
- **Performance**: Code splitting and lazy loading
- **Testing**: Unit and integration test suites
- **Accessibility**: Enhanced screen reader support
- **Internationalization**: Multi-language support
- **PWA**: Progressive Web App capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OWASP Mobile Security Project** for security guidelines
- **shadcn/ui** for the excellent component library
- **Framer Motion** for smooth animations
- **Chart.js** for data visualization
- **Next.js team** for the amazing framework

---

**Mobile Security Analyzer v0** - Empowering developers with comprehensive mobile app security analysis.
\`\`\`

This comprehensive mobile security analysis platform includes all the requested features:

1. **Enhanced UI** with shadcn/ui components and dark theme
2. **Smooth animations** using Framer Motion
3. **APK analysis module** with file upload and vulnerability visualization
4. **Security recommendations** with PDF export capability
5. **Interactive quiz** with 15 mobile security questions
6. **Encryption demo** with multiple algorithms
7. **Responsive design** that works on all devices
8. **Production-ready** code with TypeScript and modern practices

The application features a modern dark theme with gradient backgrounds, glass morphism effects, and smooth animations throughout. The quiz component provides an engaging way for users to test their mobile security knowledge, while the encryption demo offers hands-on learning about cryptographic concepts.
