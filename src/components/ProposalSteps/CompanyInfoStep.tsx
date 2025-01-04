import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ProposalFormData } from "@/types/proposal";
import { ImageUpload } from "./ImageUpload";

interface CompanyInfoStepProps {
  form: UseFormReturn<ProposalFormData>;
}

export const CompanyInfoStep = ({ form }: CompanyInfoStepProps) => {
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
        name="website_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Website URL</FormLabel>
            <FormControl>
              <Input 
                type="url" 
                placeholder="https://example.com" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
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