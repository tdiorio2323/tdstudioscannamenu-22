import React from 'react';
import { NavLink } from 'react-router-dom';

const DigitalAssets: React.FC = () => {
  const assetPacks = [
    {
      id: 1,
      title: 'Cannabis Logo Collection',
      type: 'Logos & Icons',
      count: '50 Logos',
      price: '$99',
      description: 'Professional cannabis-themed logos in vector format.',
      tags: ['SVG', 'AI', 'PNG'],
      category: 'Logos',
      featured: true,
    },
    {
      id: 2,
      title: 'Strain Typography Pack',
      type: 'Typography',
      count: '25 Fonts',
      price: '$79',
      description: 'Unique fonts perfect for cannabis branding and packaging.',
      tags: ['OTF', 'TTF', 'WOFF'],
      category: 'Typography',
      featured: false,
    },
    {
      id: 3,
      title: 'Mylar Bag Mockups',
      type: 'Mockups',
      count: '40 Mockups',
      price: '$149',
      description: 'High-resolution mylar bag mockups for product presentation.',
      tags: ['PSD', 'PNG', '4K'],
      category: 'Mockups',
      featured: true,
    },
    {
      id: 4,
      title: 'Cannabis Patterns & Textures',
      type: 'Patterns',
      count: '100 Items',
      price: '$129',
      description: 'Seamless patterns and textures for cannabis designs.',
      tags: ['AI', 'PNG', 'JPG'],
      category: 'Patterns',
      featured: false,
    },
    {
      id: 5,
      title: 'Dispensary Icons Set',
      type: 'Icons',
      count: '200 Icons',
      price: '$59',
      description: 'Complete icon set for dispensary websites and apps.',
      tags: ['SVG', 'PNG', 'AI'],
      category: 'Icons',
      featured: false,
    },
    {
      id: 6,
      title: 'Cannabis Leaf Graphics',
      type: 'Illustrations',
      count: '75 Graphics',
      price: '$89',
      description: 'Stylized cannabis leaf illustrations and graphics.',
      tags: ['AI', 'SVG', 'PNG'],
      category: 'Graphics',
      featured: false,
    },
    {
      id: 7,
      title: 'Edibles Packaging Templates',
      type: 'Templates',
      count: '30 Templates',
      price: '$199',
      description: 'Print-ready edibles packaging design templates.',
      tags: ['AI', 'PDF', 'PSD'],
      category: 'Templates',
      featured: true,
    },
    {
      id: 8,
      title: 'Social Media Kit',
      type: 'Social Media',
      count: '120 Posts',
      price: '$169',
      description: 'Complete social media template collection.',
      tags: ['PSD', 'AI', 'PNG'],
      category: 'Social',
      featured: false,
    },
    {
      id: 9,
      title: 'Cannabis Color Palettes',
      type: 'Colors',
      count: '50 Palettes',
      price: '$39',
      description: 'Curated color palettes for cannabis branding.',
      tags: ['ASE', 'ACO', 'CSS'],
      category: 'Colors',
      featured: false,
    },
    {
      id: 10,
      title: 'Vintage Cannabis Badges',
      type: 'Badges',
      count: '40 Badges',
      price: '$119',
      description: 'Retro-style cannabis badges and emblems.',
      tags: ['AI', 'SVG', 'PNG'],
      category: 'Badges',
      featured: false,
    },
    {
      id: 11,
      title: 'Cannabis Product Photos',
      type: 'Photography',
      count: '80 Photos',
      price: '$249',
      description: 'High-quality cannabis product photography.',
      tags: ['JPG', 'RAW', '6K'],
      category: 'Photos',
      featured: true,
    },
    {
      id: 12,
      title: 'Business Card Templates',
      type: 'Print',
      count: '25 Cards',
      price: '$69',
      description: 'Professional business card templates for cannabis brands.',
      tags: ['AI', 'PSD', 'PDF'],
      category: 'Print',
      featured: false,
    },
  ];

  // Transform to mock downloadable content while preserving counts/prices
  const mockPacks = assetPacks.map((pack, idx) => ({
    ...pack,
    title: `Mock Asset Pack ${idx + 1}`,
    description: 'High-quality downloadable content for creative projects.',
    tags: ['PNG', 'ZIP'],
    type: 'Pack',
    category: 'Downloadable',
  }));

  const categories = ['All', 'Downloadable'];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Downloadable Content
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Curated packs ready to download. Titles, descriptions, and tags shown as mock data.
          </p>
        </div>

        {/* Featured Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Packs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockPacks.filter(pack => pack.featured).map((pack) => (
              <div
                key={pack.id}
                className="group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                {/* Featured Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-gradient-to-r from-white/30 to-white/20 backdrop-blur-sm border border-white/40 rounded-full text-xs font-bold text-white">
                    FEATURED
                  </span>
                </div>

                {/* Preview Area */}
                <div className="aspect-[4/3] bg-gradient-to-br from-white/10 to-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white/40">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      <p className="text-sm font-medium">Asset Preview</p>
                    </div>
                  </div>

                  {/* Count Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-medium text-white">
                      {pack.count}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white font-semibold hover:bg-white/30 transition-all duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{pack.title}</h3>
                      <p className="text-white/60 text-sm">{pack.description}</p>
                    </div>
                    <span className="text-xl font-bold text-white ml-4">{pack.price}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {pack.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-xs font-medium text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex">
                    <button className="flex-1 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white font-semibold hover:bg-white/30 transition-all duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 text-white/70 hover:text-white"
            >
              {category}
            </button>
          ))}
        </div>

        {/* All Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {mockPacks.map((pack) => (
            <div
              key={pack.id}
              className="group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              {/* Preview Area */}
              <div className="aspect-[4/3] bg-gradient-to-br from-white/10 to-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white/40">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    <p className="text-xs">{pack.type}</p>
                  </div>
                </div>

                {/* Count Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded text-xs font-medium text-white">
                    {pack.count}
                  </span>
                </div>

                {/* Featured Badge */}
                {pack.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/30 backdrop-blur-sm border border-white/40 rounded text-xs font-bold text-white">
                      FEATURED
                    </span>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded text-white font-semibold hover:bg-white/30 transition-all duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white mb-1">{pack.title}</h3>
                    <p className="text-white/60 text-xs">{pack.description}</p>
                  </div>
                  <span className="text-lg font-bold text-white ml-2">{pack.price}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {pack.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-xs font-medium text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex">
                  <button className="flex-1 px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded text-white font-semibold hover:bg-white/30 transition-all duration-300 text-xs">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { number: '1000+', label: 'Digital Assets' },
            { number: '15+', label: 'Asset Categories' },
            { number: '50K+', label: 'Downloads' },
            { number: '24/7', label: 'Instant Access' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* License Information */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">License & Usage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Commercial License',
                description: 'Use in commercial projects, client work, and for-profit ventures.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Unlimited Projects',
                description: 'No restrictions on the number of projects you can use assets in.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                ),
              },
              {
                title: 'Modification Rights',
                description: 'Edit, modify, and customize assets to fit your brand needs.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Removed custom asset CTA as requested */}
      </div>
    </div>
  );
};

export default DigitalAssets;
