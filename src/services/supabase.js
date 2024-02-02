import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ceuiejjkvvtyqgiogulf.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNldWllamprdnZ0eXFnaW9ndWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ1NzQ2MjksImV4cCI6MjAyMDE1MDYyOX0.TQ4MD42nvnDR4Y2BXMePa7qKdhKzXOA_FBb0gDZGBIE";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
