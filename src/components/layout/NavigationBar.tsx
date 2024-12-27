import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Settings, FileText, FileCheck, Users, ClipboardList, FileSpreadsheet, LayoutTemplate, Box } from "lucide-react";
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
    description: "Explore professionally written and designed proposal templates that actually work",
    icon: FileText,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
  },
  {
    title: "Contracts",
    description: "Seal and protect your deals with legally binding digital contracts",
    icon: FileCheck,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    title: "Job Offers",
    description: "Attract top talent with modern job offers that make accepting easy",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Client Sign-offs",
    description: "Gain peace of mind by making sure you and your client are on the same page",
    icon: ClipboardList,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "Online Brochures",
    description: "Show off your products and services with modern, trackable brochures",
    icon: LayoutTemplate,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Statement of Work",
    description: "Prevent scope creep by setting clear project expectations",
    icon: FileSpreadsheet,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
];

export const NavigationBar = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Prevent any UI rendering until auth state is confirmed
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
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              Pitch Builder Pro
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-600 hover:text-gray-900 bg-transparent">
                      Templates
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[850px] p-6">
                        <div className="relative">
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-[0.02] pointer-events-none overflow-hidden">
                            <Box className="absolute top-10 left-10 w-24 h-24 text-gray-400 transform -rotate-12" />
                            <FileText className="absolute bottom-20 right-20 w-20 h-20 text-gray-400 transform rotate-12" />
                          </div>
                          
                          {/* Content */}
                          <div className="relative z-10">
                            <div className="grid grid-cols-2 gap-6">
                              {templateCategories.map((category, index) => (
                                <NavigationMenuLink asChild key={index}>
                                  <Link
                                    to="/templates"
                                    className={`block p-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${category.bgColor}`}
                                  >
                                    <div className="flex items-start space-x-4">
                                      <div className={`p-2 rounded-lg ${category.bgColor}`}>
                                        <category.icon className={`w-6 h-6 ${category.color}`} />
                                      </div>
                                      <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">
                                          {category.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-2">
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