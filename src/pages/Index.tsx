import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";
import { useNavigate } from "react-router-dom";
import { ProposalTable } from "@/components/proposals/ProposalTable";
import { DeleteProposalDialog } from "@/components/proposals/DeleteProposalDialog";

const Index = () => {
  const [proposals, setProposals] = useState<Tables<'proposals'>[]>([]);
  const [deleteProposalId, setDeleteProposalId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      } else {
        fetchProposals();
      }
    };
    
    checkUser();
  }, [navigate]);

  const fetchProposals = async () => {
    try {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data) {
        setProposals(data);
      }
    } catch (error) {
      toast.error('Error fetching proposals');
      console.error('Error:', error);
    }
  };

  const handleDuplicate = async (proposal: Tables<'proposals'>) => {
    try {
      const { id, created_at, updated_at, ...proposalData } = proposal;
      const newTitle = `${proposalData.title} (Copy)`;
      
      const { error } = await supabase
        .from('proposals')
        .insert({ ...proposalData, title: newTitle });

      if (error) throw error;
      
      toast.success('Proposal duplicated successfully');
      fetchProposals();
    } catch (error) {
      toast.error('Error duplicating proposal');
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteProposalId) return;
    
    try {
      const { error } = await supabase
        .from('proposals')
        .delete()
        .eq('id', deleteProposalId);

      if (error) throw error;
      
      toast.success('Proposal deleted successfully');
      setDeleteProposalId(null);
      fetchProposals();
    } catch (error) {
      toast.error('Error deleting proposal');
      console.error('Error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/auth");
    } catch (error) {
      toast.error('Error signing out');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Proposals</h1>
        <div className="space-x-4">
          <Button onClick={() => navigate("/create")}>
            Create New Proposal
          </Button>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>

      <ProposalTable
        proposals={proposals}
        onDelete={setDeleteProposalId}
        onDuplicate={handleDuplicate}
        onEdit={(id) => navigate(`/edit/${id}`)}
      />

      <DeleteProposalDialog
        open={!!deleteProposalId}
        onOpenChange={() => setDeleteProposalId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Index;