import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Globe, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WebsiteCrawlerButtonProps {
  websiteUrl: string;
  onSuccess: (data: any) => void;
}

export const WebsiteCrawlerButton = ({ websiteUrl, onSuccess }: WebsiteCrawlerButtonProps) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [crawledData, setCrawledData] = useState<any>(null);
  
  const handleCrawlWebsite = async () => {
    if (!websiteUrl) {
      toast.error("Please enter a website URL first");
      return;
    }

    setStatus('loading');
    try {
      const { data, error } = await supabase.functions.invoke('crawl-website', {
        body: { url: websiteUrl }
      });

      if (error) throw error;

      if (data.success && data.data) {
        setStatus('success');
        setCrawledData(data.data);
        setDialogOpen(true);
        onSuccess(data.data);
        toast.success("Website crawled successfully!");
      } else {
        throw new Error("Failed to extract website content");
      }
    } catch (error) {
      console.error('Error crawling website:', error);
      setStatus('error');
      toast.error(error.message || "Failed to crawl website");
    }
  };

  const getButtonProps = () => {
    switch (status) {
      case 'loading':
        return {
          variant: "outline" as const,
          disabled: true,
          className: "animate-pulse",
          icon: <Loader2 className="h-4 w-4 animate-spin" />
        };
      case 'success':
        return {
          variant: "outline" as const,
          className: "text-green-500 hover:text-green-600",
          icon: <CheckCircle className="h-4 w-4" />
        };
      case 'error':
        return {
          variant: "outline" as const,
          className: "text-red-500 hover:text-red-600",
          icon: <XCircle className="h-4 w-4" />
        };
      default:
        return {
          variant: "outline" as const,
          className: "text-gray-500 hover:text-gray-600",
          icon: <Globe className="h-4 w-4" />
        };
    }
  };

  const buttonProps = getButtonProps();

  return (
    <>
      <Button
        type="button"
        variant={buttonProps.variant}
        size="icon"
        onClick={handleCrawlWebsite}
        disabled={status === 'loading'}
        className={buttonProps.className}
      >
        {buttonProps.icon}
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Crawled Website Content</DialogTitle>
          </DialogHeader>
          {crawledData && (
            <div className="space-y-4">
              {crawledData.about_us && (
                <div>
                  <h3 className="font-semibold text-lg">About Us</h3>
                  <p className="text-sm text-muted-foreground">{crawledData.about_us}</p>
                </div>
              )}
              {crawledData.overview && (
                <div>
                  <h3 className="font-semibold text-lg">Overview</h3>
                  <p className="text-sm text-muted-foreground">{crawledData.overview}</p>
                </div>
              )}
              {crawledData.mission && (
                <div>
                  <h3 className="font-semibold text-lg">Mission</h3>
                  <p className="text-sm text-muted-foreground">{crawledData.mission}</p>
                </div>
              )}
              {crawledData.vision && (
                <div>
                  <h3 className="font-semibold text-lg">Vision</h3>
                  <p className="text-sm text-muted-foreground">{crawledData.vision}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};