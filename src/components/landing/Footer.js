import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Elegant Stitches
            </h3>
            <p className="text-gray-400 mb-4">
              Custom Tailoring for Every Occasion. Creating timeless elegance since 2003.
            </p>
            <p className="text-gray-400 text-sm">
              Crafting perfection, one stitch at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-purple-400 transition">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-purple-400 transition">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-purple-400 transition">Services</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-purple-400 transition">Gallery</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-purple-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📍 123 Fashion Street</li>
              <li>Downtown City, 560001</li>
              <li>📞 +91 9876543210</li>
              <li>📧 info@elegantstitches.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Elegant Stitches. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

