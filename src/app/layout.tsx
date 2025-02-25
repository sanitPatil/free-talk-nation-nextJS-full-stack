"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/AuthContext/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import store from "@/store/Store";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "Free Talk x",
  description: "home page ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <AuthProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} bg-gray-800 `}
          >
            <main className="text-white min-w-screen  min-h-screen">
              <Navbar />
              {children}
            </main>
            <Toaster />

            <footer className="bg-gray-900 text-white py-6">
              <div className="container mx-auto text-center">
                <p className="text-sm font-semibold">
                  &copy; 2025 FreeTalk x. All rights reserved.
                </p>
              </div>
            </footer>
          </body>
        </AuthProvider>
      </Provider>
    </html>
  );
}
