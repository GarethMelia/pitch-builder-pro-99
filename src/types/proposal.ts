export interface MetricItem {
  id: string;
  value: string;
}

export interface TestimonialItem {
  text: string;
  client: string;
}

export interface ProposalFormData {
  title: string;
  company_name: string;
  website_url: string;
  primary_goal: string;
  services: string[];
  target_audience: {
    demographics?: string;
    interests?: string[];
  };
  timeframe: string;
  success_metrics: MetricItem[];
  budget_range: string;
  internal_resources: string[];
  challenges: string[];
  strengths: string[];
  recommended_strategies: string[];
  proposal_tone: string;
  custom_message?: string;
  persuasion_level: string;
  content: string;
  reasons_to_work_with?: string;
  awards_recognitions?: string[];
  relevant_experience?: string[];
  guarantees?: string[];
  testimonials?: TestimonialItem[];
}