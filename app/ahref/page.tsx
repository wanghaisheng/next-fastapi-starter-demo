"use client";
import React, { useState, useEffect } from "react";
import { useAhrefsStore } from "./ahrefdata";

const Ahref = () => {
  const [keywords, setKeywords] = useState(""); // State to store the search keywords
  const { ahrefData, ahrefError, fetchAhrefs } = useAhrefsStore(); // Destructure state and actions

  // ... (other logic such as useEffect for fetching data)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (keywords) {
      fetchAhrefs(keywords); // Call the fetchAhrefs action with the entered keywords
    }
    setKeywords(""); // Optionally reset the keywords input after submission
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="keywords" className="sr-only">
          Enter Keywords:
        </label>
        <input
          id="keywords"
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Type keywords here"
          className="p-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {ahrefError && (
        <div className="text-red-600 mt-2">Error: {ahrefError}</div>
      )}

      {ahrefData && ahrefData.length > 0 && (
        <div className="mt-4">
          {ahrefData.map((data, index) => (
            <div
              key={`ahref_${index}`}
              className="border border-gray-300 p-2 mb-2 rounded-md"
            >
              {data.keyword} - KD: {data.kd} - Domain Authority: {data.des}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Ahref;
