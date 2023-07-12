"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MyComponent = () => {
  const [response, setResponse] = useState("");

  const callAPI = async () => {
    try {
      const response = await fetch("/api/python");
      const data = await response.json();
      setResponse(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-24">
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="/api/python"
          target=""
          rel="noopener noreferrer"
        >
          By
          <Image
            src="/images/OtherVar.png"
            alt="Vercel Logo"
            className="dark:invert"
            width={200}
            height={42}
            priority
          />
          {" ForgedMart"}
        </a>
      </div>
    </main>
  );
};

export default MyComponent;
