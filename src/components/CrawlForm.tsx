import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"; 
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { marked } from 'marked';
import { Share2 } from 'lucide-react';

// Configure marked with the correct options
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
        const markdownContent = String(proposalData.formattedProposal);
        setEditableContent(markdownContent);
        const htmlContent = marked.parse(markdownContent);
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

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    setEditableContent(newContent);
    const htmlContent = marked.parse(newContent);
    onProposalGenerated(htmlContent);
  };

  const handleShare = async () => {
    try {
      const { data, error } = await supabase
        .from('shared_proposals')
        .insert([
          { content: editableContent }
        ])
        .select()
        .single();

      if (error) throw error;

      const shareableLink = `${window.location.origin}/view/${data.id}`;
      
      // Copy link to clipboard
      await navigator.clipboard.writeText(shareableLink);
      
      toast({
        title: "Link Copied!",
        description: "Shareable link has been copied to your clipboard",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error sharing proposal:', error);
      toast({
        title: "Error",
        description: "Failed to generate shareable link",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <div className="space-y-4">
      {isLoading && (
        <Progress value={progress} className="w-full" />
      )}
      
      {editableContent && (
        <div className="space-y-4">
          <textarea
            value={editableContent}
            onChange={handleContentChange}
            className="w-full min-h-[400px] p-4 border rounded-lg font-mono"
            placeholder="Edit your proposal here..."
          />
          <Button
            onClick={handleShare}
            variant="outline"
            className="w-full"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Proposal
          </Button>
        </div>
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