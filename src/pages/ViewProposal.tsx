import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ProposalPDF } from '@/components/ProposalPDF';
import { ProposalFormData, MetricItem } from '@/types/proposal';
import { toast } from 'sonner';

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
          ...data,
          success_metrics: Array.isArray(data.success_metrics) 
            ? data.success_metrics.map((metric: any) => ({
                id: metric.id,
                value: metric.value
              }))
            : [],
          testimonials: Array.isArray(data.testimonials)
            ? data.testimonials.map((testimonial: any) => ({
                text: testimonial.text,
                client: testimonial.client
              }))
            : [],
          services: Array.isArray(data.services) ? data.services : [],
          challenges: Array.isArray(data.challenges) ? data.challenges : [],
          strengths: Array.isArray(data.strengths) ? data.strengths : [],
          recommended_strategies: Array.isArray(data.recommended_strategies) ? data.recommended_strategies : [],
          awards_recognitions: Array.isArray(data.awards_recognitions) ? data.awards_recognitions : [],
          relevant_experience: Array.isArray(data.relevant_experience) ? data.relevant_experience : [],
          guarantees: Array.isArray(data.guarantees) ? data.guarantees : [],
          target_audience: typeof data.target_audience === 'object' ? data.target_audience : {},
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