import { NavigationBar } from "@/components/layout/NavigationBar";
import { FooterSection } from "@/components/landing/FooterSection";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { ProposalTabs } from "@/components/dashboard/ProposalTabs";
import { TemplateLibrary } from "@/components/dashboard/TemplateLibrary";
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection";
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { user, loading } = useAuth();

  // Show nothing while checking auth state
  if (loading) {
    return null;
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

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