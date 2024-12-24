import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CheckoutButtonProps {
  priceId: string;
  mode: 'payment' | 'subscription';
  variant?: "default" | "outline";
  children: React.ReactNode;
}

export const CheckoutButton = ({ priceId, mode, variant = "default", children }: CheckoutButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating checkout session...");

    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false);
        toast.dismiss(toastId);
        toast.error("Checkout session timed out. Please try again.");
      }
    }, 30000); // 30 second timeout

    try {
      console.log('Calling create-checkout function with:', { priceId, mode });
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId, mode }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to create checkout session');
      }
      
      if (!data?.url) {
        throw new Error("No checkout URL received from Stripe");
      }

      console.log('Received checkout URL:', data.url);
      window.location.href = data.url;
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      let errorMessage = "Failed to initiate checkout. ";
      
      if (error.message?.includes("not deployed")) {
        errorMessage += "Service is currently unavailable.";
      } else if (error.message?.includes("auth")) {
        errorMessage += "Please try logging in again.";
      } else if (error.message?.includes("rate limit")) {
        errorMessage += "Too many requests. Please wait a moment.";
      } else if (error.message?.includes("price")) {
        errorMessage += "Invalid pricing configuration.";
      } else {
        errorMessage += "Please try again later.";
      }
      
      toast.error(errorMessage);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <Button
      variant={variant}
      className="w-full"
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? 'Processing...' : children}
    </Button>
  );
};