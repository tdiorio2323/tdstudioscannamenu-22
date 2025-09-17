import React from 'react';
import { NavLink } from 'react-router-dom';

const MylarDesigns: React.FC = () => {
  // Placeholder designs - would be replaced with real data
  const designs = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Premium Design ${i + 1}`,
    category: ['Indica', 'Sativa', 'Hybrid', 'Edibles'][i % 4],
    price: '$299',
    image: '/placeholder-mylar.jpg',
    description: 'Premium mylar bag design with luxury finishing.',
  }));

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Mylar Designs
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Premium mylar bag designs that elevate your cannabis products to luxury status.
            Each design is crafted with meticulous attention to detail and brand sophistication.
          </p>
          <NavLink
            to="/custom-mylar-form"
            className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span className="text-lg font-semibold text-white mr-2">Custom Mylar Design</span>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NavLink>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['All', 'Indica', 'Sativa', 'Hybrid', 'Edibles'].map((filter) => (
            <button
              key={filter}
              className="px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 text-white/70 hover:text-white"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Designs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {designs.map((design) => (
            <div
              key={design.id}
              className="group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              {/* Image */}
              <div className="aspect-[3/4] bg-gradient-to-br from-white/10 to-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white/40">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-sm font-medium">Mylar Design {design.id}</p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-medium text-white">
                    {design.category}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white font-medium hover:bg-white/30 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{design.title}</h3>
                  <span className="text-xl font-bold text-white">{design.price}</span>
                </div>

                <p className="text-white/60 text-sm">{design.description}</p>

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300">
                    Quick View
                  </button>
                  <button className="flex-1 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white font-medium hover:bg-white/30 transition-all duration-300">
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-500 hover:scale-105 text-white font-medium">
            Load More Designs
          </button>
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-12 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Need Something Custom?
              </h2>
              <p className="text-lg text-white/70 mb-8">
                Our design team can create bespoke mylar packaging tailored specifically to your brand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <NavLink
                  to="/custom-mylar-form"
                  className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-500 hover:scale-105 text-white font-medium"
                >
                  Custom Mylar Form
                </NavLink>
                <NavLink
                  to="/contact"
                  className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-500 hover:scale-105 text-white font-medium"
                >
                  Contact Designer
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MylarDesigns;