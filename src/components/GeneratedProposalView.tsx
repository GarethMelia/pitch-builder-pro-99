import { ProposalFormData } from "@/types/proposal";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface GeneratedProposalViewProps {
  proposal: string;
  formData: ProposalFormData;
  onRegenerateClick: () => void;
}

export const GeneratedProposalView = ({ proposal, formData, onRegenerateClick }: GeneratedProposalViewProps) => {
  const navigate = useNavigate();
  const defaultCoverImage = "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=2000&q=80";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "what-we-will-do", title: "What We Will Do" },
    { id: "process-timescales", title: "Process and Timescales" },
    { id: "cost", title: "Cost" },
    { id: "terms-conditions", title: "Terms and Conditions" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-20 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <nav className="h-full flex flex-col p-6">
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className="w-full px-4 py-2 text-left text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="min-h-screen">
        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-30 p-2 rounded-md bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Header Section with Cover Image and Logo */}
        <div className="relative">
          <img 
            src={formData.cover_image || defaultCoverImage} 
            alt="Cover" 
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
          
          {/* Logo in Header */}
          {formData.company_logo && (
            <div className="absolute top-6 left-6 z-10">
              <img 
                src={formData.company_logo} 
                alt="Company Logo" 
                className="h-12 w-auto object-contain bg-white/90 p-2 rounded-md shadow-sm"
              />
            </div>
          )}
          
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <h1 className="text-3xl font-bold text-white mb-2">
              {formData.title || 'Untitled Proposal'}
            </h1>
            <div className="text-white/90 space-y-1 text-sm">
              <p>Prepared for: {formData.company_name || '[Client Name]'}</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto px-8 py-12 bg-white shadow-sm">
          <div className="prose prose-slate max-w-none">
            {/* Introduction Section */}
            <section id="introduction" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Introduction</h2>
              <div className="text-gray-600">
                {formData.primary_goal}
              </div>
            </section>

            {/* What We Will Do Section */}
            <section id="what-we-will-do" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Will Do</h2>
              <div className="space-y-4">
                {formData.services?.map((service, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                    <p className="text-gray-600">{service}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Process and Timescales Section */}
            <section id="process-timescales" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Process and Timescales</h2>
              <div className="space-y-4">
                {formData.recommended_strategies?.map((strategy, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="font-medium text-gray-900">{index + 1}.</span>
                    <p className="text-gray-600">{strategy}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Cost Section */}
            <section id="cost" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cost</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600">
                  Budget Range: {formData.budget_range || 'To be discussed'}
                </p>
              </div>
            </section>

            {/* Terms and Conditions Section */}
            <section id="terms-conditions" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms and Conditions</h2>
              <div className="text-gray-600">
                <div dangerouslySetInnerHTML={{ __html: proposal }} />
              </div>
            </section>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
            <Button onClick={onRegenerateClick}>
              Generate Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};