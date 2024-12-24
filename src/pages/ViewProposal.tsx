import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ProposalPDF } from '@/components/ProposalPDF';
import { ProposalFormData } from '@/types/proposal';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { FileDown, FileEdit } from "lucide-react";

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

        // Transform the data to match ProposalFormData type
        const transformedData: ProposalFormData = {
          title: data.title || '',
          company_name: data.company_name || '',
          website_url: data.website_url || '',
          primary_goal: data.primary_goal || '',
          services: Array.isArray(data.services) ? data.services : [],
          target_audience: data.target_audience || {},
          timeframe: data.timeframe || '',
          success_metrics: Array.isArray(data.success_metrics) ? data.success_metrics : [],
          budget_range: data.budget_range || '',
          internal_resources: Array.isArray(data.internal_resources) ? data.internal_resources : [],
          challenges: Array.isArray(data.challenges) ? data.challenges : [],
          strengths: Array.isArray(data.strengths) ? data.strengths : [],
          recommended_strategies: Array.isArray(data.recommended_strategies) ? data.recommended_strategies : [],
          proposal_tone: data.proposal_tone || '',
          custom_message: data.custom_message || '',
          persuasion_level: data.persuasion_level || '',
          content: data.content || '',
          reasons_to_work_with: data.reasons_to_work_with || '',
          awards_recognitions: Array.isArray(data.awards_recognitions) ? data.awards_recognitions : [],
          relevant_experience: Array.isArray(data.relevant_experience) ? data.relevant_experience : [],
          guarantees: Array.isArray(data.guarantees) ? data.guarantees : [],
          testimonials: Array.isArray(data.testimonials) ? data.testimonials : [],
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