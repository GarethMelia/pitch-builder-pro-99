export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Just hear what they're saying about us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered tool takes your ideas and turns them into captivating, reader-friendly content that resonates with your audience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
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
  );
};