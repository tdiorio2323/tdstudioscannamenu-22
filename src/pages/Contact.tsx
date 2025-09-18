import React, { useState } from 'react';
import { PremiumButton } from '@/components/PremiumButton';
import GlassCard from '@/components/GlassCard';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    timeline: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
  };

  const services = [
    'Website Strategy & UX Architecture',
    'Full-stack Web Development',
    'Brand Identity & Design Systems',
    'Product & E-commerce Launches',
    'Social Media Marketing Programs',
    'Content & Automation Ops',
    'Analytics & Optimization',
    'Other',
  ];

  const budgetRanges = [
    'Under $500',
    '$500 - $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    '$10,000+',
  ];

  const timelines = [
    'ASAP',
    '1-2 weeks',
    '3-4 weeks',
    '1-2 months',
    '3+ months',
    'Flexible',
  ];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Ready to elevate your brand with premium design solutions?
            Let's discuss your project and bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              <GlassCard className="p-6 transition-transform duration-150 ease-out">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                    <p className="text-white/60">contact@tdstudios.com</p>
                    <p className="text-white/60">347-485-9935</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6 transition-transform duration-150 ease-out">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Response Time</h3>
                    <p className="text-white/60">Within 24 hours</p>
                    <p className="text-white/60">Monday - Friday, 9AM - 6PM PST</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6 transition-transform duration-150 ease-out">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
                    <p className="text-white/60">New York City, NY</p>
                    <p className="text-white/60">Serving clients worldwide</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="grid gap-4">
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Web Experience</h3>
                <p className="text-neutral-300 text-[15px]">
                  Strategy, UX architecture, and high-converting marketing sites. Landing pages, CMS builds, and measurement setup.
                </p>
              </GlassCard>
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Product & Platform Development</h3>
                <p className="text-neutral-300 text-[15px]">
                  Full-stack engineering, integrations, analytics, and ongoing iteration for apps, SaaS dashboards, and commerce experiences.
                </p>
              </GlassCard>
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Social & Content Systems</h3>
                <p className="text-neutral-300 text-[15px]">
                  Editorial programming, asset engines, and campaign management that keep community and growth teams shipping.
                </p>
              </GlassCard>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold text-white mb-8">Start Your Project</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Company and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                {/* Service and Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-white/80 mb-2">
                      Service Needed *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service} className="bg-black text-white">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-white/80 mb-2">
                      Project Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range, index) => (
                        <option key={index} value={range} className="bg-black text-white">
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-white/80 mb-2">
                    Project Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select timeline</option>
                    {timelines.map((time, index) => (
                      <option key={index} value={time} className="bg-black text-white">
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <PremiumButton type="submit" className="w-full justify-center px-7 py-3">
                    Send Message
                  </PremiumButton>
                </div>
              </form>
            </GlassCard>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-white/60">Quick answers to common questions about our services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'How long does a typical project take?',
                answer: 'Project timelines vary based on scope. Logo designs typically take 1-2 weeks, while complete brand identities can take 3-4 weeks. We always provide detailed timelines during consultation.',
              },
              {
                question: 'Do you work with different industries?',
                answer: 'Absolutely. We collaborate with consumer brands, product companies, and service teams seeking premium, luxury design solutions.',
              },
              {
                question: 'What file formats do you provide?',
                answer: 'We provide all source files including AI, PSD, PNG, JPG, PDF, and vector formats. You\'ll receive everything needed for print and digital use.',
              },
              {
                question: 'Do you offer rush delivery?',
                answer: 'Yes, we can accommodate rush projects with additional fees. Contact us to discuss your timeline and we\'ll find a solution.',
              },
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-white/60">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
