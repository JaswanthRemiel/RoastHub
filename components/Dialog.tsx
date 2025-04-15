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
      // Get GitHub user data
      const gitUserINFO = await fetch(
        `https://api.github.com/users/${username}`
      );
      if (!gitUserINFO.ok) throw new Error("GitHub user not found");

      const profile = await gitUserINFO.json();

      const prompt = `Roast this GitHub user based on their profile info:\n
        Name: ${profile.name || "N/A"}
        Bio: ${profile.bio || "N/A"}
        Public Repos: ${profile.public_repos}
        Followers: ${profile.followers}
        Following: ${profile.following}
        Company: ${profile.company || "N/A"}
        Be mean and show no mercy, strictly don't add disclaimer. Only roast should be present in the answer not anything like gimme the roast alone not anything else. TONE - Human`;

      // Call OpenRouter
      const roastRes = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer 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",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemma-3-12b-it:free",
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        }
      );

      const data = await roastRes.json();
      const roastText = data.choices[0].message.content;

      setRoast(roastText);
    } catch (error: any) {
      setRoast(`Error: ${error.message}`);
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
