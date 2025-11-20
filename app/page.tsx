"use client";
import Dialog from "@/components/Dialog";
import { RetroGrid } from "@/components/ui/retro-grid";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <RetroGrid />
      <Dialog />
    </main>
  );
}
