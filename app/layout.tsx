import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ModalProvider } from "./providers/modal-provider";
 import { Toaster } from "react-hot-toast";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "K Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ModalProvider/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  )
}
