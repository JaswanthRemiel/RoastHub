"use client";

import { useState } from "react";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoast = async () => {
    setLoading(true);
    setRoast("");

    try {
      const res = await fetch("https://api.remiel.work/roasthub/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (data.roast) {
        setRoast(data.roast);
      } else {
        setRoast("Could not generate roast.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setRoast(`Error: ${error.message}`);
      } else {
        setRoast("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-md mx-auto align-center">
      <h1 className="text-2xl text-center font-bold mb-4">roast me pls</h1>
      <input
        className="border text-center rounded-lg p-2 w-full mb-2"
        placeholder="enter github username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button
        onClick={handleRoast}
        className="bg-black text-white px-4 py-2 rounded w-full"
        disabled={loading || !username}
      >
        {loading
          ? "Cooking roast... that desperate to get roasted?"
          : "roast me"}
      </button>

      {roast && <p className="mt-4 whitespace-pre-line">{roast}</p>}
    </main>
  );
}
