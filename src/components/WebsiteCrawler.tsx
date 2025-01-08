import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Globe } from 'lucide-react';

interface WebsiteCrawlerProps {
  onOverviewGenerated: (overview: string) => void;
}

export const WebsiteCrawler = ({ onOverviewGenerated }: WebsiteCrawlerProps) => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCrawl = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);

    try {
      toast({
        title: "Starting website analysis",
        description: "Please wait while we extract information...",
        duration: 3000,
      });

      const { data: crawlData, error: crawlError } = await supabase.functions.invoke('crawl-website', {
        body: { url }
      });

      if (crawlError) throw crawlError;

      if (crawlData?.overview) {
        onOverviewGenerated(crawlData.overview);
        toast({
          title: "Success",
          description: "Website information extracted successfully!",
          duration: 3000,
        });
      }

    } catch (error) {
      console.error('Error crawling website:', error);
      toast({
        title: "Error",
        description: "Failed to analyze website. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  return (
    <Card className="p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Enter Website URL for Auto-Generated Overview</h3>
      </div>
      
      <form onSubmit={handleCrawl} className="space-y-4">
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full"
          required
        />
        
        {isLoading && (
          <Progress value={progress} className="w-full" />
        )}
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Analyzing Website..." : "Generate Overview"}
        </Button>
      </form>
    </Card>
  );
};