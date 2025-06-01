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
  MessageCircle,
  Clock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

interface Ticket {
  id: number;
  title: string;
  description: string;
  customer: string;
  email: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  assignee: string;
  created: string;
  updated: string;
  category: string;
}

const mockTickets: Ticket[] = [
  {
    id: 1,
    title: "Kirish muammolari",
    description:
      "Boshqaruv paneliga kirib bo‘lmayapti. Autentifikatsiya xatosi chiqmoqda.",
    customer: "Jahongir Sodiqov",
    email: "jahongir@acme.com",
    status: "in-progress",
    priority: "high",
    assignee: "Sarvinoz Jo‘raeva",
    created: "2024-01-15",
    updated: "2024-01-15",
    category: "Autentifikatsiya",
  },
  {
    id: 2,
    title: "Yangi imkoniyat: Ma'lumotlarni eksport qilish",
    description:
      "Mijoz ma'lumotlarini CSV formatda eksport qilish imkoniyati kerak.",
    customer: "Dilnoza Qodirova",
    email: "dilnoza@innovate.com",
    status: "open",
    priority: "medium",
    assignee: "Murodjon Karimov",
    created: "2024-01-14",
    updated: "2024-01-14",
    category: "Yangi imkoniyat",
  },
  {
    id: 3,
    title: "To‘lov jarayonida xato",
    description: "Kredit karta orqali to‘lov amalga oshmayapti.",
    customer: "Sarvar Tursunov",
    email: "sarvar@futuresoft.com",
    status: "resolved",
    priority: "urgent",
    assignee: "Lisa Chen",
    created: "2024-01-13",
    updated: "2024-01-15",
    category: "To‘lov",
  },
  {
    id: 4,
    title: "Panel sekin yuklanmoqda",
    description:
      "Boshqaruv paneli, ayniqsa hisobotlar bo‘limi juda sekin ochiladi.",
    customer: "Murod Karimov",
    email: "murod@techstart.com",
    status: "open",
    priority: "low",
    assignee: "Tom Anderson",
    created: "2024-01-12",
    updated: "2024-01-12",
    category: "Tezlik",
  },
];

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    customer: "",
    email: "",
    priority: "medium" as const,
    category: "",
    assignee: "",
  });

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || ticket.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || ticket.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, searchTerm, statusFilter, priorityFilter]);

  const ticketStats = {
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in-progress").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
    urgent: tickets.filter((t) => t.priority === "urgent").length,
  };

  const handleAddTicket = () => {
    if (newTicket.title && newTicket.customer) {
      const ticket: Ticket = {
        id: Math.max(...tickets.map((t) => t.id)) + 1,
        ...newTicket,
        status: "open",
        created: new Date().toISOString().split("T")[0],
        updated: new Date().toISOString().split("T")[0],
      };
      setTickets([...tickets, ticket]);
      setNewTicket({
        title: "",
        description: "",
        customer: "",
        email: "",
        priority: "medium",
        category: "",
        assignee: "",
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditTicket = (ticket: Ticket) => {
    setEditingTicket(ticket);
  };

  const handleUpdateTicket = () => {
    if (editingTicket) {
      const updatedTicket = {
        ...editingTicket,
        updated: new Date().toISOString().split("T")[0],
      };
      setTickets(
        tickets.map((t) => (t.id === editingTicket.id ? updatedTicket : t))
      );
      setEditingTicket(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-red-100 text-red-800">Ochiq</Badge>;
      case "in-progress":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Jarayonda</Badge>
        );
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Yechildi</Badge>;
      case "closed":
        return <Badge variant="secondary">Yopilgan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Zudlik bilan</Badge>;
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">Yuqori</Badge>;
      case "medium":
        return <Badge className="bg-blue-100 text-blue-800">O‘rta</Badge>;
      case "low":
        return <Badge variant="outline">Past</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
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
                <span className="text-white text-sm font-medium">JD</span>
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
              className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Savdo
            </Link>
            <Link
              href="/support"
              className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600">
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
          {/* Support Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ochiq so‘rovlar
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ticketStats.open}</div>
                <p className="text-xs text-muted-foreground">Javob kutmoqda</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jarayonda</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {ticketStats.inProgress}
                </div>
                <p className="text-xs text-muted-foreground">Ish jarayonida</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Yechilgan</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ticketStats.resolved}</div>
                <p className="text-xs text-muted-foreground">Bu hafta</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Zudlik bilan
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {ticketStats.urgent}
                </div>
                <p className="text-xs text-muted-foreground">
                  E'tibor talab qiladi
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Qo‘llab-quvvatlash so‘rovlari</CardTitle>
                  <CardDescription>
                    Mijoz so‘rov va muammolarini boshqaring
                  </CardDescription>
                </div>
                <Dialog
                  open={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      So‘rov yaratish
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Yangi so‘rov yaratish</DialogTitle>
                      <DialogDescription>
                        Yangi qo‘llab-quvvatlash so‘rovi uchun quyidagi
                        ma'lumotlarni kiriting.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="title">Sarlavha</Label>
                          <Input
                            id="title"
                            value={newTicket.title}
                            onChange={(e) =>
                              setNewTicket({
                                ...newTicket,
                                title: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="customer">Mijoz</Label>
                          <Input
                            id="customer"
                            value={newTicket.customer}
                            onChange={(e) =>
                              setNewTicket({
                                ...newTicket,
                                customer: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newTicket.email}
                            onChange={(e) =>
                              setNewTicket({
                                ...newTicket,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Kategoriya</Label>
                          <Input
                            id="category"
                            value={newTicket.category}
                            onChange={(e) =>
                              setNewTicket({
                                ...newTicket,
                                category: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="priority">Muhimlik darajasi</Label>
                          <Select
                            value={newTicket.priority}
                            onValueChange={(value: any) =>
                              setNewTicket({ ...newTicket, priority: value })
                            }>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Past</SelectItem>
                              <SelectItem value="medium">O‘rta</SelectItem>
                              <SelectItem value="high">Yuqori</SelectItem>
                              <SelectItem value="urgent">
                                Zudlik bilan
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="assignee">Mas'ul</Label>
                          <Input
                            id="assignee"
                            value={newTicket.assignee}
                            onChange={(e) =>
                              setNewTicket({
                                ...newTicket,
                                assignee: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="description">Tavsif</Label>
                        <Textarea
                          id="description"
                          value={newTicket.description}
                          onChange={(e) =>
                            setNewTicket({
                              ...newTicket,
                              description: e.target.value,
                            })
                          }
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddTicket}>So‘rov yaratish</Button>
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
                    placeholder="So‘rovlarni qidiring..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Holat bo‘yicha filtrlash" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha holatlar</SelectItem>
                    <SelectItem value="open">Ochiq</SelectItem>
                    <SelectItem value="in-progress">Jarayonda</SelectItem>
                    <SelectItem value="resolved">Yechilgan</SelectItem>
                    <SelectItem value="closed">Yopilgan</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={priorityFilter}
                  onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Muhimlik bo‘yicha filtrlash" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha darajalar</SelectItem>
                    <SelectItem value="urgent">Zudlik bilan</SelectItem>
                    <SelectItem value="high">Yuqori</SelectItem>
                    <SelectItem value="medium">O‘rta</SelectItem>
                    <SelectItem value="low">Past</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tickets Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>So‘rov</TableHead>
                    <TableHead>Mijoz</TableHead>
                    <TableHead>Holat</TableHead>
                    <TableHead>Muhimlik</TableHead>
                    <TableHead>Mas'ul</TableHead>
                    <TableHead>Yaratilgan</TableHead>
                    <TableHead>Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{ticket.title}</div>
                          <div className="text-sm text-gray-500">
                            {ticket.category}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{ticket.customer}</div>
                          <div className="text-sm text-gray-500">
                            {ticket.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell>{ticket.assignee}</TableCell>
                      <TableCell>{ticket.created}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditTicket(ticket)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Edit Ticket Dialog */}
      <Dialog
        open={!!editingTicket}
        onOpenChange={() => setEditingTicket(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>So‘rovni tahrirlash</DialogTitle>
            <DialogDescription>
              So‘rov tafsilotlarini yangilang.
            </DialogDescription>
          </DialogHeader>
          {editingTicket && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">Sarlavha</Label>
                  <Input
                    id="edit-title"
                    value={editingTicket.title}
                    onChange={(e) =>
                      setEditingTicket({
                        ...editingTicket,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-customer">Mijoz</Label>
                  <Input
                    id="edit-customer"
                    value={editingTicket.customer}
                    onChange={(e) =>
                      setEditingTicket({
                        ...editingTicket,
                        customer: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-status">Holat</Label>
                  <Select
                    value={editingTicket.status}
                    onValueChange={(value: any) =>
                      setEditingTicket({ ...editingTicket, status: value })
                    }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Ochiq</SelectItem>
                      <SelectItem value="in-progress">Jarayonda</SelectItem>
                      <SelectItem value="resolved">Yechilgan</SelectItem>
                      <SelectItem value="closed">Yopilgan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-priority">Muhimlik darajasi</Label>
                  <Select
                    value={editingTicket.priority}
                    onValueChange={(value: any) =>
                      setEditingTicket({ ...editingTicket, priority: value })
                    }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Past</SelectItem>
                      <SelectItem value="medium">O‘rta</SelectItem>
                      <SelectItem value="high">Yuqori</SelectItem>
                      <SelectItem value="urgent">Zudlik bilan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-assignee">Mas'ul</Label>
                  <Input
                    id="edit-assignee"
                    value={editingTicket.assignee}
                    onChange={(e) =>
                      setEditingTicket({
                        ...editingTicket,
                        assignee: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category">Kategoriya</Label>
                  <Input
                    id="edit-category"
                    value={editingTicket.category}
                    onChange={(e) =>
                      setEditingTicket({
                        ...editingTicket,
                        category: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-description">Tavsif</Label>
                <Textarea
                  id="edit-description"
                  value={editingTicket.description}
                  onChange={(e) =>
                    setEditingTicket({
                      ...editingTicket,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdateTicket}>So‘rovni yangilash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
