import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/layout/SideBar";
import TopBar from "@/components/layout/TopBar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "POS Application",
  description: "Created by Mohanasudhan to practice Next.js"
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
       
    >
      <body className={inter.className} >
        <div className="layout">
          <SideBar/>
          <main className="content">
            <TopBar/>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
