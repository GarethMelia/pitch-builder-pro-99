import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const initializeStorageBucket = async () => {
  try {
    // List all buckets to check if our bucket exists
    const { data: buckets, error: listError } = await supabase
      .storage
      .listBuckets();

    if (listError) {
      console.error('Error checking buckets:', listError);
      toast.error('Failed to check storage buckets');
      return false;
    }

    const bucketExists = buckets?.some(bucket => bucket.name === 'proposal-images');

    if (bucketExists) {
      console.log('Bucket "proposal-images" already exists');
      return true;
    }

    // If we get here, we need to create the bucket
    const { data, error: createError } = await supabase
      .storage
      .createBucket('proposal-images', {
        public: true,
        fileSizeLimit: 5242880, // 5MB in bytes
        allowedMimeTypes: ['image/*']
      });

    if (createError) {
      console.error('Error creating bucket:', createError);
      toast.error('Failed to create storage bucket');
      return false;
    }

    console.log('Successfully created "proposal-images" bucket:', data);
    toast.success('Storage bucket created successfully');
    return true;
  } catch (error) {
    console.error('Unexpected error:', error);
    toast.error('An unexpected error occurred');
    return false;
  }
};