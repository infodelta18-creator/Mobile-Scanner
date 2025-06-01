"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Search,
  Edit,
  DollarSign,
  Calendar,
  User,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

// O'zbekcha nomlar va matnlar
interface Imkoniyat {
  id: number;
  nomi: string;
  kompaniya: string;
  kontakt: string;
  qiymat: number;
  bosqich:
    | "lead"
    | "qualified"
    | "proposal"
    | "negotiation"
    | "closed-won"
    | "closed-lost";
  ehtimollik: number;
  tugashSanasi: string;
  manba: string;
  izoh: string;
}

const mockImkoniyatlar: Imkoniyat[] = [
  {
    id: 1,
    nomi: "Korporativ dastur litsenziyasi",
    kompaniya: "Acme Corp",
    kontakt: "Jahongir Sodiqov",
    qiymat: 50000,
    bosqich: "proposal",
    ehtimollik: 75,
    tugashSanasi: "2024-02-15",
    manba: "Vebsayt",
    izoh: "Korporativ paketga qiziqish bildirildi",
  },
  {
    id: 2,
    nomi: "Bulutga ko'chirish loyihasi",
    kompaniya: "TechStart Inc",
    kontakt: "Sarvinoz Jo‘raeva",
    qiymat: 125000,
    bosqich: "negotiation",
    ehtimollik: 85,
    tugashSanasi: "2024-02-28",
    manba: "Tanish tavsiyasi",
    izoh: "Butun infratuzilmani bulutga ko‘chirish kerak",
  },
  {
    id: 3,
    nomi: "Yillik texnik xizmat shartnomasi",
    kompaniya: "Global Tech",
    kontakt: "Murodjon Karimov",
    qiymat: 25000,
    bosqich: "qualified",
    ehtimollik: 60,
    tugashSanasi: "2024-03-10",
    manba: "Sovuq qo‘ng‘iroq",
    izoh: "Mijoz xizmat darajasini oshirmoqchi",
  },
  {
    id: 4,
    nomi: "Maxsus dasturlash",
    kompaniya: "Innovate LLC",
    kontakt: "Dilnoza Qodirova",
    qiymat: 75000,
    bosqich: "lead",
    ehtimollik: 25,
    tugashSanasi: "2024-04-01",
    manba: "Ko‘rgazma",
    izoh: "Maxsus dasturlash xizmatlariga dastlabki qiziqish",
  },
];

export default function SavdoSahifa() {
  const [imkoniyatlar, setImkoniyatlar] =
    useState<Imkoniyat[]>(mockImkoniyatlar);
  const [qidiruv, setQidiruv] = useState("");
  const [bosqichFilter, setBosqichFilter] = useState<string>("all");
  const [yangiDialog, setYangiDialog] = useState(false);
  const [tahrirImkoniyat, setTahrirImkoniyat] = useState<Imkoniyat | null>(
    null
  );
  const [yangiImkoniyat, setYangiImkoniyat] = useState({
    nomi: "",
    kompaniya: "",
    kontakt: "",
    qiymat: 0,
    bosqich: "lead" as const,
    ehtimollik: 25,
    tugashSanasi: "",
    manba: "",
    izoh: "",
  });

  const filtrlanganImkoniyatlar = useMemo(() => {
    return imkoniyatlar.filter((imk) => {
      const mosQidiruv =
        imk.nomi.toLowerCase().includes(qidiruv.toLowerCase()) ||
        imk.kompaniya.toLowerCase().includes(qidiruv.toLowerCase()) ||
        imk.kontakt.toLowerCase().includes(qidiruv.toLowerCase());
      const mosBosqich =
        bosqichFilter === "all" || imk.bosqich === bosqichFilter;
      return mosQidiruv && mosBosqich;
    });
  }, [imkoniyatlar, qidiruv, bosqichFilter]);

  const jamiQiymat = imkoniyatlar.reduce((sum, imk) => sum + imk.qiymat, 0);
  const ogirlikQiymat = imkoniyatlar.reduce(
    (sum, imk) => sum + (imk.qiymat * imk.ehtimollik) / 100,
    0
  );

  const imkoniyatQoshish = () => {
    if (yangiImkoniyat.nomi && yangiImkoniyat.kompaniya) {
      const imkoniyat: Imkoniyat = {
        id: Math.max(...imkoniyatlar.map((o) => o.id)) + 1,
        ...yangiImkoniyat,
      };
      setImkoniyatlar([...imkoniyatlar, imkoniyat]);
      setYangiImkoniyat({
        nomi: "",
        kompaniya: "",
        kontakt: "",
        qiymat: 0,
        bosqich: "lead",
        ehtimollik: 25,
        tugashSanasi: "",
        manba: "",
        izoh: "",
      });
      setYangiDialog(false);
    }
  };

  const imkoniyatTahrirlash = (imkoniyat: Imkoniyat) => {
    setTahrirImkoniyat(imkoniyat);
  };

  const imkoniyatYangilash = () => {
    if (tahrirImkoniyat) {
      setImkoniyatlar(
        imkoniyatlar.map((o) =>
          o.id === tahrirImkoniyat.id ? tahrirImkoniyat : o
        )
      );
      setTahrirImkoniyat(null);
    }
  };

  const bosqichBadge = (bosqich: string) => {
    switch (bosqich) {
      case "lead":
        return <Badge variant="outline">Lid</Badge>;
      case "qualified":
        return <Badge className="bg-blue-100 text-blue-800">Saralangan</Badge>;
      case "proposal":
        return <Badge className="bg-yellow-100 text-yellow-800">Taklif</Badge>;
      case "negotiation":
        return (
          <Badge className="bg-orange-100 text-orange-800">Muzokara</Badge>
        );
      case "closed-won":
        return <Badge className="bg-green-100 text-green-800">Yutildi</Badge>;
      case "closed-lost":
        return <Badge variant="destructive">Yutqazildi</Badge>;
      default:
        return <Badge variant="outline">{bosqich}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                <span className="text-white text-sm font-medium">JS</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link
              href="/"
              className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Bosh sahifa
            </Link>
            <Link
              href="/contacts"
              className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Kontaktlar
            </Link>
            <Link
              href="/sales"
              className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600">
              Savdo
            </Link>
            <Link
              href="/support"
              className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Qo‘llab-quvvatlash
            </Link>
            <Link
              href="/reports"
              className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Hisobotlar
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Sales Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Jami savdo qiymati
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${jamiQiymat.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {imkoniyatlar.length} ta imkoniyat bo‘yicha
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Og‘irlikli qiymat
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${Math.round(ogirlikQiymat).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Ehtimollik asosida
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Faol imkoniyatlar
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    imkoniyatlar.filter((o) => !o.bosqich.includes("closed"))
                      .length
                  }
                </div>
                <p className="text-xs text-muted-foreground">
                  Faol bosqichlarda
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Savdo imkoniyatlari</CardTitle>
                  <CardDescription>
                    Savdo jarayonini kuzating va boshqaring
                  </CardDescription>
                </div>
                <Dialog open={yangiDialog} onOpenChange={setYangiDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Imkoniyat qo‘shish
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Yangi imkoniyat qo‘shish</DialogTitle>
                      <DialogDescription>
                        Imkoniyat tafsilotlarini kiriting.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="nomi">Nomi</Label>
                          <Input
                            id="nomi"
                            value={yangiImkoniyat.nomi}
                            onChange={(e) =>
                              setYangiImkoniyat({
                                ...yangiImkoniyat,
                                nomi: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="kompaniya">Kompaniya</Label>
                          <Input
                            id="kompaniya"
                            value={yangiImkoniyat.kompaniya}
                            onChange={(e) =>
                              setYangiImkoniyat({
                                ...yangiImkoniyat,
                                kompaniya: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="kontakt">Kontakt</Label>
                          <Input
                            id="kontakt"
                            value={yangiImkoniyat.kontakt}
                            onChange={(e) =>
                              setYangiImkoniyat({
                                ...yangiImkoniyat,
                                kontakt: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="qiymat">Qiymat ($)</Label>
                          <Input
                            id="qiymat"
                            type="number"
                            value={yangiImkoniyat.qiymat}
                            onChange={(e) =>
                              setYangiImkoniyat({
                                ...yangiImkoniyat,
                                qiymat: Number.parseInt(e.target.value) || 0,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="bosqich">Bosqich</Label>
                          <Select
                            value={yangiImkoniyat.bosqich}
                            onValueChange={(value: any) =>
                              setYangiImkoniyat({
                                ...yangiImkoniyat,
                                bosqich: value,
                              })
                            }>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lead">Lid</SelectItem>
                              <SelectItem value="qualified">
                                Saralangan
                              </SelectItem>
                              <SelectItem value="proposal">Taklif</SelectItem>
                              <SelectItem value="negotiation">
                                Muzokara
                              </SelectItem>
                              <SelectItem value="closed-won">
                                Yutildi
                              </SelectItem>
                              <SelectItem value="closed-lost">
                                Yutqazildi
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="ehtimollik">Ehtimollik (%)</Label>
                          <Input
                            id="ehtimollik"
                            type="number"
                            min="0"
                            max="100"
                            value={yangiImkoniyat.ehtimollik}
                            onChange={(e) =>
                              setYangiImkoniyat({
                                ...yangiImkoniyat,
                                ehtimollik:
                                  Number.parseInt(e.target.value) || 0,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="tugashSanasi">
                            Yakunlanish sanasi
                          </Label>
                          <Input
                            id="tugashSanasi"
                            type="date"
                            value={yangiImkoniyat.tugashSanasi}
                            onChange={(e) =>
                              setYangiImkoniyat({
                                ...yangiImkoniyat,
                                tugashSanasi: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="manba">Manba</Label>
                        <Input
                          id="manba"
                          value={yangiImkoniyat.manba}
                          onChange={(e) =>
                            setYangiImkoniyat({
                              ...yangiImkoniyat,
                              manba: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="izoh">Izoh</Label>
                        <Textarea
                          id="izoh"
                          value={yangiImkoniyat.izoh}
                          onChange={(e) =>
                            setYangiImkoniyat({
                              ...yangiImkoniyat,
                              izoh: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={imkoniyatQoshish}>
                        Imkoniyat qo‘shish
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Imkoniyatlarni qidiring..."
                    value={qidiruv}
                    onChange={(e) => setQidiruv(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={bosqichFilter} onValueChange={setBosqichFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Bosqich bo‘yicha filtrlash" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha bosqichlar</SelectItem>
                    <SelectItem value="lead">Lid</SelectItem>
                    <SelectItem value="qualified">Saralangan</SelectItem>
                    <SelectItem value="proposal">Taklif</SelectItem>
                    <SelectItem value="negotiation">Muzokara</SelectItem>
                    <SelectItem value="closed-won">Yutildi</SelectItem>
                    <SelectItem value="closed-lost">Yutqazildi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Opportunities Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Imkoniyat</TableHead>
                    <TableHead>Kompaniya</TableHead>
                    <TableHead>Kontakt</TableHead>
                    <TableHead>Qiymat</TableHead>
                    <TableHead>Bosqich</TableHead>
                    <TableHead>Ehtimollik</TableHead>
                    <TableHead>Yakunlanish sanasi</TableHead>
                    <TableHead>Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtrlanganImkoniyatlar.map((imkoniyat) => (
                    <TableRow key={imkoniyat.id}>
                      <TableCell className="font-medium">
                        {imkoniyat.nomi}
                      </TableCell>
                      <TableCell>{imkoniyat.kompaniya}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-400" />
                          {imkoniyat.kontakt}
                        </div>
                      </TableCell>
                      <TableCell>
                        ${imkoniyat.qiymat.toLocaleString()}
                      </TableCell>
                      <TableCell>{bosqichBadge(imkoniyat.bosqich)}</TableCell>
                      <TableCell>{imkoniyat.ehtimollik}%</TableCell>
                      <TableCell>{imkoniyat.tugashSanasi}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => imkoniyatTahrirlash(imkoniyat)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Edit Opportunity Dialog */}
      <Dialog
        open={!!tahrirImkoniyat}
        onOpenChange={() => setTahrirImkoniyat(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Imkoniyatni tahrirlash</DialogTitle>
            <DialogDescription>
              Imkoniyat tafsilotlarini yangilang.
            </DialogDescription>
          </DialogHeader>
          {tahrirImkoniyat && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-nomi">Nomi</Label>
                  <Input
                    id="edit-nomi"
                    value={tahrirImkoniyat.nomi}
                    onChange={(e) =>
                      setTahrirImkoniyat({
                        ...tahrirImkoniyat,
                        nomi: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-kompaniya">Kompaniya</Label>
                  <Input
                    id="edit-kompaniya"
                    value={tahrirImkoniyat.kompaniya}
                    onChange={(e) =>
                      setTahrirImkoniyat({
                        ...tahrirImkoniyat,
                        kompaniya: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-kontakt">Kontakt</Label>
                  <Input
                    id="edit-kontakt"
                    value={tahrirImkoniyat.kontakt}
                    onChange={(e) =>
                      setTahrirImkoniyat({
                        ...tahrirImkoniyat,
                        kontakt: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-qiymat">Qiymat ($)</Label>
                  <Input
                    id="edit-qiymat"
                    type="number"
                    value={tahrirImkoniyat.qiymat}
                    onChange={(e) =>
                      setTahrirImkoniyat({
                        ...tahrirImkoniyat,
                        qiymat: Number.parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit-bosqich">Bosqich</Label>
                  <Select
                    value={tahrirImkoniyat.bosqich}
                    onValueChange={(value: any) =>
                      setTahrirImkoniyat({ ...tahrirImkoniyat, bosqich: value })
                    }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lead">Lid</SelectItem>
                      <SelectItem value="qualified">Saralangan</SelectItem>
                      <SelectItem value="proposal">Taklif</SelectItem>
                      <SelectItem value="negotiation">Muzokara</SelectItem>
                      <SelectItem value="closed-won">Yutildi</SelectItem>
                      <SelectItem value="closed-lost">Yutqazildi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-ehtimollik">Ehtimollik (%)</Label>
                  <Input
                    id="edit-ehtimollik"
                    type="number"
                    min="0"
                    max="100"
                    value={tahrirImkoniyat.ehtimollik}
                    onChange={(e) =>
                      setTahrirImkoniyat({
                        ...tahrirImkoniyat,
                        ehtimollik: Number.parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-tugashSanasi">Yakunlanish sanasi</Label>
                  <Input
                    id="edit-tugashSanasi"
                    type="date"
                    value={tahrirImkoniyat.tugashSanasi}
                    onChange={(e) =>
                      setTahrirImkoniyat({
                        ...tahrirImkoniyat,
                        tugashSanasi: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-manba">Manba</Label>
                <Input
                  id="edit-manba"
                  value={tahrirImkoniyat.manba}
                  onChange={(e) =>
                    setTahrirImkoniyat({
                      ...tahrirImkoniyat,
                      manba: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-izoh">Izoh</Label>
                <Textarea
                  id="edit-izoh"
                  value={tahrirImkoniyat.izoh}
                  onChange={(e) =>
                    setTahrirImkoniyat({
                      ...tahrirImkoniyat,
                      izoh: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={imkoniyatYangilash}>Imkoniyatni yangilash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
