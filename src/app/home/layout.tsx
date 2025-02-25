"use client";
import Nav1 from "@/components/Nav1";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main className="w-full h-full flex">
        <Nav1 />
        <div className="w-full bg-black">{children}</div>
      </main>
    </div>
  );
}
