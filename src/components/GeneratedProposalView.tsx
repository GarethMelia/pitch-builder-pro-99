import { ProposalFormData } from "@/types/proposal";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileDown, FileEdit, ArrowLeft } from "lucide-react";
import { ProposalSidebar } from "./proposal/ProposalSidebar";
import { ExecutiveSummary } from "./proposal/ExecutiveSummary";

interface GeneratedProposalViewProps {
  proposal: string;
  formData: ProposalFormData;
  onRegenerateClick: () => void;
}

export const GeneratedProposalView = ({ proposal, formData, onRegenerateClick }: GeneratedProposalViewProps) => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="flex min-h-screen bg-white">
      <ProposalSidebar onSectionClick={scrollToSection} />

      {/* Main Content */}
      <div className="flex-1 ml-[280px]">
        {/* Introduction Section */}
        <section id="introduction" className="px-12 py-12 max-w-[1600px]">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700">{formData.prospect_details}</p>
          </div>
        </section>

        <ExecutiveSummary formData={formData} />

        {/* Other sections */}
        <div className="px-12 py-12 max-w-[1600px]">
          {/* Problem Statement Section */}
          <section id="problem-statement" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Problem Statement</h2>
            <div className="prose prose-lg max-w-none">
              {formData.challenges?.map((challenge, index) => (
                <div key={index} className="mb-4">
                  <p className="text-gray-700">{challenge}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Proposed Solution Section */}
          <section id="proposed-solution" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Proposed Solution</h2>
            <div className="prose prose-lg max-w-none">
              {formData.services?.map((service, index) => (
                <div key={index} className="mb-4">
                  <p className="text-gray-700">{service}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Implementation Plan Section */}
          <section id="implementation-plan" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Implementation Plan</h2>
            <div className="prose prose-lg max-w-none">
              {/* Add implementation plan content */}
            </div>
          </section>

          {/* Timeline and Milestones Section */}
          <section id="timeline-milestones" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Timeline and Milestones</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700">{formData.timeframe}</p>
            </div>
          </section>

          {/* Pricing and Payment Terms Section */}
          <section id="pricing-payment" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Pricing and Payment Terms</h2>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="text-xl text-gray-700">{formData.budget_range}</p>
            </div>
          </section>

          {/* Terms and Conditions Section */}
          <section id="terms-conditions" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h2>
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: proposal }} />
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8 mb-16">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <Button onClick={onRegenerateClick}>
              <FileEdit className="w-4 h-4 mr-2" />
              Generate Again
            </Button>
            <Button>
              <FileDown className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};