import { UseFormReturn } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ProposalFormData } from "@/types/proposal"

interface ChallengesStrengthsStepProps {
  form: UseFormReturn<ProposalFormData>
}

const commonChallenges = [
  { id: "visibility", label: "Lack of online visibility" },
  { id: "speed", label: "Slow website speed" },
  { id: "competition", label: "High competition in the market" },
  { id: "conversion", label: "Low conversion rates" },
  { id: "engagement", label: "Poor user engagement" },
]

const commonStrengths = [
  { id: "loyalty", label: "Strong customer loyalty" },
  { id: "innovation", label: "Innovative products/services" },
  { id: "eco", label: "Eco-friendly practices" },
  { id: "service", label: "Award-winning service" },
  { id: "expertise", label: "Industry expertise" },
]

export function ChallengesStrengthsStep({ form }: ChallengesStrengthsStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-2">Company Challenges & Strengths</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Help us understand your company's position in the market
        </p>
      </div>

      {/* Challenges Section */}
      <FormField
        control={form.control}
        name="challenges"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel>What challenges is this company facing in its industry?</FormLabel>
            <div className="space-y-4">
              {commonChallenges.map((challenge) => (
                <div key={challenge.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value?.includes(challenge.label)}
                    onCheckedChange={(checked) => {
                      const currentChallenges = field.value || [];
                      if (checked) {
                        field.onChange([...currentChallenges, challenge.label]);
                      } else {
                        field.onChange(currentChallenges.filter(c => c !== challenge.label));
                      }
                    }}
                  />
                  <Label>{challenge.label}</Label>
                </div>
              ))}
              <FormControl>
                <Input
                  placeholder="Add other challenges..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.currentTarget;
                      const value = input.value.trim();
                      if (value && !field.value?.includes(value)) {
                        field.onChange([...(field.value || []), value]);
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

      {/* Strengths Section */}
      <FormField
        control={form.control}
        name="strengths"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel>What unique strengths does this company have?</FormLabel>
            <div className="space-y-4">
              {commonStrengths.map((strength) => (
                <div key={strength.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value?.includes(strength.label)}
                    onCheckedChange={(checked) => {
                      const currentStrengths = field.value || [];
                      if (checked) {
                        field.onChange([...currentStrengths, strength.label]);
                      } else {
                        field.onChange(currentStrengths.filter(s => s !== strength.label));
                      }
                    }}
                  />
                  <Label>{strength.label}</Label>
                </div>
              ))}
              <FormControl>
                <Input
                  placeholder="Add other strengths..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.currentTarget;
                      const value = input.value.trim();
                      if (value && !field.value?.includes(value)) {
                        field.onChange([...(field.value || []), value]);
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
  )
}