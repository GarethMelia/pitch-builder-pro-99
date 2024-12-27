import { 
  Briefcase, FileText, Users, PenTool, Building, 
  Presentation, HandshakeIcon, BookOpen, MessageSquare, 
  Target, ShoppingBag, Award
} from "lucide-react";

interface UseCaseItem {
  icon: React.ElementType;
  description: string;
  category: string;
  color: string;
  hoverColor: string;
}

const useCases: UseCaseItem[] = [
  {
    icon: Briefcase,
    description: "Need to pitch a consulting project?",
    category: "Proposal Templates",
    color: "text-blue-500",
    hoverColor: "group-hover:text-blue-600",
  },
  {
    icon: PenTool,
    description: "Want to propose a design service?",
    category: "Proposal Templates",
    color: "text-blue-500",
    hoverColor: "group-hover:text-blue-600",
  },
  {
    icon: Building,
    description: "Preparing a construction estimate?",
    category: "Quote Templates",
    color: "text-yellow-500",
    hoverColor: "group-hover:text-yellow-600",
  },
  {
    icon: ShoppingBag,
    description: "Need to quote for product supplies?",
    category: "Quote Templates",
    color: "text-yellow-500",
    hoverColor: "group-hover:text-yellow-600",
  },
  {
    icon: FileText,
    description: "Setting up a service agreement?",
    category: "Contract Templates",
    color: "text-green-500",
    hoverColor: "group-hover:text-green-600",
  },
  {
    icon: HandshakeIcon,
    description: "Need a partnership contract?",
    category: "Contract Templates",
    color: "text-green-500",
    hoverColor: "group-hover:text-green-600",
  },
  {
    icon: Users,
    description: "Hiring for a senior position?",
    category: "Job Offer Templates",
    color: "text-purple-500",
    hoverColor: "group-hover:text-purple-600",
  },
  {
    icon: Target,
    description: "Looking for entry-level talent?",
    category: "Job Offer Templates",
    color: "text-purple-500",
    hoverColor: "group-hover:text-purple-600",
  },
  {
    icon: MessageSquare,
    description: "Need project milestone approval?",
    category: "Sign-Off Templates",
    color: "text-pink-500",
    hoverColor: "group-hover:text-pink-600",
  },
  {
    icon: Award,
    description: "Completing a project phase?",
    category: "Sign-Off Templates",
    color: "text-pink-500",
    hoverColor: "group-hover:text-pink-600",
  },
  {
    icon: Presentation,
    description: "Showcasing your services?",
    category: "Brochure Templates",
    color: "text-indigo-500",
    hoverColor: "group-hover:text-indigo-600",
  },
  {
    icon: BookOpen,
    description: "Creating a product catalog?",
    category: "Brochure Templates",
    color: "text-indigo-500",
    hoverColor: "group-hover:text-indigo-600",
  },
];

export const UseCaseGuide = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Not sure which template to choose?
          </h2>
          
          <div className="space-y-8">
            {Object.entries(
              useCases.reduce((acc, item) => {
                if (!acc[item.category]) {
                  acc[item.category] = [];
                }
                acc[item.category].push(item);
                return acc;
              }, {} as Record<string, UseCaseItem[]>)
            ).map(([category, items]) => (
              <div key={category} className="space-y-3">
                <h3 className={`text-lg font-semibold ${items[0].color}`}>
                  {category}
                </h3>
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="group flex items-center p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 animate-fade-in cursor-pointer transform hover:-translate-y-1"
                    >
                      <item.icon className={`w-5 h-5 ${item.color} ${item.hoverColor} mr-4 transition-colors`} />
                      <p className="text-gray-700 group-hover:text-gray-900 transition-colors">
                        {item.description} →
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};