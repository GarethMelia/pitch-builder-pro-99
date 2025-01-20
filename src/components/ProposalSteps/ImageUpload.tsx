import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Image as ImageIcon, Crop } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { initializeStorageBucket } from "@/utils/storage";
import ReactCrop, { Crop as CropType, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageUploadProps {
  type: 'logo' | 'cover' | 'landing';
  value?: string;
  onChange: (url: string) => void;
  label: string;
}

export const ImageUpload = ({ type, value, onChange, label }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [showCropOption, setShowCropOption] = useState(false);
  const [crop, setCrop] = useState<CropType>();
  const [tempImage, setTempImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleImageUpload = async (file: File) => {
    try {
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

      // Create temporary URL for cropping
      const tempUrl = URL.createObjectURL(file);
      setTempImage(tempUrl);
      setShowCropOption(true);
    } catch (error: any) {
      console.error('Error handling image:', error);
      toast.error(error.message || `Error handling ${type === 'logo' ? 'logo' : type === 'cover' ? 'cover image' : 'landing image'}`);
    }
  };

  const handleCropComplete = async () => {
    if (!imageRef.current || !crop) return;

    try {
      setUploading(true);
      const canvas = document.createElement('canvas');
      const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
      const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
      
      canvas.width = crop.width;
      canvas.height = crop.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No 2d context');

      ctx.drawImage(
        imageRef.current,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), 'image/jpeg', 1);
      });

      // Initialize bucket if needed
      const bucketReady = await initializeStorageBucket();
      if (!bucketReady) {
        throw new Error('Storage system is not available');
      }

      const fileName = `${Math.random()}.jpg`;

      // Upload cropped image
      const { error: uploadError, data } = await supabase.storage
        .from('proposal-images')
        .upload(fileName, blob, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('proposal-images')
        .getPublicUrl(fileName);

      onChange(publicUrl);
      setShowCropOption(false);
      setTempImage(null);
      toast.success(`${type === 'logo' ? 'Logo' : type === 'cover' ? 'Cover image' : 'Landing image'} uploaded successfully`);
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(error.message || `Error uploading ${type === 'logo' ? 'logo' : type === 'cover' ? 'cover image' : 'landing image'}`);
    } finally {
      setUploading(false);
    }
  };

  const cancelCrop = () => {
    setShowCropOption(false);
    setTempImage(null);
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
            Uploading {type === 'logo' ? 'logo' : type === 'cover' ? 'cover image' : 'landing image'}...
          </div>
        )}
      </div>

      {showCropOption && tempImage && (
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              aspect={type === 'logo' ? 1 : 16/9}
            >
              <img
                ref={imageRef}
                src={tempImage}
                alt="Crop preview"
                className="max-h-[500px] w-auto"
              />
            </ReactCrop>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleCropComplete}
              disabled={!crop || uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Cropping...
                </>
              ) : (
                <>
                  <Crop className="w-4 h-4 mr-2" />
                  Crop & Upload
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={cancelCrop}
              disabled={uploading}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {value && !showCropOption && (
        <div className={`relative ${type === 'logo' ? 'w-32 h-32' : 'w-full h-48'} border rounded-lg overflow-hidden`}>
          <img 
            src={value} 
            alt={label}
            className={`w-full h-full ${type === 'logo' ? 'object-contain p-2' : 'object-cover'}`}
          />
        </div>
      )}

      {!value && !showCropOption && (
        <div className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg bg-muted/50">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="w-8 h-8 mx-auto mb-2" />
            <p>No {type === 'logo' ? 'logo' : type === 'cover' ? 'cover image' : 'landing image'} uploaded</p>
            {type !== 'logo' && <p className="text-sm">Recommended size: 1920x1080px</p>}
          </div>
        </div>
      )}
    </div>
  );
};