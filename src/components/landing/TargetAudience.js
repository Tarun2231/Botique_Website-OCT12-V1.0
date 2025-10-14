import React from 'react';

function TargetAudience() {
  const audiences = [
    {
      title: "Brides & Grooms",
      description: "Wedding outfits designed for your special day.",
      icon: "💍"
    },
    {
      title: "Event Attendees",
      description: "Perfect looks for parties and celebrations.",
      icon: "🎉"
    },
    {
      title: "Fashion Enthusiasts",
      description: "Unique, elegant clothing for style-conscious individuals.",
      icon: "👗"
    },
    {
      title: "Professionals",
      description: "Formal wear that makes an impression.",
      icon: "💼"
    }
  ];

  return (
    <section id="target-audience" className="py-24 bg-gradient-to-b from-elegant-cream to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-elegant-gold"></div>
            <span className="mx-4 text-elegant-gold text-2xl">✦</span>
            <div className="h-px w-16 bg-elegant-gold"></div>
          </div>
          <h2 className="font-elegant text-5xl md:text-6xl font-bold mb-4 text-elegant-black">
            Target Audience
          </h2>
          <p className="font-display text-xl text-elegant-purple italic">
            Tailored for Every Occasion
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Diverse Fashion Illustration - Sharp Focus */}
          <div className="relative rounded-lg border-2 border-elegant-gold/20 min-h-[500px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=95&fit=crop&auto=format&sharp=10" 
              alt="Diverse Fashion Clientele"
              className="w-full h-full object-cover"
              style={{ imageRendering: '-webkit-optimize-contrast', filter: 'contrast(1.05) brightness(1.02) saturate(1.1)' }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-elegant-black/50 via-transparent to-transparent flex items-end p-8">
              <div className="text-white">
                <p className="font-elegant text-3xl font-bold mb-2">Our Diverse Clientele</p>
                <p className="text-lg">From brides to professionals, we dress everyone with elegance</p>
              </div>
            </div>
          </div>

          {/* Right Side - Audience Categories */}
          <div className="space-y-6">
            {audiences.map((audience, index) => (
              <div 
                key={index}
                className="bg-elegant-cream border-2 border-elegant-gold/30 hover:border-elegant-gold p-8 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{audience.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-elegant text-2xl font-semibold mb-2 text-elegant-black">
                      {audience.title}
                    </h3>
                    <div className="h-0.5 w-16 bg-elegant-gold mb-3"></div>
                    <p className="text-gray-700 text-lg">
                      {audience.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-gray-700 text-lg mb-6">
            Discover how we can create the perfect ensemble for your needs
          </p>
          <button 
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-gradient-to-r from-elegant-gold to-elegant-darkGold text-white px-12 py-4 text-lg font-semibold overflow-hidden transition-all duration-500 hover:scale-105 shadow-lg"
          >
            <span className="relative z-10">Schedule a Consultation</span>
            <div className="absolute inset-0 bg-elegant-deepPurple transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </button>
        </div>
      </div>
    </section>
  );
}

export default TargetAudience;

