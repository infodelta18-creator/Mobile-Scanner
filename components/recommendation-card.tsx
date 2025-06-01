"use client"

import type React from "react"

import { Card, CardContent, Typography, Box, Chip, Divider } from "@mui/material"
import { Shield, AlertTriangle, Code } from "lucide-react"
import type { Recommendation, Vulnerability } from "@/types"

interface RecommendationCardProps {
  recommendation: Recommendation
  vulnerability?: Vulnerability
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, vulnerability }) => {
  if (!vulnerability) return null

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "error"
      case "medium":
        return "warning"
      case "low":
        return "info"
      default:
        return "default"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "low":
        return <AlertTriangle className="h-5 w-5 text-blue-500" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  return (
    <Card elevation={3} className="h-full">
      <CardContent>
        <Box className="flex justify-between items-start mb-3">
          <Typography variant="h6" component="h3" className="font-bold">
            {recommendation.title}
          </Typography>
          <Chip
            label={vulnerability.severity.toUpperCase()}
            color={getSeverityColor(vulnerability.severity) as any}
            size="small"
          />
        </Box>

        <Box className="flex items-start mb-4">
          <Box className="mr-2 mt-1">{getSeverityIcon(vulnerability.severity)}</Box>
          <Typography variant="body2" color="text.secondary">
            <strong>Vulnerability:</strong> {vulnerability.name} - {vulnerability.description}
          </Typography>
        </Box>

        <Divider className="my-3" />

        <Box className="flex items-start mb-4">
          <Shield className="h-5 w-5 mr-2 mt-1 text-green-500" />
          <Typography variant="body2">
            <strong>Recommendation:</strong> {recommendation.description}
          </Typography>
        </Box>

        <Box className="flex items-start">
          <Code className="h-5 w-5 mr-2 mt-1 text-blue-500" />
          <Typography variant="body2">
            <strong>Implementation:</strong> {recommendation.implementation}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RecommendationCard
