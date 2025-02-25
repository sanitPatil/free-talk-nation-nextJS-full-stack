import { Contact, Home, Info, Settings2, User } from "lucide-react";
import Link from "next/link";
import React from "react";

function Nav1() {
  const options = [
    { title: "Home", icon: <Home />, link: "/home" },
    { title: "Profile", icon: <User />, link: "/profile" },
    { title: "Settings", icon: <Settings2 />, link: "/settings" },
    { title: "Contact", icon: <Contact />, link: "/contact" },
    { title: "About", icon: <Info />, link: "/about" },
  ];

  return (
    <nav className="bg-gray-900/50 backdrop-blur-md w-40 h-screen p-4 shadow-md ">
      <ul className="flex flex-col space-y-12">
        {options.map((option) => (
          <li
            key={option.title}
            className="flex items-center space-x-2 text-white font-bold text-lg hover:text-gray-300"
          >
            {option.icon}
            <Link href={option.link}>{option.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav1;
