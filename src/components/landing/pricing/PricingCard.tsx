import { Check } from "lucide-react";

interface PricingFeature {
  text: string;
}

interface PricingCardProps {
  popular?: boolean;
  title: string;
  description: string;
  price: string;
  period?: string;
  features: PricingFeature[];
  action: React.ReactNode;
}

export const PricingCard = ({
  popular,
  title,
  description,
  price,
  period,
  features,
  action
}: PricingCardProps) => {
  return (
    <div className={`bg-white p-8 rounded-lg shadow-sm ${popular ? 'border-2 border-primary' : 'border border-gray-200'} relative flex flex-col`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Most Popular</span>
        </div>
      )}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="text-3xl font-bold mb-2">{price}</div>
        {period && <p className="text-sm text-gray-500">{period}</p>}
      </div>
      <div className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
      {action}
    </div>
  );
};