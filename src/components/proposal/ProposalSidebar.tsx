import { Bird, Briefcase, LightbulbIcon, ClipboardList, Clock, DollarSign, FileText } from "lucide-react";

const sections = [
  { id: "executive-summary", title: "Executive Summary", icon: Bird },
  { id: "problem-statement", title: "Problem Statement", icon: Briefcase },
  { id: "proposed-solution", title: "Proposed Solution", icon: LightbulbIcon },
  { id: "implementation-plan", title: "Implementation Plan", icon: ClipboardList },
  { id: "timeline-milestones", title: "Timeline and Milestones", icon: Clock },
  { id: "pricing-payment", title: "Pricing and Payment Terms", icon: DollarSign },
  { id: "terms-conditions", title: "Terms and Conditions", icon: FileText }
];

interface ProposalSidebarProps {
  onSectionClick: (id: string) => void;
}

export const ProposalSidebar = ({ onSectionClick }: ProposalSidebarProps) => {
  return (
    <div className="fixed top-0 left-0 h-full w-[280px] bg-white shadow-lg">
      <nav className="h-full flex flex-col p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Content</h2>
        </div>
        <ul className="space-y-4">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => onSectionClick(section.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <section.icon className="w-5 h-5 text-blue-500" />
                <span>{section.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};