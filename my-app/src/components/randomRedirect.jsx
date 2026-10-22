
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RandomRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Random delay between 5 and 15 seconds
    const delay = Math.floor(Math.random() * 1000) + 5000;

    const pages = [
      "/call",
    ];

    const timeout = setTimeout(() => {
      // Pick a random page
      const randomIndex = Math.floor(
        Math.random() * pages.length
      );

      router.push(pages[randomIndex]);
    }, delay);

    return () => clearTimeout(timeout);
  }, [router]);
}
