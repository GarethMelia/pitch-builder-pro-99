import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ProposalFormData } from "@/types/proposal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectScopeStepProps {
  form: UseFormReturn<ProposalFormData>;
}

export const ProjectScopeStep = ({ form }: ProjectScopeStepProps) => {
  const timeframeOptions = [
    { value: "3_months", label: "3 months" },
    { value: "6_months", label: "6 months" },
    { value: "12_months", label: "12 months" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold">Project Scope</h2>
      
      <FormField
        control={form.control}
        name="services"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Services</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., web design, content marketing" 
                value={field.value?.join(", ") || ""}
                onChange={(e) => field.onChange(e.target.value.split(",").map(s => s.trim()))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="target_audience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Target Audience</FormLabel>
            <FormControl>
              <Input 
                placeholder="Describe the target demographics" 
                value={field.value?.demographics || ""}
                onChange={(e) => field.onChange({ ...field.value, demographics: e.target.value })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="timeframe"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Timeframe</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {timeframeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};