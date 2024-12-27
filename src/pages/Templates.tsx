import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Calculator, FileCheck, Briefcase, ClipboardList, LayoutTemplate } from "lucide-react";

const categories = [
  {
    title: "Proposals",
    description: "Craft winning project proposals effortlessly with our professional templates. Create compelling proposals that showcase your expertise and win more business.",
    icon: FileText,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    cta: "Create a proposal",
  },
  {
    title: "Quotes",
    description: "Send professional, clear pricing estimates that win business. Our quote templates help you present your pricing in a clear, professional format.",
    icon: Calculator,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    cta: "Create a quote",
  },
  {
    title: "Contracts",
    description: "Secure your agreements with legally binding contract templates. Get started quickly with professional templates that protect your interests.",
    icon: FileCheck,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    color: "text-green-500",
    bgColor: "bg-green-50",
    cta: "Create a contract",
  },
  {
    title: "Job Offers",
    description: "Send transparent and beautifully designed job offers that make it easy for candidates to accept. Make a great first impression with professional offer letters.",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    cta: "Create a job offer",
  },
  {
    title: "Client Sign-Offs",
    description: "Prevent misunderstandings and disputes with sign-off documents that keep everyone accountable. Streamline your approval process with clear templates.",
    icon: ClipboardList,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    cta: "Create a sign-off",
  },
  {
    title: "Online Brochures",
    description: "Showcase your services with trackable, modern brochure templates. Create engaging digital brochures that capture attention and drive action.",
    icon: LayoutTemplate,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
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
        <div className="absolute inset-0 z-0" />
        
        {/* Gradient Overlay with Background Image */}
        <div 
          className="absolute inset-0 z-1 bg-gradient-to-b from-white/60 via-white/70 to-white/95"
          style={{
            backgroundImage: "url('/lovable-uploads/d4ba166f-f7a7-417b-8554-5b39f8fc9667.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: '0.4'
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

      {/* Template Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {categories.map((category, index) => (
              <div 
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
              >
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${category.bgColor}`}>
                    <category.icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{category.title}</h2>
                    <p className="text-lg text-gray-600 mb-8">{category.description}</p>
                    <Button 
                      className="group"
                      size="lg"
                    >
                      {category.cta}
                      <svg
                        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Missing Template Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4">Can't find the template you need?</h2>
            <p className="text-gray-600 mb-8">
              Let us know! We'd love to create it for you.
            </p>
            <Button variant="outline" size="lg">
              Request a New Template
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
