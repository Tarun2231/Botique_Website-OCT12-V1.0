import React, { useEffect, useRef, useState } from 'react';

function BoutiqueOverview() {
  const [visibleLines, setVisibleLines] = useState([]);
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lineIndex = lineRefs.current.indexOf(entry.target);
          if (lineIndex !== -1 && !visibleLines.includes(lineIndex)) {
            setTimeout(() => {
              setVisibleLines(prev => [...prev, lineIndex]);
            }, lineIndex * 150); // Stagger animation by 150ms per line
          }
        }
      });
    }, options);

    lineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      lineRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [visibleLines]);

  const addToRefs = (el) => {
    if (el && !lineRefs.current.includes(el)) {
      lineRefs.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} id="boutique-overview" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative floral elements */}
      <div className="absolute bottom-0 left-0 w-64 h-96 opacity-20">
        <svg viewBox="0 0 200 400" className="w-full h-full">
          <path d="M10,350 Q30,300 40,250 T60,150" stroke="#8B7355" strokeWidth="3" fill="none"/>
          <circle cx="45" cy="180" r="12" fill="white" stroke="#8B7355" strokeWidth="2"/>
          <circle cx="35" cy="200" r="10" fill="white" stroke="#8B7355" strokeWidth="2"/>
          <circle cx="55" cy="220" r="11" fill="white" stroke="#8B7355" strokeWidth="2"/>
          <circle cx="40" cy="240" r="9" fill="white" stroke="#8B7355" strokeWidth="2"/>
        </svg>
      </div>
      
      <div className="absolute bottom-0 right-0 w-64 h-96 opacity-20">
        <svg viewBox="0 0 200 400" className="w-full h-full">
          <path d="M190,350 Q170,300 160,250 T140,150" stroke="#8B7355" strokeWidth="3" fill="none"/>
          <circle cx="155" cy="180" r="12" fill="white" stroke="#8B7355" strokeWidth="2"/>
          <circle cx="165" cy="200" r="10" fill="white" stroke="#8B7355" strokeWidth="2"/>
          <circle cx="145" cy="220" r="11" fill="white" stroke="#8B7355" strokeWidth="2"/>
          <circle cx="160" cy="240" r="9" fill="white" stroke="#8B7355" strokeWidth="2"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title - Line 0 */}
        <div 
          ref={addToRefs}
          className={`text-center mb-16 transition-all duration-700 ${
            visibleLines.includes(0) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-elegant text-5xl md:text-6xl font-bold mb-4 text-[#4a4035]">
            Boutique Overview
          </h2>
          <div className="h-0.5 w-24 bg-[#8b7355] mx-auto"></div>
        </div>

        {/* Content Box */}
        <div className="bg-[#f5ede4] border-2 border-[#8b7355]/30 rounded-lg p-8 md:p-12 lg:p-16 max-w-6xl mx-auto shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {/* Left Column - Definition */}
            <div className="space-y-6">
              {/* Line 1 */}
              <p 
                ref={addToRefs}
                className={`text-[#4a4035] text-lg leading-relaxed transition-all duration-700 ${
                  visibleLines.includes(1) 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-8'
                }`}
              >
                A <span className="font-elegant font-semibold text-[#8b7355]">boutique</span> is a specialized fashion store focusing on customized, designer, premium-quality clothing.
              </p>
              
              {/* Line 2 */}
              <p 
                ref={addToRefs}
                className={`text-[#6b5d52] text-base leading-relaxed transition-all duration-700 ${
                  visibleLines.includes(2) 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-8'
                }`}
              >
                Unlike mass retail, boutiques offer personalized experiences and unique collections.
              </p>
              
              {/* Line 3 */}
              <p 
                ref={addToRefs}
                className={`text-[#6b5d52] text-base leading-relaxed transition-all duration-700 ${
                  visibleLines.includes(3) 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-8'
                }`}
              >
                Every piece is carefully curated or custom-made to reflect individual style, ensuring that each client receives exclusive attention and garments that truly fit their personality and occasion.
              </p>
            </div>

            {/* Right Column - Services */}
            <div className="bg-white p-6 md:p-8 rounded-lg border-2 border-[#8b7355]/20 shadow-md">
              {/* Line 4 - Heading */}
              <h3 
                ref={addToRefs}
                className={`font-elegant text-2xl md:text-3xl font-semibold mb-6 text-[#4a4035] transition-all duration-700 ${
                  visibleLines.includes(4) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                What We Offer
              </h3>
              
              <ul className="space-y-4">
                {/* Line 5 */}
                <li 
                  ref={addToRefs}
                  className={`flex items-start transition-all duration-700 ${
                    visibleLines.includes(5) 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-8'
                  }`}
                >
                  <span className="text-[#8b7355] mr-3 mt-1 text-lg">✦</span>
                  <span className="text-[#4a4035] text-base leading-relaxed">Custom outfit designing</span>
                </li>
                
                {/* Line 6 */}
                <li 
                  ref={addToRefs}
                  className={`flex items-start transition-all duration-700 ${
                    visibleLines.includes(6) 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-8'
                  }`}
                >
                  <span className="text-[#8b7355] mr-3 mt-1 text-lg">✦</span>
                  <span className="text-[#4a4035] text-base leading-relaxed">Bridal & party wear</span>
                </li>
                
                {/* Line 7 */}
                <li 
                  ref={addToRefs}
                  className={`flex items-start transition-all duration-700 ${
                    visibleLines.includes(7) 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-8'
                  }`}
                >
                  <span className="text-[#8b7355] mr-3 mt-1 text-lg">✦</span>
                  <span className="text-[#4a4035] text-base leading-relaxed">Festive and ethnic collections</span>
                </li>
                
                {/* Line 8 */}
                <li 
                  ref={addToRefs}
                  className={`flex items-start transition-all duration-700 ${
                    visibleLines.includes(8) 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-8'
                  }`}
                >
                  <span className="text-[#8b7355] mr-3 mt-1 text-lg">✦</span>
                  <span className="text-[#4a4035] text-base leading-relaxed">Indo-Western outfits</span>
                </li>
                
                {/* Line 9 */}
                <li 
                  ref={addToRefs}
                  className={`flex items-start transition-all duration-700 ${
                    visibleLines.includes(9) 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-8'
                  }`}
                >
                  <span className="text-[#8b7355] mr-3 mt-1 text-lg">✦</span>
                  <span className="text-[#4a4035] text-base leading-relaxed">Accessories & styling add-ons</span>
                </li>
                
                {/* Line 10 */}
                <li 
                  ref={addToRefs}
                  className={`flex items-start transition-all duration-700 ${
                    visibleLines.includes(10) 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-8'
                  }`}
                >
                  <span className="text-[#8b7355] mr-3 mt-1 text-lg">✦</span>
                  <span className="text-[#4a4035] text-base leading-relaxed">Tailoring and fitting services</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BoutiqueOverview;
