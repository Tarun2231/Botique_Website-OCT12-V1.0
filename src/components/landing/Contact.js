import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-elegant-cream relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-elegant-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-elegant-gold/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-elegant-gold"></div>
            <span className="mx-4 text-elegant-gold text-2xl">✦</span>
            <div className="h-px w-16 bg-elegant-gold"></div>
          </div>
          
          <h2 className="font-elegant text-5xl md:text-6xl font-bold mb-4 text-elegant-black">
            Contact Us
          </h2>
          <p className="font-display text-xl text-elegant-purple italic mb-6">
            Let's Create Something Beautiful Together
          </p>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Visit our boutique or reach out to us for personalized consultations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white border-2 border-elegant-gold/30 p-10 hover:border-elegant-gold transition-all duration-300 shadow-lg">
              <h3 className="font-elegant text-3xl font-bold mb-8 text-elegant-black">Visit Our Boutique</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl text-elegant-gold">📍</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-lg">Address</h4>
                    <p className="text-gray-700 leading-relaxed">123 Fashion Street, Boutique Plaza<br />Downtown City, State 560001</p>
                  </div>
                </div>

                <div className="h-px bg-elegant-gold/20"></div>

                <div className="flex items-start space-x-4">
                  <div className="text-3xl text-elegant-gold">📞</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-lg">Phone</h4>
                    <p className="text-gray-700">+91 9876543210</p>
                    <p className="text-gray-700">+91 9123456789</p>
                  </div>
                </div>

                <div className="h-px bg-elegant-gold/20"></div>

                <div className="flex items-start space-x-4">
                  <div className="text-3xl text-elegant-gold">📧</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-lg">Email</h4>
                    <p className="text-gray-700">info@elegantstitches.com</p>
                    <p className="text-gray-700">orders@elegantstitches.com</p>
                  </div>
                </div>

                <div className="h-px bg-elegant-gold/20"></div>

                <div className="flex items-start space-x-4">
                  <div className="text-3xl text-elegant-gold">⏰</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-lg">Working Hours</h4>
                    <p className="text-gray-700">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                    <p className="text-gray-700">Sunday: 11:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t-2 border-elegant-gold/20">
                <h4 className="font-semibold text-gray-800 mb-4 text-lg">Follow Us</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-elegant-gold to-elegant-darkGold flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all"
                  >
                    <span className="text-xl font-bold">f</span>
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-elegant-gold to-elegant-darkGold flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all"
                  >
                    <span className="text-xl">📷</span>
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-elegant-gold to-elegant-darkGold flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all"
                  >
                    <span className="text-xl">𝕏</span>
                  </a>
                  <a 
                    href="https://wa.me/919876543210" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-elegant-gold to-elegant-darkGold flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all"
                  >
                    <span className="text-xl">💬</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-elegant-cream border-2 border-elegant-gold/30 p-10 shadow-lg">
            <h3 className="font-elegant text-3xl font-bold mb-8 text-elegant-black">Send us a Message</h3>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border-2 border-green-300 rounded-lg">
                <p className="text-green-800 font-semibold">✓ Thank you for contacting us!</p>
                <p className="text-green-700 text-sm">We'll get back to you within 24 hours.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 bg-white focus:outline-none focus:ring-2 focus:ring-elegant-gold ${errors.name ? 'border-red-500' : 'border-elegant-gold/30'}`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 bg-white focus:outline-none focus:ring-2 focus:ring-elegant-gold ${errors.email ? 'border-red-500' : 'border-elegant-gold/30'}`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 bg-white focus:outline-none focus:ring-2 focus:ring-elegant-gold ${errors.phone ? 'border-red-500' : 'border-elegant-gold/30'}`}
                  placeholder="+91 9876543210"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-3 border-2 bg-white focus:outline-none focus:ring-2 focus:ring-elegant-gold ${errors.message ? 'border-red-500' : 'border-elegant-gold/30'}`}
                  placeholder="Tell us about your requirements..."
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-elegant-gold to-elegant-darkGold text-white px-8 py-4 text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
