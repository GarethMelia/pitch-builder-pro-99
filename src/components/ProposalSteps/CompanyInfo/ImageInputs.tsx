import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ProposalFormData } from "@/types/proposal";
import { ImageUpload } from "../ImageUpload";

interface ImageInputsProps {
  form: UseFormReturn<ProposalFormData>;
}

export const ImageInputs = ({ form }: ImageInputsProps) => {
  return (
    <>
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
    </>
  );
};