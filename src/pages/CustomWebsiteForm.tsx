import React, { useState } from 'react';

const CustomWebsiteForm: React.FC = () => {
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    email: '',
    company: '',
    phone: '',

    // Project Type
    websiteType: '',

    // Basic Website Fields
    pages: '',
    features: [] as string[],

    // E-commerce Fields
    productCount: '',
    paymentMethods: [] as string[],
    shippingOptions: [],

    // Portfolio Fields
    portfolioItems: '',
    galleries: '',

    // Blog/Content Fields
    contentManagement: '',
    blogFeatures: [] as string[],

    // Business Fields
    businessType: '',
    servicePages: '',

    // Common Fields
    designStyle: '',
    colorPreferences: '',
    timeline: '',
    budget: '',
    existingWebsite: '',
    inspiration: '',
    additionalRequests: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name as keyof typeof prev].includes(value)
        ? (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[name as keyof typeof prev] as string[]), value]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Custom Website Form submitted:', formData);
    alert('Thank you for your website request! We\'ll review your requirements and provide a detailed proposal within 48 hours.');
  };

  const websiteTypes = [
    'Business/Corporate',
    'E-commerce Store',
    'Portfolio/Gallery',
    'Blog/Magazine',
    'Landing Page',
    'Cannabis Dispensary',
    'Restaurant/Food',
    'Personal Brand',
    'Non-Profit',
    'Other',
  ];

  const commonFeatures = [
    'Contact Forms',
    'Google Maps Integration',
    'Social Media Integration',
    'Newsletter Signup',
    'Live Chat',
    'Analytics Setup',
    'SEO Optimization',
    'Mobile Responsive',
    'SSL Certificate',
    'Speed Optimization',
  ];

  const ecommerceFeatures = [
    'Product Catalog',
    'Shopping Cart',
    'User Accounts',
    'Order Management',
    'Inventory Tracking',
    'Wishlist',
    'Product Reviews',
    'Discount Codes',
    'Multi-currency',
    'Tax Calculation',
  ];

  const paymentOptions = [
    'Stripe',
    'PayPal',
    'Square',
    'Apple Pay',
    'Google Pay',
    'Bank Transfer',
    'Cryptocurrency',
    'Other',
  ];

  const blogFeatures = [
    'Article Management',
    'Categories & Tags',
    'Author Profiles',
    'Comment System',
    'Search Functionality',
    'Related Posts',
    'Social Sharing',
    'Email Subscriptions',
    'Content Scheduling',
    'Archive Pages',
  ];

  const designStyles = [
    'Modern/Minimalist',
    'Bold & Vibrant',
    'Elegant/Luxury',
    'Playful/Creative',
    'Professional/Corporate',
    'Dark/Edgy',
    'Organic/Natural',
    'Retro/Vintage',
  ];

  const timelines = [
    '2-3 weeks',
    '1 month',
    '2 months',
    '3 months',
    '4+ months',
    'Flexible',
  ];

  const budgets = [
    'Under $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $20,000',
    '$20,000 - $50,000',
    '$50,000+',
  ];

  const renderWebsiteTypeFields = () => {
    switch (formData.websiteType) {
      case 'E-commerce Store':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">E-commerce Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Estimated Product Count
                </label>
                <select
                  name="productCount"
                  value={formData.productCount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select range</option>
                  <option value="1-25" className="bg-black text-white">1-25 products</option>
                  <option value="26-100" className="bg-black text-white">26-100 products</option>
                  <option value="101-500" className="bg-black text-white">101-500 products</option>
                  <option value="500+" className="bg-black text-white">500+ products</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">
                E-commerce Features Needed
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {ecommerceFeatures.map((feature) => (
                  <label key={feature} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleCheckboxChange('features', feature)}
                      className="rounded border-white/20 bg-black/30 text-white focus:ring-white/50"
                    />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">
                Payment Methods
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {paymentOptions.map((payment) => (
                  <label key={payment} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.paymentMethods.includes(payment)}
                      onChange={() => handleCheckboxChange('paymentMethods', payment)}
                      className="rounded border-white/20 bg-black/30 text-white focus:ring-white/50"
                    />
                    <span className="text-white/80 text-sm">{payment}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Portfolio/Gallery':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Portfolio Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Number of Portfolio Items
                </label>
                <input
                  type="number"
                  name="portfolioItems"
                  value={formData.portfolioItems}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., 20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Number of Galleries
                </label>
                <input
                  type="number"
                  name="galleries"
                  value={formData.galleries}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., 5"
                />
              </div>
            </div>
          </div>
        );

      case 'Blog/Magazine':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Blog/Content Details</h3>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Content Management Preference
              </label>
              <select
                name="contentManagement"
                value={formData.contentManagement}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select CMS</option>
                <option value="WordPress" className="bg-black text-white">WordPress</option>
                <option value="Custom CMS" className="bg-black text-white">Custom CMS</option>
                <option value="Headless CMS" className="bg-black text-white">Headless CMS</option>
                <option value="Static Site" className="bg-black text-white">Static Site</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">
                Blog Features Needed
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {blogFeatures.map((feature) => (
                  <label key={feature} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.blogFeatures.includes(feature)}
                      onChange={() => handleCheckboxChange('blogFeatures', feature)}
                      className="rounded border-white/20 bg-black/30 text-white focus:ring-white/50"
                    />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Business/Corporate':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Business Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Business Type
                </label>
                <input
                  type="text"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., Cannabis Dispensary, Consulting"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Number of Service Pages
                </label>
                <input
                  type="number"
                  name="servicePages"
                  value={formData.servicePages}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., 5"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Custom Website Request
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Let's create a stunning website that perfectly represents your brand.
            Our form adapts to your specific website type for a tailored experience.
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
                    placeholder="Your company name"
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

            {/* Website Type */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-4">
                Website Type
              </h2>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  What type of website do you need? *
                </label>
                <select
                  name="websiteType"
                  required
                  value={formData.websiteType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select website type</option>
                  {websiteTypes.map((type, index) => (
                    <option key={index} value={type} className="bg-black text-white">{type}</option>
                  ))}
                </select>
              </div>

              {/* Dynamic fields based on website type */}
              {formData.websiteType && renderWebsiteTypeFields()}
            </div>

            {/* Basic Website Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-4">
                Website Requirements
              </h2>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Estimated Number of Pages
                </label>
                <input
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., 5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-3">
                  Common Features Needed
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {commonFeatures.map((feature) => (
                    <label key={feature} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={() => handleCheckboxChange('features', feature)}
                        className="rounded border-white/20 bg-black/30 text-white focus:ring-white/50"
                      />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Design Preferences */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-4">
                Design Preferences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Design Style
                  </label>
                  <select
                    name="designStyle"
                    value={formData.designStyle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select design style</option>
                    {designStyles.map((style, index) => (
                      <option key={index} value={style} className="bg-black text-white">{style}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Color Preferences
                  </label>
                  <input
                    type="text"
                    name="colorPreferences"
                    value={formData.colorPreferences}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="e.g., Green, Black, White"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Existing Website URL (if any)
                </label>
                <input
                  type="url"
                  name="existingWebsite"
                  value={formData.existingWebsite}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Design Inspiration
                </label>
                <textarea
                  name="inspiration"
                  value={formData.inspiration}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Share links to websites you like or describe the style you're looking for..."
                />
              </div>
            </div>

            {/* Project Timeline & Budget */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-4">
                Timeline & Budget
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Project Timeline
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
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Additional Requests or Notes
                </label>
                <textarea
                  name="additionalRequests"
                  value={formData.additionalRequests}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Any specific requirements, integrations, or features you'd like to discuss..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] text-white font-semibold text-lg"
              >
                Submit Website Request
              </button>
              <p className="text-center text-white/60 text-sm mt-4">
                We'll review your requirements and provide a detailed proposal within 48 hours
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomWebsiteForm;