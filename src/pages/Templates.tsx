import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calculator, FileCheck, Briefcase, ClipboardList, LayoutTemplate } from "lucide-react";

const categories = [
  {
    title: "Proposals",
    description: "Craft winning project proposals effortlessly with our professional templates.",
    icon: FileText,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    title: "Quotes",
    description: "Send professional, clear pricing estimates that win business.",
    icon: Calculator,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50"
  },
  {
    title: "Contracts",
    description: "Secure your agreements with legally binding contract templates.",
    icon: FileCheck,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    color: "text-green-500",
    bgColor: "bg-green-50"
  },
  {
    title: "Job Offers",
    description: "Attract top talent with sleek and professional job offer templates.",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  },
  {
    title: "Client Sign-Offs",
    description: "Ensure smooth project approvals with client sign-off forms.",
    icon: ClipboardList,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    color: "text-pink-500",
    bgColor: "bg-pink-50"
  },
  {
    title: "Online Brochures",
    description: "Showcase your services with trackable, modern brochure templates.",
    icon: LayoutTemplate,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50"
  }
];

export default function Templates() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-white">
        <div className="container mx-auto px-4">
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
          <div className="grid gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${category.bgColor} mb-4`}>
                      <category.icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">{category.title}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <Button className="w-full md:w-auto">
                      View Templates
                    </Button>
                  </div>
                </div>
              </Card>
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

      {/* Use Case Guide */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Not sure which template to choose?
            </h2>
            <div className="grid gap-6">
              {categories.map((category, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className={`p-2 rounded-lg ${category.bgColor}`}>
                      <category.icon className={`h-5 w-5 ${category.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Need {category.title.toLowerCase()}?</CardTitle>
                      <CardDescription>Use {category.title} Templates</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}