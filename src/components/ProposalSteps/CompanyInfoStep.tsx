import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ProposalFormData } from "@/types/proposal";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Image as ImageIcon } from "lucide-react";

interface CompanyInfoStepProps {
  form: UseFormReturn<ProposalFormData>;
}

export const CompanyInfoStep = ({ form }: CompanyInfoStepProps) => {
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const handleImageUpload = async (file: File, type: 'logo' | 'cover') => {
    const setUploading = type === 'logo' ? setUploadingLogo : setUploadingCover;
    const fieldName = type === 'logo' ? 'company_logo' : 'cover_image';
    
    try {
      setUploading(true);
      
      if (!file) {
        throw new Error('Please select a file to upload');
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }

      // Validate file size (5MB limit)
      const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > MAX_SIZE) {
        throw new Error('File size should be less than 5MB');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('proposal-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('proposal-images')
        .getPublicUrl(filePath);

      form.setValue(fieldName, publicUrl);
      toast.success(`${type === 'logo' ? 'Logo' : 'Cover image'} uploaded successfully`);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(`Error uploading ${type === 'logo' ? 'logo' : 'cover image'}`);
    } finally {
      setUploading(false);
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
        name="company_logo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Logo</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'logo');
                    }}
                    className="cursor-pointer"
                  />
                  {uploadingLogo && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading logo...
                    </div>
                  )}
                </div>
                {field.value && (
                  <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                    <img 
                      src={field.value} 
                      alt="Company Logo" 
                      className="w-full h-full object-contain p-2" 
                    />
                  </div>
                )}
              </div>
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
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'cover');
                    }}
                    className="cursor-pointer"
                  />
                  {uploadingCover && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading cover image...
                    </div>
                  )}
                </div>
                {field.value ? (
                  <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                    <img 
                      src={field.value} 
                      alt="Cover Image Preview" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg bg-muted/50">
                    <div className="text-center text-muted-foreground">
                      <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                      <p>No cover image uploaded</p>
                      <p className="text-sm">Recommended size: 1920x1080px</p>
                    </div>
                  </div>
                )}
              </div>
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
