import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import BoutiqueOverview from '../components/landing/BoutiqueOverview';
import ClothingTypes from '../components/landing/ClothingTypes';
import About from '../components/landing/About';
import TargetAudience from '../components/landing/TargetAudience';
import Services from '../components/landing/Services';
import Gallery from '../components/landing/Gallery';
import Contact from '../components/landing/Contact';
import Footer from '../components/landing/Footer';

function LandingPage() {
  return (
    <div className="min-h-screen bg-elegant-cream">
      <Navbar />
      <Hero />
      <BoutiqueOverview />
      <ClothingTypes />
      <About />
      <TargetAudience />
      <Services />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}

export default LandingPage;

