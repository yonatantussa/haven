import localFont from "next/font/local";
import "./globals.css";
import { Poppins } from 'next/font/google';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '900'],  // Include the weights you need
  variable: '--font-poppins',
});

export const metadata = {
  title: "Haven - Connecting Help and Need",
  description: "A platform connecting those in need with those who can help.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
