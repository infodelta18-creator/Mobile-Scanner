import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { SecurityProvider } from "@/contexts/security-context"
import Navigation from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <SecurityProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">{children}</main>
          </div>
        </SecurityProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'Hojiakbardev'
    };
