"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Download,
  Calendar,
} from "lucide-react";
import Link from "next/link";

// Ma'lumotlar (mock)
const salesData = [
  { month: "Yan", revenue: 85000, deals: 12, target: 90000 },
  { month: "Fev", revenue: 92000, deals: 15, target: 90000 },
  { month: "Mar", revenue: 78000, deals: 10, target: 90000 },
  { month: "Apr", revenue: 105000, deals: 18, target: 90000 },
  { month: "May", revenue: 125000, deals: 22, target: 90000 },
  { month: "Iyun", revenue: 118000, deals: 20, target: 90000 },
];

const customerData = [
  { month: "Yan", new: 45, retained: 234, churned: 12 },
  { month: "Fev", new: 52, retained: 267, churned: 8 },
  { month: "Mar", new: 38, retained: 289, churned: 15 },
  { month: "Apr", new: 61, retained: 312, churned: 9 },
  { month: "May", new: 58, retained: 345, churned: 11 },
  { month: "Iyun", new: 67, retained: 378, churned: 7 },
];

const salesByRep = [
  { name: "Sarvinoz Usmonova", sales: 145000, deals: 23 },
  { name: "Mirzohid Jumayev", sales: 132000, deals: 19 },
  { name: "Malika Sagidullayeva", sales: 118000, deals: 17 },
  { name: "Abbos Usmonjonov", sales: 95000, deals: 14 },
  { name: "Malohat Bekjonova", sales: 87000, deals: 12 },
];

const supportMetrics = [
  { category: "Texnik", tickets: 45, avgResolution: 2.3 },
  { category: "Hisob-kitob", tickets: 23, avgResolution: 1.8 },
  { category: "Funksional so‘rov", tickets: 18, avgResolution: 5.2 },
  { category: "Xatolik haqida xabar", tickets: 31, avgResolution: 3.1 },
  { category: "Umumiy", tickets: 12, avgResolution: 1.2 },
];

const leadSources = [
  { name: "Veb-sayt", value: 35, color: "#3b82f6" },
  { name: "Tavsiya", value: 28, color: "#10b981" },
  { name: "Ijtimoiy tarmoq", value: 20, color: "#f59e0b" },
  { name: "Email kampaniya", value: 12, color: "#ef4444" },
  { name: "Ko‘rgazma", value: 5, color: "#8b5cf6" },
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("6months");
  const [reportType, setReportType] = useState("sales");

  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalDeals = salesData.reduce((sum, item) => sum + item.deals, 0);
  const avgDealSize = totalRevenue / totalDeals;
  const conversionRate = 68; // Soxta konversiya ko‘rsatkichi

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sarlavha */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                CRM Boshqaruv paneli
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigatsiya */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link
              href="/"
              className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Boshqaruv paneli
            </Link>
            <Link
              href="/contacts"
              className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Kontaktlar
            </Link>
            <Link
              href="/sales"
              className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Savdo
            </Link>
            <Link
              href="/support"
              className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Qo‘llab-quvvatlash
            </Link>
            <Link
              href="/reports"
              className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600">
              Hisobotlar
            </Link>
          </div>
        </div>
      </nav>

      {/* Asosiy kontent */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Hisobot boshqaruvi */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Tahlil va hisobotlar
              </h2>
              <p className="text-gray-600">
                Biznesingiz samaradorligi bo‘yicha batafsil tahlil
              </p>
            </div>
            <div className="flex space-x-4">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-48">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Oxirgi oy</SelectItem>
                  <SelectItem value="3months">Oxirgi 3 oy</SelectItem>
                  <SelectItem value="6months">Oxirgi 6 oy</SelectItem>
                  <SelectItem value="1year">Oxirgi yil</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Eksport
              </Button>
            </div>
          </div>

          {/* Asosiy ko‘rsatkichlar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Umumiy daromad
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> o‘tgan davrga
                  nisbatan
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Yopilgan bitimlar
                </CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalDeals}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8%</span> o‘tgan davrga
                  nisbatan
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  O‘rtacha bitim hajmi
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${Math.round(avgDealSize).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+5%</span> o‘tgan davrga
                  nisbatan
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Konversiya darajasi
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{conversionRate}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+3%</span> o‘tgan davrga
                  nisbatan
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Diagrammalar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Savdo natijalari */}
            <Card>
              <CardHeader>
                <CardTitle>Savdo natijalari</CardTitle>
                <CardDescription>Vaqt davomida daromad va reja</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        `$${value.toLocaleString()}`,
                        name === "revenue" ? "Daromad" : "Reja",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#ef4444"
                      strokeDasharray="5 5"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Mijozlar statistikasi */}
            <Card>
              <CardHeader>
                <CardTitle>Mijozlar statistikasi</CardTitle>
                <CardDescription>
                  Yangi, saqlangan va yo‘qotilgan mijozlar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={customerData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="new" fill="#10b981" name="Yangi" />
                    <Bar dataKey="churned" fill="#ef4444" name="Yo‘qotilgan" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Sotuvchilar bo‘yicha savdo */}
            <Card>
              <CardHeader>
                <CardTitle>Sotuvchilar bo‘yicha savdo</CardTitle>
                <CardDescription>
                  Jamoa a'zolari natijalari taqqoslanishi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesByRep} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        "Savdo",
                      ]}
                    />
                    <Bar dataKey="sales" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Mijozlarni jalb qilish manbalari */}
            <Card>
              <CardHeader>
                <CardTitle>Jalb qilish manbalari</CardTitle>
                <CardDescription>
                  Jalb qilish kanallari taqsimoti
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={leadSources}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}>
                      {leadSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Qo‘llab-quvvatlash tahlili */}
          <Card>
            <CardHeader>
              <CardTitle>Qo‘llab-quvvatlash tahlili</CardTitle>
              <CardDescription>
                Toifa bo‘yicha chiptalar soni va yechim vaqti
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={supportMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar
                    yAxisId="left"
                    dataKey="tickets"
                    fill="#3b82f6"
                    name="Chiptalar"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="avgResolution"
                    fill="#f59e0b"
                    name="O‘rtacha yechim (kun)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
