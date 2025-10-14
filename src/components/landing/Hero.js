import React from 'react';

function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-16 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Heavily Blurred Boutique Background - Exact Match */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=90&fit=crop&auto=format" 
          alt="Elegant Boutique Interior"
          className="w-full h-full object-cover"
          style={{ 
            imageRendering: '-webkit-optimize-contrast', 
            filter: 'blur(10px) brightness(1.2) saturate(0.85)' 
          }}
          loading="eager"
        />
        {/* Soft Gradient Overlay - Exact Match from Image */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/20 to-white/25"></div>
      </div>

      <div className="relative z-10 w-full min-h-[calc(100vh-4rem)] flex items-center justify-center">
        {/* Full Width White Background Panel */}
        <div className="bg-white/70 backdrop-blur-sm w-full py-16 md:py-20 lg:py-24">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
            {/* Title - Left Aligned */}
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.15] text-[#4a3b30]" 
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            >
              <span className="block">Where Elegance Meets</span>
              <span className="block">Art</span>
            </h1>
            
            {/* Description - Left Aligned */}
            <p 
              className="text-base md:text-lg text-[#4a3b30] leading-relaxed mb-10 max-w-2xl" 
              style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
            >
              Step into a world where every outfit reflects your personality. Discover handcrafted luxury and timeless fashion.
            </p>

            {/* Buttons - Left Aligned */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <button 
                onClick={scrollToContact}
                className="w-full sm:w-auto bg-[#7a614d] text-white px-10 py-3.5 rounded-lg text-base font-normal hover:bg-[#8a715d] transition-all duration-200 shadow-sm"
                style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
              >
                Book Your Appointment
              </button>
              
              <button 
                onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-white/40 backdrop-blur-sm border-2 border-[#7a614d] text-[#4a3b30] px-10 py-3.5 rounded-lg text-base font-normal hover:bg-white/60 transition-all duration-200 shadow-sm"
                style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
              >
                Explore Collection
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;

