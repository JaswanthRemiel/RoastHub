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
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">GitHub Profile Roaster</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button
        onClick={handleRoast}
        className="bg-black text-white px-4 py-2 rounded w-full"
        disabled={loading || !username}
      >
        {loading ? "Cooking roast..." : "Roast me"}
      </button>

      {roast && <p className="mt-4 whitespace-pre-line">{roast}</p>}
    </main>
  );
}
