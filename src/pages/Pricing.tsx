import { PricingSection } from "@/components/landing/PricingSection";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-accent overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fadeIn">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Choose the plan that best fits your needs. No hidden fees, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <PricingSection />
    </div>
  );
}