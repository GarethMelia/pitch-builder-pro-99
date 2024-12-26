import { Button } from "@/components/ui/button";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  stepsCompleted: boolean[];
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const StepNavigation = ({
  currentStep,
  totalSteps,
  stepsCompleted,
  onPrevious,
  onNext,
  onSubmit
}: StepNavigationProps) => {
  const isLastStep = currentStep === totalSteps;
  const allPreviousStepsCompleted = stepsCompleted.slice(0, currentStep).every(Boolean);

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
          disabled={!allPreviousStepsCompleted}
        >
          Create Proposal
        </Button>
      ) : (
        <Button 
          type="button" 
          onClick={onNext}
          disabled={!stepsCompleted[currentStep - 1]}
        >
          Next
        </Button>
      )}
    </div>
  );
};