import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: NextRequest) {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email");

  if (error) {
    return NextResponse.json({ users: [], error: error.message });
  }

  return NextResponse.json({ users: data });
}
