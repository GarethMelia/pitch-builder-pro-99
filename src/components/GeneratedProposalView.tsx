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
  const defaultCoverImage = "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=2000&q=80";
  
  return (
    <div className="space-y-6">
      {/* Header Section with Cover Image Overlay */}
      <div className="relative h-64 rounded-lg overflow-hidden">
        <img 
          src={formData.cover_image || defaultCoverImage} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />

        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="flex justify-end">
            {formData.company_logo && (
              <div className="bg-white/90 p-3 rounded-lg">
                <img 
                  src={formData.company_logo} 
                  alt="Company Logo" 
                  className="h-16 w-auto object-contain"
                />
              </div>
            )}
          </div>

          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">
              {formData.title || 'Untitled Proposal'}
            </h1>
            <div className="flex flex-col gap-1 text-sm opacity-90">
              <p>Prepared for: [Client Name]</p>
              <p>Prepared by: [Your Name]</p>
              <p>Position: [Your Position]</p>
              <p>Date: [Insert Date]</p>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Proposal Content */}
      <div className="p-8 bg-white rounded-lg shadow-lg prose prose-slate max-w-none">
        <div 
          dangerouslySetInnerHTML={{ __html: proposal }}
          className="prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-strong:text-gray-800 prose-ul:list-disc prose-ol:list-decimal"
        />
      </div>

      {/* Action Buttons */}
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