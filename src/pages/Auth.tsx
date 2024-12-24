import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "@/components/layout/NavigationBar";
import { FooterSection } from "@/components/landing/FooterSection";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <NavigationBar />
      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-64px-320px)]">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-8">Welcome to Pitch Builder Pro</h1>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <SupabaseAuth 
              supabaseClient={supabase}
              appearance={{ 
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#000000',
                      brandAccent: '#333333',
                    },
                  },
                },
              }}
              providers={["google"]}
            />
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default Auth;