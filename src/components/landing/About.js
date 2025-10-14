import React from 'react';

function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-elegant-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-elegant-purple/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-elegant-gold"></div>
            <span className="mx-4 text-elegant-gold text-2xl">✦</span>
            <div className="h-px w-16 bg-elegant-gold"></div>
          </div>
          
          <h2 className="font-elegant text-5xl md:text-6xl font-bold mb-4 text-elegant-black">
            About Us
          </h2>
          <p className="font-display text-xl text-elegant-purple italic">
            Two Decades of Tailoring Excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h3 className="font-elegant text-3xl font-bold text-elegant-black">Our Story</h3>
            <div className="h-0.5 w-24 bg-elegant-gold"></div>
            
            <p className="text-gray-700 leading-relaxed text-lg">
              <span className="font-elegant font-semibold text-elegant-purple">Elegant Stitches</span> was founded in 2003 with a vision to bring premium, personalized tailoring to every individual who values quality and style.
            </p>
            
            <p className="text-gray-700 leading-relaxed text-lg">
              What started as a small family-run boutique has now grown into a trusted name in custom tailoring, serving over 10,000 satisfied clients.
            </p>
            
            <p className="text-gray-700 leading-relaxed text-lg">
              With over <span className="font-semibold text-elegant-gold">20 years of experience</span>, our master tailors blend traditional techniques with modern design sensibilities to create garments that are expressions of your unique personality.
            </p>
          </div>

          <div className="space-y-6">
            <div className="group bg-elegant-cream border-2 border-elegant-gold/30 hover:border-elegant-gold p-8 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="text-5xl text-elegant-gold group-hover:scale-110 transition-transform">🏆</div>
                <div>
                  <h4 className="font-elegant text-2xl font-semibold mb-2 text-elegant-black">Award-Winning</h4>
                  <div className="h-0.5 w-16 bg-elegant-gold mb-3"></div>
                  <p className="text-gray-700 leading-relaxed">Recognized for excellence in custom tailoring and exceptional customer service</p>
                </div>
              </div>
            </div>

            <div className="group bg-elegant-cream border-2 border-elegant-gold/30 hover:border-elegant-gold p-8 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="text-5xl text-elegant-gold group-hover:scale-110 transition-transform">🎨</div>
                <div>
                  <h4 className="font-elegant text-2xl font-semibold mb-2 text-elegant-black">Premium Fabrics</h4>
                  <div className="h-0.5 w-16 bg-elegant-gold mb-3"></div>
                  <p className="text-gray-700 leading-relaxed">Curated collection of the finest materials sourced from around the world</p>
                </div>
              </div>
            </div>

            <div className="group bg-elegant-cream border-2 border-elegant-gold/30 hover:border-elegant-gold p-8 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="text-5xl text-elegant-gold group-hover:scale-110 transition-transform">💯</div>
                <div>
                  <h4 className="font-elegant text-2xl font-semibold mb-2 text-elegant-black">100% Satisfaction</h4>
                  <div className="h-0.5 w-16 bg-elegant-gold mb-3"></div>
                  <p className="text-gray-700 leading-relaxed">Over 10,000 happy clients and a legacy of trust and quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
