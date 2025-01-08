import { UseFormReturn } from "react-hook-form";
import { ProposalFormData } from "@/types/proposal";
import { BasicInfoInputs } from "./CompanyInfo/BasicInfoInputs";
import { WebsiteUrlInput } from "./CompanyInfo/WebsiteUrlInput";
import { ImageInputs } from "./CompanyInfo/ImageInputs";

interface CompanyInfoStepProps {
  form: UseFormReturn<ProposalFormData>;
}

export const CompanyInfoStep = ({ form }: CompanyInfoStepProps) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold">General Company Information</h2>
      
      <BasicInfoInputs form={form} />
      <WebsiteUrlInput form={form} />
      <ImageInputs form={form} />
    </div>
  );
};