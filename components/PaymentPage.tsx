"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function PaymentPage() {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");

  const handleDepositPayment = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3005/deposit", {
        amount,
        email,
      });

      // Extract the URL from the response
      const { authorization_url } = response.data.data;

      if (authorization_url) {
        // Redirect the user to the authorization URL
        window.location.href = authorization_url;
      } else {
        console.error("Authorization URL not found in response");
      }
    } catch (error: any) {
      console.error("Deposit payment failed", error);
    }
  };

  const handleWithdrawalPayment = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://bank-payment-server.onrender.com/users/signup",
        {
          amount,
          email,
        }
      );
      const token = response.data.token;
      // localStorage.setItem("token", token);
      console.log(response.data);
      // router.push("/"); // Redirect after successful registration
    } catch (error: any) {
      console.error("Withdrawal payment failed", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto p-4 md:p-8">
      <div className="bg-card rounded-lg p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Payment</h2>
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            Balance: $5,234.00
          </div>
        </div>
        <div className="bg-card-foreground rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-muted-foreground text-sm">Card Number</div>
            <div className="text-lg font-medium">**** **** **** 1234</div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-muted-foreground text-sm">Expiration</div>
            <div className="text-lg font-medium">12/24</div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-muted-foreground text-sm">CVV</div>
            <div className="text-lg font-medium">123</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground text-sm">Cardholder</div>
            <div className="text-lg font-medium">John Doe</div>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Make a Payment</h2>
        <form className="space-y-6" onSubmit={handleDepositPayment}>
          <div>
            <label
              htmlFor="amount"
              className="block text-muted-foreground text-sm font-medium mb-2"
            >
              Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-muted-foreground">$</span>
              </div>
              <input
                id="amount"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full pl-7 pr-12 sm:text-sm rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                placeholder="0.00"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-muted-foreground text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full sm:text-sm rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
              placeholder="Enter your email"
            />
          </div>
          <Button type="submit" className="w-full">
            Pay Now
          </Button>
        </form>
      </div>
    </div>
  );
}
