import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"; 
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";

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
      console.log('Form data being sent:', formData); // Debug log
      
      toast({
        title: "Generating Proposal",
        description: "Our AI expert is crafting your proposal...",
        duration: 3000,
      });
      
      // Simulate progress for user feedback
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
        }
      }, 500);

      // Generate proposal using OpenAI
      const { data: proposalData, error } = await supabase.functions.invoke('generate-proposal', {
        body: { formData }
      });

      console.log('Response from generate-proposal:', proposalData); // Debug log

      if (error) {
        console.error('Error generating proposal:', error);
        throw error;
      }

      if (proposalData?.formattedProposal) {
        console.log('Generated proposal:', proposalData.formattedProposal); // Debug log
        onProposalGenerated(proposalData.formattedProposal);
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