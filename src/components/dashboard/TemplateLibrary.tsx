import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Code, Megaphone, Briefcase, Globe, Layout } from "lucide-react";

const templates = [
  { 
    id: 1, 
    name: "Web Development", 
    description: "Tech project template",
    icon: Code,
    gradient: "from-emerald-500 to-emerald-700",
    bgLight: "bg-emerald-50"
  },
  { 
    id: 2, 
    name: "Marketing Plan", 
    description: "Campaign focused",
    icon: Megaphone,
    gradient: "from-blue-500 to-blue-700",
    bgLight: "bg-blue-50"
  },
  { 
    id: 3, 
    name: "Business Proposal", 
    description: "Professional template",
    icon: Briefcase,
    gradient: "from-amber-500 to-amber-700",
    bgLight: "bg-amber-50"
  },
  { 
    id: 4, 
    name: "Corporate Services", 
    description: "Service-based template",
    icon: Globe,
    gradient: "from-rose-500 to-rose-700",
    bgLight: "bg-rose-50"
  },
  { 
    id: 5, 
    name: "Digital Marketing", 
    description: "Marketing strategy template",
    icon: Layout,
    gradient: "from-purple-500 to-purple-700",
    bgLight: "bg-purple-50"
  },
];

export function TemplateLibrary() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <div ref={containerRef} className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Popular Templates</h2>
        <Button variant="ghost" className="group">
          View All Templates
          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {templates.slice(0, 3).map((template) => {
          const Icon = template.icon;
          return (
            <div
              key={template.id}
              className={`group relative overflow-hidden rounded-xl border bg-white p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${template.bgLight}`}
            >
              <div className="mb-4">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${template.gradient}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{template.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  className="text-sm hover:bg-black/5"
                >
                  Learn more
                </Button>
                <Button 
                  className={`text-sm bg-gradient-to-r ${template.gradient} text-white hover:opacity-90`}
                >
                  Use Template
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}