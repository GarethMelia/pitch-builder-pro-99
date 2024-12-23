import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FileEdit, Copy, Trash, FileText } from "lucide-react";
import { DeleteProposalDialog } from "./DeleteProposalDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProposalActionsProps {
  proposalId: string;
  onDelete: () => void;
}

export function ProposalActions({ proposalId, onDelete }: ProposalActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => navigate(`/edit/${proposalId}`)}>
            <FileEdit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(`/view/${proposalId}`)}>
            <FileText className="mr-2 h-4 w-4" />
            View PDF
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigate(`/duplicate/${proposalId}`)}
          >
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteProposalDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={onDelete}
      />
    </>
  );
}