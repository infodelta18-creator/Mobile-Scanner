"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Vulnerability {
  id: string
  name: string
  severity: "low" | "medium" | "high"
  description: string
  category: string
}

interface Recommendation {
  id: string
  vulnerabilityId: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  implementation: string
}

interface SecurityContextType {
  vulnerabilities: Vulnerability[]
  recommendations: Recommendation[]
  setVulnerabilities: (vulnerabilities: Vulnerability[]) => void
  setRecommendations: (recommendations: Recommendation[]) => void
  clearData: () => void
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined)

export function SecurityProvider({ children }: { children: ReactNode }) {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  const clearData = () => {
    setVulnerabilities([])
    setRecommendations([])
  }

  return (
    <SecurityContext.Provider
      value={{
        vulnerabilities,
        recommendations,
        setVulnerabilities,
        setRecommendations,
        clearData,
      }}
    >
      {children}
    </SecurityContext.Provider>
  )
}

export function useSecurityContext() {
  const context = useContext(SecurityContext)
  if (context === undefined) {
    throw new Error("useSecurityContext must be used within a SecurityProvider")
  }
  return context
}
