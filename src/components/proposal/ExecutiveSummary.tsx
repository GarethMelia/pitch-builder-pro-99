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

  return (
    <section id="executive-summary" className="w-full">
      {/* Cover Image Section - Now fills entire viewport height */}
      <div className="h-screen w-full relative">
        <img 
          src={formData.cover_image || defaultCoverImage} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        
        {/* Logo */}
        {formData.company_logo && (
          <div className="absolute top-8 left-12 z-10">
            <img 
              src={formData.company_logo} 
              alt="Company Logo" 
              className="h-16 w-auto object-contain bg-white/90 p-2 rounded-md shadow-sm"
            />
          </div>
        )}
        
        {/* Content positioned at the bottom */}
        <div className="absolute inset-x-0 bottom-0 p-12">
          <h1 className="text-6xl font-bold text-white mb-4">
            {formData.title || 'Untitled Proposal'}
          </h1>
          <div className="text-white/90 space-y-2">
            <p className="text-2xl">Prepared for: {formData.company_name || '[Client Name]'}</p>
            <p className="text-xl">Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-12 py-16 max-w-[1600px]">
        {/* A Brief Look About Us */}
        <h2 className="text-4xl font-bold text-gray-900 mb-8">A Brief Look About Us</h2>
        <p className="text-xl text-gray-600 leading-relaxed mb-16 max-w-4xl">
          {formData.primary_goal}
        </p>

        {/* Previous Clients */}
        <div className="mb-20">
          <h3 className="text-3xl font-semibold text-gray-900 mb-10">Some of the clients we've worked with</h3>
          <div className="flex items-center justify-between gap-12 overflow-x-auto pb-6">
            {/* Client logos section */}
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-4 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow"
            >
              <h4 className="text-4xl font-bold text-blue-600 mb-3">{achievement.value}</h4>
              <p className="text-gray-600 text-lg">{achievement.title}</p>
            </div>
          ))}
        </div>

        {/* Strategies and Practices */}
        <div className="bg-gray-50 p-12 rounded-xl">
          <h3 className="text-3xl font-semibold text-gray-900 mb-10">Our Strategies & Practices</h3>
          <div className="grid grid-cols-2 gap-12">
            {formData.recommended_strategies?.map((strategy, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-xl">{index + 1}</span>
                </div>
                <p className="text-lg text-gray-700">{strategy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};