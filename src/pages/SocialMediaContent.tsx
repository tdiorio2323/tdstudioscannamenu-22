import React from 'react';
import { NavLink } from 'react-router-dom';

const SocialMediaContent: React.FC = () => {
  const contentPacks = [
    {
      id: 1,
      title: 'Cannabis Lifestyle Pack',
      type: 'Posts & Reels',
      count: '30 pieces',
      price: '$199',
      description: 'Lifestyle-focused content showcasing cannabis culture and community.',
      tags: ['Posts', 'Reels', 'Stories'],
      category: 'Lifestyle',
    },
    {
      id: 2,
      title: 'Product Showcase Bundle',
      type: 'Product Posts',
      count: '25 pieces',
      price: '$149',
      description: 'Professional product photography templates and layouts.',
      tags: ['Posts', 'Stories'],
      category: 'Product',
    },
    {
      id: 3,
      title: 'Strain Highlight Series',
      type: 'Educational',
      count: '20 pieces',
      price: '$179',
      description: 'Educational content about different strains and their effects.',
      tags: ['Posts', 'Reels', 'Educational'],
      category: 'Educational',
    },
    {
      id: 4,
      title: 'Dispensary Promotion Kit',
      type: 'Marketing',
      count: '35 pieces',
      price: '$249',
      description: 'Sale announcements, promotions, and marketing templates.',
      tags: ['Posts', 'Stories', 'Banners'],
      category: 'Marketing',
    },
    {
      id: 5,
      title: 'Behind the Scenes',
      type: 'Story Content',
      count: '40 pieces',
      price: '$129',
      description: 'Authentic behind-the-scenes content for Instagram Stories.',
      tags: ['Stories', 'Reels'],
      category: 'Authentic',
    },
    {
      id: 6,
      title: 'Cannabis Facts & Tips',
      type: 'Educational',
      count: '30 pieces',
      price: '$169',
      description: 'Informative content about cannabis benefits and usage tips.',
      tags: ['Posts', 'Educational'],
      category: 'Educational',
    },
    {
      id: 7,
      title: 'Festival & Events Pack',
      type: 'Event Content',
      count: '25 pieces',
      price: '$189',
      description: 'Event promotion and coverage content for cannabis festivals.',
      tags: ['Posts', 'Stories', 'Reels'],
      category: 'Events',
    },
    {
      id: 8,
      title: 'Minimalist Cannabis',
      type: 'Aesthetic',
      count: '28 pieces',
      price: '$159',
      description: 'Clean, minimalist designs perfect for premium brands.',
      tags: ['Posts', 'Stories'],
      category: 'Aesthetic',
    },
    {
      id: 9,
      title: 'Customer Testimonials',
      type: 'Social Proof',
      count: '20 pieces',
      price: '$139',
      description: 'Templates for showcasing customer reviews and testimonials.',
      tags: ['Posts', 'Stories'],
      category: 'Social Proof',
    },
    {
      id: 10,
      title: 'Cannabis Cooking',
      type: 'Lifestyle',
      count: '22 pieces',
      price: '$149',
      description: 'Edibles and cannabis cooking content for food enthusiasts.',
      tags: ['Posts', 'Reels', 'Educational'],
      category: 'Lifestyle',
    },
    {
      id: 11,
      title: 'Wellness & Meditation',
      type: 'Wellness',
      count: '26 pieces',
      price: '$179',
      description: 'Content focused on cannabis for wellness and meditation.',
      tags: ['Posts', 'Stories', 'Reels'],
      category: 'Wellness',
    },
    {
      id: 12,
      title: 'Luxury Cannabis',
      type: 'Premium',
      count: '32 pieces',
      price: '$299',
      description: 'High-end, luxury content for premium cannabis brands.',
      tags: ['Posts', 'Stories', 'Premium'],
      category: 'Luxury',
    },
  ];

  const categories = ['All', 'Lifestyle', 'Product', 'Educational', 'Marketing', 'Events', 'Wellness', 'Luxury'];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Social Media Content
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Ready-to-use social media content packs designed specifically for cannabis brands.
            Professional posts, reels, and stories that engage your audience and grow your following.
          </p>
          <NavLink
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span className="text-lg font-semibold text-white mr-2">Custom Content Package</span>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NavLink>
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

        {/* Content Packs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {contentPacks.map((pack) => (
            <div
              key={pack.id}
              className="group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              {/* Preview Area */}
              <div className="aspect-[4/3] bg-gradient-to-br from-white/10 to-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white/40">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium">Content Preview</p>
                  </div>
                </div>

                {/* Content Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-medium text-white">
                    {pack.type}
                  </span>
                </div>

                {/* Count Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-medium text-white">
                    {pack.count}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white font-medium hover:bg-white/30 transition-all duration-300">
                    Preview Pack
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
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300">
                    Preview
                  </button>
                  <button className="flex-1 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white font-medium hover:bg-white/30 transition-all duration-300">
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { number: '500+', label: 'Content Pieces' },
            { number: '50+', label: 'Cannabis Brands' },
            { number: '1M+', label: 'Engagement Generated' },
            { number: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'High-Quality Graphics',
                description: 'Professional designs optimized for each social media platform.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: 'Ready-to-Post Content',
                description: 'Content that\'s ready to publish with suggested captions included.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Multiple Formats',
                description: 'Posts, stories, reels, and banners in various sizes and formats.',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Need Custom Content?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Our team can create custom social media content tailored specifically to your brand voice and audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <NavLink
                to="/contact"
                className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-500 hover:scale-105 text-white font-semibold"
              >
                Custom Package Quote
              </NavLink>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-500 hover:scale-105 text-white font-semibold">
                View All Packs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaContent;