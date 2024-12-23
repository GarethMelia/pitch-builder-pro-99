import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { CompanyInfoStep } from "@/components/ProposalSteps/CompanyInfoStep";
import { ProjectScopeStep } from "@/components/ProposalSteps/ProjectScopeStep";
import { ProposalFormData } from "@/types/proposal";

const TOTAL_STEPS = 8;

const CreateProposal = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const form = useForm<ProposalFormData>({
    defaultValues: {
      services: [],
      target_audience: {},
      success_metrics: [],
      internal_resources: [],
      challenges: [],
      strengths: [],
      recommended_strategies: [],
    }
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  const onSubmit = async (data: ProposalFormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from("proposals").insert({
        title: data.title,
        company_name: data.company_name,
        website_url: data.website_url,
        primary_goal: data.primary_goal,
        services: data.services,
        target_audience: data.target_audience,
        timeframe: data.timeframe,
        success_metrics: data.success_metrics,
        budget_range: data.budget_range,
        internal_resources: data.internal_resources,
        challenges: data.challenges,
        strengths: data.strengths,
        recommended_strategies: data.recommended_strategies,
        proposal_tone: data.proposal_tone,
        custom_message: data.custom_message,
        persuasion_level: data.persuasion_level,
        content: { text: data.content },
        user_id: user.id,
      });

      if (error) throw error;

      toast.success("Proposal created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating proposal:", error);
      toast.error("Failed to create proposal");
    }
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CompanyInfoStep form={form} />;
      case 2:
        return <ProjectScopeStep form={form} />;
      // Additional steps will be added here
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Create New Proposal</h1>
        <Progress value={(currentStep / TOTAL_STEPS) * 100} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          Step {currentStep} of {TOTAL_STEPS}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {renderStep()}
          
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < TOTAL_STEPS ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isGenerating}>
                Create Proposal
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateProposal;