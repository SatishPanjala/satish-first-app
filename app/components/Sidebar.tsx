"use client";

import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline";

interface SidebarProps {
  name: string;
  activePage: "home" | "profile";
  setActivePage: React.Dispatch<React.SetStateAction<"home" | "profile">>;
}

export default function Sidebar({ name, activePage, setActivePage }: SidebarProps) {
  return (
    <div className="flex flex-col justify-between bg-white w-64 shadow-lg p-4 sticky top-0 h-screen">
      {/* Top buttons */}
      <div className="space-y-2">
        <button
          className={`flex items-center space-x-2 px-4 py-2 w-full rounded hover:bg-gray-100 ${
            activePage === "home" ? "bg-gray-200" : ""
          }`}
          onClick={() => setActivePage("home")}
        >
          <HomeIcon className="h-6 w-6 text-blue-500" />
          <span className="font-medium text-gray-800">Home</span>
        </button>
      </div>

      {/* Bottom user button */}
      <div>
        <button
          className={`flex items-center space-x-2 px-4 py-2 w-full rounded hover:bg-gray-100 ${
            activePage === "profile" ? "bg-gray-200" : ""
          }`}
          onClick={() => setActivePage("profile")}
        >
          <UserCircleIcon className="h-8 w-8 text-gray-500" />
          <span className="font-medium text-gray-800">{name}</span>
        </button>
      </div>
    </div>
  );
}
