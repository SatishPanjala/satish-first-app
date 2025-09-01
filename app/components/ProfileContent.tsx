"use client";
import { useState, useEffect, useRef } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function ProfileContent() {
  const [view, setView] = useState<"none" | "allUsers" | "addUser">("none");
  const [users, setUsers] = useState<User[]>([]);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [deletedMessage, setDeletedMessage] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== id));
        setActiveUserId(null);
        setDeletedMessage(`User ${id} deleted`);
        setTimeout(() => setDeletedMessage(null), 2000);
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting user");
    }
  };

  useEffect(() => {
    if (view === "allUsers") fetchUsers();
  }, [view]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setActiveUserId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      <div className="flex space-x-4 mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setView("addUser")}
        >
          Add User
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => setView("allUsers")}
        >
          All Users
        </button>
      </div>

      {view === "addUser" && <div>Add User Form Here</div>}

      {view === "allUsers" && (
        <div className="overflow-x-auto overflow-y-auto max-h-[70vh] relative">
          <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider border-b">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider border-b">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider border-b">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 relative">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 font-medium">
                    <button
                      onClick={() =>
                        setActiveUserId(activeUserId === user.id ? null : user.id)
                      }
                      className="hover:underline"
                    >
                      {user.id}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Floating Edit/Delete Card Modal */}
          {activeUserId && (
            <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-20">
              <div
                ref={cardRef}
                className="bg-white rounded-lg shadow-lg p-6 w-80"
              >
                
                <div className="flex flex-col space-y-3">
                  <button
                    className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500"
                    onClick={() => alert("Edit user: " + activeUserId)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => deleteUser(activeUserId)}
                  >
                    Delete
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => setActiveUserId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Deleted Message Card */}
          {deletedMessage && (
            <div className="fixed bottom-10 right-10 bg-green-500 text-white px-4 py-3 rounded shadow-lg z-30">
              {deletedMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
