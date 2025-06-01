"use client";

import { useState } from "react";
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
import {
  Upload,
  Shield,
  BarChart3,
  BookOpen,
  ArrowRight,
  Zap,
  Lock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/file-upload";
import { useSecurityContext } from "@/contexts/security-context";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();
  const { setVulnerabilities, setRecommendations } = useSecurityContext();

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);

    // Simulyatsiya qilingan tahlil
    setTimeout(() => {
      // Soxta natijalar
      const mockVulnerabilities = [
        {
          id: "1",
          name: "Zaif shifrlash",
          severity: "high" as const,
          description: "Ilova eskirgan shifrlash algoritmlaridan foydalanadi",
          category: "Kriptografiya",
        },
        {
          id: "2",
          name: "Xavfsiz bo'lmagan ma'lumot saqlash",
          severity: "high" as const,
          description:
            "Maxfiy ma'lumotlar yetarlicha himoyalanmagan holda saqlanmoqda",
          category: "Ma'lumotlarni himoya qilish",
        },
        {
          id: "3",
          name: "Yetarli autentifikatsiya yo‘q",
          severity: "medium" as const,
          description: "Autentifikatsiya mexanizmlari chetlab o‘tilishi mumkin",
          category: "Autentifikatsiya",
        },
      ];

      const mockRecommendations = [
        {
          id: "1",
          vulnerabilityId: "1",
          title: "AES-256 shifrlashni joriy eting",
          description:
            "Zaif shifrlashni sanoat standartidagi AES-256 bilan almashtiring",
          priority: "high" as const,
          implementation:
            "Android uchun Keystore yoki iOS uchun Keychain'dan foydalaning",
        },
        {
          id: "2",
          vulnerabilityId: "2",
          title: "Ma'lumotlarni xavfsiz saqlash",
          description:
            "Maxfiy ma'lumotlar uchun shifrlangan saqlashni joriy eting",
          priority: "high" as const,
          implementation:
            "Android'da EncryptedSharedPreferences yoki iOS'da Keychain'dan foydalaning",
        },
      ];

      setVulnerabilities(mockVulnerabilities);
      setRecommendations(mockRecommendations);
      setIsAnalyzing(false);
      router.push("/analysis");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-12">
          {/* Qahramon bo‘limi */}
          <motion.div variants={fadeInUp} className="text-center space-y-6">
            <div className="flex justify-center">
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                Kengaytirilgan xavfsizlik tahlili
              </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Mobil xavfsizlik
              <br />
              tahlilchisi
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              APK fayllaringizni yuklang va xavfsizlik zaifliklarini aniqlang
              hamda mobil ilovalaringizni himoya qilish uchun amaliy tavsiyalar
              oling.
            </p>
          </motion.div>

          {/* Yuklash bo‘limi */}
          <motion.div variants={fadeInUp}>
            <Card className="max-w-2xl mx-auto bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">
                  APK faylini yuklash
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Xavfsizlik tahlilini boshlash uchun Android ilovangizni
                  yuklang
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFileUpload={handleFileUpload}
                  isAnalyzing={isAnalyzing}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Xususiyatlar tarmog‘i */}
          <motion.div variants={fadeInUp}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                    <Upload className="w-6 h-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">
                    Yuklash va tahlil qilish
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    APK faylingizni yuklang va bir necha daqiqada to‘liq
                    xavfsizlik tahlilini oling
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                    <BarChart3 className="w-6 h-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">
                    Zaifliklarni aniqlash
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Xavfsizlik zaifliklarini aniqlang va ularning darajasi hamda
                    ta'sirini ko‘ring
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <CardTitle className="text-white">
                    Xavfsizlik tavsiyalari
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Zaifliklarni bartaraf etish va xavfsizlikni oshirish uchun
                    amaliy tavsiyalar oling
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </motion.div>

          {/* Tezkor harakatlar */}
          <motion.div variants={fadeInUp}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => router.push("/quiz")}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3">
                <BookOpen className="w-5 h-5 mr-2" />
                Xavfsizlik viktorinasini yeching
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => router.push("/encryption-demo")}
                variant="outline"
                size="lg"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3">
                <Lock className="w-5 h-5 mr-2" />
                Shifrlash namoyishi
              </Button>
            </div>
          </motion.div>

          {/* Statistika bo‘limi */}
          <motion.div variants={fadeInUp}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">50K+</div>
                <div className="text-slate-400">Tahlil qilingan ilovalar</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">15+</div>
                <div className="text-slate-400">Zaiflik turlari</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">99.9%</div>
                <div className="text-slate-400">Aniqlik darajasi</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">24/7</div>
                <div className="text-slate-400">Tahlil doim mavjud</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
