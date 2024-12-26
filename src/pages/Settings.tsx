import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSection } from "@/components/settings/ProfileSection";
import { BillingSection } from "@/components/settings/BillingSection";
import { HelpSection } from "@/components/settings/HelpSection";
import { NavigationBar } from "@/components/layout/NavigationBar";
import { FooterSection } from "@/components/landing/FooterSection";

const Settings = () => {
  const { user } = useAuth();

  if (!user) {
    window.location.href = "/auth";
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