import React from 'react';

function Gallery() {
  const galleryItems = [
    {
      title: "Bespoke Formal Shirts",
      description: "Impeccably tailored dress shirts in premium cotton",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=95&fit=crop&auto=format&sharp=10",
      icon: "👔"
    },
    {
      title: "Bridal & Wedding",
      description: "Exquisite wedding attire and bridal collections",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=95&fit=crop&auto=format&sharp=10",
      icon: "💎"
    },
    {
      title: "Luxury Trousers",
      description: "Perfectly proportioned casual and formal trousers",
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=95&fit=crop&auto=format&sharp=10",
      icon: "👖"
    },
    {
      title: "Custom Suits",
      description: "Sophisticated business and evening suits",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=95&fit=crop&auto=format&sharp=10",
      icon: "🎩"
    },
    {
      title: "Evening & Formal",
      description: "Elegant formal wear for special occasions",
      image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=95&fit=crop&auto=format&sharp=10",
      icon: "✨"
    },
    {
      title: "Designer Collections",
      description: "Exclusive artistic creations and statement pieces",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea9c6c87?w=800&q=95&fit=crop&auto=format&sharp=10",
      icon: "🎨"
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-white via-elegant-cream to-white relative">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          {/* Decorative Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-elegant-gold"></div>
            <span className="mx-4 text-elegant-gold text-2xl">✦</span>
            <div className="h-px w-16 bg-elegant-gold"></div>
          </div>
          
          <h2 className="font-elegant text-5xl md:text-6xl font-bold mb-4 text-elegant-black">
            Our Portfolio
          </h2>
          <p className="font-display text-xl text-elegant-purple italic mb-6">
            A Showcase of Artisanal Excellence
          </p>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Each piece in our collection represents the pinnacle of tailoring craftsmanship, 
            where traditional techniques meet contemporary design sensibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-96 border-2 border-elegant-gold/20 hover:border-elegant-gold"
            >
              {/* High-Quality Sharp Image Background */}
              <img 
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                style={{ imageRendering: '-webkit-optimize-contrast', filter: 'contrast(1.05) brightness(1.02) saturate(1.1)' }}
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-elegant-black/80 via-elegant-black/40 to-transparent group-hover:from-elegant-black/90 transition-all duration-500"></div>
              
              {/* Content */}
              <div className="relative inset-0 flex flex-col items-center justify-end text-white p-8 h-full">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <div className="h-px w-16 bg-elegant-gold mb-4"></div>
                <h3 className="font-elegant text-2xl font-bold mb-3 text-center">{item.title}</h3>
                <p className="text-center text-white/90 text-base">{item.description}</p>
                
                {/* Decorative Corner Elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-elegant-gold/60"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-elegant-gold/60"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-elegant-gold/60"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-elegant-gold/60"></div>
              </div>
              
              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-elegant-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center bg-gradient-to-r from-white via-elegant-cream to-white border-2 border-elegant-gold/30 p-12">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-elegant text-3xl font-bold mb-4 text-elegant-black">
              Experience Our Craftsmanship Firsthand
            </h3>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              Visit our boutique to explore our complete collection of premium fabrics, 
              review our extensive portfolio, and witness the artistry that goes into every stitch. 
              Our master tailors are ready to bring your vision to life.
            </p>
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="group relative bg-gradient-to-r from-elegant-gold to-elegant-darkGold text-white px-12 py-4 text-lg font-semibold overflow-hidden transition-all duration-500 hover:scale-105 shadow-lg"
            >
              <span className="relative z-10">Schedule Your Visit</span>
              <div className="absolute inset-0 bg-elegant-deepPurple transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
