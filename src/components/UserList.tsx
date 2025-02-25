"use client";
import { useState } from "react";

export default function SearchBar() {
  const [searchResults, setSearchResults] = useState([
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Emily Brown",
  ]);

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full ">
        {searchResults.length > 0 && (
          <ul className=" w-full mt-2 bg-transparent  backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
            {searchResults.map((result, index) => (
              <li
                key={index}
                className="px-4 py-2 text-white cursor-pointer hover:bg-gray-800/50 transition-all"
              >
                {result}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
