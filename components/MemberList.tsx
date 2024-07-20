/**
 * v0 by Vercel.
 * @see https://v0.dev/t/j2fEyrPrHq8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MemberList() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10);
  const [editingMember, setEditingMember] = useState(null);

  const members = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      accountNumber: "12345678",
      balance: 5000.0,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      accountNumber: "87654321",
      balance: 10000.0,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      accountNumber: "13579086",
      balance: 2500.0,
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      accountNumber: "24680135",
      balance: 7500.0,
    },
    {
      id: 5,
      name: "Tom Brown",
      email: "tom.brown@example.com",
      accountNumber: "97531824",
      balance: 1000.0,
    },
    {
      id: 6,
      name: "Sarah Davis",
      email: "sarah.davis@example.com",
      accountNumber: "86420197",
      balance: 15000.0,
    },
    {
      id: 7,
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      accountNumber: "75312468",
      balance: 3000.0,
    },
    {
      id: 8,
      name: "Emily Taylor",
      email: "emily.taylor@example.com",
      accountNumber: "64197532",
      balance: 9000.0,
    },
    {
      id: 9,
      name: "David Anderson",
      email: "david.anderson@example.com",
      accountNumber: "53864197",
      balance: 4500.0,
    },
    {
      id: 10,
      name: "Olivia Martinez",
      email: "olivia.martinez@example.com",
      accountNumber: "42197531",
      balance: 12000.0,
    },
    {
      id: 11,
      name: "Daniel Hernandez",
      email: "daniel.hernandez@example.com",
      accountNumber: "31975864",
      balance: 6000.0,
    },
    {
      id: 12,
      name: "Isabella Diaz",
      email: "isabella.diaz@example.com",
      accountNumber: "20864197",
      balance: 8500.0,
    },
  ];

  const handleEditCustomer = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "https://bank-payment-server.onrender.com/users/update"
        // {
        //   userid: fullName,
        //   email: email,
        //   password: password,
        //   bankType: bankType, // Include bankType in the request
        // }
      );
      const token = response.data.token;
      // localStorage.setItem("token", token);
      console.log(response.data);
      // router.push("/"); // Redirect after successful registration
    } catch (error: any) {
      console.error("Sign-up failed", error);
    }
  };

  const handleDeleteCustomer = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "https://bank-payment-server.onrender.com/users/delete"
        // {
        //   userid: fullName,
        //   email: email,
        //   password: password,
        //   bankType: bankType, // Include bankType in the request
        // }
      );
      const token = response.data.token;
      // localStorage.setItem("token", token);
      console.log(response.data);
      // router.push("/"); // Redirect after successful registration
    } catch (error: any) {
      console.error("Sign-up failed", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/member-list`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);

        //  setFetchedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    (async () => await fetchData())();
  }, []);

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleEdit = (member) => {
    setEditingMember(member);
  };
  const handleSave = (updatedMember) => {
    const updatedMembers = members.map((m) =>
      m.id === updatedMember.id ? updatedMember : m
    );
    setMembers(updatedMembers);
    setEditingMember(null);
  };
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bank Members</h1>
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Account Number</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentMembers.map((member) => (
              <TableRow key={member.id}>
                {editingMember?.id === member.id ? (
                  <>
                    <TableCell>
                      <Input
                        type="text"
                        defaultValue={member.name}
                        onChange={(e) =>
                          setEditingMember({
                            ...editingMember,
                            name: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="email"
                        defaultValue={member.email}
                        onChange={(e) =>
                          setEditingMember({
                            ...editingMember,
                            email: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        defaultValue={member.accountNumber}
                        onChange={(e) =>
                          setEditingMember({
                            ...editingMember,
                            accountNumber: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        defaultValue={member.balance}
                        onChange={(e) =>
                          setEditingMember({
                            ...editingMember,
                            balance: parseFloat(e.target.value),
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSave(editingMember)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingMember(null)}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.accountNumber}</TableCell>
                    <TableCell>${member.balance.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(member)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-6 flex justify-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
