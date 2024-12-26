export const HowItWorksSection = () => {
  return (
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
  );
};