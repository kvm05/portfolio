import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import Starfield from "../components/Starfield";
import Nav from "../components/Nav";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Kartik Menon — Software Engineer",
  description:
    "Portfolio of Kartik Menon, software engineer with experience in cloud infrastructure, full-stack development, and applied AI/ML.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable}`}>
      <body className="font-sans min-h-screen">
        <Starfield />
        <Nav />
        {children}
      </body>
    </html>
  );
}
