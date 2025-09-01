"use client";

import { useSearchParams } from "next/navigation";
import Sidebar from "../components/Sidebar";
import ProfileContent from "../components/ProfileContent";
import { useState } from "react";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "User";

  const [activePage, setActivePage] = useState<"home" | "profile">("home");

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* Sidebar */}
      <Sidebar
        name={name}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        {activePage === "home" && (
          <h1 className="text-3xl font-bold">Welcome, {name}!</h1>
        )}
        {activePage === "profile" && <ProfileContent />}
      </div>
    </div>
  );
}
