import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { UseFormReturn } from "react-hook-form";
import { ProposalFormData } from "@/types/proposal";

const TONE_OPTIONS = [
  { value: "professional", label: "Professional and technical" },
  { value: "creative", label: "Creative and innovative" },
  { value: "direct", label: "Direct and results-focused" },
];

export function ProposalToneStep({
  form,
}: {
  form: UseFormReturn<ProposalFormData>;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-2">Proposal Framing</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Choose how you want your proposal to be framed and presented.
        </p>
      </div>

      <FormField
        control={form.control}
        name="proposal_tone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How should the proposal be framed?</FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a tone for your proposal" />
                </SelectTrigger>
                <SelectContent>
                  {TONE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="persuasion_level"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Level of persuasiveness</FormLabel>
            <div className="space-y-4">
              <FormControl>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[parseInt(field.value || "0")]}
                  onValueChange={(value) => field.onChange(value[0].toString())}
                  className="w-full"
                />
              </FormControl>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Not sales pushy at all</span>
                <span>Very sales focused</span>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}