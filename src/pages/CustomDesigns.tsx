import React from 'react';
import { NavLink } from 'react-router-dom';

const CustomDesigns: React.FC = () => {
  const services = [
    {
      title: 'Logo Design',
      description: 'Professional brand identity creation with multiple concepts and revisions.',
      price: 'Starting at $599',
      features: ['3-5 Initial Concepts', 'Unlimited Revisions', 'Vector Files Included', 'Brand Guidelines'],
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: 'Brand Identity',
      description: 'Complete brand package including logo, colors, typography, and guidelines.',
      price: 'Starting at $1,299',
      features: ['Logo Suite', 'Color Palette', 'Typography Selection', 'Brand Guidelines', 'Business Cards'],
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: 'Packaging Design',
      description: 'Custom packaging solutions for cannabis products, mylar bags, and containers.',
      price: 'Starting at $899',
      features: ['Custom Artwork', 'Print-Ready Files', 'Multiple Formats', '3D Mockups', 'Compliance Check'],
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: 'Marketing Materials',
      description: 'Flyers, banners, social media graphics, and promotional materials.',
      price: 'Starting at $399',
      features: ['Social Media Kit', 'Print Materials', 'Digital Assets', 'Brand Consistency', 'Multiple Formats'],
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We start with understanding your brand, vision, and project requirements.',
    },
    {
      step: '02',
      title: 'Concept',
      description: 'Our team creates initial concepts and presents them for your feedback.',
    },
    {
      step: '03',
      title: 'Refinement',
      description: 'We refine the chosen concept based on your input and preferences.',
    },
    {
      step: '04',
      title: 'Delivery',
      description: 'Final files are delivered in all required formats with documentation.',
    },
  ];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Custom Design Solutions
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            From concept to completion, we create bespoke designs that elevate your cannabis brand
            to luxury status. Every project is crafted with meticulous attention to detail.
          </p>
          <NavLink
            to="/custom-design-form"
            className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span className="text-lg font-semibold text-white mr-2">Start Your Project</span>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NavLink>
        </div>

        {/* Services Grid */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                      {service.icon}
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-white/60 mb-4">{service.description}</p>
                      <p className="text-xl font-semibold text-white">{service.price}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white/80 mb-2">INCLUDES:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-white/60 flex items-center">
                            <svg className="w-4 h-4 text-white/40 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Preview */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Recent Work</h2>
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
                    <p className="text-xs">Project {i + 1}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Custom Project?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Let's discuss your vision and create something extraordinary together.
              Our team is ready to bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <NavLink
                to="/custom-design-form"
                className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-500 hover:scale-105 text-white font-semibold"
              >
                Get Started Now
              </NavLink>
              <NavLink
                to="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-500 hover:scale-105 text-white font-semibold"
              >
                Contact Designer
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDesigns;