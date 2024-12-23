interface ProposalStatusBadgeProps {
  status: string;
}

export function ProposalStatusBadge({ status }: ProposalStatusBadgeProps) {
  return (
    <div className="flex items-center">
      <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
        status === 'draft' ? 'bg-yellow-500' : 'bg-green-500'
      }`} />
      {status}
    </div>
  );
}