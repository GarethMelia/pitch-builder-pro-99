import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface CrawlResult {
  success: boolean;
  status?: string;
  completed?: number;
  total?: number;
  creditsUsed?: number;
  expiresAt?: string;
  data?: any[];
}

export const CrawlForm = ({ formData, onProposalGenerated }: { 
  formData: any;
  onProposalGenerated: (proposal: string) => void;
}) => {
  const { toast } = useToast();
  const [url, setUrl] = useState(formData.website_url || '');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [crawlResult, setCrawlResult] = useState<CrawlResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
    setCrawlResult(null);
    
    try {
      // First, crawl the website
      toast({
        title: "Website Analysis Started",
        description: "We're analyzing the website content...",
        duration: 3000,
      });
      
      // Simulate progress for now
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
        }
      }, 500);

      // Mock crawl result for now
      const mockCrawlResult = {
        success: true,
        status: "completed",
        completed: 10,
        total: 10,
        creditsUsed: 1,
        expiresAt: new Date().toISOString(),
        data: [
          {
            url: url,
            title: "Homepage",
            content: "Sample content from website"
          }
        ]
      };

      setCrawlResult(mockCrawlResult);

      // Generate proposal using OpenAI
      const { data: proposalData, error } = await supabase.functions.invoke('generate-proposal', {
        body: {
          websiteData: mockCrawlResult.data,
          formData: formData
        }
      });

      if (error) throw error;

      if (proposalData.formattedProposal) {
        onProposalGenerated(proposalData.formattedProposal);
        toast({
          title: "Success",
          description: "Proposal generated successfully!",
          duration: 3000,
        });
      }

    } catch (error) {
      console.error('Error analyzing website:', error);
      toast({
        title: "Error",
        description: "Failed to analyze website",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full"
            placeholder="https://example.com"
            required
          />
        </div>
        
        {isLoading && (
          <Progress value={progress} className="w-full" />
        )}
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Analyzing..." : "Analyze Website & Generate Proposal"}
        </Button>
      </form>

      {crawlResult && (
        <Card className="mt-4 p-4">
          <h3 className="text-lg font-semibold mb-2">Analysis Results</h3>
          <div className="space-y-2 text-sm">
            <p>Status: {crawlResult.status}</p>
            <p>Pages Analyzed: {crawlResult.completed} / {crawlResult.total}</p>
            {crawlResult.data && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Website Insights:</p>
                <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60">
                  {JSON.stringify(crawlResult.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};