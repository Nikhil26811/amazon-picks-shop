
import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy mb-6">About My Recommendations</h2>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-lg text-gray-700 mb-4">
              As an Amazon Associate, I earn from qualifying purchases. I only recommend products I truly believe in and have personally researched or used.
            </p>
            
            <p className="text-lg text-gray-700 mb-4">
              My goal is to help you discover quality products that provide real value. Each recommendation comes after careful consideration of product quality, customer reviews, and overall value.
            </p>
            
            <p className="text-lg text-gray-700">
              Have questions about any product or suggestions for products to review? Feel free to reach out - I'm always looking to expand my recommendations with genuinely useful items.
            </p>
          </div>
          
          <div className="mt-8 p-4 bg-teal/10 border border-teal/20 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Disclosure:</strong> As an Amazon Associate I earn from qualifying purchases. 
              Links on this page may be affiliate links, which means I receive a commission if you 
              decide to make a purchase through my links, at no cost to you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
