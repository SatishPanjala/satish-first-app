import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  console.log("Login attempt:", email, password); // Debug

  // Query the users table
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 401 }
    );
  }

  // Check password (convert to number)
  if (Number(data.password) !== Number(password)) {
    return NextResponse.json(
      { success: false, message: "Invalid password" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    message: `Login successful!`,
    user: { id: data.id, name: data.name, email: data.email },
  });
}
