"use client";

// app/ahref.tsx
import React, { useState, useEffect } from 'react';
import { useStore } from "@/store";

const Ahref = () => {
  const [keywords, setKeywords] = useState('');
  const { ahrefData, ahrefError, fetchAhrefs } = useStore();

  useEffect(() => {
    if (keywords) {
      fetchAhrefs(keywords);
    }
  }, [keywords, fetchAhrefs]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Optionally clear keywords if you want to prevent resubmission
    setKeywords('');
  };

  return (
    // ... your JSX markup
    <form onSubmit={handleSubmit}>
      {/* ... form inputs and button */}
    </form>
    {ahrefError && <div className="error">Error: {ahrefError}</div>}
    {ahrefData && ahrefData.length > 0 && (
      <div>
        {/* Render the Ahrefs data */}
        {ahrefData.map((data, index) => (
          <div key={data.id}>{data.yourProperty}</div> // Replace with actual property
        ))}
      </div>
    )}
  );
};

export default Ahref;