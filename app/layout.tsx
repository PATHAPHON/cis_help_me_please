import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/shared/contexts/AuthContext";
import { IncidentsProvider } from "@/shared/contexts/IncidentsContext";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CIS Help Me Please",
  description: "ระบบแจ้งเหตุฉุกเฉินภายในมหาวิทยาลัย",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1a73e8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${roboto.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className="min-h-dvh flex justify-center bg-[#f8f9fa]">
        <div className="w-full max-w-[480px] relative flex flex-col min-h-dvh bg-surface shadow-lg">
          <AuthProvider>
            <IncidentsProvider>
              {children}
            </IncidentsProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
