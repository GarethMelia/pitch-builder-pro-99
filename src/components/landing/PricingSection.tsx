import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const PricingSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePricingClick = async (priceId: string, mode: 'payment' | 'subscription') => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId, mode }
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error("Failed to initiate checkout. Please try again.");
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that best fits your needs. All plans include access to our AI-powered proposal builder.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <p className="text-gray-600 mb-4">Perfect for trying out our service</p>
              <div className="text-3xl font-bold mb-2">$0</div>
              <p className="text-sm text-gray-500">Forever free</p>
            </div>
            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>1 proposal per month</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Basic templates</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Email support</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate(user ? "/create" : "/auth")}
            >
              Get Started
            </Button>
          </div>

          {/* Pay Per Use Tier */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Pay Per Use</h3>
              <p className="text-gray-600 mb-4">For occasional users</p>
              <div className="text-3xl font-bold mb-2">$2.50</div>
              <p className="text-sm text-gray-500">per proposal</p>
            </div>
            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Pay as you go</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>All templates</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Priority email support</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => toast.error("Please set up the Pay Per Use price in Stripe first")}
            >
              Coming Soon
            </Button>
          </div>

          {/* Pro Tier */}
          <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-primary relative flex flex-col">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Most Popular</span>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-gray-600 mb-4">For growing businesses</p>
              <div className="text-3xl font-bold mb-2">$39</div>
              <p className="text-sm text-gray-500">per month</p>
            </div>
            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>30 proposals per month</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>All premium templates</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Priority support</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Analytics dashboard</span>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={() => handlePricingClick('price_1QZS02S3o3uyD8gMpwZOP5mo', 'subscription')}
            >
              Get Started
            </Button>
          </div>

          {/* Enterprise Tier */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-4">For large organizations</p>
              <div className="text-3xl font-bold mb-2">Custom</div>
              <p className="text-sm text-gray-500">Contact us for pricing</p>
            </div>
            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Unlimited proposals</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Custom templates</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>24/7 phone support</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Dedicated account manager</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.location.href = "mailto:enterprise@pitchbuilderpro.com"}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};