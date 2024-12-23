import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProposalForm {
  title: string;
  content: string;
}

const CreateProposal = () => {
  const navigate = useNavigate();
  const form = useForm<ProposalForm>();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  const onSubmit = async (data: ProposalForm) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from("proposals").insert({
        title: data.title,
        content: { text: data.content },
        user_id: user.id,
      });

      if (error) throw error;

      toast.success("Proposal created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating proposal:", error);
      toast.error("Failed to create proposal");
    }
  };

  const generateWithAI = async () => {
    try {
      setIsGenerating(true);
      const topic = form.getValues("title");
      
      if (!topic) {
        toast.error("Please enter a topic first");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-proposal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ topic }),
        }
      );

      if (!response.ok) throw new Error("Failed to generate proposal");

      const data = await response.json();
      
      form.setValue("title", data.title);
      form.setValue("content", data.content);
      toast.success("Proposal generated successfully!");
    } catch (error) {
      console.error("Error generating proposal:", error);
      toast.error("Failed to generate proposal");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-2xl font-bold mb-8">Create New Proposal</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title or Topic</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input placeholder="Enter proposal title or topic" {...field} />
                  </FormControl>
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={generateWithAI}
                    disabled={isGenerating}
                  >
                    {isGenerating ? "Generating..." : "Generate with AI"}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Write your proposal content here..."
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button type="submit">Create Proposal</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateProposal;