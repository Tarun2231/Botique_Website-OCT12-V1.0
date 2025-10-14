import React from 'react';

function BoutiqueShowcase() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-elegant-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-elegant-gold"></div>
            <span className="mx-4 text-elegant-gold text-2xl">✦</span>
            <div className="h-px w-16 bg-elegant-gold"></div>
          </div>
          <h2 className="font-elegant text-5xl md:text-6xl font-bold mb-4 text-elegant-black">
            Our Boutique
          </h2>
          <p className="font-display text-xl text-elegant-purple italic">
            Step Into Elegance
          </p>
        </div>

        {/* Boutique Storefront Image - Crystal Clear */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-elegant-gold/30">
            <img 
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=95&fit=crop&auto=format&sharp=10" 
              alt="Elegant Stitches Boutique Storefront"
              className="w-full h-[600px] object-cover"
              style={{ imageRendering: '-webkit-optimize-contrast', filter: 'contrast(1.05) brightness(1.02)' }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-elegant-black/40 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
              <h3 className="font-elegant text-4xl font-bold mb-4">Visit Our Atelier</h3>
              <p className="text-xl mb-6">Experience personalized service in our elegant boutique</p>
              <div className="flex items-center space-x-4">
                <span className="text-elegant-gold">📍</span>
                <span>123 Fashion Street, Downtown City</span>
              </div>
            </div>
          </div>

          {/* Store Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white border-2 border-elegant-gold/20 p-6 text-center hover:border-elegant-gold transition-all duration-300">
              <div className="text-4xl mb-4">🏆</div>
              <h4 className="font-elegant text-xl font-semibold mb-2 text-elegant-black">Premium Quality</h4>
              <p className="text-gray-600">Finest fabrics and materials</p>
            </div>
            <div className="bg-white border-2 border-elegant-gold/20 p-6 text-center hover:border-elegant-gold transition-all duration-300">
              <div className="text-4xl mb-4">✂️</div>
              <h4 className="font-elegant text-xl font-semibold mb-2 text-elegant-black">Expert Tailors</h4>
              <p className="text-gray-600">20+ years of experience</p>
            </div>
            <div className="bg-white border-2 border-elegant-gold/20 p-6 text-center hover:border-elegant-gold transition-all duration-300">
              <div className="text-4xl mb-4">💎</div>
              <h4 className="font-elegant text-xl font-semibold mb-2 text-elegant-black">Personalized Service</h4>
              <p className="text-gray-600">One-on-one consultations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BoutiqueShowcase;

