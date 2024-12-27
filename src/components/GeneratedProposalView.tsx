import { ProposalFormData } from "@/types/proposal";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface GeneratedProposalViewProps {
  proposal: string;
  formData: ProposalFormData;
  onRegenerateClick: () => void;
}

export const GeneratedProposalView = ({ proposal, formData, onRegenerateClick }: GeneratedProposalViewProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Cover Image */}
      {formData.cover_image && (
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <img 
            src={formData.cover_image} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Logo and Title Section */}
      <div className="flex items-center gap-4 mb-6">
        {formData.company_logo && (
          <img 
            src={formData.company_logo} 
            alt="Company Logo" 
            className="w-24 h-24 object-contain"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{formData.title || 'Untitled Proposal'}</h1>
          <p className="text-gray-600">{formData.company_name}</p>
        </div>
      </div>

      {/* Generated Proposal Content */}
      <div className="p-6 bg-white rounded-lg shadow prose prose-slate max-w-none">
        <div 
          dangerouslySetInnerHTML={{ __html: proposal }}
          className="prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-strong:text-gray-800 prose-ul:list-disc prose-ol:list-decimal"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
        <Button onClick={onRegenerateClick}>
          Generate Again
        </Button>
      </div>
    </div>
  );
};