import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Tutorly - Premium Online Tutoring for Academic Excellence",
  description: "Expert one-on-one and small group tutoring sessions designed to help students excel. Personalized learning, flexible scheduling, and proven results.",
  keywords: "tutoring, online tutoring, academic help, homework help, test prep, math tutor, science tutor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
