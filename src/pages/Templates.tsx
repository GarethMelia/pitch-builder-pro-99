import { Button } from "@/components/ui/button";
import { Briefcase, FileText, Users } from "lucide-react";
import { NavigationBar } from "@/components/layout/NavigationBar";
import { FooterSection } from "@/components/landing/FooterSection";
import { TemplatesHero } from "@/components/templates/TemplatesHero";

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
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      
      <main className="flex-grow bg-gray-50">
        <TemplatesHero />

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
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl transition-all duration-300 hover:scale-105">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="object-cover w-full h-full shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="w-full md:w-1/2 space-y-6">
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
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Not sure which template to choose?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Proposal Use Case */}
                <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Need to pitch a project?</h3>
                  <p className="text-gray-600">Use Proposal Templates</p>
                </div>

                {/* Contract Use Case */}
                <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Want to seal the deal?</h3>
                  <p className="text-gray-600">Use Contract Templates</p>
                </div>

                {/* Job Offer Use Case */}
                <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Hiring new talent?</h3>
                  <p className="text-gray-600">Choose Job Offer Templates</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
