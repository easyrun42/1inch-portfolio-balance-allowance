'use client'
import React, { useState } from "react";

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <main className="bg-primary min-h-screen">
      <h2>hey</h2>
      <div className="relative">
        <input
          type="text"
          id="myInput"
          className={`block w-full py-2 px-4 placeholder-transparent border border-gray-300 rounded-md focus:outline-none ${
            isFocused ? "bg-white shadow" : ""
          }`}
          placeholder=" "
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <label
          htmlFor="myInput"
          className={`absolute transition-all duration-300 ${
            isFocused
              ? "top-0 left-4 text-black text-sm"
              : "top-2 left-4 text-gray-500"
          }`}
        >
          Placeholder Text
        </label>
      </div>
    </main>
  );
}
