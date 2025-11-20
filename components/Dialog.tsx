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
      <h1 className="text-2xl text-center font-bold mb-4">github roaster</h1>
      <img
        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXJvNmpnOXAyZnpzMWRhbTF1eXhmbWxpOGp6c2VzenFieWMyNjd4eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/h4Z3uD0PHWh1KZZ6M1/giphy.gif"
        alt="Roast animation"
        className="w-full rounded-lg mb-4"
      />
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
          ? "cooking roast... that desperate to get roasted?"
          : "roast me"}
      </button>

      {roast && <p className="mt-4 whitespace-pre-line">{roast}</p>}
    </main>
  );
}
