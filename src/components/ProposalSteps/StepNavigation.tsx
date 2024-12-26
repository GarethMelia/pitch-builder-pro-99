import { Button } from "@/components/ui/button";
import { ProposalFormData } from "@/types/proposal";
import { validateStep } from "@/utils/proposalValidation";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  formData: ProposalFormData;
}

export const StepNavigation = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  formData
}: StepNavigationProps) => {
  const isLastStep = currentStep === totalSteps;
  const isCurrentStepValid = validateStep(currentStep, formData);

  return (
    <div className="flex justify-between pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
      >
        Previous
      </Button>
      
      {isLastStep ? (
        <Button 
          type="submit"
          onClick={onSubmit}
          disabled={!isCurrentStepValid}
        >
          Create Proposal
        </Button>
      ) : (
        <Button 
          type="button" 
          onClick={onNext}
          disabled={!isCurrentStepValid}
        >
          Next
        </Button>
      )}
    </div>
  );
};