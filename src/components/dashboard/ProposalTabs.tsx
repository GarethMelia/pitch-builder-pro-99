import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Edit2, Share2, ArrowRight } from "lucide-react";

const dummyProposals = {
  drafts: [
    { id: 1, title: "Website Redesign Proposal", client: "Tech Corp" },
    { id: 2, title: "Marketing Campaign Proposal", client: "Fashion Brand" },
  ],
  completed: [
    { id: 3, title: "SEO Strategy Proposal", client: "Local Business" },
    { id: 4, title: "Mobile App Development", client: "Startup Inc" },
  ],
};

export function ProposalTabs() {
  return (
    <Tabs defaultValue="drafts" className="w-full mb-8">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="drafts">🔹 Drafts</TabsTrigger>
        <TabsTrigger value="completed">🔹 Completed</TabsTrigger>
        <TabsTrigger value="templates">🔹 Templates</TabsTrigger>
      </TabsList>

      <TabsContent value="drafts" className="space-y-4">
        {dummyProposals.drafts.map((proposal) => (
          <div
            key={proposal.id}
            className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{proposal.title}</h3>
                <p className="text-sm text-muted-foreground">{proposal.client}</p>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button size="sm">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Continue
                </Button>
              </div>
            </div>
          </div>
        ))}
      </TabsContent>

      <TabsContent value="completed" className="space-y-4">
        {dummyProposals.completed.map((proposal) => (
          <div
            key={proposal.id}
            className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{proposal.title}</h3>
                <p className="text-sm text-muted-foreground">{proposal.client}</p>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        ))}
      </TabsContent>

      <TabsContent value="templates" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer"
            >
              <h3 className="font-semibold">Template {i + 1}</h3>
              <p className="text-sm text-muted-foreground">
                Professional template for business proposals
              </p>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}