"use client"

import { useState, useEffect } from "react"
import { Menu, X, Download, Home, User, Code, Briefcase, Mail } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Projects", href: "#projects", icon: Briefcase },
    { name: "Contact", href: "#contact", icon: Mail },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const downloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement("a")
    link.href = "/Amit_Bisht_Senior_Angular_Developer.pdf" // This will look for resume.pdf in the public folder
    link.download = "Amit_Bisht_Senior_Angular_Developer.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-green-50 shadow-lg border-b border-green-100">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo/Name - Left side with proper spacing and alignment */}
          <button
            onClick={scrollToTop}
            className="flex items-start space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-600 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">AB</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex flex-col items-start min-w-0">
              <div className="text-gray-800 font-bold text-sm sm:text-lg md:text-xl leading-tight">Amit Bisht</div>
              <div className="text-gray-600 text-xs sm:text-sm leading-tight">Frontend Developer</div>
            </div>
          </button>

          {/* Center Navigation - Desktop and Tablet */}
          <nav className="hidden lg:flex items-center justify-center space-x-4 xl:space-x-6 flex-1 mx-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`flex items-center justify-center space-x-1 xl:space-x-2 transition-all duration-200 font-medium relative group px-2 xl:px-4 py-2 rounded-lg border-2 text-sm xl:text-base ${
                  activeSection === item.href.substring(1)
                    ? "text-green-600 bg-green-100 border-green-300"
                    : "text-gray-700 hover:text-green-600 border-transparent hover:border-green-300 hover:bg-green-50"
                }`}
              >
                <item.icon className="w-3 h-3 xl:w-4 xl:h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Resume Button - Desktop and Tablet */}
          <div className="hidden md:block flex-shrink-0">
            <button
              onClick={downloadResume}
              className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-3 sm:px-4 lg:px-6 py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 transition-all duration-200 text-sm lg:text-base"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-gray-800 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-green-200 bg-green-50">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`transition-all duration-200 font-medium text-left py-3 px-4 rounded-lg relative group mx-2 border-2 ${
                    activeSection === item.href.substring(1)
                      ? "text-green-600 bg-green-100 border-green-300"
                      : "text-gray-700 hover:text-green-600 hover:bg-green-100 border-transparent hover:border-green-300"
                  }`}
                >
                  <span className="relative">{item.name}</span>
                </button>
              ))}
              <div className="px-2 pt-2">
                <button
                  onClick={downloadResume}
                  className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 w-full justify-center"
                >
                  <Download className="w-4 h-4" />
                  <span>Resume</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
