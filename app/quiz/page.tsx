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
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  BookOpen,
  CheckCircle,
  XCircle,
  Trophy,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

const quizQuestions = [
  {
    id: 1,
    question: "Mobil ilovalar uchun eng xavfsiz shifrlash algoritmi qaysi?",
    options: ["DES", "AES-256", "MD5", "SHA-1"],
    correct: 1,
    explanation:
      "AES-256 hozirda eng xavfsiz shifrlash standarti bo'lib, yaxshi xavfsizlik va ishlash samaradorligini ta'minlaydi.",
  },
  {
    id: 2,
    question: "Mobil ilovalar uchun eng xavfsiz autentifikatsiya usuli qaysi?",
    options: [
      "Faqat parol",
      "Ikki bosqichli autentifikatsiya",
      "Faqat biometrik",
      "Faqat PIN-kod",
    ],
    correct: 1,
    explanation:
      "Ikki bosqichli autentifikatsiya bir nechta autentifikatsiya omillarini birlashtirib, xavfsizlikni sezilarli darajada oshiradi.",
  },
  {
    id: 3,
    question: "Kodni xiralashtirishning asosiy maqsadi nima?",
    options: [
      "Ishlashni yaxshilash",
      "Ilova hajmini kamaytirish",
      "Teskari muhandislikni oldini olish",
      "Xatolarni tuzatish",
    ],
    correct: 2,
    explanation:
      "Kodni xiralashtirish hujumchilar uchun ilovani tushunish va teskari muhandislik qilishni qiyinlashtiradi.",
  },
  {
    id: 4,
    question:
      "Ma'lumotlarni xavfsiz uzatish uchun qaysi protokoldan foydalanish kerak?",
    options: ["HTTP", "FTP", "TLS 1.3 bilan HTTPS", "Telnet"],
    correct: 2,
    explanation:
      "TLS 1.3 bilan HTTPS ma'lumotlarni shifrlangan holda uzatadi va xavfsiz uzatishning hozirgi standartidir.",
  },
  {
    id: 5,
    question:
      "Android qurilmalarida sezgir ma'lumotlarni qayerda saqlash kerak?",
    options: [
      "SharedPreferences",
      "Tashqi xotira",
      "Android Keystore",
      "Ichki xotira",
    ],
    correct: 2,
    explanation:
      "Android Keystore shifrlash kalitlari kabi sezgir ma'lumotlarni xavfsiz saqlash uchun apparat yordamiga ega.",
  },
  {
    id: 6,
    question: "Sertifikat pinlash qanday maqsadda ishlatiladi?",
    options: [
      "Ishlashni yaxshilash",
      "O'rtadagi odam hujumlarini oldini olish",
      "Batareya sarfini kamaytirish",
      "Ma'lumotlarni siqish",
    ],
    correct: 1,
    explanation:
      "Sertifikat pinlash server sertifikatlarini tekshirib, o'rtadagi odam hujumlarini oldini oladi.",
  },
  {
    id: 7,
    question: "Mobil ilovalar uchun eng xavfsiz ruxsatnoma modeli qaysi?",
    options: [
      "O'rnatishda barcha ruxsatlarni so'rash",
      "Ish vaqtida ruxsatlarni so'rash",
      "Ruxsatlarsiz",
      "Orqa fondagi ruxsatlar",
    ],
    correct: 1,
    explanation:
      "Ish vaqtida ruxsatlarni so'rash foydalanuvchilarga kerak bo'lganda ruxsat berish imkonini beradi va eng kam imtiyoz prinsipiga amal qiladi.",
  },
  {
    id: 8,
    question:
      "Mobil ilovalarda API kalitlarini qattiq kodlashning asosiy xavfi nima?",
    options: [
      "Past ishlash",
      "Ilova hajmining katta bo'lishi",
      "Hujumchilar tomonidan osonlikcha olish",
      "Moslik muammolari",
    ],
    correct: 2,
    explanation:
      "Qattiq kodlangan API kalitlari ilova ikkilik faylidan osongina chiqarilishi mumkin, bu esa backend xizmatlarini xavf ostiga qo'yadi.",
  },
  {
    id: 9,
    question:
      "Android ilovalar xavfsizligini sinash uchun qaysi vosita keng tarqalgan?",
    options: ["Xcode", "MobSF", "Visual Studio", "Eclipse"],
    correct: 1,
    explanation:
      "MobSF (Mobile Security Framework) mobil ilovalar xavfsizligini sinash uchun mashhur ochiq manba vositasidir.",
  },
  {
    id: 10,
    question:
      "Mobil ilovalar ishlab chiqishda ilovani imzolashning maqsadi nima?",
    options: [
      "Ishlashni yaxshilash",
      "Ilova haqiqiyligini tasdiqlash",
      "Ilova hajmini kamaytirish",
      "Nosozliklarni tuzatish",
    ],
    correct: 1,
    explanation:
      "Ilovani imzolash ilovaning haqiqiyligi va yaxlitligini ta'minlaydi, o'zgartirishlarni oldini oladi.",
  },
  {
    id: 11,
    question: "Mobil ilovalarda eng keng tarqalgan zaiflik qaysi?",
    options: [
      "SQL injeksiyasi",
      "Xavfsiz bo'lmagan ma'lumot saqlash",
      "Bufer to'lib ketishi",
      "Saytlararo skriptlash",
    ],
    correct: 1,
    explanation:
      "OWASP ma'lumotlariga ko'ra, xavfsiz bo'lmagan ma'lumot saqlash mobil ilovalardagi eng keng tarqalgan zaifliklardan biridir.",
  },
  {
    id: 12,
    question:
      "Foydalanuvchi sessiyalarini boshqarish uchun eng yaxshi yondashuv qaysi?",
    options: [
      "Sessiyalarni hech qachon tugatmaslik",
      "Muddatli JWT tokenlardan foydalanish",
      "Parollarni mahalliy saqlash",
      "Faqat HTTP cookie-lardan foydalanish",
    ],
    correct: 1,
    explanation:
      "Muddatli JWT tokenlar foydalanuvchi sessiyalarini xavfsiz va holatni saqlamaydigan tarzda boshqarishni ta'minlaydi.",
  },
  {
    id: 13,
    question:
      "Ilova komponentlariga ruxsatsiz kirishni oldini olish uchun qaysi amaliyot yordam beradi?",
    options: [
      "Yashirin niyatlardan foydalanish",
      "Komponentlarni eksport qilish sozlamalarini to'g'ri sozlash",
      "Barcha ruxsatlarni olib tashlash",
      "Eskirgan API-lardan foydalanish",
    ],
    correct: 1,
    explanation:
      "Komponentlarni eksport qilish sozlamalarini to'g'ri sozlash ilova komponentlariga ruxsatsiz kirishni oldini oladi.",
  },
  {
    id: 14,
    question: "HTTPS-ning HTTP-dan asosiy afzalligi nima?",
    options: [
      "Tezroq yuklash",
      "Yaxshiroq SEO",
      "Ma'lumotlarni shifrlash",
      "Kichikroq yuk",
    ],
    correct: 2,
    explanation:
      "HTTPS ma'lumotlarni uzatishda shifrlaydi, uni tinglash va o'zgartirishdan himoya qiladi.",
  },
  {
    id: 15,
    question:
      "Foydalanuvchi hisob ma'lumotlarini saqlashning eng yaxshi usuli qaysi?",
    options: [
      "Oddiy matnli fayllar",
      "Qurilmaga xos kalitlar bilan shifrlash",
      "Base64 kodlash",
      "SharedPreferences",
    ],
    correct: 1,
    explanation:
      "Qurilmaga xos kalitlar bilan shifrlangan hisob ma'lumotlari saqlashning eng xavfsiz usulini ta'minlaydi.",
  },
];
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Quiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 12) return "text-green-400";
    if (score >= 9) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreMessage = (ball: number) => {
    if (ball >= 12)
      return "Ajoyib! Siz mobil xavfsizlikni juda yaxshi tushunasiz.";
    if (ball >= 9)
      return "Yaxshi natija! Siz mobil xavfsizlik tushunchalarini yaxshi bilasiz.";
    if (ball >= 6)
      return "Yomon emas! Mobil xavfsizlikning eng yaxshi amaliyotlarini yana bir bor ko‘rib chiqing.";
    return "O‘rganishda davom eting! Mobil xavfsizlik ilova ishlab chiqishda juda muhim.";
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="max-w-4xl mx-auto space-y-8">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-slate-300 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Bosh sahifaga qaytish
            </Button>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Trophy className="w-16 h-16 text-yellow-400" />
                </div>
                <CardTitle className="text-3xl text-white">
                  Test yakunlandi!
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Natijalaringiz quyida
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div
                    className={`text-6xl font-bold ${getScoreColor(
                      score
                    )} mb-2`}>
                    {score}/{quizQuestions.length}
                  </div>
                  <div className="text-xl text-slate-300 mb-4">
                    {Math.round((score / quizQuestions.length) * 100)}% to‘g‘ri
                    javob
                  </div>
                  <Badge
                    variant={
                      score >= 12
                        ? "default"
                        : score >= 9
                        ? "secondary"
                        : "destructive"
                    }
                    className="text-lg px-4 py-2">
                    {score >= 12
                      ? "Mutaxassis"
                      : score >= 9
                      ? "Yuqori"
                      : score >= 6
                      ? "O‘rta"
                      : "Boshlovchi"}
                  </Badge>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6">
                  <p className="text-slate-300 text-lg">
                    {getScoreMessage(score)}
                  </p>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={resetQuiz}
                    className="bg-gradient-to-r from-blue-500 to-purple-500">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Testni qayta boshlash
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/")}
                    className="border-slate-600 text-slate-300">
                    Bosh sahifaga qaytish
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Batafsil natijalar */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Batafsil natijalar</CardTitle>
                <CardDescription className="text-slate-300">
                  Javoblaringizni ko‘rib chiqing va izohlar bilan tanishing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quizQuestions.map((question, index) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === question.correct;
                  return (
                    <div
                      key={question.id}
                      className="border border-slate-700 rounded-lg p-4">
                      <div className="flex items-start space-x-3 mb-3">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400 mt-1" />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium text-white mb-2">
                            {index + 1}. {question.question}
                          </h4>
                          <div className="space-y-1 text-sm">
                            <div className="text-slate-300">
                              Sizning javobingiz:{" "}
                              <span
                                className={
                                  isCorrect ? "text-green-400" : "text-red-400"
                                }>
                                {question.options[userAnswer]}
                              </span>
                            </div>
                            {!isCorrect && (
                              <div className="text-slate-300">
                                To‘g‘ri javob:{" "}
                                <span className="text-green-400">
                                  {question.options[question.correct]}
                                </span>
                              </div>
                            )}
                            <div className="text-slate-400 italic mt-2">
                              {question.explanation}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="max-w-4xl mx-auto space-y-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-slate-300 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Bosh sahifaga qaytish
          </Button>

          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Badge variant="secondary" className="px-4 py-2">
                <BookOpen className="w-4 h-4 mr-2" />
                Mobil xavfsizlik testi
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-white">
              Bilimingizni sinab ko‘ring
            </h1>
            <p className="text-slate-300">
              {currentQuestion + 1}-savol / {quizQuestions.length} ta savoldan
            </p>
            <Progress value={progress} className="w-full max-w-md mx-auto" />
          </div>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={selectedAnswers[currentQuestion]?.toString()}
                onValueChange={(value) =>
                  handleAnswerSelect(Number.parseInt(value))
                }>
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className="text-slate-300 cursor-pointer flex-1">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="border-slate-600 text-slate-300">
                  Oldingi
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="bg-gradient-to-r from-blue-500 to-purple-500">
                  {currentQuestion === quizQuestions.length - 1
                    ? "Testni yakunlash"
                    : "Keyingi"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
