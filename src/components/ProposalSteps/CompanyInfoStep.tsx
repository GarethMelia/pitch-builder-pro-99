import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ProposalFormData } from "@/types/proposal";
import { ImageUpload } from "./ImageUpload";
import { WebsiteCrawlerButton } from "./WebsiteCrawlerButton";

interface CompanyInfoStepProps {
  form: UseFormReturn<ProposalFormData>;
}

export const CompanyInfoStep = ({ form }: CompanyInfoStepProps) => {
  const handleCrawlSuccess = (data: any) => {
    // Create a formatted string with the raw data
    let details = '';
    
    if (data.about_us) {
      details += `About Us:\n${JSON.stringify(data.about_us, null, 2)}\n\n`;
    }
    if (data.overview) {
      details += `Overview:\n${JSON.stringify(data.overview, null, 2)}\n\n`;
    }
    if (data.mission) {
      details += `Mission:\n${JSON.stringify(data.mission, null, 2)}\n\n`;
    }
    if (data.vision) {
      details += `Vision:\n${JSON.stringify(data.vision, null, 2)}`;
    }

    form.setValue("prospect_details", details.trim());
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
              <WebsiteCrawlerButton 
                websiteUrl={field.value}
                onSuccess={handleCrawlSuccess}
              />
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
            <FormLabel>Raw Crawled Data</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="The raw crawled data will appear here after clicking the globe button above."
                className="min-h-[300px] font-mono"
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