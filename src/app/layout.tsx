import { Navbar } from "@/components/navbar";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import Script from "next/script";

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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-GXPJFPXH7D`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GXPJFPXH7D');
          `}
        </Script>
        <Navbar />
        {children}
        <div className="px-5 md:px-10 bg-[#0a090f]">
          <Footer />
        </div>
      </body>
    </html>
  );
}
