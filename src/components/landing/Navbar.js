import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleAdminClick = () => {
    navigate('/admin');
    setIsOpen(false);
  };

  return (
    <nav className="bg-elegant-cream/95 backdrop-blur-md shadow-lg fixed w-full z-50 border-b-2 border-elegant-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <span className="text-elegant-gold text-3xl">✦</span>
              <span className="font-elegant text-3xl font-bold text-elegant-black">
                Elegant Stitches
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-gray-700 hover:text-elegant-gold transition font-medium relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-elegant-gold group-hover:w-full transition-all duration-300"></span>
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-gray-700 hover:text-elegant-gold transition font-medium relative group"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-elegant-gold group-hover:w-full transition-all duration-300"></span>
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-gray-700 hover:text-elegant-gold transition font-medium relative group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-elegant-gold group-hover:w-full transition-all duration-300"></span>
            </button>
            <button 
              onClick={() => scrollToSection('gallery')} 
              className="text-gray-700 hover:text-elegant-gold transition font-medium relative group"
            >
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-elegant-gold group-hover:w-full transition-all duration-300"></span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-gray-700 hover:text-elegant-gold transition font-medium relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-elegant-gold group-hover:w-full transition-all duration-300"></span>
            </button>
            <button 
              onClick={handleAdminClick}
              className="bg-gradient-to-r from-elegant-gold to-elegant-darkGold text-white px-6 py-2 font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Admin
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-elegant-black hover:text-elegant-gold focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-elegant-cream border-t-2 border-elegant-gold/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => scrollToSection('home')} 
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-elegant-gold/10 hover:text-elegant-gold rounded-md font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-elegant-gold/10 hover:text-elegant-gold rounded-md font-medium"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-elegant-gold/10 hover:text-elegant-gold rounded-md font-medium"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('gallery')} 
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-elegant-gold/10 hover:text-elegant-gold rounded-md font-medium"
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-elegant-gold/10 hover:text-elegant-gold rounded-md font-medium"
            >
              Contact
            </button>
            <button 
              onClick={handleAdminClick}
              className="block w-full text-left px-3 py-2 bg-gradient-to-r from-elegant-gold to-elegant-darkGold text-white rounded-md font-semibold hover:opacity-90 transition"
            >
              Admin Panel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
