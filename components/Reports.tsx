/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LwWBFzJHOhD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState, useMemo, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarDaysIcon, Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function Reports() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2023-06-01",
      amount: 100.0,
      description: "Groceries",
      category: "Food",
    },
    {
      id: 2,
      date: "2023-06-02",
      amount: 50.0,
      description: "Utilities",
      category: "Bills",
    },
    {
      id: 3,
      date: "2023-06-03",
      amount: 75.0,
      description: "Dining",
      category: "Food",
    },
    {
      id: 4,
      date: "2023-06-04",
      amount: 25.0,
      description: "Entertainment",
      category: "Leisure",
    },
    {
      id: 5,
      date: "2023-06-05",
      amount: 150.0,
      description: "Travel",
      category: "Transportation",
    },
    {
      id: 6,
      date: "2023-06-06",
      amount: 80.0,
      description: "Shopping",
      category: "Shopping",
    },
    {
      id: 7,
      date: "2023-06-07",
      amount: 30.0,
      description: "Fuel",
      category: "Transportation",
    },
    {
      id: 8,
      date: "2023-06-08",
      amount: 120.0,
      description: "Medical",
      category: "Health",
    },
    {
      id: 9,
      date: "2023-06-09",
      amount: 40.0,
      description: "Subscription",
      category: "Bills",
    },
    {
      id: 10,
      date: "2023-06-10",
      amount: 90.0,
      description: "Miscellaneous",
      category: "Other",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filterDate, setFilterDate] = useState({ start: "", end: "" });
  const [filterAmount, setFilterAmount] = useState({ min: "", max: "" });
  const [filterDescription, setFilterDescription] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const categories = [
      { value: "", label: "All" },
      { value: "Food", label: "Food" },
      { value: "Bills", label: "Bills" },
      { value: "Leisure", label: "Leisure" },
      { value: "Transportation", label: "Transportation" },
      { value: "Shopping", label: "Shopping" },
      { value: "Health", label: "Health" },
      { value: "Other", label: "Other" },
    ];

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const dateMatch = filterDate.start
        ? new Date(transaction.date) >= new Date(filterDate.start) &&
          new Date(transaction.date) <= new Date(filterDate.end)
        : true;
      const amountMatch = filterAmount.min
        ? transaction.amount >= parseFloat(filterAmount.min) &&
          transaction.amount <= parseFloat(filterAmount.max)
        : true;
      const descriptionMatch = filterDescription
        ? transaction.description
            .toLowerCase()
            .includes(filterDescription.toLowerCase())
        : true;
      const categoryMatch = filterCategory
        ? transaction.category.toLowerCase() === filterCategory.toLowerCase()
        : true;
      return dateMatch && amountMatch && descriptionMatch && categoryMatch;
    });
  }, [
    transactions,
    filterDate,
    filterAmount,
    filterDescription,
    filterCategory,
  ]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleDateFilter = (start, end) => {
    setFilterDate({ start, end });
    setCurrentPage(1);
  };
  const handleAmountFilter = (min, max) => {
    setFilterAmount({ min, max });
    setCurrentPage(1);
  };
  const handleDescriptionFilter = (description) => {
    setFilterDescription(description);
    setCurrentPage(1);
  };
  const handleCategoryFilter = (category) => {
    setFilterCategory(category);
    setCurrentPage(1);
  };
  const handleDownload = () => {
    console.log("Downloading report...");
  };

   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await fetch(`http://localhost:3000/api/get-reports`);
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
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Transaction Report</h1>
        <p className="text-muted-foreground">
          View and filter your recent transactions.
        </p>
      </div>
      <div className="bg-card rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="date-range">Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start font-normal"
                  >
                    {filterDate.start && filterDate.end
                      ? `${filterDate.start} - ${filterDate.end}`
                      : "Select date range"}
                    <div className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    onSelect={(range) =>
                      handleDateFilter(range.start, range.end)
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="amount-range">Amount Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id="amount-min"
                  type="number"
                  placeholder="Min"
                  value={filterAmount.min}
                  onChange={(e) =>
                    handleAmountFilter(e.target.value, filterAmount.max)
                  }
                />
                <Input
                  id="amount-max"
                  type="number"
                  placeholder="Max"
                  value={filterAmount.max}
                  onChange={(e) =>
                    handleAmountFilter(filterAmount.min, e.target.value)
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                placeholder="Search description"
                value={filterDescription}
                onChange={(e) => handleDescriptionFilter(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              {/* <Select
                id="category"
                value={filterCategory}
                onValueChange={(e) => handleCategoryFilter(e.target.value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem
                    value="Food"
                    onClick={() => handleCategoryFilter("Food")}
                  >
                    Food
                  </SelectItem>
                  <SelectItem
                    value="Bills"
                    onClick={() => handleCategoryFilter("Bills")}
                  >
                    Bills
                  </SelectItem>
                  <SelectItem
                    value="Leisure"
                    onClick={() => handleCategoryFilter("Leisure")}
                  >
                    Leisure
                  </SelectItem>
                  <SelectItem
                    value="Transportation"
                    onClick={() => handleCategoryFilter("Transportation")}
                  >
                    Transportation
                  </SelectItem>
                  <SelectItem
                    value="Shopping"
                    onClick={() => handleCategoryFilter("Shopping")}
                  >
                    Shopping
                  </SelectItem>
                  <SelectItem
                    value="Health"
                    onClick={() => handleCategoryFilter("Health")}
                  >
                    Health
                  </SelectItem>
                  <SelectItem
                    value="Other"
                    onClick={() => handleCategoryFilter("Other")}
                  >
                    Other
                  </SelectItem>
                </SelectContent>
              </Select> */}
              {/* <Select
                id="category"
                value={filterCategory}
                onValueChange={(e) => handleCategoryFilter(e.target.value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                      onClick={() => handleCategoryFilter(category.value)}
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-muted-foreground">
            Showing {indexOfFirstItem + 1} to {indexOfLastItem} of{" "}
            {filteredTransactions.length} transactions
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "primary" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button onClick={handleDownload}>Download Report</Button>
      </div>
    </div>
  );
}

function ChevronLeftIcon(props) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props) {
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
      <path d="m9 18 6-6-6-6" />
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
