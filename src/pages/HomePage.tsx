import React from 'react';
import { Hero } from '../components/public/Hero';
import { CategoriesSection } from '../components/public/CategoriesSection';
import { SolarSection } from '../components/public/SolarSection';
import { SolarCalculator } from '../components/public/SolarCalculator';
import { ProductsShowcase } from '../components/public/ProductsShowcase';
import { ServicesSection } from '../components/public/ServicesSection';
import { ProjectsGallery } from '../components/public/ProjectsGallery';
import { BenefitsSection } from '../components/public/BenefitsSection';
import { TestimonialsSection } from '../components/public/TestimonialsSection';
import { BlogSection } from '../components/public/BlogSection';
import { FaqSection } from '../components/public/FaqSection';
import { ContactSection } from '../components/public/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      <Hero />
      <CategoriesSection />
      <SolarSection />
      <SolarCalculator />
      <ProductsShowcase />
      <ServicesSection />
      <ProjectsGallery />
      <BenefitsSection />
      <TestimonialsSection />
      <BlogSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
};
