"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Download,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Code,
  Lock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSecurityContext } from "@/contexts/security-context";
import { exportToPDF } from "@/utils/pdf-export";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Recommendations() {
  const router = useRouter();
  const { vulnerabilities, recommendations } = useSecurityContext();

  const handleExportPDF = () => {
    exportToPDF(vulnerabilities, recommendations);
  };

  if (vulnerabilities.length === 0) {
    router.push("/");
    return null;
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case "medium":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "low":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return <Shield className="w-5 h-5 text-blue-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "default";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-8">
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-between">
            <div>
              <Button
                variant="ghost"
                onClick={() => router.push("/analysis")}
                className="text-slate-300 hover:text-white mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Tahlilga qaytish
              </Button>
              <h1 className="text-4xl font-bold text-white mb-2">
                Xavfsizlik bo‘yicha tavsiyalar
              </h1>
              <p className="text-slate-300">
                Ilovangiz xavfsizligini oshirish uchun amaliy qadamlar
              </p>
            </div>
            <Button
              onClick={handleExportPDF}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
              <Download className="w-4 h-4 mr-2" />
              Hisobotni yuklab olish
            </Button>
          </motion.div>

          {/* Summary */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-400" />
                  Xavfsizlikni yaxshilash rejasi
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Tahlil natijasida {vulnerabilities.length} ta xavfsizlik
                  muammosi aniqlangan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400 mb-2">
                      {
                        recommendations.filter((r) => r.priority === "high")
                          .length
                      }
                    </div>
                    <div className="text-slate-300">Kritik muammolar</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400 mb-2">
                      {
                        recommendations.filter((r) => r.priority === "medium")
                          .length
                      }
                    </div>
                    <div className="text-slate-300">O‘rta daraja</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-2">
                      {
                        recommendations.filter((r) => r.priority === "low")
                          .length
                      }
                    </div>
                    <div className="text-slate-300">Past daraja</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Best Practices */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">
                  Xavfsizlik bo‘yicha eng yaxshi amaliyotlar
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Mobil ilovalar ishlab chiqishda muhim xavfsizlik choralar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Lock className="w-5 h-5 text-blue-400" />
                      <h4 className="font-semibold text-white">Shifrlash</h4>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Ma’lumotlarni saqlashda AES-256, uzatishda esa TLS 1.3
                      shifrlashidan foydalaning. Shifrlash kalitlarini
                      platformaga xos kalit omborlarida saqlang.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-green-400" />
                      <h4 className="font-semibold text-white">
                        Autentifikatsiya
                      </h4>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Biometrik tasdiqlash bilan ko‘p bosqichli
                      autentifikatsiyani joriy qiling. Xavfsiz autentifikatsiya
                      uchun OAuth 2.0 yoki OpenID Connect’dan foydalaning.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Code className="w-5 h-5 text-purple-400" />
                      <h4 className="font-semibold text-white">
                        Kod xavfsizligi
                      </h4>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Kodni ProGuard yoki DexGuard yordamida xiralashtiring.
                      Ilovani ish vaqtida himoya qilish (RASP) va buzib
                      o‘zgartirishga qarshi choralarni joriy qiling.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Detailed Recommendations */}
          <motion.div variants={fadeInUp}>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">
                Batafsil tavsiyalar
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {recommendations.map((recommendation, index) => {
                  const vulnerability = vulnerabilities.find(
                    (v) => v.id === recommendation.vulnerabilityId
                  );
                  return (
                    <motion.div
                      key={recommendation.id}
                      variants={fadeInUp}
                      transition={{ delay: index * 0.1 }}>
                      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                {getPriorityIcon(recommendation.priority)}
                                <CardTitle className="text-white">
                                  {recommendation.title}
                                </CardTitle>
                              </div>
                              <Badge
                                variant={
                                  getPriorityColor(
                                    recommendation.priority
                                  ) as any
                                }>
                                {recommendation.priority === "high"
                                  ? "Kritik"
                                  : recommendation.priority === "medium"
                                  ? "O‘rta"
                                  : recommendation.priority === "low"
                                  ? "Past"
                                  : "Noma’lum"}{" "}
                                daraja
                              </Badge>
                            </div>
                          </div>
                          {vulnerability && (
                            <div className="bg-slate-900/50 rounded-lg p-3 mt-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm font-medium text-white">
                                  Tegishli zaiflik
                                </span>
                              </div>
                              <p className="text-sm text-slate-300">
                                {vulnerability.name}:{" "}
                                {vulnerability.description}
                              </p>
                            </div>
                          )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-white mb-2">
                              Tavsif
                            </h4>
                            <p className="text-slate-300">
                              {recommendation.description}
                            </p>
                          </div>
                          <Separator className="bg-slate-700" />
                          <div>
                            <h4 className="font-semibold text-white mb-2">
                              Joriy etish bo‘yicha yo‘riqnoma
                            </h4>
                            <p className="text-slate-300">
                              {recommendation.implementation}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
