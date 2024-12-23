import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Globe, Zap, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        duration: 2000,
      });
      navigate("/auth");
    } catch (error) {
      toast({
        title: "Error signing out",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-8">
          {isAuthenticated ? (
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="mr-4"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => navigate("/auth")}
              className="mr-4"
            >
              Sign In
            </Button>
          )}
        </div>
        <div className="text-center animate-fadeIn">
          <h1 className="text-5xl font-bold text-primary mb-6">
            AI-Powered Proposal Generator
          </h1>
          <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto">
            Create compelling business proposals in minutes using AI analysis of your client's website
            and your expertise.
          </p>
          <Button
            onClick={() => navigate(isAuthenticated ? "/create" : "/auth")}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg rounded-full"
          >
            {isAuthenticated ? "Create Your First Proposal" : "Sign In to Get Started"}
            <ArrowRight className="ml-2" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <FeatureCard
            icon={<Globe className="w-8 h-8 text-accent" />}
            title="Website Analysis"
            description="Automatically extract insights from your client's website to create targeted proposals."
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-accent" />}
            title="AI-Powered"
            description="Generate professional proposals with AI that understands your business goals."
          />
          <FeatureCard
            icon={<FileText className="w-8 h-8 text-accent" />}
            title="Easy Export"
            description="Download your proposals in multiple formats ready to send to clients."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
    <p className="text-secondary">{description}</p>
  </div>
);

export default Index;