import { v4 as uuidv4 } from "uuid"
import type { Vulnerability, Recommendation } from "@/types"

// Predefined list of possible vulnerabilities
const possibleVulnerabilities: Omit<Vulnerability, "id">[] = [
  {
    name: "Weak Encryption",
    severity: "high",
    description: "Application uses outdated or weak encryption algorithms that can be easily compromised.",
  },
  {
    name: "Insecure Data Storage",
    severity: "high",
    description: "Sensitive data is stored in plaintext or with insufficient protection on the device.",
  },
  {
    name: "Exposed API Keys",
    severity: "high",
    description: "API keys and secrets are hardcoded in the application and can be extracted.",
  },
  {
    name: "Insufficient Certificate Validation",
    severity: "high",
    description: "Application does not properly validate SSL certificates, making it vulnerable to MITM attacks.",
  },
  {
    name: "Insecure Authentication",
    severity: "medium",
    description: "Authentication mechanisms can be bypassed or are implemented incorrectly.",
  },
  {
    name: "Unprotected IPC Mechanisms",
    severity: "medium",
    description: "Inter-Process Communication channels are not properly secured.",
  },
  {
    name: "Excessive Permissions",
    severity: "medium",
    description: "Application requests more permissions than necessary for its functionality.",
  },
  {
    name: "Insecure Logging",
    severity: "low",
    description: "Sensitive information is written to application logs.",
  },
  {
    name: "Outdated Dependencies",
    severity: "low",
    description: "Application uses libraries with known security vulnerabilities.",
  },
  {
    name: "Lack of Code Obfuscation",
    severity: "low",
    description: "Application code can be easily reverse-engineered.",
  },
]

// Predefined recommendations for each vulnerability type
const recommendationTemplates: Record<string, Omit<Recommendation, "vulnerabilityId">> = {
  "Weak Encryption": {
    title: "Implement Strong Encryption",
    description:
      "Replace weak encryption algorithms with industry-standard strong encryption like AES-256 or RSA-2048.",
    implementation:
      "Use the Android Keystore system or iOS Keychain for key management. Implement AES-256 for symmetric encryption and RSA-2048 for asymmetric encryption.",
  },
  "Insecure Data Storage": {
    title: "Secure Sensitive Data Storage",
    description:
      "Store sensitive data securely using platform-specific secure storage mechanisms and encrypt data at rest.",
    implementation:
      "Use EncryptedSharedPreferences on Android or Keychain on iOS. Never store sensitive data in plain text files or standard SharedPreferences.",
  },
  "Exposed API Keys": {
    title: "Protect API Keys and Secrets",
    description:
      "Remove hardcoded API keys and secrets from the application code and implement secure storage and retrieval mechanisms.",
    implementation:
      "Store API keys on your backend server and implement token-based authentication. If client-side storage is necessary, use native secure storage with additional encryption.",
  },
  "Insufficient Certificate Validation": {
    title: "Implement Certificate Pinning",
    description:
      "Implement certificate pinning to prevent man-in-the-middle attacks by validating server certificates against known good certificates.",
    implementation:
      "Use OkHttp's CertificatePinner on Android or AFNetworking's AFSecurityPolicy on iOS to implement certificate pinning.",
  },
  "Insecure Authentication": {
    title: "Strengthen Authentication Mechanisms",
    description:
      "Implement secure authentication using industry best practices, including multi-factor authentication where appropriate.",
    implementation:
      "Use OAuth 2.0 or OpenID Connect for authentication. Implement biometric authentication or time-based one-time passwords (TOTP) for additional security.",
  },
  "Unprotected IPC Mechanisms": {
    title: "Secure Inter-Process Communication",
    description: "Implement proper security controls for all IPC mechanisms to prevent unauthorized access.",
    implementation:
      "Use explicit intents with proper permissions on Android. Implement signature or permission verification before processing IPC requests.",
  },
  "Excessive Permissions": {
    title: "Minimize Required Permissions",
    description: "Request only the minimum permissions necessary for the application to function properly.",
    implementation:
      "Review and remove unnecessary permissions from the AndroidManifest.xml. Implement runtime permission requests for sensitive permissions on Android 6.0+.",
  },
  "Insecure Logging": {
    title: "Implement Secure Logging Practices",
    description: "Ensure that sensitive information is not logged in production builds of the application.",
    implementation:
      "Create a logging wrapper that disables sensitive logs in release builds. Use ProGuard rules to strip logging statements from production code.",
  },
  "Outdated Dependencies": {
    title: "Update Dependencies Regularly",
    description:
      "Implement a process to regularly update dependencies and libraries to address known security vulnerabilities.",
    implementation:
      "Use dependency management tools like Gradle or CocoaPods to track and update dependencies. Implement automated vulnerability scanning in your CI/CD pipeline.",
  },
  "Lack of Code Obfuscation": {
    title: "Implement Code Obfuscation",
    description: "Obfuscate application code to make reverse engineering more difficult.",
    implementation:
      "Use ProGuard or DexGuard on Android to obfuscate code. Implement additional anti-tampering measures like integrity checks.",
  },
}

// Generate random vulnerabilities
export const generateMockVulnerabilities = (): Vulnerability[] => {
  // Randomly select 2-5 vulnerabilities
  const count = Math.floor(Math.random() * 4) + 2

  // Shuffle and slice the array to get random vulnerabilities
  const selectedVulnerabilities = [...possibleVulnerabilities].sort(() => 0.5 - Math.random()).slice(0, count)

  // Add unique IDs
  return selectedVulnerabilities.map((vuln) => ({
    ...vuln,
    id: uuidv4(),
  }))
}

// Generate recommendations based on vulnerabilities
export const generateMockRecommendations = (vulnerabilities: Vulnerability[]): Recommendation[] => {
  return vulnerabilities.map((vulnerability) => {
    const template = recommendationTemplates[vulnerability.name] || {
      title: "Address Security Issue",
      description: "Implement security best practices to address this vulnerability.",
      implementation: "Follow industry standards and guidelines for secure mobile app development.",
    }

    return {
      vulnerabilityId: vulnerability.id,
      ...template,
    }
  })
}
