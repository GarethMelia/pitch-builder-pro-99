import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { ProposalFormData } from "@/types/proposal";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface WebsiteUrlInputProps {
  form: UseFormReturn<ProposalFormData>;
}

export const WebsiteUrlInput = ({ form }: WebsiteUrlInputProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [overviewStatus, setOverviewStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleGenerateOverview = async () => {
    const websiteUrl = form.getValues('website_url');
    if (!websiteUrl) {
      toast({
        title: "Error",
        description: "Please enter a website URL first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setOverviewStatus('idle');
    
    try {
      const { data, error } = await supabase.functions.invoke('crawl-website', {
        body: { url: websiteUrl }
      });

      if (error) throw error;

      if (data?.overview) {
        form.setValue('prospect_details', data.overview);
        setOverviewStatus('success');
        toast({
          title: "Success",
          description: "Overview generated successfully!",
        });
      }
    } catch (error) {
      console.error('Error generating overview:', error);
      setOverviewStatus('error');
      toast({
        title: "Error",
        description: "Failed to generate overview. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <FormField
      control={form.control}
      name="website_url"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Website URL</FormLabel>
          <div className="flex gap-2">
            <FormControl>
              <Input 
                type="url" 
                placeholder="https://example.com" 
                {...field} 
              />
            </FormControl>
            <Button 
              type="button"
              onClick={handleGenerateOverview}
              disabled={isGenerating}
              variant="secondary"
              className={cn(
                "min-w-[140px]",
                overviewStatus === 'success' && "bg-green-500 hover:bg-green-600 text-white",
                overviewStatus === 'error' && "bg-red-500 hover:bg-red-600 text-white"
              )}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                overviewStatus === 'success' ? 'Generated!' :
                overviewStatus === 'error' ? 'Error!' :
                'Generate Overview'
              )}
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};