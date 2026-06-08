"use client"

import type React from "react"

import { X } from "lucide-react"

interface ProjectModalProps {
  project: {
    title: string
    role: string
    period: string
    client: string
    description: string
    achievements: string[]
    technologies: string[]
    icon: React.ReactNode
  }
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-green-100 p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <div className="text-green-600 flex-shrink-0">{project.icon}</div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-700 truncate">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0 ml-2"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <p className="text-base sm:text-lg font-semibold text-gray-700 mb-1">{project.role}</p>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">Client: {project.client}</p>
            <p className="text-xs sm:text-sm text-green-600 font-medium mb-3 sm:mb-4">{project.period}</p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{project.description}</p>
          </div>

          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-green-700 mb-2 sm:mb-3">Key Achievements:</h3>
            <ul className="space-y-2 sm:space-y-3">
              {project.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-green-700 mb-2 sm:mb-3">Technologies Used:</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-green-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
