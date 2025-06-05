import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import { Toaster } from "sonner";
import { Oxanium } from "next/font/google";  // Import Oxanium font
import {dark} from '@clerk/themes'
import {
  ClerkProvider,
  
} from '@clerk/nextjs'


const oxanium = Oxanium({
  variable: "--font-oxanium",  // Use custom variable name
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "PresentAI - AI-Powered Presentation Builder",
  description:
    "Create stunning presentations in seconds with AI. Transform your ideas into professional slides effortlessly.",

icons:{
  icon:"icon.ico",
}

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    
     appearance={{
        layout: {
      unsafe_disableDevelopmentModeWarnings: true,
    },
      baseTheme:dark,
    }}>

    <html lang="en" suppressHydrationWarning>
     <head>
      <link rel="shortcut icon" href="icon.ico" type="image/x-icon" />
     </head>
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
