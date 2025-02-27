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
    <div className="w-full ">
      <div className=" w-full ">
        {searchResults.length > 0 && (
          <ul className=" w-full mt-2 bg-gray-700 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
            {searchResults.map((result, index) => (
              <li
                key={index}
                className="px-2 py-2 text-white cursor-pointer hover:bg-gray-800 transition-all"
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
