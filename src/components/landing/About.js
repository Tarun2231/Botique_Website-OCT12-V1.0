import React from 'react';

function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            About Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Elegant Stitches was founded in 2003 with a vision to bring premium, personalized tailoring 
              to every individual who values quality and style. What started as a small family-run boutique 
              has now grown into a trusted name in custom tailoring.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              With over two decades of experience, our master tailors have honed their craft to perfection. 
              We blend traditional tailoring techniques with modern design sensibilities to create garments 
              that are not just clothes, but expressions of your unique personality.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every piece we create is a testament to our commitment to excellence. From the finest fabrics 
              to the most intricate details, we ensure that your garments fit perfectly and make you feel 
              confident every time you wear them.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🏆</div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">Award-Winning Tailors</h4>
                  <p className="text-gray-600">Recognized for excellence in custom tailoring and customer service</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🎨</div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">Premium Fabrics</h4>
                  <p className="text-gray-600">Curated collection of the finest materials from around the world</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">💯</div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">100% Satisfaction</h4>
                  <p className="text-gray-600">Over 10,000 happy clients and counting</p>
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

