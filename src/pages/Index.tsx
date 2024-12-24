import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { BlogSection } from "@/components/landing/BlogSection";
import { FooterSection } from "@/components/landing/FooterSection";
import { PricingSection } from "@/components/landing/PricingSection";

export default function Index() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-primary">
                Pitch Builder Pro
              </Link>
              <div className="hidden md:flex ml-10 space-x-8">
                <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
                <Link to="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
                <Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
                <Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
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
                <Button onClick={() => navigate("/create")}>
                  Dashboard
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

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

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Just hear what they're saying about us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered tool takes your ideas and turns them into captivating, reader-friendly content that resonates with your audience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  alt="Luna Mars"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">Luna Mars</h3>
                  <p className="text-gray-600">@EntrepreneurJane</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Just started using Pitch Builder Pro and it's a game-changer! The AI-powered proposals and predictions help me stay ahead of market trends."
              </p>
              <p className="text-gray-500 text-sm">Mar 8, 2024</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt="Andrew Clerk"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">Andrew Clerk</h3>
                  <p className="text-gray-600">@andrew-99</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "The proposal templates are fantastic. Saved me hours of work and helped me win more clients. The AI suggestions are spot on!"
              </p>
              <p className="text-gray-500 text-sm">Jan 3, 2024</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                  alt="Michael Walker"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">Michael Walker</h3>
                  <p className="text-gray-600">@EntrepreneurJane</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Professional proposals in minutes instead of hours. The AI understands exactly what my clients need and helps me deliver it."
              </p>
              <p className="text-gray-500 text-sm">Feb 8, 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Blog Section */}
      <BlogSection />

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

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
