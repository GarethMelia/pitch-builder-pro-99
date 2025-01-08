import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ProposalFormData } from "@/types/proposal";
import { ImageUpload } from "./ImageUpload";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface CompanyInfoStepProps {
  form: UseFormReturn<ProposalFormData>;
}

export const CompanyInfoStep = ({ form }: CompanyInfoStepProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

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
    try {
      const { data, error } = await supabase.functions.invoke('crawl-website', {
        body: { url: websiteUrl }
      });

      if (error) throw error;

      if (data?.overview) {
        form.setValue('prospect_details', data.overview);
        toast({
          title: "Success",
          description: "Overview generated successfully!",
        });
      }
    } catch (error) {
      console.error('Error generating overview:', error);
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
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold">General Company Information</h2>
      
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Proposal Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter proposal title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="company_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter company name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Overview'
                )}
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="prospect_details"
        render={({ field: { value, ...fieldProps } }) => (
          <FormItem>
            <FormLabel>Provide key details or insights about the prospect</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Write a friendly message that references past discussions, shows understanding, and conveys excitement for the project."
                className="min-h-[100px]"
                value={value || ''}
                {...fieldProps}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="company_logo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Logo</FormLabel>
            <FormControl>
              <ImageUpload
                type="logo"
                value={field.value}
                onChange={field.onChange}
                label="Company Logo"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cover_image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cover Image</FormLabel>
            <FormControl>
              <ImageUpload
                type="cover"
                value={field.value}
                onChange={field.onChange}
                label="Cover Image"
              />
            </FormControl>
            <FormMessage className="text-xs text-muted-foreground">
              This image will be used as the cover page background
            </FormMessage>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="landing_image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Landing Image</FormLabel>
            <FormControl>
              <ImageUpload
                type="landing"
                value={field.value}
                onChange={field.onChange}
                label="Landing Image"
              />
            </FormControl>
            <FormMessage className="text-xs text-muted-foreground">
              This image will be used as the landing page background
            </FormMessage>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="primary_goal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Goal</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="What's the main objective of this proposal?" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
