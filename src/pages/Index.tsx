import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-mobile";

export default function Index() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-r from-primary to-accent overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
            alt="Hero background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fadeIn">
              Create Winning Proposals in Minutes
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Transform your business proposals into compelling stories that win clients
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg"
              onClick={() => navigate(user ? "/create" : "/auth")}
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
              <p className="text-gray-600">Generate professional proposals in minutes, not hours. Save time and focus on what matters.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Customizable Templates</h3>
              <p className="text-gray-600">Choose from a variety of professional templates and customize them to match your brand.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Professional Results</h3>
              <p className="text-gray-600">Create polished, professional proposals that help you stand out from the competition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                alt="How it works"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Input Your Details</h3>
                  <p className="text-gray-600">Enter your company information and project requirements through our intuitive interface.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Customize Your Proposal</h3>
                  <p className="text-gray-600">Choose from various templates and customize the content to match your needs.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Generate & Download</h3>
                  <p className="text-gray-600">Generate your professional proposal in PDF format, ready to send to your clients.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Create Your First Proposal?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of businesses who are already using our platform to win more clients
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg"
            onClick={() => navigate(user ? "/create" : "/auth")}
          >
            Start Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
}