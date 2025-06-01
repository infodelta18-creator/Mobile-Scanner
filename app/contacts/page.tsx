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
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Mail,
  Phone,
  Building,
} from "lucide-react";
import Link from "next/link";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "active" | "inactive" | "prospect";
  lastContact: string;
  value: number;
}

const mockContacts: Contact[] = [
  {
    id: 1,
    name: "Akmal Raxmatov",
    email: "akmal@uzagro.uz",
    phone: "+998 (90) 123-45-67",
    company: "UzAgro",
    status: "active",
    lastContact: "2024-01-15",
    value: 25000,
  },
  {
    id: 2,
    name: "Dilnoza Islomova",
    email: "dilnoza@techhub.uz",
    phone: "+998 (91) 234-56-78",
    company: "TechHub Uzbekistan",
    status: "prospect",
    lastContact: "2024-01-14",
    value: 15000,
  },
  {
    id: 3,
    name: "Sherzod Karimov",
    email: "sherzod@globalsoft.uz",
    phone: "+998 (93) 345-67-89",
    company: "Global Soft",
    status: "active",
    lastContact: "2024-01-13",
    value: 45000,
  },
  {
    id: 4,
    name: "Ziyoda Nurmatova",
    email: "ziyoda@innovatsiya.uz",
    phone: "+998 (94) 456-78-90",
    company: "Innovatsiya Markazi",
    status: "inactive",
    lastContact: "2024-01-10",
    value: 8000,
  },
  {
    id: 5,
    name: "Jasur Bekmurodov",
    email: "jasur@kelajak.uz",
    phone: "+998 (95) 567-89-01",
    company: "Kelajak Tex",
    status: "active",
    lastContact: "2024-01-12",
    value: 32000,
  },
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "prospect" as const,
  });

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const matchesSearch =
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || contact.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [contacts, searchTerm, statusFilter]);

  const handleAddContact = () => {
    if (newContact.name && newContact.email) {
      const contact: Contact = {
        id: Math.max(...contacts.map((c) => c.id)) + 1,
        ...newContact,
        lastContact: new Date().toISOString().split("T")[0],
        value: 0,
      };
      setContacts([...contacts, contact]);
      setNewContact({
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "prospect",
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleUpdateContact = () => {
    if (editingContact) {
      setContacts(
        contacts.map((c) => (c.id === editingContact.id ? editingContact : c))
      );
      setEditingContact(null);
    }
  };

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Faol</Badge>;
      case "inactive":
        return <Badge variant="secondary">Faol emas</Badge>;
      case "prospect":
        return <Badge className="bg-blue-100 text-blue-800">Potensial</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
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
              className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600">
              Kontaktlar
            </Link>
            <Link
              href="/sales"
              className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Savdolar
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
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Kontaktlar</CardTitle>
                  <CardDescription>
                    Mijozlaringiz kontaktlari va munosabatlarini boshqaring
                  </CardDescription>
                </div>
                <Dialog
                  open={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Contact
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Yangi kontakt qo‘shish</DialogTitle>
                      <DialogDescription>
                        Kontakt maʼlumotlarini kiriting va CRM tizimiga
                        qo‘shing.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Ism
                        </Label>
                        <Input
                          id="name"
                          value={newContact.name}
                          onChange={(e) =>
                            setNewContact({
                              ...newContact,
                              name: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={newContact.email}
                          onChange={(e) =>
                            setNewContact({
                              ...newContact,
                              email: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                          Telefon
                        </Label>
                        <Input
                          id="phone"
                          value={newContact.phone}
                          onChange={(e) =>
                            setNewContact({
                              ...newContact,
                              phone: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="company" className="text-right">
                          Kompaniya
                        </Label>
                        <Input
                          id="company"
                          value={newContact.company}
                          onChange={(e) =>
                            setNewContact({
                              ...newContact,
                              company: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                          Holat
                        </Label>
                        <Select
                          value={newContact.status}
                          onValueChange={(value: any) =>
                            setNewContact({ ...newContact, status: value })
                          }>
                          <SelectTrigger className="col-span-3">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prospect">Potensial</SelectItem>
                            <SelectItem value="active">Faol</SelectItem>
                            <SelectItem value="inactive">Faol emas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddContact}>
                        Kontaktni qo‘shish
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
                    placeholder="Kontaktlarni qidiring..."
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
                    <SelectItem value="active">Faol</SelectItem>
                    <SelectItem value="prospect">Potensial</SelectItem>
                    <SelectItem value="inactive">Faol emas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contacts Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ism</TableHead>
                    <TableHead>Aloqa maʼlumoti</TableHead>
                    <TableHead>Kompaniya</TableHead>
                    <TableHead>Holat</TableHead>
                    <TableHead>Oxirgi aloqa</TableHead>
                    <TableHead>Qiymat</TableHead>
                    <TableHead>Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">
                        {contact.name}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1 text-gray-400" />
                            {contact.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="h-3 w-3 mr-1 text-gray-400" />
                            {contact.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-gray-400" />
                          {contact.company}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(contact.status)}</TableCell>
                      <TableCell>{contact.lastContact}</TableCell>
                      <TableCell>${contact.value.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditContact(contact)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteContact(contact.id)}>
                            <Trash2 className="h-3 w-3" />
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

      {/* Edit Contact Dialog */}
      <Dialog
        open={!!editingContact}
        onOpenChange={() => setEditingContact(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kontaktni tahrirlash</DialogTitle>
            <DialogDescription>
              Quyidagi kontakt maʼlumotlarini yangilang.
            </DialogDescription>
          </DialogHeader>
          {editingContact && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Ism
                </Label>
                <Input
                  id="edit-name"
                  value={editingContact.name}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingContact.email}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      email: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Telefon
                </Label>
                <Input
                  id="edit-phone"
                  value={editingContact.phone}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      phone: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-company" className="text-right">
                  Kompaniya
                </Label>
                <Input
                  id="edit-company"
                  value={editingContact.company}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      company: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Holat
                </Label>
                <Select
                  value={editingContact.status}
                  onValueChange={(value: any) =>
                    setEditingContact({ ...editingContact, status: value })
                  }>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prospect">Potensial</SelectItem>
                    <SelectItem value="active">Faol</SelectItem>
                    <SelectItem value="inactive">Faol emas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdateContact}>Kontaktni yangilash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
