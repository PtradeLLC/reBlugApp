"use client";
import Hero from "@/components/Hero";
import HomeComponent from "@/components/HomeComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="grid w-full max-w-screen-xl grid-cols-1 justify-between px-2 lg:px-2">
        <div>
          <HomeComponent />
        </div>
      </div>
    </main>
  );
}
