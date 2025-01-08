import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Globe, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface WebsiteCrawlerButtonProps {
  websiteUrl: string;
  onSuccess: (data: any) => void;
}

export const WebsiteCrawlerButton = ({ websiteUrl, onSuccess }: WebsiteCrawlerButtonProps) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
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
  );
};