import Homepage from "./home-page";

export const metadata = {
  title: "Home | Derrick Mugisha",
  description:
    "Welcome to the portfolio of Derrick Mugisha, a creative software engineer focused on building beautiful digital solutions.",
  openGraph: {
    title: "DERRICK MUGISHA - Full Stack Developer & Designer",
    description:
      "Creative software engineer building sleek user interfaces and robust backend systems.",
    url: "https://derrickmugisha.vercel.app",
    siteName: "Derrick Mugisha Portfolio",
    images: [
      {
        url: "https://clone-15su.onrender.com/images/IMG-20231225-WA0019-removebg-preview__1_-removebg-preview.png",
        width: 1200,
        height: 630,
        alt: "Derrick Mugisha OG image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DERRICK MUGISHA - Full Stack Developer & Designer",
    description:
      "Creative software engineer building sleek user interfaces and robust backend systems.",
    images: ["https://clone-15su.onrender.com/images/IMG-20231225-WA0019-removebg-preview__1_-removebg-preview.png"],
    creator: "https://x.com/__derr1ck__?t=IwhvURRPQKJQTS4HEbCsHQ&s=09",
  },
};

export default function Home() {
  return <Homepage />;
}
