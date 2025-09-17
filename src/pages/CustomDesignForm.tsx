import React, { useState } from 'react';

const CustomDesignForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    designType: '',
    budget: '',
    timeline: '',
    description: '',
    inspiration: '',
    brandGuidelines: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Custom Design Form submitted:', formData);
    alert('Thank you for your custom design request! We\'ll review your requirements and get back to you within 24 hours.');
  };

  const designTypes = [
    'Logo Design',
    'Brand Identity Package',
    'Business Cards',
    'Packaging Design',
    'Website Design',
    'Social Media Graphics',
    'Marketing Materials',
    'Merchandise Design',
    'Cannabis Product Packaging',
    'Dispensary Branding',
    'Other',
  ];

  const budgets = [
    'Under $500',
    '$500 - $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    '$10,000+',
  ];

  const timelines = [
    'Rush (1 week)',
    '2-3 weeks',
    '1 month',
    '2 months',
    '3+ months',
    'Flexible',
  ];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Custom Design Request
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Let's bring your vision to life. Tell us about your custom design project
            and we'll create something extraordinary for your brand.
          </p>
        </div>

        <div className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-4">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="Your company or brand name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-4">
                Project Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Design Type *
                  </label>
                  <select
                    name="designType"
                    required
                    value={formData.designType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select design type</option>
                    {designTypes.map((type, index) => (
                      <option key={index} value={type} className="bg-black text-white">{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select budget</option>
                    {budgets.map((budget, index) => (
                      <option key={index} value={budget} className="bg-black text-white">{budget}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select timeline</option>
                    {timelines.map((time, index) => (
                      <option key={index} value={time} className="bg-black text-white">{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Project Description *
                </label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Describe your project in detail. What do you need designed? What is the purpose? Who is your target audience?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Design Inspiration & References
                </label>
                <textarea
                  name="inspiration"
                  value={formData.inspiration}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Share any design inspiration, links to designs you like, or describe the style you're looking for..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Existing Brand Guidelines
                </label>
                <textarea
                  name="brandGuidelines"
                  value={formData.brandGuidelines}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Do you have existing brand colors, fonts, or style guidelines? Please share links to existing brand materials..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] text-white font-semibold text-lg"
              >
                Submit Design Request
              </button>
              <p className="text-center text-white/60 text-sm mt-4">
                We'll review your request and provide a detailed quote and timeline within 24 hours
              </p>
            </div>
          </form>
        </div>

        {/* Process Overview */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Design Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Consultation',
                description: 'We discuss your vision, goals, and requirements in detail.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'Concept Creation',
                description: 'Our team creates initial design concepts based on your brief.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Refinement',
                description: 'We refine the chosen concept based on your feedback.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1z" />
                  </svg>
                ),
              },
              {
                step: '04',
                title: 'Final Delivery',
                description: 'You receive all final files and assets in multiple formats.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <div className="text-sm text-white/60 font-bold mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Showcase */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Recent Custom Projects</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="group aspect-square bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center text-white/40">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs">Custom Design {i + 1}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDesignForm;