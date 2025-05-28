import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Oxanium } from "next/font/google";  // Import Oxanium font
import {dark} from '@clerk/themes'
import {
  ClerkProvider,
  
} from '@clerk/nextjs'

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
const oxanium = Oxanium({
  variable: "--font-oxanium",  // Use custom variable name
  subsets: ["latin"],
});
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });


export const metadata: Metadata = {
  title: "PresentAI - AI-Powered Presentation Builder",
  description:
    "Create stunning presentations in seconds with AI. Transform your ideas into professional slides effortlessly.",
  keywords: "AI presentations, presentation builder, AI slides, automatic presentations",
  openGraph: {
    title: "PresentAI - AI-Powered Presentation Builder",
    description: "Create stunning presentations in seconds with AI",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      baseTheme:dark,
    }}>

    <html lang="en" suppressHydrationWarning>
      <body
        className=
        {`${oxanium.variable} antialiased`}
      >

<ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            
            >
        {children}

        </ThemeProvider>
        <Toaster/>
      </body>
    </html>
            </ClerkProvider>
  );
}
