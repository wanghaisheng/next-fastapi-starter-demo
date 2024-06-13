"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "./store";
import axios from "axios"; // Import Axios library

const Ahref = () => {
  const [keywords, setKeywords] = useState("");
  const { ahrefData, ahrefError } = useStore(); // Access state directly
  const fetchAhrefs = useStore.getState().fetchAhrefs; // Access the
  useEffect(() => {
    if (keywords) {
      fetchAhrefs(keywords); // Call the action with the selected keywords
    }
  }, [keywords]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Construct API URL dynamically based on environment
    const URL = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
      : "http://localhost:8000/api";

    // Make HTTP request to backend API
    try {
      const response = await axios.get(`${URL}/ahref/kd/${keywords}`);
      // Assuming your backend response contains keyword, kd, and des properties
      console.log(response.data);
      // Handle response data as required
    } catch (error) {
      // Handle error
      console.error("Error fetching Ahref data:", error);
    }
    // Optionally clear keywords if you want to prevent resubmission
    setKeywords("");
  };

  return (
    <div>
      {" "}
      {/* Parent element wrapping all other elements */}
      <form onSubmit={handleSubmit}>{/* ... form inputs and button */}</form>
      {ahrefError && <div className="error">Error: {ahrefError}</div>}
      {ahrefData && ahrefData.length > 0 && (
        <div>
          {/* Render the Ahrefs data */}
          {ahrefData.map((data, index) => (
            <div key={data.id}>{data.yourProperty}</div> // Replace with actual property
          ))}
        </div>
      )}
    </div>
  );
};

export default Ahref;
