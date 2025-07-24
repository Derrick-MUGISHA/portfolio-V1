// app/not-found.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const pathname = usePathname();

  // You can customize different 404 messages based on path here
  let message = "Sorry, the page you're looking for doesn't exist.";
  if (pathname.startsWith("/blog")) {
    message = "This blog post could not be found.";
  } else if (pathname.startsWith("/projects")) {
    message = "This project page does not exist.";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">{message}</h2>
      <p className="mb-4 text-gray-400">URL: <code className="text-sm">{pathname}</code></p>
      <Link href="/" className="text-blue-400 underline hover:text-blue-600">
        Go back home
      </Link>
    </div>
  );
}
