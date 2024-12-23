import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tables, Json } from "@/integrations/supabase/types";

// Update the Proposal interface to match the Supabase table structure
interface Proposal extends Tables<'proposals'> {
  content: Json | { text: string };
}

const Index = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = "/auth";
      } else {
        fetchProposals();
      }
    };
    
    checkUser();
  }, []);

  const fetchProposals = async () => {
    try {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data) {
        setProposals(data as Proposal[]);
      }
    } catch (error) {
      toast.error('Error fetching proposals');
      console.error('Error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      window.location.href = "/auth";
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
          <Button onClick={() => window.location.href = "/create"}>
            Create New Proposal
          </Button>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((proposal) => (
            <TableRow key={proposal.id}>
              <TableCell>{proposal.title}</TableCell>
              <TableCell>{proposal.status}</TableCell>
              <TableCell>{new Date(proposal.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(proposal.updated_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Index;