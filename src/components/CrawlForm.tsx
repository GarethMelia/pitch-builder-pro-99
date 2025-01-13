import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"; 
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { marked } from 'marked';
import { Share2 } from 'lucide-react';
import { ProposalLanding } from './ProposalLanding';

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

      // First, try to crawl the website if URL is provided
      if (formData.website_url) {
        try {
          const { data: crawlData, error: crawlError } = await supabase.functions.invoke('crawl-website', {
            body: { url: formData.website_url }
          });

          if (crawlError) {
            console.error('Error crawling website:', crawlError);
          } else if (crawlData?.data) {
            // Extract the text content from each section
            const aboutUs = crawlData.data.about_us?.content || '';
            const overview = crawlData.data.overview?.content || '';
            const mission = crawlData.data.mission?.content || '';
            const vision = crawlData.data.vision?.content || '';

            // Combine the content into the prospect details
            const websiteContent = [
              aboutUs && `About Us:\n${aboutUs}`,
              overview && `Overview:\n${overview}`,
              mission && `Mission:\n${mission}`,
              vision && `Vision:\n${vision}`
            ].filter(Boolean).join('\n\n');

            if (websiteContent) {
              formalFormData.prospect_details = websiteContent;
            }
          }
        } catch (crawlError) {
          console.error('Error during website crawl:', crawlError);
        }
      }

      // Generate the proposal
      const { data: proposalData, error } = await supabase.functions.invoke('generate-proposal', {
        body: { formData: formalFormData }
      });

      if (error) {
        console.error('Error from generate-proposal:', error);
        throw error;
      }

      console.log('Response from generate-proposal:', proposalData);

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

    } catch (error: any) {
      console.error('Error in handleGenerateProposal:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate proposal. Please try again.",
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