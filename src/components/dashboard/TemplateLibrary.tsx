import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  ChevronRight, 
  FileText, 
  Calculator, 
  FileCheck, 
  Briefcase, 
  Notebook, 
  Pencil,
  Info,
  DollarSign,
  Phone,
  HelpCircle
} from "lucide-react";

const templates = [
  { 
    id: 1, 
    name: "Proposal Templates", 
    description: "Professional business proposal templates for pitching your services, products, or projects to potential clients.",
    icon: FileText,
    gradient: "from-blue-500 to-blue-700",
    bgLight: "bg-blue-50"
  },
  { 
    id: 2, 
    name: "Service Quotes Templates", 
    description: "Customizable quote templates for pricing your services with detailed breakdowns and terms.",
    icon: Calculator,
    gradient: "from-emerald-500 to-emerald-700",
    bgLight: "bg-emerald-50"
  },
  { 
    id: 3, 
    name: "Agreement Templates", 
    description: "Comprehensive agreement templates for contracts, partnerships, and service level agreements.",
    icon: FileCheck,
    gradient: "from-purple-500 to-purple-700",
    bgLight: "bg-purple-50"
  },
  { 
    id: 4, 
    name: "Job Offer Templates", 
    description: "Professional job offer templates with customizable terms, benefits, and employment conditions.",
    icon: Briefcase,
    gradient: "from-amber-500 to-amber-700",
    bgLight: "bg-amber-50"
  },
  {
    id: 5,
    name: "About Templates",
    description: "Create compelling about pages and company profiles with our professional templates.",
    icon: Info,
    gradient: "from-indigo-500 to-indigo-700",
    bgLight: "bg-indigo-50"
  },
  {
    id: 6,
    name: "Pricing Templates",
    description: "Design attractive pricing pages and packages with our customizable templates.",
    icon: DollarSign,
    gradient: "from-rose-500 to-rose-700",
    bgLight: "bg-rose-50"
  },
  {
    id: 7,
    name: "Contact Templates",
    description: "Create professional contact forms and pages with our ready-to-use templates.",
    icon: Phone,
    gradient: "from-cyan-500 to-cyan-700",
    bgLight: "bg-cyan-50"
  }
];

export function TemplateLibrary() {
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleViewAllTemplates = () => {
    navigate('/templates');
  };

  const displayedTemplates = showAll ? templates : templates.slice(0, 4);

  return (
    <div ref={containerRef} className="mb-16">
      <div className="relative">
        {/* Background Pattern Layer */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 transform -rotate-12">
            <Notebook className="w-24 h-24 text-gray-400" />
          </div>
          <div className="absolute bottom-20 right-20 transform rotate-12">
            <Pencil className="w-20 h-20 text-gray-400" />
          </div>
          <div className="absolute top-40 right-40">
            <FileText className="w-16 h-16 text-gray-400" />
          </div>
          <div className="absolute bottom-40 left-40">
            <HelpCircle className="w-16 h-16 text-gray-400" />
          </div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 bg-gradient-to-b from-white/80 to-white/95 rounded-2xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Template Category</h2>
            <Button 
              variant="ghost" 
              className="group"
              onClick={handleViewAllTemplates}
            >
              {showAll ? "Show Less" : "View All Templates"}
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {displayedTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.id}
                  className={`relative overflow-hidden rounded-lg border p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${template.bgLight}`}
                >
                  <div className="mb-3">
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${template.gradient}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-base">{template.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}