import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CrawlForm } from "@/components/CrawlForm";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateProposal = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    pricingTier: "",
    goal: "",
    timeframe: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>

        <Card className="p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-primary mb-8">Create New Proposal</h1>

          <div className="space-y-6">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                className="mt-1"
                placeholder="Enter client company name"
              />
            </div>

            <div>
              <Label htmlFor="pricingTier">Pricing Tier</Label>
              <Select
                value={formData.pricingTier}
                onValueChange={(value) => handleInputChange("pricingTier", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select pricing tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter ($1,000/mo)</SelectItem>
                  <SelectItem value="growth">Growth ($2,500/mo)</SelectItem>
                  <SelectItem value="enterprise">Enterprise ($5,000+/mo)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="goal">Primary Goal</Label>
              <Select
                value={formData.goal}
                onValueChange={(value) => handleInputChange("goal", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select primary goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue Growth</SelectItem>
                  <SelectItem value="leads">Lead Generation</SelectItem>
                  <SelectItem value="awareness">Brand Awareness</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timeframe">Project Timeframe</Label>
              <Select
                value={formData.timeframe}
                onValueChange={(value) => handleInputChange("timeframe", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Months</SelectItem>
                  <SelectItem value="6">6 Months</SelectItem>
                  <SelectItem value="12">12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Website Analysis</h2>
              <CrawlForm />
            </div>

            <Button
              className="w-full mt-8"
              size="lg"
              disabled={isLoading}
              onClick={() => {
                // TODO: Implement proposal generation
                setIsLoading(true);
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Proposal...
                </>
              ) : (
                "Generate Proposal"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateProposal;