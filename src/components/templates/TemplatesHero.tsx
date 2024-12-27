import React from 'react';

export const TemplatesHero = () => {
  return (
    <section className="relative py-20">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="/lovable-uploads/d4ba166f-f7a7-417b-8554-5b39f8fc9667.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Solid Background Overlay */}
      <div 
        className="absolute inset-0 z-1 bg-primary/90"
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Discover the Perfect Template for Every Need
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Streamline your workflow with professionally designed templates – crafted to save time and boost productivity.
          </p>
        </div>
      </div>
    </section>
  );
};