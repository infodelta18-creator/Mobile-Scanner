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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Unlock, Key, RefreshCw, ArrowLeft, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function EncryptionDemo() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [secretKey, setSecretKey] = useState("my-secret-key-2024");
  const [algorithm, setAlgorithm] = useState("AES");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [error, setError] = useState("");

  const handleEncrypt = () => {
    if (!text.trim()) {
      setError("Iltimos, shifrlash uchun matn kiriting");
      return;
    }

    setError("");
    try {
      let result = "";
      switch (algorithm) {
        case "AES":
          result = CryptoJS.AES.encrypt(text, secretKey).toString();
          break;
        case "DES":
          result = CryptoJS.DES.encrypt(text, secretKey).toString();
          break;
        case "TripleDES":
          result = CryptoJS.TripleDES.encrypt(text, secretKey).toString();
          break;
        case "Rabbit":
          result = CryptoJS.Rabbit.encrypt(text, secretKey).toString();
          break;
        default:
          result = CryptoJS.AES.encrypt(text, secretKey).toString();
      }
      setEncrypted(result);
      setDecrypted("");
    } catch (err) {
      setError(
        "Shifrlash amalga oshmadi. Iltimos, kiritilgan ma'lumotlarni tekshiring."
      );
    }
  };

  const handleDecrypt = () => {
    if (!encrypted) {
      setError("Iltimos, avval matnni shifrlang");
      return;
    }

    setError("");
    try {
      let bytes;
      switch (algorithm) {
        case "AES":
          bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
          break;
        case "DES":
          bytes = CryptoJS.DES.decrypt(encrypted, secretKey);
          break;
        case "TripleDES":
          bytes = CryptoJS.TripleDES.decrypt(encrypted, secretKey);
          break;
        case "Rabbit":
          bytes = CryptoJS.Rabbit.decrypt(encrypted, secretKey);
          break;
        default:
          bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
      }
      const result = bytes.toString(CryptoJS.enc.Utf8);
      if (!result) {
        setError("Shifrni ochib bo‘lmadi. Kalit noto‘g‘ri bo‘lishi mumkin.");
        return;
      }
      setDecrypted(result);
    } catch (err) {
      setError(
        "Shifrni ochib bo‘lmadi. Iltimos, kiritilgan ma'lumot va kalitni tekshiring."
      );
    }
  };

  const handleReset = () => {
    setText("");
    setSecretKey("my-secret-key-2024");
    setEncrypted("");
    setDecrypted("");
    setError("");
  };

  const generateRandomKey = () => {
    const randomKey = CryptoJS.lib.WordArray.random(256 / 8).toString();
    setSecretKey(randomKey);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial="initial" animate="animate" className="space-y-8">
          <motion.div variants={fadeInUp}>
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-slate-300 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Bosh sahifaga qaytish
            </Button>
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-white">
                Shifrlash namoyishi
              </h1>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Turli shifrlash algoritmlarini o‘rganing va ular
                ma’lumotlaringizni qanday himoya qilishini ko‘ring
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Alert className="bg-blue-500/10 border-blue-500/20">
              <Info className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-300">
                Ushbu namoyish mobil ilovalarda shifrlash qanday ishlashini
                ko‘rsatadi. Ishlab chiqarishda har doim Android Keystore yoki
                iOS Keychain kabi xavfsiz kalitlarni boshqarish tizimlaridan
                foydalaning.
              </AlertDescription>
            </Alert>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-blue-400" />
                    Shifrlash sozlamalari
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Shifrlash parametrlaringizni sozlang
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {error && (
                    <Alert className="bg-red-500/10 border-red-500/20">
                      <AlertDescription className="text-red-300">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="text" className="text-white">
                      Shifrlanadigan matn
                    </Label>
                    <Textarea
                      id="text"
                      placeholder="Maxfiy ma’lumotlarni shu yerga kiriting..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="algorithm" className="text-white">
                        Algoritm
                      </Label>
                      <Select value={algorithm} onValueChange={setAlgorithm}>
                        <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="AES">
                            AES (Tavsiya etiladi)
                          </SelectItem>
                          <SelectItem value="DES">DES (Eskirgan)</SelectItem>
                          <SelectItem value="TripleDES">
                            Uch karra DES
                          </SelectItem>
                          <SelectItem value="Rabbit">Rabbit</SelectItem>
                        </SelectContent>
                      </Select>
                      {algorithm === "AES" && (
                        <Badge
                          variant="default"
                          className="bg-green-500/20 text-green-400">
                          Sanoat standarti
                        </Badge>
                      )}
                      {algorithm === "DES" && (
                        <Badge
                          variant="destructive"
                          className="bg-red-500/20 text-red-400">
                          Xavfsiz emas
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="key" className="text-white">
                        Maxfiy kalit
                      </Label>
                      <div className="flex space-x-2">
                        <Input
                          id="key"
                          type="password"
                          value={secretKey}
                          onChange={(e) => setSecretKey(e.target.value)}
                          className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400"
                          placeholder="Maxfiy kalitni kiriting"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={generateRandomKey}
                          className="border-slate-600 text-slate-300 hover:bg-slate-700">
                          <Key className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={handleEncrypt}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 flex-1">
                      <Lock className="w-4 h-4 mr-2" />
                      Shifrlash
                    </Button>
                    <Button
                      onClick={handleDecrypt}
                      variant="outline"
                      disabled={!encrypted}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 flex-1">
                      <Unlock className="w-4 h-4 mr-2" />
                      Shifrni ochish
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Output Section */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Natijalar</CardTitle>
                  <CardDescription className="text-slate-300">
                    Shifrlangan va ochilgan natija
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-white">Shifrlangan matn</Label>
                    <Textarea
                      value={encrypted}
                      readOnly
                      placeholder="Shifrlangan natija shu yerda paydo bo‘ladi..."
                      className="bg-slate-900/50 border-slate-600 text-green-400 placeholder:text-slate-500 font-mono"
                      rows={4}
                    />
                    {encrypted && (
                      <div className="text-sm text-slate-400">
                        Uzunligi: {encrypted.length} ta belgi
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Ochilgan matn</Label>
                    <Textarea
                      value={decrypted}
                      readOnly
                      placeholder="Ochilgan natija shu yerda paydo bo‘ladi..."
                      className="bg-slate-900/50 border-slate-600 text-blue-400 placeholder:text-slate-500"
                      rows={4}
                    />
                    {decrypted && (
                      <Badge
                        variant="default"
                        className="bg-green-500/20 text-green-400">
                        ✓ Muvaffaqiyatli ochildi
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Best Practices */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">
                  Shifrlash bo‘yicha eng yaxshi amaliyotlar
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Mobil ilovalarda shifrlashni joriy qilish uchun muhim
                  ko‘rsatmalar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white">
                      Algoritm tanlash
                    </h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>
                        • Simmetrik shifrlash uchun AES-256 dan foydalaning
                      </li>
                      <li>
                        • Assimetrik shifrlash uchun RSA-2048+ dan foydalaning
                      </li>
                      <li>• Eskirgan algoritmlardan (DES, MD5) saqlaning</li>
                      <li>• Kriptografik standartlarga rioya qiling</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white">
                      Kalitlarni boshqarish
                    </h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>
                        • Shifrlash kalitlarini hech qachon kodga qattiq yozmang
                      </li>
                      <li>
                        • Android Keystore yoki iOS Keychain dan foydalaning
                      </li>
                      <li>• To‘g‘ri kalitlarni aylantirishni joriy qiling</li>
                      <li>
                        • Imkon bo‘lsa, apparat darajasidagi xavfsizlikdan
                        foydalaning
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white">Joriy etish</h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>
                        • Ma’lumot uzatishda har doim HTTPS dan foydalaning
                      </li>
                      <li>• Sertifikat pinningni joriy qiling</li>
                      <li>
                        • Xavfsiz tasodifiy son generatorlaridan foydalaning
                      </li>
                      <li>• Barcha kriptografik amallarni tekshirib chiqing</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
