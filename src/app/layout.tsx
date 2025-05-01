import type { Metadata } from "next";
import { Noto_Sans_KR, Sunflower } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const sunflower = Sunflower({
  variable: "--font-sunflower",
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

export const metadata: Metadata = {
  title: "우성 & 태린, 결혼합니다",
  description: "2025년 5월 31일 토요일 오후 4시 40분, 세인트메리엘 2F",
  authors: [{ name: "신우성 & 김태린" }],
  keywords: ["결혼", "청첩장", "웨딩", "신우성", "김태린", "세인트메리엘"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${notoSansKr.variable} ${sunflower.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
