import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSection } from "@/components/settings/ProfileSection";
import { BillingSection } from "@/components/settings/BillingSection";
import { HelpSection } from "@/components/settings/HelpSection";
import { NavigationBar } from "@/components/layout/NavigationBar";
import { FooterSection } from "@/components/landing/FooterSection";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Settings = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Only redirect if we're sure the user is not authenticated
    if (!loading && !user) {
      navigate("/auth");
    } else if (!loading && user) {
      setIsAuthenticated(true);
    }
  }, [user, loading, navigate]);

  // Show nothing while checking authentication
  if (loading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="container max-w-4xl py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="w-full justify-start border-b">
            <TabsTrigger value="profile" className="flex-1 max-w-[200px]">Profile</TabsTrigger>
            <TabsTrigger value="billing" className="flex-1 max-w-[200px]">Billing</TabsTrigger>
            <TabsTrigger value="help" className="flex-1 max-w-[200px]">Help Center</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileSection />
          </TabsContent>

          <TabsContent value="billing">
            <BillingSection />
          </TabsContent>

          <TabsContent value="help">
            <HelpSection />
          </TabsContent>
        </Tabs>
      </main>
      <FooterSection />
    </div>
  );
};

export default Settings;