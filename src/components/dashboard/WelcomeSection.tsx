import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

export function WelcomeSection() {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState("");
  const welcomeText = "Welcome back, John Doe!"; // Replace with actual user name

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= welcomeText.length) {
        setDisplayText(welcomeText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-6 h-[48px]">{displayText}</h1>
      <Button
        onClick={() => navigate("/create")}
        size="lg"
        className="transform transition-all duration-200 hover:scale-105"
      >
        <PlusCircle className="mr-2" />
        Create New Proposal
      </Button>
    </div>
  );
}