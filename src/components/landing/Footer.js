import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-elegant-deepPurple to-elegant-black text-white py-16 relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-elegant-gold to-transparent"></div>
      
      <div className="absolute top-10 left-10 text-elegant-gold/20 text-6xl">✦</div>
      <div className="absolute top-20 right-20 text-elegant-gold/20 text-4xl">✦</div>
      <div className="absolute bottom-10 left-1/4 text-elegant-gold/20 text-5xl">✦</div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-elegant-gold text-3xl">✦</span>
              <h3 className="font-elegant text-3xl font-bold text-elegant-gold">
                Elegant Stitches
              </h3>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed text-lg">
              Where Elegance Meets Art. Creating timeless fashion and bespoke tailoring excellence since 2003.
            </p>
            <p className="text-elegant-gold font-display italic text-lg">
              Crafting perfection, one stitch at a time.
            </p>
            
            {/* Social Media */}
            <div className="mt-8">
              <h4 className="text-elegant-gold font-semibold mb-4 text-lg">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-2 border-elegant-gold flex items-center justify-center text-elegant-gold hover:bg-elegant-gold hover:text-white transition-all duration-300"
                >
                  <span className="text-xl font-bold">f</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-2 border-elegant-gold flex items-center justify-center text-elegant-gold hover:bg-elegant-gold hover:text-white transition-all duration-300"
                >
                  <span className="text-xl">📷</span>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-2 border-elegant-gold flex items-center justify-center text-elegant-gold hover:bg-elegant-gold hover:text-white transition-all duration-300"
                >
                  <span className="text-xl">𝕏</span>
                </a>
                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-2 border-elegant-gold flex items-center justify-center text-elegant-gold hover:bg-elegant-gold hover:text-white transition-all duration-300"
                >
                  <span className="text-xl">💬</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-elegant-gold font-elegant text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-elegant-gold transition">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-elegant-gold transition">About Us</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-elegant-gold transition">Services</a></li>
              <li><a href="#gallery" className="text-gray-300 hover:text-elegant-gold transition">Gallery</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-elegant-gold transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-elegant-gold font-elegant text-xl font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-elegant-gold mr-2">📍</span>
                <span>123 Fashion Street<br />Downtown City, 560001</span>
              </li>
              <li className="flex items-center">
                <span className="text-elegant-gold mr-2">📞</span>
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <span className="text-elegant-gold mr-2">📧</span>
                <span>info@elegantstitches.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-elegant-gold/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2025 Elegant Stitches. All rights reserved. Crafted with passion and precision.
            </p>
            <div className="flex space-x-6">
              <button 
                onClick={() => alert('Privacy Policy page coming soon!')}
                className="text-gray-300 hover:text-elegant-gold transition text-sm"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => alert('Terms of Service page coming soon!')}
                className="text-gray-300 hover:text-elegant-gold transition text-sm"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
