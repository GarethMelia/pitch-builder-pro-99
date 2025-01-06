import { ProposalFormData } from "@/types/proposal";

interface ExecutiveSummaryProps {
  formData: ProposalFormData;
}

export const ExecutiveSummary = ({ formData }: ExecutiveSummaryProps) => {
  const defaultCoverImage = "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=2000&q=80";
  
  const achievements = [
    { title: "Years of Experience", value: "10+" },
    { title: "Successful Projects", value: "500+" },
    { title: "Client Satisfaction", value: "98%" },
    { title: "Team Members", value: "50+" }
  ];

  // Dummy client logos for demonstration
  const clientLogos = [
    "/lovable-uploads/c328bc78-1c3d-468f-aefb-76357044d4fb.png"
  ];

  return (
    <section id="executive-summary" className="w-full">
      {/* Cover Image Section */}
      <div className="relative h-[50vh] w-full">
        <img 
          src={formData.cover_image || defaultCoverImage} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        
        {/* Logo */}
        {formData.company_logo && (
          <div className="absolute top-6 left-6 z-10">
            <img 
              src={formData.company_logo} 
              alt="Company Logo" 
              className="h-16 w-auto object-contain bg-white/90 p-2 rounded-md shadow-sm"
            />
          </div>
        )}
        
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            {formData.title || 'Untitled Proposal'}
          </h1>
          <div className="text-white/90 space-y-2">
            <p className="text-xl">Prepared for: {formData.company_name || '[Client Name]'}</p>
            <p className="text-lg">Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="py-12">
        {/* A Brief Look About Us */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">A Brief Look About Us</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-12">
          {formData.primary_goal}
        </p>

        {/* Previous Clients */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Some of the clients we've worked with</h3>
          <div className="flex items-center justify-between gap-8 overflow-x-auto pb-4">
            {clientLogos.map((logo, index) => (
              <img 
                key={index}
                src={logo}
                alt={`Client ${index + 1}`}
                className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all"
              />
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-4 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow"
            >
              <h4 className="text-3xl font-bold text-blue-600 mb-2">{achievement.value}</h4>
              <p className="text-gray-600">{achievement.title}</p>
            </div>
          ))}
        </div>

        {/* Strategies and Practices */}
        <div className="bg-gray-50 rounded-xl">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Strategies & Practices</h3>
          <div className="grid grid-cols-2 gap-8">
            {formData.recommended_strategies?.map((strategy, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">{index + 1}</span>
                </div>
                <p className="text-gray-700">{strategy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};