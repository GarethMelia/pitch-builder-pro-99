import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { NavigationBar } from "@/components/layout/NavigationBar";
import { FooterSection } from "@/components/landing/FooterSection";
import { CompanyInfoStep } from "@/components/ProposalSteps/CompanyInfoStep";
import { ProjectScopeStep } from "@/components/ProposalSteps/ProjectScopeStep";
import { MetricsStep } from "@/components/ProposalSteps/MetricsStep";
import { ChallengesStrengthsStep } from "@/components/ProposalSteps/ChallengesStrengthsStep";
import { StrategiesStep } from "@/components/ProposalSteps/StrategiesStep";
import { ProposalToneStep } from "@/components/ProposalSteps/ProposalToneStep";
import { CompanyCredentialsStep } from "@/components/ProposalSteps/CompanyCredentialsStep";
import { StepNavigation } from "@/components/ProposalSteps/StepNavigation";
import { CrawlForm } from "@/components/CrawlForm";
import { ProposalFormData } from "@/types/proposal";

const TOTAL_STEPS = 7;

const CreateProposal = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProposal, setGeneratedProposal] = useState<string | null>(null);
  const [stepsCompleted, setStepsCompleted] = useState<boolean[]>(Array(TOTAL_STEPS).fill(false));
  
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

  const validateCurrentStep = () => {
    const currentFields = getFieldsForStep(currentStep);
    return currentFields.every(field => {
      const value = form.getValues(field as any);
      return value && (Array.isArray(value) ? value.length > 0 : true);
    });
  };

  const getFieldsForStep = (step: number): string[] => {
    switch (step) {
      case 1:
        return ['title', 'company_name', 'website_url', 'primary_goal'];
      case 2:
        return ['services', 'target_audience', 'timeframe'];
      case 3:
        return ['success_metrics'];
      case 4:
        return ['challenges', 'strengths'];
      case 5:
        return ['recommended_strategies'];
      case 6:
        return ['proposal_tone', 'persuasion_level'];
      case 7:
        return ['reasons_to_work_with', 'awards_recognitions', 'relevant_experience'];
      default:
        return [];
    }
  };

  const nextStep = async () => {
    const isValid = validateCurrentStep();
    if (!isValid) {
      toast.error("Please complete all fields in this step before proceeding.");
      return;
    }

    const newStepsCompleted = [...stepsCompleted];
    newStepsCompleted[currentStep - 1] = true;
    setStepsCompleted(newStepsCompleted);
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: ProposalFormData) => {
    const isValid = validateCurrentStep();
    if (!isValid) {
      toast.error("Please complete all fields in the final step.");
      return;
    }

    setStepsCompleted(prev => {
      const newSteps = [...prev];
      newSteps[TOTAL_STEPS - 1] = true;
      return newSteps;
    });

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const transformedMetrics = data.success_metrics.map(metric => ({
        id: metric.id,
        value: metric.value
      }));

      const transformedTestimonials = data.testimonials?.map(testimonial => ({
        text: testimonial.text,
        client: testimonial.client
      }));

      const { data: proposal, error } = await supabase.from("proposals").insert({
        title: data.title,
        company_name: data.company_name,
        website_url: data.website_url,
        primary_goal: data.primary_goal,
        services: data.services,
        target_audience: data.target_audience,
        timeframe: data.timeframe,
        success_metrics: transformedMetrics,
        budget_range: data.budget_range,
        internal_resources: data.internal_resources,
        challenges: data.challenges,
        strengths: data.strengths,
        recommended_strategies: data.recommended_strategies,
        proposal_tone: data.proposal_tone,
        custom_message: data.custom_message,
        persuasion_level: data.persuasion_level,
        content: { text: data.content },
        reasons_to_work_with: data.reasons_to_work_with,
        awards_recognitions: data.awards_recognitions,
        relevant_experience: data.relevant_experience,
        guarantees: data.guarantees,
        testimonials: transformedTestimonials,
        user_id: user.id,
        status: 'draft'
      }).select().single();

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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CompanyInfoStep form={form} />;
      case 2:
        return <ProjectScopeStep form={form} />;
      case 3:
        return <MetricsStep form={form} />;
      case 4:
        return <ChallengesStrengthsStep form={form} />;
      case 5:
        return <StrategiesStep form={form} />;
      case 6:
        return <ProposalToneStep form={form} />;
      case 7:
        return <CompanyCredentialsStep form={form} />;
      default:
        return null;
    }
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
          <div className="space-y-4">
            <div className="p-6 bg-white rounded-lg shadow prose prose-slate max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: generatedProposal }}
                className="prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-strong:text-gray-800 prose-ul:list-disc prose-ol:list-decimal"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </Button>
              <Button onClick={() => setGeneratedProposal(null)}>
                Generate Again
              </Button>
            </div>
          </div>
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
            {renderStep()}
            
            <StepNavigation
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              stepsCompleted={stepsCompleted}
              onPrevious={prevStep}
              onNext={nextStep}
              onSubmit={form.handleSubmit(onSubmit)}
            />
          </form>
        </Form>
      </div>
      <FooterSection />
    </div>
  );
};

export default CreateProposal;
