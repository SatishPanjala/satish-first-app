import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://itbfxityovwtutaeftxa.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0YmZ4aXR5b3Z3dHV0YWVmdHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0NzYzNzYsImV4cCI6MjA3MjA1MjM3Nn0.QTflDuUQ38hWzburHZ5lqraArlaYTjhBF-qvk5CZF3s"

export const supabase = createClient(supabaseUrl, supabaseKey);