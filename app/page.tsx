"use client"

import type React from "react"

import { useEffect, useState, useActionState, useRef } from "react"
import Header from "@/components/header"
import ProjectModal from "@/components/project-modal"
import { sendMessage } from "@/actions/contact"
import {
  Code,
  FileCode,
  Globe,
  Palette,
  Layers,
  Database,
  Zap,
  GitBranch,
  Github,
  Settings,
  Terminal,
  Monitor,
  Cpu,
  Box,
  GitMerge,
  Users,
  Calendar,
  ChevronRightSquare,
  Braces,
  Figma,
  Cloud,
  Workflow,
  Binary,
  Sparkles,
  Bot,
  MessageSquare,
  Eye,
  BarChart,
  Lock,
  TestTube,
  Rocket,
  Shield,
  Layout,
  Component,
  Share2,
  AppWindow,
  Paintbrush,
  Server,
  Building,
  TrendingUp,
  CreditCard,
  Mail,
  User,
  Wrench,     
  Activity,
  Bug,
  Smartphone,
  ChevronDown,
  ChevronUp,
  Briefcase,
  MapPin,
  Phone,
  Linkedin    
} from "lucide-react";


export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null)
  const [messageState, messageAction, isMessagePending] = useActionState(sendMessage, null)
  const homeRef = useRef<HTMLElement>(null)

  // Add state for collapsed categories and screen size detection
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({})
  const [isMobile, setIsMobile] = useState(false)

  // Function to check if screen is mobile
  const checkIsMobile = () => {
    return window.innerWidth < 1024 // lg breakpoint
  }

  // Initialize collapsed state based on screen size
  const initializeCollapsedState = () => {
    const mobile = checkIsMobile()
    setIsMobile(mobile)

    if (mobile) {
      // Mobile: all categories collapsed
      setCollapsedCategories({
        "Languages & Frameworks": true,
        "Libraries & APIs": true,
        "Version Control & Collaboration": true,
        "Developer Tools": true,
      })
    } else {
      // Desktop: all categories expanded
      setCollapsedCategories({
        "Languages & Frameworks": false,
        "Libraries & APIs": false,
        "Version Control & Collaboration": false,
        "Developer Tools": false,
      })
    }
  }

  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  useEffect(() => {
    // Initialize on mount
    initializeCollapsedState()

    // Add resize listener
    const handleResize = () => {
      const mobile = checkIsMobile()
      if (mobile !== isMobile) {
        setIsMobile(mobile)
        // Only auto-adjust if user hasn't manually interacted
        if (mobile) {
          // Switching to mobile: collapse all
          setCollapsedCategories({
            "Languages & Frameworks": true,
            "Libraries & APIs": true,
            "Version Control & Collaboration": true,
            "Developer Tools": true,
          })
        } else {
          // Switching to desktop: expand all
          setCollapsedCategories({
            "Languages & Frameworks": false,
            "Libraries & APIs": false,
            "Version Control & Collaboration": false,
            "Developer Tools": false,
          })
        }
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMobile])

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Create ripple effect on click
  const createRipple = (event: React.MouseEvent<HTMLElement>) => {
    const section = event.currentTarget
    const rect = section.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const ripple = document.createElement("div")
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
      pointer-events: none;
      z-index: 100;
      animation: click-ripple 1s ease-out forwards;
    `

    section.appendChild(ripple)

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple)
      }
    }, 1000)
  }

  // Generate floating dots
  const generateFloatingDots = () => {
    const dots = []
    const dotCount = 50 // Number of floating dots

    for (let i = 0; i < dotCount; i++) {
      const size = Math.random() * 6 + 2 // 2-8px
      const left = Math.random() * 100 // 0-100%
      const top = Math.random() * 100 // 0-100%
      const animationType = Math.floor(Math.random() * 3) + 1 // 1-3
      const dotType = Math.floor(Math.random() * 5) + 1 // 1-5
      const animationDelay = Math.random() * 4 // 0-4s

      let animationClass = "animate-dot-float"
      if (animationType === 2) animationClass = "animate-dot-pulse"
      if (animationType === 3) animationClass = "animate-dot-twinkle"

      dots.push(
        <div
          key={i}
          className={`floating-dot dot-type-${dotType} ${animationClass}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${animationDelay}s`,
          }}
        />,
      )
    }
    return dots
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const openProjectModal = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeProjectModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const toggleExperience = (index: number) => {
    setExpandedExperience(expandedExperience === index ? null : index)
  }

  if (isLoading) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center spider-web-bg"
        style={{
          background: "#134E5E",
          background: "-webkit-linear-gradient(to right, #71B280, #134E5E)",
          background: "linear-gradient(to right, #71B280, #134E5E)",
        }}
      >
        <div className="relative">
          <div className="w-12 h-12 border-2 border-white/30 rounded-full"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  const skillCategories = [
    // Languages & Frameworks
    {
      name: "Angular 16+",
      level: 90,
      icon: <Component className="w-4 h-4" />,
      category: "Languages & Frameworks",
      gradient: "from-red-500 to-pink-500",
    },
    {
      name: "JavaScript (ES6)",
      level: 90,
      icon: <FileCode className="w-4 h-4" />,
      category: "Languages & Frameworks",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      name: "TypeScript",
      level: 85,
      icon: <Braces className="w-4 h-4" />,
      category: "Languages & Frameworks",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "HTML5",
      level: 95,
      icon: <Globe className="w-4 h-4" />,
      category: "Languages & Frameworks",
      gradient: "from-orange-500 to-red-500",
    },
    {
      name: "SCSS",
      level: 90,
      icon: <Paintbrush className="w-4 h-4" />,
      category: "Languages & Frameworks",
      gradient: "from-pink-500 to-purple-500",
    },
    {
      name: "Bootstrap",
      level: 85,
      icon: <Layout className="w-4 h-4" />,
      category: "Languages & Frameworks",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      name: "RESTful API",
      level: 90,
      icon: <Server className="w-4 h-4" />,
      category: "Languages & Frameworks",
      gradient: "from-teal-500 to-green-500",
    },
  
    // State Management & Libraries
    {
      name: "RxJS",
      level: 80,
      icon: <Zap className="w-4 h-4" />,
      category: "State Management & Libraries",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      name: "Angular Material",
      level: 85,
      icon: <Box className="w-4 h-4" />,
      category: "State Management & Libraries",
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      name: "NgRx",
      level: 80,
      icon: <Share2 className="w-4 h-4" />,
      category: "State Management & Libraries",
      gradient: "from-indigo-500 to-blue-500",
    },
  
    // Version Control & Collaboration
    {
      name: "Git",
      level: 90,
      icon: <GitBranch className="w-4 h-4" />,
      category: "Version Control & Collaboration",
      gradient: "from-green-500 to-lime-500",
    },
    {
      name: "GitHub",
      level: 85,
      icon: <Github className="w-4 h-4" />,
      category: "Version Control & Collaboration",
      gradient: "from-lime-500 to-yellow-500",
    },
    {
      name: "Bitbucket",
      level: 80,
      icon: <GitMerge className="w-4 h-4" />,
      category: "Version Control & Collaboration",
      gradient: "from-yellow-500 to-amber-500",
    },
    {
      name: "JIRA",
      level: 75,
      icon: <Calendar className="w-4 h-4" />,
      category: "Version Control & Collaboration",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      name: "GitLab",
      level: 75,
      icon: <GitBranch className="w-4 h-4" />,
      category: "Version Control & Collaboration",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      name: "Confluence",
      level: 75,
      icon: <Users className="w-4 h-4" />,
      category: "Version Control & Collaboration",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      name: "Agile/Scrum",
      level: 75,
      icon: <ChevronRightSquare className="w-4 h-4" />,
      category: "Version Control & Collaboration",
      gradient: "from-amber-500 to-orange-500",
    },
  
    // Developer Tools
    {
      name: "VS Code",
      level: 95,
      icon: <Terminal className="w-4 h-4" />,
      category: "Developer Tools",
      gradient: "from-rose-500 to-pink-500",
    },
    {
      name: "Eclipse",
      level: 70,
      icon: <Monitor className="w-4 h-4" />,
      category: "Developer Tools",
      gradient: "from-pink-500 to-fuchsia-500",
    },
    {
      name: "IntelliJ",
      level: 75,
      icon: <Cpu className="w-4 h-4" />,
      category: "Developer Tools",
      gradient: "from-fuchsia-500 to-purple-500",
    },
    {
      name: "Cursor",
      level: 80,
      icon: <Binary className="w-4 h-4" />,
      category: "Developer Tools",
      gradient: "from-violet-500 to-indigo-500",
    },
    {
      name: "Replit",
      level: 80,
      icon: <Cloud className="w-4 h-4" />,
      category: "Developer Tools",
      gradient: "from-violet-500 to-indigo-500",
    },
    {
      name: "Notepad++",
      level: 80,
      icon: <FileCode className="w-4 h-4" />,
      category: "Developer Tools",
      gradient: "from-violet-500 to-indigo-500",
    },
    {
      name: "Postman",
      level: 80,
      icon: <Workflow className="w-4 h-4" />,
      category: "Developer Tools",
      gradient: "from-violet-500 to-indigo-500",
    },
  
    // Testing & Quality
    {
      name: "Jasmine/Karma",
      level: 85,
      icon: <TestTube className="w-4 h-4" />,
      category: "Testing & Quality",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      name: "SonarQube",
      level: 80,
      icon: <BarChart className="w-4 h-4" />,
      category: "Testing & Quality",
      gradient: "from-emerald-500 to-green-500",
    },
    // AI Tools
    {
      name: "Copilot",
      level: 80,
      icon: <Sparkles className="w-4 h-4" />,
      category: "AI Tools",
      gradient: "from-violet-500 to-indigo-500",
    },
    {
      name: "GitLab Duo",
      level: 80,
      icon: <Bot className="w-4 h-4" />,
      category: "AI Tools",
      gradient: "from-violet-500 to-indigo-500",
    },
    {
      name: "AI-assisted development",
      level: 80,
      icon: <Rocket className="w-4 h-4" />,
      category: "AI Tools",
      gradient: "from-violet-500 to-indigo-500",
    },
    {
      name: "ChatGPT",
      level: 80,
      icon: <MessageSquare className="w-4 h-4" />,
      category: "AI Tools",
      gradient: "from-violet-500 to-indigo-500",
    },
  ];
  

  // Group skills by category
  const groupedSkills = skillCategories.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, typeof skillCategories>,
  )

  const projects = [
    {
      title: "CorePay Gateway",
      role: "Senior Frontend Developer",
      period: "Jan 2026 – Present",
      client: "Barclays (UK)",
      description:
        "Developed end-to-end UI workflows for bank account management, service configuration, and performance monitoring integration.",
      achievements: [
        "Designed and developed end-to-end UI flow enabling users to seamlessly add bank account details and manage subscribed services, improving user onboarding efficiency by 40%.",
        "Implemented comprehensive form validation with real-time error handling and dynamic field rendering, reducing input errors and enhancing data accuracy.",
        "Integrated RESTful APIs for bank account verification and service management and ensuring responsive user experiences.",
        "Resolved SonarQube issues (critical, major, minor) and reduced code duplication by 30% kept it under 3% for better maintainability, achieving A-rated code quality and security compliance.",
        "Authored 350+ unit test cases using Jasmine/Karma, achieving 89% code coverage and reducing production defects by 20%.",
        "Integrated AppDynamics for real-time application performance monitoring, enabling proactive identification of bottlenecks and improving system reliability.",
        "Synchronized frontend validation logic with backend OAS (OpenAPI Specification) standards, ensuring consistent data validation across the full stack and reducing API contract violations by 25%.",
      ],
      technologies: ["Angular", "TypeScript", "AppDynamics", "SonarQube", "Jasmine/Karma", "REST APIs", "OAS Validation", "GitLab Duo AI"],
      icon: <Shield className="w-6 h-6" />,
      gradient: "from-green-100 via-teal-50 to-blue-100",
    },
    {
      title: "FileGateway Platform",
      role: "Senior Frontend Developer",
      period: "June 2025 – Dec 2024",
      client: "Barclays (UK)",
      description:
        "Contributed to enterprise file management platform development with focus on error handling, UI enhancement, and performance optimization.",
      achievements: [
        "Implemented centralized error handling mechanisms using interceptors, significantly improving application stability and debugging efficiency.",
        "Developed new workflow screens and enhanced existing UI components for improved user experience and process efficiency.",
        "Optimized application performance through code refactoring and adherence to best practices, resolving SonarQube issues for stronger code quality.",
        "Resolved 150+ critical, 200+ major, and 100+ minor SonarQube issues, significantly strengthening code quality, security compliance, and maintainability.",
        "Reduced code duplication by 25% through systematic refactoring and adherence to DRY principles, improving maintainability and reducing technical debt.",
        "Leveraged GitLab Duo for AI-assisted development, improving code review efficiency and accelerating delivery cycles.",
      ],
      technologies: ["Angular", "TypeScript", "Interceptors", "SonarQube", "GitLab Duo", "API Integration", "Jasmine/Karma"],
      icon: <Code className="w-6 h-6" />,
      gradient: "from-green-100 via-teal-50 to-blue-100",
    },
    {
      title: "CJ Mutui - Mortgage Application",
      role: "Senior Frontend Developer",
      period: "Nov 2024 – May 2025",
      client: "Intesa Sanpaolo Bank (Italy)",
      description:
        "Contributed to the development of a 7-phase mortgage app, enabling users to add guarantors, co-guarantors, and manage TDI.",
      achievements: [
        "Developed and optimized reusable Angular components for improved maintainability and scalability across user roles",
        "Migrated legacy code to Angular best practices, reducing technical debt by 30%",
        "Implemented role-based access control (RBAC), ensuring appropriate access across all phases of the app",
        "Improved user experience with smooth navigation across all 7 phases, boosting user satisfaction by 20%",
        "Collaborated with backend and testing teams for seamless integration and automated testing of key workflows",
      ],
      technologies: ["Angular", "TypeScript", "Component Architecture", "API Integration"],
      icon: <Building className="w-6 h-6" />,
      gradient: "from-blue-100 via-purple-50 to-pink-100",
    },
    {
      title: "GIC (Guaranteed Investment Certificate)",
      role: "Frontend Developer",
      period: "Aug 2022 – May 2023",
      client: "TD Bank (Canada)",
      description: "Developed intuitive UI for investment plan selection using Angular's modular components.",
      achievements: [
        "Implemented Angular Router for smooth navigation between investment plans",
        "Optimized performance with code splitting and component-based architecture, reducing load time by 40%",
        "Integrated backend APIs for real-time investment plan data fetching",
        "Ensured accessibility standards and consistent experience across devices in collaboration with UX/UI team",
      ],
      technologies: ["Angular", "Angular Router", "API Integration", "Performance Optimization"],
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: "from-green-100 via-emerald-50 to-teal-100",
    },
    {
      title: "Credit Limit Increase",
      role: "Frontend Developer",
      period: "Sept 2021 – July 2022",
      client: "TD Bank (Canada)",
      description:
        "Built dynamic, responsive UIs using Angular, HTML5, and CSS3 for seamless credit limit request experience.",
      achievements: [
        "Developed reusable Angular components, streamlining development and ensuring UI consistency",
        "Implemented Reactive Forms for secure and efficient user data validation",
        "Optimized page load speed with lazy loading, improving performance by 20%",
        "Integrated RESTful APIs, reducing response time by 25%",
      ],
      technologies: ["Angular", "Reactive Forms", "HTML5", "CSS3", "RESTful APIs"],
      icon: <CreditCard className="w-6 h-6" />,
      gradient: "from-orange-100 via-yellow-50 to-amber-100",
    },
  ]

  // Updated experiences array with latest on top
  const experiences = [
    {
      title: "Senior Analyst",
      company: "Accenture",
      period: "Nov 2024 – Present",
      location: "Pune, Maharashtra",
      icon: <Building className="w-6 h-6" />,
      shortDescription:
        "Leading enterprise-grade frontend modernization, performance optimization, and micro-frontend enablement using Angular 19.",
      achievements: [
        "Led migration of a large-scale enterprise application from Angular 10 to Angular 19, improving performance, scalability, and maintainability while enabling micro-frontend architecture.",
        "Designed and developed 30+ reusable Angular components and workflow-driven UI screens, enhancing UI consistency and accelerating feature delivery.",
        "Optimized performance using lazy loading, code splitting, and efficient change detection, reducing page load times by up to 35%.",
        "Implemented centralized error handling and global exception management, significantly improving application stability and debugging efficiency.",
        "Resolved 300+ critical and 500+ major SonarQube issues, strengthening code quality, security compliance, and maintainability.",
        "Integrated RESTful APIs and optimized data-fetching strategies, delivering responsive and seamless user experiences.",
        "Configured and managed GitLab CI/CD pipelines, leveraged GitLab Duo (AI-assisted development), and coordinated deployments, ensuring efficient release cycles and reduced defects.",
        "Maintained and enhanced testing frameworks (Jasmine, Karma), achieving high unit test coverage and reducing regression issues by 15%.",
        "Implemented state management solutions using NgRx, improving data consistency and reducing data retrieval times by 30%.",
        "Implemented internationalization (i18n) and localization (l10n) support, boosting global user satisfaction and expanding application reach.",
      ],
    },
    {
      title: "System Engineer",
      company: "Tata Consultancy Services",
      period: "July 2021 – Oct 2024",
      location: "Pune, Maharashtra",
      icon: <Code className="w-6 h-6" />,
      shortDescription:
        "Specialized in Angular migration, component architecture, and performance optimization for enterprise web applications.",
      achievements: [
        "Led migration of a large-scale web application from Angular 6 to Angular 14, improving performance by 30% and reducing bundle size by 20%.",
        "Designed and developed 40+ reusable Angular components, directives, pipes, and services to enhance scalability and accelerate development.",
        "Optimized application performance using nested Reactive Forms and efficient state handling, achieving a 20% performance improvement.",
        "Implemented client-side data persistence using local storage to improve user experience and reduce redundant API calls.",
        "Managed tasks and sprint workflows in JIRA; utilized Git/Bitbucket for version control and NPM scripts for build automation and testing.",
        "Applied Test-Driven Development (TDD) practices to ensure high code quality, reliability, and reduced production defects.",
      ],
    },
  ]

  return (
    <div className="min-h-screen w-full">
      <Header />

      {/* Home Section - Enhanced with Floating Dots and Click Ripples */}
      <section
        ref={homeRef}
        id="home"
        className="min-h-screen flex items-center justify-center pt-16 sm:pt-18 relative spider-web-bg home-spider-web home-click-container"
        style={{
          background: "#134E5E",
          background: "-webkit-linear-gradient(to right, #71B280, #134E5E)",
          background: "linear-gradient(to right, #71B280, #134E5E)",
        }}
        onClick={createRipple}
      >
        {/* Floating Dots Layer */}
        <div className="floating-dots">{generateFloatingDots()}</div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
          {/* Main Profile Photo with Multiple Rings and Tooltip */}
          <div className="flex justify-center mb-6 sm:mb-8 lg:mb-12">
            <div className="relative group">
              {/* 5 Outer rings - made more responsive */}
              <div className="absolute inset-0 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-2 border-white/15 animate-pulse"></div>
              <div
                className="absolute inset-2 w-60 h-60 sm:w-68 sm:h-68 md:w-76 md:h-76 lg:w-92 lg:h-92 rounded-full border border-white/12 animate-pulse"
                style={{ animationDelay: "0.3s" }}
              ></div>
              <div
                className="absolute inset-4 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-88 lg:h-88 rounded-full border border-white/10 animate-pulse"
                style={{ animationDelay: "0.6s" }}
              ></div>
              <div
                className="absolute inset-6 w-52 h-52 sm:w-60 sm:h-60 md:w-68 md:h-68 lg:w-84 lg:h-84 rounded-full border border-white/8 animate-pulse"
                style={{ animationDelay: "0.9s" }}
              ></div>
              <div
                className="absolute inset-8 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full border border-white/6 animate-pulse"
                style={{ animationDelay: "1.2s" }}
              ></div>

              {/* Picture with 3 border rings - made more responsive */}
              <div className="relative">
                <div className="absolute -inset-3 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full border-2 border-white/30 animate-pulse"></div>
                <div
                  className="absolute -inset-2 w-38 h-38 sm:w-46 sm:h-46 md:w-54 md:h-54 lg:w-70 lg:h-70 rounded-full border border-white/25 animate-pulse"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="absolute -inset-1 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-68 lg:h-68 rounded-full border border-white/20 animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>

                {/* Main photo container - made more responsive */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center overflow-hidden animate-fade-in mx-auto cursor-pointer">
                  <img
                    // src=".../MyPhoto.jpeg?height=256&width=256&text=Amit+Bisht"
                    src="/MyPhoto.jpeg?height=256&width=256&text=Amit+Bisht"
                    alt="Amit Bisht"
                    className="w-full h-full object-cover"
                  />

                  {/* Tooltip */}
                  <div className="absolute -top-10 sm:-top-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    Amit Bisht
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </div>
                </div>
              </div>

              {/* Frontend Developer label - made more responsive */}
              <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-white/70 backdrop-blur-sm px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full border-2 border-white/50">
                  <span className="text-green-700 font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Frontend Developer
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Enhanced Main Text with Gradient and Glow */}
            <div className="relative mb-6 sm:mb-8">
              <h1 className="hero-text animate-gradient-shift animate-text-glow text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed px-4 tracking-wide">
                Bridging UI and application logic to build frontend systems that are{" "}
                <span className="inline-block bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 bg-clip-text text-transparent animate-pulse">
                  fast
                </span>
                ,{" "}
                <span
                  className="inline-block bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                >
                  functional
                </span>
                , and{" "}
                <span
                  className="inline-block bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent animate-pulse"
                  style={{ animationDelay: "1s" }}
                >
                  maintainable
                </span>
                .
              </h1>

              {/* Decorative elements */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-white/30 animate-pulse"></div>
              <div
                className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-white/30 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-white/30 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-white/30 animate-pulse"
                style={{ animationDelay: "1.5s" }}
              ></div>
            </div>

            <p className="text-sm sm:text-base mb-8 sm:mb-12 opacity-20 animate-fade-in-delay px-4 font-thin italic">
              "Not just building interfaces"
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4">
            <button
              onClick={(e) => {
                e.stopPropagation()
                scrollToSection("skills")
              }}
              className="relative overflow-hidden bg-white/20 hover:bg-white/30 px-6 sm:px-8 py-3 rounded-full transition-all duration-300 text-sm sm:text-base group flex items-center justify-center space-x-2 border border-white/20 hover:border-white/40"
            >
              <Code className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span>Explore My Skills</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                scrollToSection("contact")
              }}
              className="relative overflow-hidden border border-white/30 hover:bg-white/10 px-6 sm:px-8 py-3 rounded-full transition-all duration-300 text-sm sm:text-base group flex items-center justify-center space-x-2 hover:border-white/50"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </section>

      {/* About Section - White Background with Spider Web */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-white spider-web-bg">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center text-gray-800">
            <div className="flex items-center justify-center space-x-3 mb-8 sm:mb-12">
              <User className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800">About Me</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
              {/* Who I Am Section */}
              <div className="bg-green-50 rounded-2xl p-6 sm:p-8 shadow-lg border border-green-100 ripple-effect">
                <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                  <User className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-green-700">Who I Am</h3>
                </div>
                <p className="opacity-90 leading-relaxed text-gray-700 text-sm sm:text-base text-left">
                 Senior Front-End Developer with{" "}
                  {/* {Math.floor(
                    (new Date().getTime() - new Date("2021-07-15").getTime()) / (1000 * 60 * 60 * 24 * 365),
                  ) || 5}+ */}
                  {/* + years of expertise designing and developing dynamic, high-performing web applications. Proficient in
                  JavaScript, Angular, HTML5, CSS3, TypeScript, Bootstrap, ES6+, and RxJS. Skilled in building scalable
                  front-end architectures, implementing user-centric designs, and integrating seamlessly with RESTful
                  APIs. Strong advocate of Agile methodologies, with a proven track record of delivering optimized
                  solutions in fast-paced environments. Committed to continuous learning and leveraging emerging web
                  technologies to drive innovation and enhance user experience. */}

                  5+ years of experience building scalable, high-performance web applications
                  using Angular, TypeScript, JavaScript (ES6+), RxJS, HTML5, and CSS3. Expertise in front-end architecture,
                  state management (NgRx), and performance optimization, with a focus on reusable component design and
                  modular UI development. Proven experience integrating RESTful APIs to deliver responsive, data-driven
                  applications. Strong contributor in Agile environments, delivering production-ready code, mentoring developers,
                  and improving development workflows. Passionate about modern web technologies to enhance performance,
                  scalability, and user experience.
                </p>
              </div>

              {/* Skills Section with Different Colored Boxes */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "Clean Code", icon: <Wrench className="w-5 h-5" />, color: "from-blue-500 to-blue-600" },
                    {
                      name: "Performance",
                      icon: <Activity className="w-5 h-5" />,
                      color: "from-purple-500 to-purple-600",
                    },
                    { name: "Debugging", icon: <Bug className="w-5 h-5" />, color: "from-red-500 to-red-600" },
                    {
                      name: "Responsive",
                      icon: <Smartphone className="w-5 h-5" />,
                      color: "from-orange-500 to-orange-600",
                    },
                    {
                      name: "Reusable Components",
                      icon: <Component className="w-5 h-5" />,
                      color: "from-green-500 to-green-600",
                    },
                    {
                      name: "Architecture",
                      icon: <Building className="w-5 h-5" />,
                      color: "from-yellow-500 to-yellow-600",
                    }
                  ].map((item, index) => (
                    <div
                      key={item.name}
                      className={`relative overflow-hidden rounded-xl p-6 h-24 flex items-center justify-center cursor-pointer group ripple-effect bg-gradient-to-r ${item.color}`}
                      style={{
                        animationDelay: `${index * 0.2}s`,
                      }}
                    >
                      {/* Spider Web Background */}
                      <div className="absolute inset-0 opacity-20 animate-spider-web">
                        <svg width="100%" height="100%" className="absolute inset-0">
                          <defs>
                            <pattern
                              id={`web-${index}`}
                              x="0"
                              y="0"
                              width="40"
                              height="40"
                              patternUnits="userSpaceOnUse"
                            >
                              <path
                                d="M0,20 L40,20 M20,0 L20,40 M0,0 L40,40 M0,40 L40,0"
                                stroke="white"
                                strokeWidth="0.5"
                                opacity="0.3"
                              />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#web-${index})`} />
                        </svg>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 text-center flex items-center space-x-3">
                        <div className="text-white flex-shrink-0">{item.icon}</div>
                        <span className="text-white font-semibold text-sm sm:text-base group-hover:scale-110 transition-transform duration-300">
                          {item.name}
                        </span>
                      </div>

                      {/* Floating Particles */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(3)].map((_, particleIndex) => (
                          <div
                            key={particleIndex}
                            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
                            style={{
                              top: `${20 + particleIndex * 20}%`,
                              left: `${15 + particleIndex * 25}%`,
                              animationDelay: `${particleIndex * 0.5}s`,
                              animationDuration: "2s",
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Light Green Background with Spider Web */}
      <section id="skills" className="py-12 sm:py-16 lg:py-20 bg-green-50 spider-web-bg">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-gray-800">
            <div className="space-y-4">
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <div key={category} className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-green-50 transition-colors lg:cursor-default"
                  >
                    <div className="flex items-center space-x-3">
                      {category === "Languages & Frameworks" && <Code className="w-5 h-5 text-green-600" />}
                      {category === "State Management & Libraries" && <Database className="w-5 h-5 text-green-600" />}
                      {category === "Version Control & Collaboration" && (
                        <GitBranch className="w-5 h-5 text-green-600" />
                      )}
                      {category === "Developer Tools" && <Terminal className="w-5 h-5 text-green-600" />}
                      {category === "Testing & Quality" && <TestTube className="w-5 h-5 text-green-600" />}
                      {category === "AI Tools" && <Sparkles className="w-5 h-5 text-green-600" />}
                      <h3 className="text-base sm:text-lg font-semibold text-green-700">{category}</h3>
                      <span className="text-xs sm:text-sm text-gray-500 bg-green-100 px-2 py-1 rounded-full">
                        {skills.length} skills
                      </span>
                    </div>
                    <div className="flex-shrink-0 ml-4 lg:hidden">
                      {collapsedCategories[category] ? (
                        <ChevronDown className="w-5 h-5 text-green-600" />
                      ) : (
                        <ChevronUp className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </button>

                  {!collapsedCategories[category] && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 animate-fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {skills.map((skill, index) => (
                          <div
                            key={skill.name}
                            className="bg-green-50 rounded-xl p-3 sm:p-4 border border-green-100 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                              <div className="flex items-center space-x-2 min-w-0">
                                <div className="text-green-600 flex-shrink-0">{skill.icon}</div>
                                <span className="font-medium text-xs sm:text-sm text-gray-700 truncate">
                                  {skill.name}
                                </span>
                              </div>
                              <span className="text-xs opacity-80 text-gray-600 flex-shrink-0 ml-2">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                              <div
                                className={`bg-gradient-to-r ${skill.gradient} rounded-full h-1.5 sm:h-2 transition-all duration-1000 ease-out`}
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - White Background with Spider Web */}
      <section id="experience" className="py-12 sm:py-16 lg:py-20 bg-white spider-web-bg">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center text-gray-800">
            <div className="flex items-center justify-center space-x-3 mb-8 sm:mb-12">
              <Briefcase className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800">Experience</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${index === 0 ? "from-indigo-100 via-purple-50 to-pink-100" : "from-cyan-100 via-blue-50 to-indigo-100"} rounded-2xl p-4 sm:p-6 lg:p-8 text-left shadow-lg border border-white/50 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105`}
                  onClick={() => toggleExperience(index)}
                >
                  {/* Experience Card Header */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="text-green-600 flex-shrink-0">{exp.icon}</div>
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-green-700 mb-1 leading-tight">
                          {exp.title}
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-700">{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-2 sm:ml-4">
                      {expandedExperience === index ? (
                        <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      )}
                    </div>
                  </div>

                  {/* Period and Location */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-1 sm:space-y-0">
                    <div className="flex items-center space-x-2 opacity-80">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600">{exp.period}</span>
                    </div>
                    <div className="flex items-center space-x-2 opacity-80">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600">{exp.location}</span>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3 sm:mb-4">
                    {exp.shortDescription}
                  </p>

                  {/* Click to expand indicator */}
                  <div className="flex items-center justify-center">
                    <span className="text-xs text-green-600 font-medium">
                      {expandedExperience === index ? "Click to collapse" : "Click to view details"}
                    </span>
                  </div>

                  {/* Expanded Content */}
                  {expandedExperience === index && (
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-green-200 animate-fade-in">
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm">
                        <h4 className="text-sm sm:text-base font-semibold text-green-700 mb-3 sm:mb-4 flex items-center">
                          <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                          Key Responsibilities & Achievements:
                        </h4>
                        <ul className="space-y-2 sm:space-y-3">
                          {exp.achievements.map((achievement, achievementIndex) => (
                            <li key={achievementIndex} className="flex items-start space-x-2 sm:space-x-3">
                              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 text-xs sm:text-sm leading-relaxed">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Light Green Background with Spider Web */}
      <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-green-50 spider-web-bg">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center text-gray-800">
            <div className="flex items-center justify-center space-x-3 mb-8 sm:mb-12">
              <Briefcase className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800">Projects</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  onClick={() => openProjectModal(project)}
                  className={`bg-gradient-to-br ${project.gradient} rounded-2xl p-4 sm:p-6 shadow-lg border border-white/50 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-white/70`}
                >
                  <div className="flex items-start space-x-3 mb-3 sm:mb-4">
                    <div className="text-green-600 flex-shrink-0 mt-1">{project.icon}</div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-green-700 leading-tight line-clamp-2">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">{project.role}</p>
                  <p className="text-xs text-gray-600 mb-2 sm:mb-3">{project.client}</p>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-600 font-medium">{project.period}</span>
                    <span className="text-green-600 hover:text-green-700 font-medium">View details →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Gradient Background with Spider Web */}
      <section
        id="contact"
        className="py-12 sm:py-16 lg:py-20 spider-web-bg"
        style={{
          background: "#134E5E",
          background: "-webkit-linear-gradient(to right, #71B280, #134E5E)",
          background: "linear-gradient(to right, #71B280, #134E5E)",
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-white">
            <div className="flex items-center justify-center space-x-3 mb-8 sm:mb-12">
              <Mail className="w-8 h-8 text-white" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Get In Touch</h2>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 relative overflow-hidden">
                {/* Spider Web Background for Contact Info */}
                <div className="absolute inset-0 opacity-10 animate-spider-web">
                  <svg width="100%" height="100%" className="absolute inset-0">
                    <defs>
                      <pattern id="contact-web" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path
                          d="M0,15 L30,15 M15,0 L15,30 M0,0 L30,30 M0,30 L30,0"
                          stroke="white"
                          strokeWidth="0.3"
                          opacity="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#contact-web)" />
                  </svg>
                </div>

                {/* <div className="flex items-center space-x-3 mb-4 sm:mb-6 relative z-10">
                  <Mail className="w-6 h-6 text-white" />
                  <h3 className="text-xl sm:text-2xl font-semibold">Contact Info</h3>
                </div> */}
                <div className="space-y-3 sm:space-y-4 text-center relative z-10">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-blue-400" />
                    <span className="text-sm sm:text-base">abbisht.amit@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-green-400" />
                    <span className="text-sm sm:text-base">+91-9870710776</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-red-400" />
                    <span className="text-sm sm:text-base">Pune, Maharashtra</span>
                  </div>
                </div>
                <div className="flex space-x-4 mt-6 sm:mt-8 relative z-10">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/amitbishtab95"
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 border border-white/20"
                  >
                    <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/amit-bisht-830758169"
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 border border-white/20"
                  >
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="mailto:abbisht.amit@gmail.com"
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 border border-white/20"
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                  </a>
                </div>
              </div>
              {/* <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 animate-spider-web">
                  <svg width="100%" height="100%" className="absolute inset-0">
                    <defs>
                      <pattern id="form-web" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path
                          d="M0,15 L30,15 M15,0 L15,30 M0,0 L30,30 M0,30 L30,0"
                          stroke="white"
                          strokeWidth="0.3"
                          opacity="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#form-web)" />
                  </svg>
                </div>

                <div className="flex items-center space-x-3 mb-4 sm:mb-6 relative z-10">
                  <Mail className="w-6 h-6 text-white" />
                  <h3 className="text-xl sm:text-2xl font-semibold">Send Message</h3>
                </div>
                <form action={messageAction} className="space-y-4 relative z-10">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white/40 text-sm sm:text-base"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white/40 text-sm sm:text-base"
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white/40 resize-none text-sm sm:text-base"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={isMessagePending}
                    className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg transition-all duration-300 border border-white/20 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isMessagePending ? "Sending..." : "Send Message"}
                  </button>
                  {messageState && (
                    <div
                      className={`mt-4 p-3 rounded-lg text-center text-sm ${
                        messageState.success
                          ? "bg-green-500/20 text-green-100 border border-green-400/30"
                          : "bg-red-500/20 text-red-100 border border-red-400/30"
                      }`}
                    >
                      {messageState.message}
                    </div>
                  )}
                </form>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AB</span>
              </div>
              <span className="text-lg font-semibold">Amit Bisht</span>
            </div>
            <div className="flex items-center justify-center space-x-4 mb-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <span>© 2026</span>
              </div>
              {/* <div className="w-1 h-1 bg-gray-600 rounded-full"></div> */}
              {/* <div className="flex items-center space-x-2">
                <span>Made with Next.js and V0</span>
              </div> */}
            </div>
            <div className="flex justify-center space-x-4">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/amitbishtab95"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/amit-bisht-830758169"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:abbisht.amit@gmail.com"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeProjectModal} />}
    </div>
  )
}
