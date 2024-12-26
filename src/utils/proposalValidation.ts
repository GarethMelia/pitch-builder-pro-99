import { ProposalFormData } from "@/types/proposal";

export const validateStep = (step: number, formData: ProposalFormData): boolean => {
  switch (step) {
    case 1:
      return !!(formData.title && formData.company_name && formData.website_url && formData.primary_goal);
    case 2:
      return !!(formData.services?.length && formData.target_audience && formData.timeframe);
    case 3:
      return !!(formData.success_metrics?.length > 0);
    case 4:
      return !!(formData.challenges?.length > 0 && formData.strengths?.length > 0);
    case 5:
      return !!(formData.recommended_strategies?.length > 0);
    case 6:
      return !!(formData.proposal_tone && formData.persuasion_level);
    case 7:
      return !!(formData.reasons_to_work_with && 
        formData.awards_recognitions?.length > 0 && 
        formData.relevant_experience?.length > 0);
    default:
      return false;
  }
};