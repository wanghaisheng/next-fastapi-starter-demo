"use client";
import React, { useState, useEffect } from "react";
import { useAhrefsStore } from "@/ahrefdata";

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
    <div>
      {/* Form for submitting search keywords */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="keywords">Enter Keywords:</label>
        <input
          id="keywords"
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Type keywords here"
        />
        <button type="submit">Search</button>
      </form>

      {ahrefError && <div className="error">Error: {ahrefError}</div>}

      {ahrefData && ahrefData.length > 0 && (
        <div>
          {/* Render the Ahrefs data */}
          {ahrefData.map((data, index) => {
            // Ensure you have a unique identifier for each data item
            const uniqueKey = `ahref_${index}`; // Replace with a more unique key if possible
            return (
              <div key={uniqueKey}>
                {/* Replace with the actual property you want to display */}
                {data.keyword} - KD: {data.kd} - Domain Authority: {data.des}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Ahref;
