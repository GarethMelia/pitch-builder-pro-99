import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ProposalPDF } from '@/components/ProposalPDF';
import { ProposalFormData } from '@/types/proposal';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';

const ViewProposal = () => {
  const { id } = useParams();
  const [proposal, setProposal] = useState<ProposalFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const { data, error } = await supabase
          .from('proposals')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        // Transform the data to match ProposalFormData type
        const transformedData: ProposalFormData = {
          title: String(data.title || ''),
          company_name: String(data.company_name || ''),
          website_url: String(data.website_url || ''),
          primary_goal: String(data.primary_goal || ''),
          budget_range: String(data.budget_range || ''),
          proposal_tone: String(data.proposal_tone || ''),
          custom_message: String(data.custom_message || ''),
          persuasion_level: String(data.persuasion_level || ''),
          content: String(data.content || ''),
          reasons_to_work_with: String(data.reasons_to_work_with || ''),
          timeframe: String(data.timeframe || ''),
          success_metrics: Array.isArray(data.success_metrics)
            ? data.success_metrics.map((metric: any) => ({
                id: String(metric.id),
                value: String(metric.value)
              }))
            : [],
          testimonials: Array.isArray(data.testimonials)
            ? data.testimonials.map((testimonial: any) => ({
                text: String(testimonial.text),
                client: String(testimonial.client)
              }))
            : [],
          services: Array.isArray(data.services) ? data.services.map(String) : [],
          challenges: Array.isArray(data.challenges) ? data.challenges.map(String) : [],
          strengths: Array.isArray(data.strengths) ? data.strengths.map(String) : [],
          recommended_strategies: Array.isArray(data.recommended_strategies) 
            ? data.recommended_strategies.map(String) 
            : [],
          awards_recognitions: Array.isArray(data.awards_recognitions) 
            ? data.awards_recognitions.map(String) 
            : [],
          relevant_experience: Array.isArray(data.relevant_experience) 
            ? data.relevant_experience.map(String) 
            : [],
          guarantees: Array.isArray(data.guarantees) 
            ? data.guarantees.map(String) 
            : [],
          internal_resources: Array.isArray(data.internal_resources) 
            ? data.internal_resources.map(String) 
            : [],
          target_audience: {
            demographics: typeof data.target_audience === 'object' && 
                         data.target_audience !== null &&
                         'demographics' in data.target_audience
              ? String(data.target_audience.demographics)
              : '',
            interests: typeof data.target_audience === 'object' && 
                      data.target_audience !== null &&
                      'interests' in data.target_audience &&
                      Array.isArray(data.target_audience.interests)
              ? data.target_audience.interests.map(String)
              : []
          }
        };

        setProposal(transformedData);
      } catch (error) {
        console.error('Error fetching proposal:', error);
        toast.error('Failed to load proposal');
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!proposal) {
    return <div className="flex justify-center items-center h-screen">Proposal not found</div>;
  }

  return (
    <div className="container py-8">
      <ProposalPDF data={proposal} />
    </div>
  );
};

export default ViewProposal;