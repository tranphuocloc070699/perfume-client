import type { Metadata } from "next";
import { Montserrat, Merriweather_Sans } from "next/font/google";
import "../styles/global.css";
import { Toaster } from "@/components/ui/toaster";
import LayoutProvider from "@/components/common/layout-provider";
import SessionProvider from "@/components/common/SessionProvider";


const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat"
});
const merriweather = Merriweather_Sans({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-merriweather"
});

export const metadata: Metadata = {
  title: "Cộng đồng nước hoa",
  description: "Generated by create next app"
};
export default function RootLayout({
                                     children
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` ${merriweather.variable} ${montserrat.variable}`}>
    <body suppressHydrationWarning={true}>
    <Toaster />
    <SessionProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </SessionProvider>
    </body>
    </html>
  );
}
