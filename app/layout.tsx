import type { Metadata } from "next/types";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ResponsiveNavigation from "@/components/responsive-navigation";
import LoadingScreen from "@/components/loading-screen";
import WhatsAppContact from "@/components/whatsapp-contact";
import ContentPress from "@/components/content-press";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DERRICK MUGISHA - Full Stack Software Developer",
  description:
    "Derrick Mugisha, a Full Stack Software Developer specializing in creating exceptional digital experiences.",
  metadataBase: new URL("https://derrickmugisha.vercel.app"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "DERRICK MUGISHA - Full Stack Software Developer",
    description:
      "Explore the portfolio of Derrick Mugisha – Developer, Designer, and Tech Visionary.",
    url: "https://derrickmugisha.vercel.app",
    siteName: "Derrick Mugisha Portfolio",
    images: [
      {
        url: "https://clone-15su.onrender.com/images/IMG-20231225-WA0019-removebg-preview__1_-removebg-preview.png",
        width: 1200,
        height: 630,
        alt: "Derrick Mugisha Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DERRICK MUGISHA - Full Stack Software Developer",
    description:
      "Explore the portfolio of Derrick Mugisha – Developer, Designer, and Tech Visionary.",
    images: ["/icons/derrick-icon.png"],
    creator: "https://x.com/__derr1ck__?t=IwhvURRPQKJQTS4HEbCsHQ&s=09",
  },
};

const isDarkMode = true;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>

      <body className={`${inter.className} bg-black text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme={isDarkMode ? "dark" : "light"}
          disableTransitionOnChange
        >
          <LoadingScreen />
          <ResponsiveNavigation />
          {children}
          <WhatsAppContact />
          {/* <ContentPress /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
