import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ProposalFormData } from "@/types/proposal";

export const CompanyCredentialsStep = ({
  form,
}: {
  form: UseFormReturn<ProposalFormData>;
}) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="reasons_to_work_with"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reasons to Work With Us</FormLabel>
            <FormDescription>
              Explain what makes your company unique and why the client should choose you.
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="We specialize in delivering tailored solutions with a proven track record of success..."
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="awards_recognitions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Awards or Recognitions</FormLabel>
            <FormDescription>
              List any awards, certifications, or recognitions that showcase your credibility.
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="Winner of 'Best Marketing Agency 2023' by Industry Leaders Magazine..."
                onChange={(e) => field.onChange(e.target.value.split('\n'))}
                value={field.value?.join('\n') || ''}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="relevant_experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Relevant Experience or Projects</FormLabel>
            <FormDescription>
              Share past projects or experience that align with this client's needs.
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="Successfully increased Client X's website traffic by 200% within six months..."
                onChange={(e) => field.onChange(e.target.value.split('\n'))}
                value={field.value?.join('\n') || ''}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="guarantees"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Guarantees or Commitments</FormLabel>
            <FormDescription>
              List any guarantees, warranties, or special commitments you offer.
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="We guarantee a 10% boost in leads within 90 days..."
                onChange={(e) => field.onChange(e.target.value.split('\n'))}
                value={field.value?.join('\n') || ''}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="testimonials"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client Testimonials or Reviews</FormLabel>
            <FormDescription>
              Add quotes or references from previous clients to build trust.
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="'The team transformed our digital strategy, delivering incredible results!' – Client A..."
                onChange={(e) => {
                  const testimonials = e.target.value.split('\n').map(text => ({
                    text,
                    client: ''
                  }));
                  field.onChange(testimonials);
                }}
                value={field.value?.map(t => t.text).join('\n') || ''}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};