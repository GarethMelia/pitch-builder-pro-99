import { UseFormReturn } from "react-hook-form";
import { ProposalFormData } from "@/types/proposal";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MetricsStepProps {
  form: UseFormReturn<ProposalFormData>;
}

export const MetricsStep = ({ form }: MetricsStepProps) => {
  const metricOptions = [
    {
      id: "traffic",
      label: "Increase in website traffic",
      valueField: "traffic_increase",
      placeholder: "Enter target % increase"
    },
    {
      id: "conversion",
      label: "Boost in conversion rates",
      valueField: "conversion_increase",
      placeholder: "Enter target % increase"
    },
    {
      id: "leads",
      label: "New leads or sales target",
      valueField: "leads_target",
      placeholder: "Enter target number"
    },
    {
      id: "retention",
      label: "Improved customer retention",
      valueField: "retention_increase",
      placeholder: "Enter target % improvement"
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-semibold">Success Metrics</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Select and define your key success metrics for this project
        </p>
      </div>

      <FormField
        control={form.control}
        name="success_metrics"
        render={({ field }) => (
          <FormItem className="space-y-4">
            {metricOptions.map((metric) => (
              <div key={metric.id} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value?.some(m => m.id === metric.id)}
                    onCheckedChange={(checked) => {
                      const currentMetrics = field.value || [];
                      if (checked) {
                        field.onChange([...currentMetrics, { id: metric.id, value: "" }]);
                      } else {
                        field.onChange(currentMetrics.filter(m => m.id !== metric.id));
                      }
                    }}
                  />
                  <Label htmlFor={metric.id}>{metric.label}</Label>
                </div>
                {field.value?.some(m => m.id === metric.id) && (
                  <div className="ml-6">
                    <Input
                      id={metric.valueField}
                      placeholder={metric.placeholder}
                      value={field.value.find(m => m.id === metric.id)?.value || ""}
                      onChange={(e) => {
                        const currentMetrics = field.value || [];
                        const updatedMetrics = currentMetrics.map(m => 
                          m.id === metric.id ? { ...m, value: e.target.value } : m
                        );
                        field.onChange(updatedMetrics);
                      }}
                      className="max-w-xs"
                    />
                  </div>
                )}
              </div>
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};