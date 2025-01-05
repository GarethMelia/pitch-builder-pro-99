import { Button } from "@/components/ui/button";
import { ProposalFormData } from "@/types/proposal";
import { validateStep } from "@/utils/proposalValidation";
import { Loader2 } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  formData: ProposalFormData;
  isSubmitting?: boolean;
}

export const StepNavigation = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  formData,
  isSubmitting = false
}: StepNavigationProps) => {
  const isLastStep = currentStep === totalSteps;
  const isCurrentStepValid = validateStep(currentStep, formData);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="flex justify-between pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1 || isSubmitting}
      >
        Previous
      </Button>
      
      {isLastStep ? (
        <Button 
          type="submit"
          onClick={handleSubmit}
          disabled={!isCurrentStepValid || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Proposal...
            </>
          ) : (
            'Create Proposal'
          )}
        </Button>
      ) : (
        <Button 
          type="button" 
          onClick={onNext}
          disabled={!isCurrentStepValid || isSubmitting}
        >
          Next
        </Button>
      )}
    </div>
  );
};