import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_APP_SUPABASE;
const supabaseSecretKey = import.meta.env.VITE_APP_SUPABASE_SECRET_KEY;
export const supabase = createClient(supabaseURL, supabaseSecretKey);

const authenticationDiscord = async (url) => {
  try {
    console.log(1);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: url,
      },
    });
    console.log(2);
    if (error) {
      console.error("Authentication error:", error.message);
      return null;
    }
    console.log(3);
    if (data) {
      const response = await supabase.auth.getSession(data);
      localStorage.setItem("userData", JSON.stringify(response));
      return response;
    }
    console.log(4);
  } catch (e) {
    console.log(e);
  }
};

export { authenticationDiscord };
