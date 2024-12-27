import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Settings, FileText, FileCheck, Users, ClipboardList, FileSpreadsheet, LayoutTemplate } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const templateCategories = [
  {
    title: "Proposals",
    description: "Professional proposal templates for successful pitches",
    icon: FileText,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
  },
  {
    title: "Agreements Proposal",
    description: "Legally binding digital contract templates",
    icon: FileCheck,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    title: "Career Proposal",
    description: "Modern job offer templates for hiring",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Client Approval",
    description: "Streamlined client approval templates",
    icon: ClipboardList,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "Web Brochures",
    description: "Digital brochure templates with tracking",
    icon: LayoutTemplate,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Project Outline",
    description: "Clear project scope templates",
    icon: FileSpreadsheet,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
];

export const NavigationBar = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold text-primary">
              Pitch Builder Pro
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              Pitch Builder Pro
            </Link>
            <div className="hidden md:flex ml-10 items-center space-x-8">
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-600 hover:text-gray-900 bg-transparent h-10 px-4">
                      Templates
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="fixed left-0 right-0 bg-white shadow-lg z-50">
                        <div className="container mx-auto p-6">
                          <div className="grid grid-cols-3 gap-6">
                            {templateCategories.map((category, index) => (
                              <NavigationMenuLink asChild key={index}>
                                <Link
                                  to="/templates"
                                  className={`block p-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${category.bgColor}`}
                                >
                                  <div className="flex items-start space-x-3">
                                    <div className={`p-1.5 rounded-lg ${category.bgColor}`}>
                                      <category.icon className={`w-4 h-4 ${category.color}`} />
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-xs text-gray-900 mb-0.5">
                                        {category.title}
                                      </h3>
                                      <p className="text-[10px] text-gray-600 line-clamp-1">
                                        {category.description}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Button variant="outline" onClick={() => navigate("/auth")}>
                  Sign In
                </Button>
                <Button onClick={() => navigate("/auth")}>
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/settings")} className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
                <Button onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};