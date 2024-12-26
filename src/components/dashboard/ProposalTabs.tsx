import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Edit2, Share2, ArrowRight, Copy, FileText, CheckCircle2 } from "lucide-react";

const dummyProposals = {
  drafts: [
    { id: 1, title: "Website Redesign Proposal", client: "Tech Corp", lastEdited: "2024-03-20" },
    { id: 2, title: "Marketing Campaign Proposal", client: "Fashion Brand", lastEdited: "2024-03-19" },
  ],
  completed: [
    { id: 3, title: "SEO Strategy Proposal", client: "Local Business", lastEdited: "2024-03-15" },
    { id: 4, title: "Mobile App Development", client: "Startup Inc", lastEdited: "2024-03-10" },
  ],
};

export function ProposalTabs() {
  return (
    <Tabs defaultValue="drafts" className="w-full mb-8">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger 
          value="drafts" 
          className="data-[state=active]:bg-[#F97316] data-[state=active]:text-white transition-all duration-200 flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Drafts
        </TabsTrigger>
        <TabsTrigger 
          value="completed" 
          className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition-all duration-200 flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          Completed
        </TabsTrigger>
      </TabsList>

      <TabsContent value="drafts" className="space-y-4 animate-fade-in">
        {dummyProposals.drafts.map((proposal) => (
          <div
            key={proposal.id}
            className="relative p-6 rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-2px] pl-8"
          >
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#F97316] rounded-l-lg" />
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="font-semibold">{proposal.title}</h3>
                <p className="text-sm text-muted-foreground">{proposal.client}</p>
                <p className="text-xs text-muted-foreground">Last edited: {new Date(proposal.lastEdited).toLocaleDateString()}</p>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm" className="transition-all duration-200 hover:scale-105">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button size="sm" className="transition-all duration-200 hover:scale-105">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Continue
                </Button>
              </div>
            </div>
          </div>
        ))}
      </TabsContent>

      <TabsContent value="completed" className="space-y-4 animate-fade-in">
        {dummyProposals.completed.map((proposal) => (
          <div
            key={proposal.id}
            className="relative p-6 rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-2px] pl-8"
          >
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-emerald-500 rounded-l-lg" />
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="font-semibold">{proposal.title}</h3>
                <p className="text-sm text-muted-foreground">{proposal.client}</p>
                <p className="text-xs text-muted-foreground">Completed: {new Date(proposal.lastEdited).toLocaleDateString()}</p>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm" className="transition-all duration-200 hover:scale-105">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="transition-all duration-200 hover:scale-105">
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </Button>
                <Button size="sm" className="transition-all duration-200 hover:scale-105">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
}