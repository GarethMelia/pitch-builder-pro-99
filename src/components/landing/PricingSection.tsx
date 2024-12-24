import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { PricingCard } from "./pricing/PricingCard";
import { CheckoutButton } from "./pricing/CheckoutButton";

export const PricingSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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
          <PricingCard
            title="Free"
            description="Perfect for trying out our service"
            price="$0"
            period="Forever free"
            features={[
              { text: "1 proposal per month" },
              { text: "Basic templates" },
              { text: "Email support" }
            ]}
            action={
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate(user ? "/create" : "/auth")}
              >
                Get Started
              </Button>
            }
          />

          <PricingCard
            title="Pay Per Use"
            description="For occasional users"
            price="$2.50"
            period="per proposal"
            features={[
              { text: "Pay as you go" },
              { text: "All templates" },
              { text: "Priority email support" }
            ]}
            action={
              <CheckoutButton
                priceId="price_1QZS3kS3o3uyD8gMUeEzrbZT"
                mode="payment"
                variant="outline"
              >
                Choose Plan
              </CheckoutButton>
            }
          />

          <PricingCard
            popular
            title="Pro"
            description="For growing businesses"
            price="$39"
            period="per month"
            features={[
              { text: "30 proposals per month" },
              { text: "All premium templates" },
              { text: "Priority support" },
              { text: "Analytics dashboard" }
            ]}
            action={
              <CheckoutButton
                priceId="price_1QZS02S3o3uyD8gMpwZOP5mo"
                mode="subscription"
              >
                Get Started
              </CheckoutButton>
            }
          />

          <PricingCard
            title="Enterprise"
            description="For large organizations"
            price="Custom"
            period="Contact us for pricing"
            features={[
              { text: "Unlimited proposals" },
              { text: "Custom templates" },
              { text: "24/7 phone support" },
              { text: "Dedicated account manager" }
            ]}
            action={
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.location.href = "mailto:enterprise@pitchbuilderpro.com"}
              >
                Contact Sales
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
};