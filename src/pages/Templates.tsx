import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Briefcase, FileText, Users, PenTool, Building, 
  Presentation, HandshakeIcon, BookOpen, MessageSquare, 
  Target, ShoppingBag, Award
} from "lucide-react";

const categories = [
  {
    title: "Proposals",
    description: "Craft winning project proposals effortlessly with our professional templates. Create compelling proposals that showcase your expertise and win more business.",
    image: "/lovable-uploads/c82f051f-28e1-4c32-9e43-52ec121766e3.png",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    cta: "Create a proposal",
  },
  {
    title: "Quotes",
    description: "Send professional, clear pricing estimates that win business. Our quote templates help you present your pricing in a clear, professional format.",
    image: "/lovable-uploads/837556c2-4c8e-43dd-bddc-5887f73be0d9.png",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    cta: "Create a quote",
  },
  {
    title: "Contracts",
    description: "Secure your agreements with legally binding contract templates. Get started quickly with professional templates that protect your interests.",
    image: "/lovable-uploads/879e9a9c-ab77-41a3-b1b7-65fac45e88e8.png",
    color: "text-green-500",
    bgColor: "bg-green-50",
    cta: "Create a contract",
  },
  {
    title: "Job Offers",
    description: "Send transparent and beautifully designed job offers that make it easy for candidates to accept. Make a great first impression with professional offer letters.",
    image: "/lovable-uploads/5a8cf6f8-d8dd-4522-a9b2-f9bff0234cc3.png",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    cta: "Create a job offer",
  },
  {
    title: "Client Sign-Offs",
    description: "Prevent misunderstandings and disputes with sign-off documents that keep everyone accountable. Streamline your approval process with clear templates.",
    image: "/lovable-uploads/3b31e153-255d-4f2f-8370-00fa43858692.png",
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    cta: "Create a sign-off",
  },
  {
    title: "Online Brochures",
    description: "Showcase your services with trackable, modern brochure templates. Create engaging digital brochures that capture attention and drive action.",
    image: "/lovable-uploads/b54ef0cd-d28b-437b-8524-f20c78c67173.png",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    cta: "Create a brochure",
  }
];

export default function Templates() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src="/lovable-uploads/d4ba166f-f7a7-417b-8554-5b39f8fc9667.png"
            alt="Background"
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 z-1"
          style={{
            background: 'linear-gradient(109.6deg, rgba(255,228,230,1) 11.2%, rgba(244,248,255,1) 91.1%)',
            opacity: '0.27'
          }}
        />

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Discover the Perfect Template for Every Need
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Streamline your workflow with professionally designed templates – crafted to save time and boost productivity.
            </p>
          </div>
        </div>
      </section>

      {/* Missing Template Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4 text-white">Can't find the template you need?</h2>
            <p className="text-gray-200 mb-8">
              Let us know! We'd love to create it for you.
            </p>
            <Button variant="secondary" size="lg">
              Request a New Template
            </Button>
          </div>
        </div>
      </section>

      {/* Use Case Guide Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Not sure which template to choose?
            </h2>
            
            <div className="space-y-4">
              {/* Proposals */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-blue-600">Proposal Templates</h3>
                <div className="space-y-2">
                  <div className="group flex items-center p-3 rounded-lg hover:bg-blue-50 transition-all duration-300 animate-fade-in cursor-pointer">
                    <Briefcase className="w-5 h-5 text-blue-500 mr-4" />
                    <p className="text-gray-700 group-hover:text-blue-700 transition-colors">Need to pitch a consulting project? →</p>
                  </div>
                  <div className="group flex items-center p-3 rounded-lg hover:bg-blue-50 transition-all duration-300 animate-fade-in cursor-pointer">
                    <PenTool className="w-5 h-5 text-blue-500 mr-4" />
                    <p className="text-gray-700 group-hover:text-blue-700 transition-colors">Want to propose a design service? →</p>
                  </div>
                </div>
              </div>

              {/* Quotes */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-600">Quote Templates</h3>
                <div className="space-y-2">
                  <div className="group flex items-center p-3 rounded-lg hover:bg-yellow-50 transition-all duration-300 animate-fade-in cursor-pointer">
                    <Building className="w-5 h-5 text-yellow-500 mr-4" />
                    <p className="text-gray-700 group-hover:text-yellow-700 transition-colors">Preparing a construction estimate? →</p>
                  </div>
                  <div className="group flex items-center p-3 rounded-lg hover:bg-yellow-50 transition-all duration-300 animate-fade-in cursor-pointer">
                    <ShoppingBag className="w-5 h-5 text-yellow-500 mr-4" />
                    <p className="text-gray-700 group-hover:text-yellow-700 transition-colors">Need to quote for product supplies? →</p>
                  </div>
                </div>
              </div>

              {/* Contracts */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-green-600">Contract Templates</h3>
                <div className="space-y-2">
                  <div className="group flex items-center p-3 rounded-lg hover:bg-green-50 transition-all duration-300 animate-fade-in cursor-pointer">
                    <FileText className="w-5 h-5 text-green-500 mr-4" />
                    <p className="text-gray-700 group-hover:text-green-700 transition-colors">Setting up a service agreement? →</p>
                  </div>
                  <div className="group flex items-center p-3 rounded-lg hover:bg-green-50 transition-all duration-300 animate-fade-in cursor-pointer">
                    <HandshakeIcon className="w-5 h-5 text-green-500 mr-4" />
                    <p className="text-gray-700 group-hover:text-green-700 transition-colors">Need a partnership contract? →</p>
                  </div>
                </div>
              </div>

              {/* Job Offers */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-purple-600">Job Offer Templates</h3>
                <div className="space-y-2">
                  <div className="group flex items-center p-3 rounded-lg hover:bg-purple-50 transition-all duration-300 animate-fade-in cursor-pointer">
                    <Users className="w-5 h-5 text-purple-500 mr-4" />
                    <p className="text-gray-700 group-hover:text-purple-700 transition-colors">Hiring for a senior position? →</p>
                  </div>
                  <div className="group flex items-center p-3 rounded-lg hover:bg-purple-50 transition-all duration-300 animate-fade-in cursor-pointer">
                    <Target className="w-5 h-5 text-purple-500 mr-4" />
                    <p className="text-gray-700 group-hover:text-purple-700 transition-colors">Looking for entry-level talent? →</p>
                  </div>
                </div>
              </div>

              {/* Client Sign-Offs */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-pink-600">Sign-Off Templates</h3>
                <div className="space-y-2">
                  <div className="group flex items-center p-3 rounded-lg hover:bg-pink-50 transition-all duration-300 animate-fade-in cursor-pointer">
                    <MessageSquare className="w-5 h-5 text-pink-500 mr-4" />
                    <p className="text-gray-700 group-hover:text-pink-700 transition-colors">Need project milestone approval? →</p>
                  </div>
                  <div className="group flex items-center p-3 rounded-lg hover:bg-pink-50 transition-all duration-300 animate-fade-in cursor-pointer">
                    <Award className="w-5 h-5 text-pink-500 mr-4" />
                    <p className="text-gray-700 group-hover:text-pink-700 transition-colors">Completing a project phase? →</p>
                  </div>
                </div>
              </div>

              {/* Online Brochures */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-indigo-600">Brochure Templates</h3>
                <div className="space-y-2">
                  <div className="group flex items-center p-3 rounded-lg hover:bg-indigo-50 transition-all duration-300 animate-fade-in cursor-pointer">
                    <Presentation className="w-5 h-5 text-indigo-500 mr-4" />
                    <p className="text-gray-700 group-hover:text-indigo-700 transition-colors">Showcasing your services? →</p>
                  </div>
                  <div className="group flex items-center p-3 rounded-lg hover:bg-indigo-50 transition-all duration-300 animate-fade-in cursor-pointer">
                    <BookOpen className="w-5 h-5 text-indigo-500 mr-4" />
                    <p className="text-gray-700 group-hover:text-indigo-700 transition-colors">Creating a product catalog? →</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
