import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-r from-primary to-accent overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
          alt="Hero background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fadeIn">
            Create Winning Proposals in Minutes
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Transform your business proposals into compelling stories that win clients
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg"
            onClick={() => navigate(user ? "/create" : "/auth")}
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
};