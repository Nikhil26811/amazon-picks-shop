
import React, { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-navy" />
              <span className="ml-2 text-xl font-bold text-navy">AmazonPicks</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <a href="#categories" className="text-gray-600 hover:text-navy transition-colors">
              Categories
            </a>
            <a href="#featured" className="text-gray-600 hover:text-navy transition-colors">
              Featured
            </a>
            <a href="#about" className="text-gray-600 hover:text-navy transition-colors">
              About
            </a>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            <a 
              href="#categories" 
              className="block px-3 py-2 text-gray-600 hover:text-navy"
              onClick={toggleMenu}
            >
              Categories
            </a>
            <a 
              href="#featured" 
              className="block px-3 py-2 text-gray-600 hover:text-navy"
              onClick={toggleMenu}
            >
              Featured
            </a>
            <a 
              href="#about" 
              className="block px-3 py-2 text-gray-600 hover:text-navy"
              onClick={toggleMenu}
            >
              About
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
