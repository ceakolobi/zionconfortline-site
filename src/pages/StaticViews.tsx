import React from 'react';
import { ServicesSection } from '../components/public/ServicesSection';
import { ProjectsGallery } from '../components/public/ProjectsGallery';
import { BlogSection } from '../components/public/BlogSection';
import { FaqSection } from '../components/public/FaqSection';
import { ContactSection } from '../components/public/ContactSection';
import { SolarCalculator } from '../components/public/SolarCalculator';

export const ServicesPage: React.FC = () => (
  <div className="pt-6">
    <ServicesSection />
    <ContactSection />
  </div>
);

export const ProjectsPage: React.FC = () => (
  <div className="pt-6">
    <ProjectsGallery />
    <ContactSection />
  </div>
);

export const CalculatorPage: React.FC = () => (
  <div className="pt-6">
    <SolarCalculator />
    <ContactSection />
  </div>
);

export const BlogPage: React.FC = () => (
  <div className="pt-6">
    <BlogSection />
  </div>
);

export const FaqPage: React.FC = () => (
  <div className="pt-6">
    <FaqSection />
    <ContactSection />
  </div>
);

export const ContactPage: React.FC = () => (
  <div className="pt-6">
    <ContactSection />
  </div>
);
