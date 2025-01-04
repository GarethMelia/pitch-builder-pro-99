import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"; 
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { marked } from 'marked';
import { Share2 } from 'lucide-react';
import { ProposalLanding } from './ProposalLanding';
import { ImageUpload } from './ProposalSteps/ImageUpload';

marked.setOptions({
  breaks: true,
  silent: true
});

export const CrawlForm = ({ formData, onProposalGenerated }: { 
  formData: any;
  onProposalGenerated: (proposal: string) => void;
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [editableContent, setEditableContent] = useState('');
  const [showLanding, setShowLanding] = useState(false);
  const [generatedHtmlContent, setGeneratedHtmlContent] = useState('');

  const handleGenerateProposal = async () => {
    setIsLoading(true);
    setProgress(0);
    
    try {
      const formalFormData = {
        ...formData,
        proposal_tone: "formal"
      };
      
      console.log('Form data being sent:', formalFormData);
      
      toast({
        title: "Generating Proposal",
        description: "Our AI expert is crafting your formal proposal...",
        duration: 3000,
      });
      
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
        }
      }, 500);

      const { data: proposalData, error } = await supabase.functions.invoke('generate-proposal', {
        body: { formData: formalFormData }
      });

      console.log('Response from generate-proposal:', proposalData);

      if (error) throw error;

      if (proposalData?.formattedProposal) {
        const markdownString = String(proposalData.formattedProposal);
        const htmlContent = await Promise.resolve(marked.parse(markdownString));
        setEditableContent(markdownString);
        setGeneratedHtmlContent(htmlContent);
        setShowLanding(true);
        
        toast({
          title: "Success",
          description: "Formal proposal generated successfully!",
          duration: 3000,
        });
      } else {
        throw new Error('No proposal content received');
      }

    } catch (error) {
      console.error('Error in handleGenerateProposal:', error);
      toast({
        title: "Error",
        description: "Failed to generate proposal. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleContentChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    setEditableContent(newContent);
    const htmlContent = await Promise.resolve(marked.parse(String(newContent)));
    setGeneratedHtmlContent(htmlContent);
  };

  const handleContinueToProposal = () => {
    setShowLanding(false);
    onProposalGenerated(generatedHtmlContent);
  };

  if (showLanding) {
    return (
      <ProposalLanding 
        formData={formData} 
        onContinue={handleContinueToProposal}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Cover Image</h3>
        <ImageUpload
          type="cover"
          value={formData.cover_image}
          onChange={(url) => {
            if (formData.onChange) {
              formData.onChange('cover_image', url);
            }
          }}
          label="Cover Image"
        />
      </div>

      {isLoading && (
        <Progress value={progress} className="w-full" />
      )}
      
      <Button
        onClick={handleGenerateProposal}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Generating Proposal..." : "Generate Formal AI Proposal"}
      </Button>
    </div>
  );
};