import React, { useEffect, useRef, useState } from 'react';

function ClothingTypes() {
  const [visibleRows, setVisibleRows] = useState([]);
  const rowRefs = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const rowIndex = rowRefs.current.indexOf(entry.target);
          if (rowIndex !== -1 && !visibleRows.includes(rowIndex)) {
            setTimeout(() => {
              setVisibleRows(prev => [...prev, rowIndex]);
            }, rowIndex * 200); // Stagger by 200ms per row
          }
        }
      });
    }, options);

    rowRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      rowRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [visibleRows]);

  const addToRefs = (el) => {
    if (el && !rowRefs.current.includes(el)) {
      rowRefs.current.push(el);
    }
  };

  const clothingCategories = [
    {
      title: "Bridal & Groom Wear",
      description: "Lehengas, sherwanis, gowns, and suits for your big day."
    },
    {
      title: "Ethnic Wear",
      description: "Sarees, kurta sets, salwar suits, and anarkalis."
    },
    {
      title: "Party & Evening Wear",
      description: "Gowns, dresses, and Indo-western styles."
    },
    {
      title: "Formal Wear",
      description: "Blazers, dresses, kurtas, and shirts for professionals."
    }
  ];

  return (
    <section className="py-24 bg-[#f5ede4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading - Row 0 */}
        <div 
          ref={addToRefs}
          className={`text-center mb-16 transition-all duration-700 ${
            visibleRows.includes(0) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-elegant text-4xl md:text-5xl font-bold text-[#4a4a4a] mb-4">
            Types of Clothing Offered
          </h2>
        </div>

        {/* Clothing Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {clothingCategories.map((category, index) => (
            <div
              key={index}
              ref={addToRefs}
              className={`transition-all duration-700 ${
                visibleRows.includes(index + 1) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="bg-white p-6 rounded-lg border border-[#8b7b6b]/20 hover:border-[#8b7b6b]/40 hover:shadow-md transition-all duration-300 h-full">
                <h3 className="font-bold text-lg text-[#4a4a4a] mb-3">
                  {category.title}
                </h3>
                <p className="text-[#6b6b6b] text-base leading-relaxed">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClothingTypes;

