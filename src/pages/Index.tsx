
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductCategories from '@/components/ProductCategories';
import FeaturedProducts from '@/components/FeaturedProducts';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { IndianRupee } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-2 bg-gray-50 rounded-md">
          <div className="flex items-center justify-center text-sm text-gray-600">
            <IndianRupee className="h-3 w-3 mr-1" /> 
            <span>All prices shown in USD with INR conversion for your convenience</span>
          </div>
        </div>
        <ProductCategories />
        <FeaturedProducts />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
