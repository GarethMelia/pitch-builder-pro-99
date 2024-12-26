import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const templates = [
  { id: 1, name: "Business Proposal", description: "Professional template" },
  { id: 2, name: "Marketing Plan", description: "Campaign focused" },
  { id: 3, name: "Project Proposal", description: "Detailed project template" },
  { id: 4, name: "Consulting Services", description: "Service-based template" },
  { id: 5, name: "Web Development", description: "Tech project template" },
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Popular Templates</h2>
        <Button variant="ghost">
          View All Templates
          <ChevronRight className="ml-2" />
        </Button>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {templates.slice(0, 3).map((template) => (
          <div
            key={template.id}
            className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1"
          >
            <h3 className="font-semibold">{template.name}</h3>
            <p className="text-sm text-muted-foreground">
              {template.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}