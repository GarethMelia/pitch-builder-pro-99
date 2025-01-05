import { ProposalFormData } from "@/types/proposal";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileDown, FileEdit, ArrowLeft, Bird, Briefcase, LightbulbIcon, ClipboardList, Clock, DollarSign, FileText } from "lucide-react";

interface GeneratedProposalViewProps {
  proposal: string;
  formData: ProposalFormData;
  onRegenerateClick: () => void;
}

export const GeneratedProposalView = ({ proposal, formData, onRegenerateClick }: GeneratedProposalViewProps) => {
  const navigate = useNavigate();
  const defaultCoverImage = "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=2000&q=80";
  
  const sections = [
    { id: "executive-summary", title: "Executive Summary", icon: Bird },
    { id: "problem-statement", title: "Problem Statement", icon: Briefcase },
    { id: "proposed-solution", title: "Proposed Solution", icon: LightbulbIcon },
    { id: "implementation-plan", title: "Implementation Plan", icon: ClipboardList },
    { id: "timeline-milestones", title: "Timeline and Milestones", icon: Clock },
    { id: "pricing-payment", title: "Pricing and Payment Terms", icon: DollarSign },
    { id: "terms-conditions", title: "Terms and Conditions", icon: FileText }
  ];

  // Dummy client logos for demonstration
  const clientLogos = [
    "/lovable-uploads/c328bc78-1c3d-468f-aefb-76357044d4fb.png"
  ];

  const achievements = [
    { title: "Years of Experience", value: "10+" },
    { title: "Successful Projects", value: "500+" },
    { title: "Client Satisfaction", value: "98%" },
    { title: "Team Members", value: "50+" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Fixed Sidebar - 20% width */}
      <div className="w-[20%] fixed top-0 left-0 h-full bg-white shadow-lg">
        <nav className="h-full flex flex-col p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Content</h2>
          </div>
          <ul className="space-y-6">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <section.icon className="w-5 h-5 text-blue-500" />
                  <span>{section.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content - 80% width with offset */}
      <div className="w-[80%] ml-[20%] min-h-screen flex flex-col">
        {/* Executive Summary Section */}
        <section id="executive-summary" className="min-h-screen">
          {/* Cover Image Section */}
          <div className="relative h-[50vh] w-full">
            <img 
              src={formData.cover_image || defaultCoverImage} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
            
            {/* Logo */}
            {formData.company_logo && (
              <div className="absolute top-6 left-6 z-10">
                <img 
                  src={formData.company_logo} 
                  alt="Company Logo" 
                  className="h-16 w-auto object-contain bg-white/90 p-2 rounded-md shadow-sm"
                />
              </div>
            )}
            
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <h1 className="text-5xl font-bold text-white mb-4">
                {formData.title || 'Untitled Proposal'}
              </h1>
              <div className="text-white/90 space-y-2">
                <p className="text-xl">Prepared for: {formData.company_name || '[Client Name]'}</p>
                <p className="text-lg">Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* A Brief Look About Us */}
          <div className="max-w-6xl mx-auto px-8 py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">A Brief Look About Us</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              {formData.primary_goal}
            </p>

            {/* Previous Clients */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">Some of the clients we've worked with</h3>
              <div className="flex items-center justify-between gap-8 overflow-x-auto pb-4">
                {clientLogos.map((logo, index) => (
                  <img 
                    key={index}
                    src={logo}
                    alt={`Client ${index + 1}`}
                    className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                  />
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-4 gap-8 mb-16">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow"
                >
                  <h4 className="text-3xl font-bold text-blue-600 mb-2">{achievement.value}</h4>
                  <p className="text-gray-600">{achievement.title}</p>
                </div>
              ))}
            </div>

            {/* Strategies and Practices */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Strategies & Practices</h3>
              <div className="grid grid-cols-2 gap-8">
                {formData.recommended_strategies?.map((strategy, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{strategy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other sections */}
        <div className="max-w-6xl mx-auto px-8 py-12">
          {/* Problem Statement Section */}
          <section id="problem-statement" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Problem Statement</h2>
            <div className="prose prose-lg max-w-none">
              {formData.challenges?.map((challenge, index) => (
                <div key={index} className="mb-4">
                  <p className="text-gray-700">{challenge}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Proposed Solution Section */}
          <section id="proposed-solution" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Proposed Solution</h2>
            <div className="prose prose-lg max-w-none">
              {formData.services?.map((service, index) => (
                <div key={index} className="mb-4">
                  <p className="text-gray-700">{service}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Implementation Plan Section */}
          <section id="implementation-plan" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Implementation Plan</h2>
            <div className="prose prose-lg max-w-none">
              {/* Add implementation plan content */}
            </div>
          </section>

          {/* Timeline and Milestones Section */}
          <section id="timeline-milestones" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Timeline and Milestones</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700">{formData.timeframe}</p>
            </div>
          </section>

          {/* Pricing and Payment Terms Section */}
          <section id="pricing-payment" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Pricing and Payment Terms</h2>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="text-xl text-gray-700 mb-4">Budget Range: {formData.budget_range}</p>
            </div>
          </section>

          {/* Terms and Conditions Section */}
          <section id="terms-conditions" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h2>
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: proposal }} />
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8 mb-16">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <Button onClick={onRegenerateClick}>
              <FileEdit className="w-4 h-4 mr-2" />
              Generate Again
            </Button>
            <Button>
              <FileDown className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
