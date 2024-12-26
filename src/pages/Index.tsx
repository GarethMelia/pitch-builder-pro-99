import { NavigationBar } from "@/components/layout/NavigationBar";
import { FooterSection } from "@/components/landing/FooterSection";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { ProposalTabs } from "@/components/dashboard/ProposalTabs";
import { TemplateLibrary } from "@/components/dashboard/TemplateLibrary";
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="container py-8">
        <WelcomeSection />
        <ProposalTabs />
        <TemplateLibrary />
        <AnalyticsSection />
      </main>
      <FooterSection />
    </div>
  );
}