import React from 'react';

function Gallery() {
  const galleryItems = [
    {
      title: "Formal Shirts",
      description: "Premium cotton formal shirts",
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Designer Wear",
      description: "Luxury wedding collection",
      color: "from-purple-400 to-purple-600"
    },
    {
      title: "Casual Pants",
      description: "Comfortable daily wear",
      color: "from-green-400 to-green-600"
    },
    {
      title: "Custom Suits",
      description: "Tailored business attire",
      color: "from-gray-700 to-gray-900"
    },
    {
      title: "Party Wear",
      description: "Stylish evening outfits",
      color: "from-pink-400 to-pink-600"
    },
    {
      title: "Traditional Wear",
      description: "Classic ethnic designs",
      color: "from-orange-400 to-orange-600"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Our Gallery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our collection of custom-tailored masterpieces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-80"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <h3 className="text-2xl font-bold mb-2 text-center">{item.title}</h3>
                <p className="text-center text-white/90">{item.description}</p>
                <div className="mt-4 w-16 h-16 border-4 border-white rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  👔
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-12">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">See More Designs</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Visit our boutique to explore our complete collection of fabrics, designs, and previous work. 
            Our portfolio showcases hundreds of satisfied clients wearing our custom creations.
          </p>
          <button 
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Schedule a Visit
          </button>
        </div>
      </div>
    </section>
  );
}

export default Gallery;

