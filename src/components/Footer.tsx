
import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0 flex items-center">
            <ShoppingBag className="h-8 w-8 text-orange" />
            <span className="ml-2 text-xl font-bold">AmazonPicks</span>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center">
            <a href="#categories" className="text-gray-300 hover:text-white transition-colors">
              Categories
            </a>
            <a href="#featured" className="text-gray-300 hover:text-white transition-colors">
              Featured
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">
              About
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {currentYear} AmazonPicks. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 text-center mt-2">
            Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
            As an Amazon Associate I earn from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
