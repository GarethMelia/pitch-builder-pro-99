import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ProposalPDF } from '@/components/ProposalPDF';
import { ProposalFormData, MetricItem, TestimonialItem } from '@/types/proposal';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { FileDown, FileEdit } from "lucide-react";
import { Json } from '@/integrations/supabase/types';

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

        // Helper function to safely convert JSON array to string array
        const toStringArray = (jsonArray: Json[] | null): string[] => {
          if (!Array.isArray(jsonArray)) return [];
          return jsonArray.map(item => String(item));
        };

        // Helper function to safely convert JSON array to MetricItem array
        const toMetricItems = (jsonArray: Json[] | null): MetricItem[] => {
          if (!Array.isArray(jsonArray)) return [];
          return jsonArray.map(item => {
            if (typeof item === 'object' && item !== null) {
              return {
                id: String(item.id || ''),
                value: String(item.value || '')
              };
            }
            return { id: '', value: '' };
          });
        };

        // Helper function to safely convert JSON array to TestimonialItem array
        const toTestimonialItems = (jsonArray: Json[] | null): TestimonialItem[] => {
          if (!Array.isArray(jsonArray)) return [];
          return jsonArray.map(item => {
            if (typeof item === 'object' && item !== null) {
              return {
                text: String(item.text || ''),
                client: String(item.client || '')
              };
            }
            return { text: '', client: '' };
          });
        };

        // Transform the data to match ProposalFormData type with proper type conversion
        const transformedData: ProposalFormData = {
          title: String(data.title || ''),
          company_name: String(data.company_name || ''),
          website_url: String(data.website_url || ''),
          primary_goal: String(data.primary_goal || ''),
          services: toStringArray(data.services as Json[]),
          target_audience: {
            demographics: typeof data.target_audience === 'object' ? String(data.target_audience?.demographics || '') : '',
            interests: Array.isArray(data.target_audience?.interests) ? data.target_audience.interests.map(String) : []
          },
          timeframe: String(data.timeframe || ''),
          success_metrics: toMetricItems(data.success_metrics as Json[]),
          budget_range: String(data.budget_range || ''),
          internal_resources: toStringArray(data.internal_resources as Json[]),
          challenges: toStringArray(data.challenges as Json[]),
          strengths: toStringArray(data.strengths as Json[]),
          recommended_strategies: toStringArray(data.recommended_strategies as Json[]),
          proposal_tone: String(data.proposal_tone || ''),
          custom_message: String(data.custom_message || ''),
          persuasion_level: String(data.persuasion_level || ''),
          content: String(data.content || ''),
          reasons_to_work_with: String(data.reasons_to_work_with || ''),
          awards_recognitions: Array.isArray(data.awards_recognitions) ? data.awards_recognitions.map(String) : [],
          relevant_experience: Array.isArray(data.relevant_experience) ? data.relevant_experience.map(String) : [],
          guarantees: Array.isArray(data.guarantees) ? data.guarantees.map(String) : [],
          testimonials: toTestimonialItems(data.testimonials as Json[]),
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{proposal.title || 'Untitled Proposal'}</h1>
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