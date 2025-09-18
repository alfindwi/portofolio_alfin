import { Navbar } from "@/components/navbar";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
});




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`scroll-smooth ${spaceGrotesk.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
