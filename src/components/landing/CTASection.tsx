import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export const CTASection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Ready to Create Your First Proposal?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of businesses who are already using our platform to win more clients
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg"
          onClick={() => navigate(user ? "/create" : "/auth")}
        >
          Start Free Trial
        </Button>
      </div>
    </section>
  );
};