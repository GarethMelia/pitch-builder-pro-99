import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ProposalFormData } from "@/types/proposal";

interface ProposalLandingProps {
  formData: ProposalFormData;
  onContinue: () => void;
}

export const ProposalLanding = ({ formData, onContinue }: ProposalLandingProps) => {
  const defaultLandingImage = "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=2000&q=80";

  return (
    <div className="fixed inset-0 w-full h-full bg-white">
      <div className="relative h-full w-full">
        <img 
          src={formData.landing_image || defaultLandingImage}
          alt="Business Landing"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />

        {/* Content Container */}
        <div className="relative h-full z-10 max-w-7xl mx-auto px-6 flex flex-col">
          {/* Logo */}
          {formData.company_logo && (
            <div className="pt-8">
              <img 
                src={formData.company_logo}
                alt="Company Logo"
                className="h-16 w-auto object-contain bg-white/90 p-3 rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in">
              BUSINESS PROPOSAL
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Grow Your Business With Us
            </p>

            {/* Prepared For Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h2 className="text-xl text-white/80 mb-3">Prepared For</h2>
              <p className="text-3xl font-semibold text-white">
                {formData.company_name || "Your Company Name"}
              </p>
              {formData.website_url && (
                <p className="text-lg text-white/80 mt-2">
                  {formData.website_url}
                </p>
              )}
            </div>

            {/* CTA Button */}
            <Button
              onClick={onContinue}
              size="lg"
              className="w-fit text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 animate-fade-in shadow-lg"
              style={{ animationDelay: "0.6s" }}
            >
              Continue to Proposal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};