import React from 'react';

function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-16 min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-fade-in">
            Elegant Stitches
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 mb-8 font-light">
            Custom Tailoring for Every Occasion
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Experience the art of bespoke tailoring where every stitch tells a story of elegance, 
            precision, and timeless style crafted just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToContact}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Book Your Appointment
            </button>
            <button 
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 transition-all duration-300"
            >
              Explore Services
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">✂️</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Expert Craftsmanship</h3>
            <p className="text-gray-600">Over 20 years of tailoring excellence</p>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">👔</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Custom Designs</h3>
            <p className="text-gray-600">Tailored to perfection, just for you</p>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">⏱️</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Timely Delivery</h3>
            <p className="text-gray-600">Quality service within your timeline</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

