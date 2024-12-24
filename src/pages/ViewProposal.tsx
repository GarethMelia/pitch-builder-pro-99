import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ProposalPDF } from '@/components/ProposalPDF';
import { ProposalFormData, MetricItem, TestimonialItem } from '@/types/proposal';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { FileDown, FileEdit, ArrowLeft } from "lucide-react";

const ViewProposal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState<ProposalFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        console.log('Fetching proposal with ID:', id);
        
        const { data, error } = await supabase
          .from('proposals')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching proposal:', error);
          throw error;
        }

        console.log('Fetched proposal data:', data);

        if (!data) {
          toast.error('Proposal not found');
          return;
        }

        // Helper function to safely parse JSON array to string array
        const toStringArray = (value: unknown): string[] => {
          if (Array.isArray(value)) {
            return value.map(item => String(item));
          }
          return [];
        };

        // Helper function to safely parse metrics
        const parseMetrics = (value: unknown): MetricItem[] => {
          if (Array.isArray(value)) {
            return value.map(item => {
              if (typeof item === 'object' && item !== null) {
                return {
                  id: String((item as any).id || ''),
                  value: String((item as any).value || '')
                };
              }
              return { id: '', value: '' };
            });
          }
          return [];
        };

        // Helper function to safely parse testimonials
        const parseTestimonials = (value: unknown): TestimonialItem[] => {
          if (Array.isArray(value)) {
            return value.map(item => {
              if (typeof item === 'object' && item !== null) {
                return {
                  text: String((item as any).text || ''),
                  client: String((item as any).client || '')
                };
              }
              return { text: '', client: '' };
            });
          }
          return [];
        };

        // Helper function to safely parse target audience
        const parseTargetAudience = (value: unknown): { demographics?: string; interests?: string[] } => {
          if (typeof value === 'object' && value !== null) {
            const audience = value as any;
            return {
              demographics: typeof audience.demographics === 'string' ? audience.demographics : '',
              interests: Array.isArray(audience.interests) ? audience.interests.map(String) : []
            };
          }
          return { demographics: '', interests: [] };
        };

        // Transform the data to match ProposalFormData type
        const transformedData: ProposalFormData = {
          title: String(data.title || ''),
          company_name: String(data.company_name || ''),
          website_url: String(data.website_url || ''),
          primary_goal: String(data.primary_goal || ''),
          services: toStringArray(data.services),
          target_audience: parseTargetAudience(data.target_audience),
          timeframe: String(data.timeframe || ''),
          success_metrics: parseMetrics(data.success_metrics),
          budget_range: String(data.budget_range || ''),
          internal_resources: toStringArray(data.internal_resources),
          challenges: toStringArray(data.challenges),
          strengths: toStringArray(data.strengths),
          recommended_strategies: toStringArray(data.recommended_strategies),
          proposal_tone: String(data.proposal_tone || ''),
          custom_message: String(data.custom_message || ''),
          persuasion_level: String(data.persuasion_level || ''),
          content: String(data.content || ''),
          reasons_to_work_with: String(data.reasons_to_work_with || ''),
          awards_recognitions: toStringArray(data.awards_recognitions),
          relevant_experience: toStringArray(data.relevant_experience),
          guarantees: toStringArray(data.guarantees),
          testimonials: parseTestimonials(data.testimonials),
        };

        console.log('Transformed proposal data:', transformedData);
        setProposal(transformedData);
      } catch (error) {
        console.error('Error in fetchProposal:', error);
        toast.error('Failed to load proposal');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProposal();
    }
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-xl font-semibold mb-4">Proposal not found</h2>
        <Button onClick={() => navigate('/')}>Return to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <h1 className="text-2xl font-bold flex-1">{proposal.title || 'Untitled Proposal'}</h1>
        <div className="space-x-4">
          <Button onClick={handleEdit} variant="outline">
            <FileEdit className="w-4 h-4 mr-2" />
            Edit Proposal
          </Button>
          <Button>
            <FileDown className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg">
        <ProposalPDF data={proposal} />
      </div>
    </div>
  );
};

export default ViewProposal;