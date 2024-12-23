import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ProposalFormData } from "@/types/proposal";
import { Checkbox } from "@/components/ui/checkbox";

interface StrategiesStepProps {
  form: UseFormReturn<ProposalFormData>;
}

export const StrategiesStep = ({ form }: StrategiesStepProps) => {
  // Get services from form to show relevant strategies
  const services = form.watch("services") || [];

  // Define strategy suggestions based on services
  const getStrategySuggestions = (services: string[]) => {
    const suggestions: { id: string; label: string }[] = [];
    
    services.forEach(service => {
      if (service.toLowerCase().includes("web design")) {
        suggestions.push(
          { id: "responsive_design", label: "Implement responsive design" },
          { id: "performance_optimization", label: "Optimize website performance" }
        );
      }
      if (service.toLowerCase().includes("content")) {
        suggestions.push(
          { id: "content_calendar", label: "Create content calendar" },
          { id: "seo_optimization", label: "SEO content optimization" }
        );
      }
      if (service.toLowerCase().includes("marketing")) {
        suggestions.push(
          { id: "social_media", label: "Social media campaign strategy" },
          { id: "email_marketing", label: "Email marketing automation" }
        );
      }
    });

    // Add default suggestions if no specific services match
    if (suggestions.length === 0) {
      suggestions.push(
        { id: "market_research", label: "Conduct market research" },
        { id: "competitive_analysis", label: "Competitive analysis" },
        { id: "customer_journey", label: "Map customer journey" }
      );
    }

    return suggestions;
  };

  const strategySuggestions = getStrategySuggestions(services);

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold">Recommended Strategies</h2>
      
      <FormField
        control={form.control}
        name="recommended_strategies"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select strategies that would benefit the client:</FormLabel>
            <div className="space-y-4">
              {strategySuggestions.map((strategy) => (
                <div key={strategy.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={strategy.id}
                    checked={field.value?.includes(strategy.label)}
                    onCheckedChange={(checked) => {
                      const currentValues = field.value || [];
                      if (checked) {
                        field.onChange([...currentValues, strategy.label]);
                      } else {
                        field.onChange(currentValues.filter(value => value !== strategy.label));
                      }
                    }}
                  />
                  <Label htmlFor={strategy.id}>{strategy.label}</Label>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <FormLabel>Add custom strategy:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter custom strategy"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.currentTarget;
                      const value = input.value.trim();
                      if (value) {
                        const currentValues = field.value || [];
                        field.onChange([...currentValues, value]);
                        input.value = '';
                      }
                    }
                  }}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};