import React from 'react';
import { Link } from 'react-router-dom';

export const BlogSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Read resources written by professionals</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered tool takes your ideas and turns them into captivating, reader-friendly content that resonates with your audience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Blog Card 1 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <img 
              src="/lovable-uploads/7fb39807-ba5d-42b0-8669-6cf0a9bf23fd.png" 
              alt="Marketing waves" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-600">Marketing</span>
                <span className="text-sm text-gray-500">June 9, 2024</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                <Link to="/blog/storytelling" className="hover:text-primary">
                  The Power of Storytelling in Brand Marketing
                </Link>
              </h3>
            </div>
          </div>

          {/* Blog Card 2 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="h-48 bg-gradient-to-r from-orange-300 to-red-400"></div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-600">Marketing</span>
                <span className="text-sm text-gray-500">June 9, 2024</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                <Link to="/blog/digital-marketing" className="hover:text-primary">
                  Unlocking the Secrets of Digital Marketing: Strategies for 2024
                </Link>
              </h3>
            </div>
          </div>

          {/* Blog Card 3 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="h-48 bg-gradient-to-r from-purple-300 to-green-300"></div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-600">Content Creation</span>
                <span className="text-sm text-gray-500">October 1, 2023</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                <Link to="/blog/ai-marketing" className="hover:text-primary">
                  The Future of Marketing: How AI is Revolutionizing the Industry
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};