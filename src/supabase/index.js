import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_APP_SUPABASE;
const supabaseSecretKey = import.meta.env.VITE_APP_SUPABASE_SECRET_KEY;
export const supabase = createClient(supabaseURL, supabaseSecretKey);

const authenticationDiscord = async (url) => {
  await handleSignOut();
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: url,
      },
    });
    if (error) {
      window.location.href = url;
      return null;
    }
  } catch (e) {
    console.log(e);
  }
};

const authenticationTwitter = async (url) => {
  await handleSignOut();
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
      options: {
        redirectTo: url,
      },
    });
    if (error) {
      window.location.href = url;
      return null;
    }
  } catch (e) {
    console.log(e);
  }
};

const handleSignOut = async () => {
  await supabase.auth.signOut();
};

export { authenticationDiscord, authenticationTwitter };
