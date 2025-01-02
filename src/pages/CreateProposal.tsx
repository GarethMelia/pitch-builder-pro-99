import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { NavigationBar } from "@/components/layout/NavigationBar";
import { FooterSection } from "@/components/landing/FooterSection";
import { StepNavigation } from "@/components/ProposalSteps/StepNavigation";
import { CrawlForm } from "@/components/CrawlForm";
import { GeneratedProposalView } from "@/components/GeneratedProposalView";
import { ProposalFormData } from "@/types/proposal";
import { ProposalStepRenderer } from "@/components/ProposalSteps/ProposalStepRenderer";

const TOTAL_STEPS = 7;

const CreateProposal = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProposal, setGeneratedProposal] = useState<string | null>(null);
  
  const form = useForm<ProposalFormData>({
    defaultValues: {
      title: "",
      company_name: "",
      website_url: "",
      primary_goal: "",
      services: [],
      target_audience: {},
      success_metrics: [],
      internal_resources: [],
      challenges: [],
      strengths: [],
      recommended_strategies: [],
      proposal_tone: "",
      reasons_to_work_with: "",
      awards_recognitions: [],
      relevant_experience: [],
      guarantees: [],
      testimonials: [],
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

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = async (data: ProposalFormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from("proposals").insert({
        ...data,
        user_id: user.id,
        status: 'draft'
      });

      if (error) throw error;

      toast.success("Proposal created successfully!");
      setIsGenerating(true);
      setGeneratedProposal(null);

    } catch (error) {
      console.error("Error creating proposal:", error);
      toast.error("Failed to create proposal");
    }
  };

  const handleProposalGenerated = (proposal: string) => {
    setGeneratedProposal(proposal);
    setIsGenerating(false);
  };

  if (isGenerating || generatedProposal) {
    return (
      <div className="container max-w-3xl py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Generate Proposal</h1>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Website
            </Button>
            <Button variant="secondary" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </Button>
          </div>
        </div>
        
        {isGenerating && !generatedProposal && (
          <CrawlForm 
            formData={form.getValues()} 
            onProposalGenerated={handleProposalGenerated} 
          />
        )}
        
        {generatedProposal && (
          <GeneratedProposalView
            proposal={generatedProposal}
            formData={form.getValues()}
            onRegenerateClick={() => setGeneratedProposal(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      <div className="container max-w-3xl py-10">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Create New Proposal</h1>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => navigate("/")}>
                Back to Website
              </Button>
              <Button variant="secondary" onClick={() => navigate("/dashboard")}>
                Go to Dashboard
              </Button>
            </div>
          </div>
          <Progress value={(currentStep / TOTAL_STEPS) * 100} className="h-2 mt-4" />
          <p className="text-sm text-muted-foreground mt-2">
            Step {currentStep} of {TOTAL_STEPS}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ProposalStepRenderer currentStep={currentStep} form={form} />
            
            <StepNavigation
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              onPrevious={prevStep}
              onNext={nextStep}
              onSubmit={form.handleSubmit(onSubmit)}
              formData={form.getValues()}
            />
          </form>
        </Form>
      </div>
      <FooterSection />
    </div>
  );
};

export default CreateProposal;