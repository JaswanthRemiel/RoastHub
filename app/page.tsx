"use client";
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <span>Your Github ID:</span>
      <textarea
        id="textarea1"
        placeholder="Enter your id here"
        className="text-white"
      ></textarea>
    </div>
  );
}
