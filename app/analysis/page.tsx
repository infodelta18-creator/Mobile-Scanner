"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Shield, FileText, ArrowLeft, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSecurityContext } from "@/contexts/security-context"
import VulnerabilityDataGrid from "@/components/vulnerability-data-grid"
import VulnerabilityChart from "@/components/vulnerability-chart"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function Analysis() {
  const router = useRouter()
  const { vulnerabilities } = useSecurityContext()
  const [analysisProgress, setAnalysisProgress] = useState(0)

  useEffect(() => {
    if (vulnerabilities.length === 0) {
      router.push("/")
      return
    }

    // Animate progress bar
    const timer = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [vulnerabilities, router])

  if (vulnerabilities.length === 0) {
    return null
  }

  const highSeverity = vulnerabilities.filter((v) => v.severity === "high").length
  const mediumSeverity = vulnerabilities.filter((v) => v.severity === "medium").length
  const lowSeverity = vulnerabilities.filter((v) => v.severity === "low").length
  const totalVulnerabilities = vulnerabilities.length

  const riskScore = Math.round(
    ((highSeverity * 3 + mediumSeverity * 2 + lowSeverity * 1) / (totalVulnerabilities * 3)) * 100,
  )

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <div className="container mx-auto px-4 py-8">
      <motion.div initial="initial" animate="animate" className="space-y-8">
        {/* Sarlavha */}
        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => router.push("/")} className="text-slate-300 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Yuklashga qaytish
            </Button>
            <h1 className="text-4xl font-bold text-white mb-2">Xavfsizlik tahlili natijalari</h1>
            <p className="text-slate-300">Mobil ilovangiz uchun to‘liq zaifliklarni baholash</p>
          </div>
          <Button
            onClick={() => router.push("/recommendations")}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <FileText className="w-4 h-4 mr-2" />
            Tavsiyalarni ko‘rish
          </Button>
        </motion.div>

        {/* Tahlil jarayoni */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                Tahlil jarayoni
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={analysisProgress} className="w-full" />
              <p className="text-slate-300 mt-2">{analysisProgress}% tugallandi</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Umumiy statistikalar */}
        <motion.div variants={fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-300">Jami zaifliklar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{totalVulnerabilities}</div>
                <Badge variant="secondary" className="mt-2">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Aniqlangan
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-300">Yuqori xavflilik</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-400">{highSeverity}</div>
                <Badge variant="destructive" className="mt-2">
                  Jiddiy
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-300">O‘rta xavflilik</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-400">{mediumSeverity}</div>
                <Badge className="mt-2 bg-yellow-500/20 text-yellow-400">Ogohlantirish</Badge>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-300">Xavf balli</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-400">{riskScore}%</div>
                <Badge
                  variant={riskScore > 70 ? "destructive" : riskScore > 40 ? "secondary" : "default"}
                  className="mt-2"
                >
                  {riskScore > 70 ? "Yuqori xavf" : riskScore > 40 ? "O‘rta xavf" : "Past xavf"}
                </Badge>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Batafsil tahlil */}
        <motion.div variants={fadeInUp}>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-slate-700">
              <TabsTrigger value="overview" className="text-slate-300 data-[state=active]:text-white">
                Umumiy ko‘rinish
              </TabsTrigger>
              <TabsTrigger value="vulnerabilities" className="text-slate-300 data-[state=active]:text-white">
                Zaifliklar
              </TabsTrigger>
              <TabsTrigger value="chart" className="text-slate-300 data-[state=active]:text-white">
                Vizualizatsiya
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-400" />
                    Xavfsizlik baholash ko‘rinishi
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Aniqlangan muammolar va ularning ta’siri haqida umumiy ma’lumot
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">Zaiflik toifalari</h4>
                      <div className="space-y-2">
                        {Array.from(new Set(vulnerabilities.map((v) => v.category))).map((category) => (
                          <div key={category} className="flex justify-between items-center">
                            <span className="text-slate-300">{category}</span>
                            <Badge variant="outline" className="border-slate-600 text-slate-300">
                              {vulnerabilities.filter((v) => v.category === category).length}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3">Xavf bahosi</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-300">Umumiy xavfsizlik</span>
                            <span className="text-slate-300">{100 - riskScore}%</span>
                          </div>
                          <Progress value={100 - riskScore} className="h-2" />
                        </div>
                        <p className="text-sm text-slate-400">
                          {riskScore > 70
                            ? "Ilovangizda jiddiy xavfsizlik zaifliklari mavjud, zudlik bilan bartaraf etilishi kerak."
                            : riskScore > 40
                              ? "Ilovangizda o‘rtacha xavfsizlik muammolari mavjud, ularni hal qilish tavsiya etiladi."
                              : "Ilovangiz xavfsiz holatda, faqat kichik kamchiliklar mavjud."}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vulnerabilities">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Zaiflik tafsilotlari</CardTitle>
                  <CardDescription className="text-slate-300">
                    Aniqlangan xavfsizlik zaifliklarining batafsil ro‘yxati
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <VulnerabilityDataGrid vulnerabilities={vulnerabilities} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chart">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Zaifliklar taqsimoti</CardTitle>
                  <CardDescription className="text-slate-300">
                    Zaifliklar darajasining vizual taqdimoti
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <VulnerabilityChart vulnerabilities={vulnerabilities} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  </div>
)
}