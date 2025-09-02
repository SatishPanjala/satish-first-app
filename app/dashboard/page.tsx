"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // adjust path if needed
import Sidebar from "../components/Sidebar";
import ProfileContent from "../components/ProfileContent";

export default function DashboardPage() {
  const [name, setName] = useState("User");
  const [activePage, setActivePage] = useState<"home" | "profile">("home");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Use full_name if available, else fallback to email, else "User"
        setName(user.user_metadata?.full_name || user.email || "User");
      }
    };

    getUser();
  }, []);

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