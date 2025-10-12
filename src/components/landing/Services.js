import React from 'react';

function Services() {
  const services = [
    {
      icon: "👔",
      title: "Custom Shirt Stitching",
      description: "Perfectly tailored shirts crafted to your exact measurements and style preferences. Choose from our extensive fabric collection.",
      features: ["Formal & Casual Styles", "Premium Fabric Options", "Perfect Fit Guarantee"]
    },
    {
      icon: "👖",
      title: "Custom Pant Stitching",
      description: "From classic formal trousers to casual wear, we create pants that fit you perfectly and complement your wardrobe.",
      features: ["All Styles Available", "Comfort Fit Technology", "Durable Stitching"]
    },
    {
      icon: "✨",
      title: "Alterations",
      description: "Expert alteration services to give your existing garments a perfect fit. We handle everything from simple hems to complex adjustments.",
      features: ["Same-Day Service Available", "All Garment Types", "Precision Fitting"]
    },
    {
      icon: "🎭",
      title: "Designer Wear",
      description: "Create stunning designer outfits for weddings, parties, and special occasions. Our designers work with you to bring your vision to life.",
      features: ["Custom Designs", "Wedding Specials", "Luxury Fabrics"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive tailoring solutions designed to meet all your fashion needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-6xl mb-4 text-center">{service.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">{service.title}</h3>
              <p className="text-gray-600 mb-6 text-center">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-700 text-lg mb-6">
            Not sure which service you need? Our experts are here to help!
          </p>
          <button 
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Get a Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}

export default Services;

