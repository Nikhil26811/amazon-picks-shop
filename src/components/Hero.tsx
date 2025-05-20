
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="hero-gradient text-white">
      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Hand-Picked Amazon Products Just For You
          </h1>
          <p className="mt-6 text-xl max-w-prose">
            Discover curated products that I personally recommend. Every item has been thoroughly reviewed for quality and value.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button className="btn-primary text-lg px-8 py-4">
              Browse Categories
            </Button>
            <Button className="btn-secondary text-lg px-8 py-4">
              See Featured Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
