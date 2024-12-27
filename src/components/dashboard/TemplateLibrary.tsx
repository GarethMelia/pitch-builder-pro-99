import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileText, Calculator, FileCheck, Briefcase, Notebook, Pencil } from "lucide-react";

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
  }
];

export function TemplateLibrary() {
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const displayedTemplates = showAll ? templates : templates.slice(0, 3);

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
        </div>

        {/* Content Layer */}
        <div className="relative z-10 bg-gradient-to-b from-white/80 to-white/95 rounded-2xl p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Template Category</h2>
            <Button 
              variant="ghost" 
              className="group"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View All Templates"}
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {displayedTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.id}
                  className={`group relative overflow-hidden rounded-lg border bg-white p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-1 ${template.bgLight}`}
                >
                  <div className="mb-3">
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${template.gradient}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-base">{template.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                      {template.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <Button 
                      size="sm"
                      className={`w-full bg-gradient-to-r ${template.gradient} text-white hover:opacity-90 font-medium`}
                    >
                      Start with this template
                    </Button>
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
