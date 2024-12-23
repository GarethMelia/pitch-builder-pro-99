import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tables } from "@/integrations/supabase/types";
import { ProposalActions } from "./ProposalActions";
import { ProposalStatusBadge } from "./ProposalStatusBadge";

interface ProposalTableProps {
  proposals: Tables<'proposals'>[];
  onDelete: (id: string) => void;
  onDuplicate: (proposal: Tables<'proposals'>) => void;
  onEdit: (id: string) => void;
}

export function ProposalTable({ proposals, onDelete, onDuplicate, onEdit }: ProposalTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((proposal) => (
            <TableRow key={proposal.id}>
              <TableCell className="font-medium">{proposal.title}</TableCell>
              <TableCell>{proposal.company_name}</TableCell>
              <TableCell>
                <ProposalStatusBadge status={proposal.status} />
              </TableCell>
              <TableCell>{new Date(proposal.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(proposal.updated_at).toLocaleDateString()}</TableCell>
              <TableCell>
                <ProposalActions
                  proposal={proposal}
                  onDelete={onDelete}
                  onDuplicate={onDuplicate}
                  onEdit={onEdit}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}