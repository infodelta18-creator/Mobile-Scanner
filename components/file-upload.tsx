"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileType, CheckCircle } from "lucide-react";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export default function FileUpload({
  onFileUpload,
  isAnalyzing,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setError("");

    if (!selectedFile) return;

    // Fayl turini tekshirish
    if (!selectedFile.name.toLowerCase().endsWith(".apk")) {
      setError("Iltimos, to‘g‘ri APK fayl yuklang");
      return;
    }

    // Fayl hajmini tekshirish (maksimal 100MB)
    if (selectedFile.size > 100 * 1024 * 1024) {
      setError("Fayl hajmi 100MB dan oshmasligi kerak");
      return;
    }

    setFile(selectedFile);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      onFileUpload(file);
    }
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  if (isAnalyzing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 py-12">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-500/30 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">
            APK fayl tahlil qilinmoqda
          </h3>
          <p className="text-slate-300">
            Xavfsizlik zaifliklari uchun skanerlash...
          </p>
        </div>
        <div className="max-w-md mx-auto space-y-2">
          <Progress value={33} className="w-full" />
          <div className="flex justify-between text-sm text-slate-400">
            <span>Komponentlar ajratilmoqda</span>
            <span>33%</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept=".apk"
        onChange={handleInputChange}
        className="hidden"
      />

      {!file ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 cursor-pointer ${
            dragActive
              ? "border-blue-400 bg-blue-500/10"
              : "border-slate-600 hover:border-slate-500 hover:bg-slate-800/30"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleBrowse}>
          <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <h3 className="text-xl font-semibold text-white mb-2">
            APK faylni yuklang
          </h3>
          <p className="text-slate-300 mb-4">
            APK faylingizni shu yerga tortib tashlang yoki tanlash uchun bosing
          </p>
          <Button
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700">
            Fayl tanlash
          </Button>
          <div className="mt-4 text-sm text-slate-400">
            Qo‘llab-quvvatlanadi: .apk fayllar, maksimal 100MB
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <FileType className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{file.name}</h4>
                  <p className="text-slate-300 text-sm">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleUpload}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 flex-1">
                  Tahlilni boshlash
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setFile(null)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  Faylni o‘zgartirish
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {error && (
        <Alert className="bg-red-500/10 border-red-500/20">
          <AlertDescription className="text-red-300">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
