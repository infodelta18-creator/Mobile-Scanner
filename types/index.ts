export interface Contact {
  id: number
  name: string
  email: string
  phone: string
  company: string
  status: "active" | "inactive" | "prospect"
  lastContact: string
  value: number
}

export interface Opportunity {
  id: number
  title: string
  company: string
  contact: string
  value: number
  stage: "lead" | "qualified" | "proposal" | "negotiation" | "closed-won" | "closed-lost"
  probability: number
  expectedClose: string
  source: string
  notes: string
}

export interface Ticket {
  id: number
  title: string
  description: string
  customer: string
  email: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  assignee: string
  created: string
  updated: string
  category: string
}

export interface User {
  id: number
  name: string
  email: string
  role: "admin" | "sales" | "support" | "manager"
  avatar?: string
}

export interface DashboardMetrics {
  totalContacts: number
  openOpportunities: number
  pendingTickets: number
  monthlyRevenue: number
}

export interface Vulnerability {
  id: string
  name: string
  severity: "low" | "medium" | "high"
  description: string
}

export interface Recommendation {
  vulnerabilityId: string
  title: string
  description: string
  implementation: string
}
