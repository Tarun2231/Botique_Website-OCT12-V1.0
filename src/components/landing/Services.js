import React from 'react';

function Services() {
  const services = [
    {
      icon: "👔",
      title: "Bespoke Shirts",
      description: "Perfectly tailored dress shirts crafted to your exact measurements in premium cotton and luxurious fabrics.",
      features: ["Formal & Casual Styles", "Premium Fabrics", "Perfect Fit Guarantee"]
    },
    {
      icon: "🎩",
      title: "Custom Suits",
      description: "Sophisticated business and evening suits designed to make a lasting impression at every occasion.",
      features: ["Business & Formal", "Wedding Suits", "Premium Tailoring"]
    },
    {
      icon: "👖",
      title: "Tailored Trousers",
      description: "From classic formal trousers to casual wear, perfectly proportioned pants that complement your wardrobe.",
      features: ["All Styles Available", "Comfort Fit", "Durable Stitching"]
    },
    {
      icon: "💎",
      title: "Bridal & Wedding",
      description: "Exquisite wedding attire and bridal collections for your most special day, crafted with utmost care.",
      features: ["Custom Designs", "Bridal Specials", "Luxury Fabrics"]
    },
    {
      icon: "✨",
      title: "Evening & Formal",
      description: "Elegant formal wear for galas, parties, and special occasions that showcase your refined taste.",
      features: ["Designer Styles", "Party Wear", "Premium Materials"]
    },
    {
      icon: "🎨",
      title: "Alterations & Repairs",
      description: "Expert alteration services to give your existing garments a perfect fit and extended life.",
      features: ["Quick Service", "All Garments", "Precision Fitting"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-elegant-cream to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-elegant-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-elegant-gold/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-elegant-gold"></div>
            <span className="mx-4 text-elegant-gold text-2xl">✦</span>
            <div className="h-px w-16 bg-elegant-gold"></div>
          </div>
          
          <h2 className="font-elegant text-5xl md:text-6xl font-bold mb-4 text-elegant-black">
            Our Services
          </h2>
          <p className="font-display text-xl text-elegant-purple italic mb-6">
            Comprehensive Tailoring Solutions
          </p>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            From bespoke suits to wedding attire, we offer a complete range of tailoring services designed to meet all your fashion needs with precision and artistry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-white border-2 border-elegant-gold/20 hover:border-elegant-gold p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="text-6xl mb-6 text-center group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
              <h3 className="font-elegant text-2xl font-bold mb-3 text-elegant-black text-center">{service.title}</h3>
              <div className="h-0.5 w-16 bg-elegant-gold mx-auto mb-4"></div>
              <p className="text-gray-700 mb-6 text-center leading-relaxed">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="text-elegant-gold mr-3">✦</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-gradient-to-r from-elegant-cream via-white to-elegant-cream border-2 border-elegant-gold/30 p-12 max-w-4xl mx-auto">
          <h3 className="font-elegant text-3xl font-bold mb-4 text-elegant-black">
            Not Sure Which Service You Need?
          </h3>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Our experienced tailoring consultants are here to guide you through every step of the process. 
            From fabric selection to final fitting, we ensure your complete satisfaction.
          </p>
          <button 
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-gradient-to-r from-elegant-gold to-elegant-darkGold text-white px-12 py-4 text-lg font-semibold overflow-hidden transition-all duration-500 hover:scale-105 shadow-lg"
          >
            <span className="relative z-10">Get a Free Consultation</span>
            <div className="absolute inset-0 bg-elegant-deepPurple transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Services;
