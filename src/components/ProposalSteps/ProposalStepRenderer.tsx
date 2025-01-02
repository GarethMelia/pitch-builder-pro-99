import { UseFormReturn } from "react-hook-form";
import { ProposalFormData } from "@/types/proposal";
import { CompanyInfoStep } from "./CompanyInfoStep";
import { ProjectScopeStep } from "./ProjectScopeStep";
import { MetricsStep } from "./MetricsStep";
import { ChallengesStrengthsStep } from "./ChallengesStrengthsStep";
import { StrategiesStep } from "./StrategiesStep";
import { ProposalToneStep } from "./ProposalToneStep";
import { CompanyCredentialsStep } from "./CompanyCredentialsStep";
import { ClientInfoStep } from "./ClientInfoStep";

interface ProposalStepRendererProps {
  currentStep: number;
  form: UseFormReturn<ProposalFormData>;
}

export const ProposalStepRenderer = ({ currentStep, form }: ProposalStepRendererProps) => {
  switch (currentStep) {
    case 1:
      return <CompanyInfoStep form={form} />;
    case 2:
      return <ClientInfoStep form={form} />;
    case 3:
      return <ProjectScopeStep form={form} />;
    case 4:
      return <MetricsStep form={form} />;
    case 5:
      return <ChallengesStrengthsStep form={form} />;
    case 6:
      return <StrategiesStep form={form} />;
    case 7:
      return <ProposalToneStep form={form} />;
    case 8:
      return <CompanyCredentialsStep form={form} />;
    default:
      return null;
  }
};