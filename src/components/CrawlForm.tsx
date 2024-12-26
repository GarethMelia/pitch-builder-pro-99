import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"; 
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { marked } from 'marked';

// Configure marked to sanitize the output and prevent XSS attacks
marked.setOptions({
  headerIds: false,
  mangle: false,
  sanitize: true
});

export const CrawlForm = ({ formData, onProposalGenerated }: { 
  formData: any;
  onProposalGenerated: (proposal: string) => void;
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerateProposal = async () => {
    setIsLoading(true);
    setProgress(0);
    
    try {
      console.log('Form data being sent:', formData);
      
      toast({
        title: "Generating Proposal",
        description: "Our AI expert is crafting your proposal...",
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
        body: { formData }
      });

      console.log('Response from generate-proposal:', proposalData);

      if (error) {
        console.error('Error generating proposal:', error);
        throw error;
      }

      if (proposalData?.formattedProposal) {
        // Convert markdown to HTML before passing it to the parent
        const htmlContent = marked(proposalData.formattedProposal);
        console.log('Generated proposal HTML:', htmlContent);
        onProposalGenerated(htmlContent);
        
        toast({
          title: "Success",
          description: "Proposal generated successfully!",
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

  return (
    <div className="space-y-4">
      {isLoading && (
        <Progress value={progress} className="w-full" />
      )}
      
      <Button
        onClick={handleGenerateProposal}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Generating Proposal..." : "Generate AI Proposal"}
      </Button>
    </div>
  );
};