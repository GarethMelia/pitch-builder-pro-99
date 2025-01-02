import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ImageUploadProps {
  type: 'logo' | 'cover';
  value?: string;
  onChange: (url: string) => void;
  label: string;
}

export const ImageUpload = ({ type, value, onChange, label }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (file: File) => {
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
      const MAX_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        throw new Error('File size should be less than 5MB');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;

      // Create bucket if it doesn't exist
      const { data: bucketExists } = await supabase
        .storage
        .getBucket('proposal-images');

      if (!bucketExists) {
        const { error: createBucketError } = await supabase
          .storage
          .createBucket('proposal-images', {
            public: true,
            fileSizeLimit: MAX_SIZE,
            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
          });

        if (createBucketError) throw createBucketError;
      }

      // Upload file
      const { error: uploadError, data } = await supabase.storage
        .from('proposal-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('proposal-images')
        .getPublicUrl(fileName);

      onChange(publicUrl);
      toast.success(`${type === 'logo' ? 'Logo' : 'Cover image'} uploaded successfully`);
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(error.message || `Error uploading ${type === 'logo' ? 'logo' : 'cover image'}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
          className="cursor-pointer"
        />
        {uploading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Uploading {type === 'logo' ? 'logo' : 'cover image'}...
          </div>
        )}
      </div>
      {value ? (
        <div className={`relative ${type === 'logo' ? 'w-32 h-32' : 'w-full h-48'} border rounded-lg overflow-hidden`}>
          <img 
            src={value} 
            alt={label}
            className={`w-full h-full ${type === 'logo' ? 'object-contain p-2' : 'object-cover'}`}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg bg-muted/50">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="w-8 h-8 mx-auto mb-2" />
            <p>No {type === 'logo' ? 'logo' : 'cover image'} uploaded</p>
            {type === 'cover' && <p className="text-sm">Recommended size: 1920x1080px</p>}
          </div>
        </div>
      )}
    </div>
  );
};