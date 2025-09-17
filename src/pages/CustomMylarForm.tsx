import React, { useState } from 'react';

const CustomMylarForm: React.FC = () => {
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    email: '',
    company: '',
    phone: '',

    // Product Information
    productType: '',
    strainName: '',
    productWeight: '',
    quantity: '',

    // Design Preferences
    style: '',
    colorScheme: '',
    logoRequired: '',
    existingBranding: '',

    // Technical Specifications
    bagSize: '',
    bagType: '',
    finish: '',
    windowRequired: '',
    zipLock: '',

    // Content & Compliance
    thcContent: '',
    cbdContent: '',
    complianceState: '',
    warningLabels: '',

    // Additional Details
    inspiration: '',
    deadline: '',
    budget: '',
    specialRequests: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Custom Mylar Form submitted:', formData);
    alert('Thank you for your detailed request! We\'ll review your specifications and get back to you within 24 hours with a custom quote.');
  };

  const productTypes = ['Flower', 'Pre-Rolls', 'Edibles', 'Concentrates', 'Vape Cartridges', 'Topicals', 'Other'];
  const weights = ['1/8 oz (3.5g)', '1/4 oz (7g)', '1/2 oz (14g)', '1 oz (28g)', 'Custom'];
  const styles = ['Modern/Minimalist', 'Vintage/Retro', 'Psychedelic', 'Luxury/Premium', 'Street/Urban', 'Organic/Natural'];
  const colorSchemes = ['Monochrome', 'Earth Tones', 'Bright/Vibrant', 'Pastel', 'Custom Brand Colors'];
  const bagSizes = ['Small (3" x 5")', 'Medium (4" x 6")', 'Large (5" x 8")', 'Extra Large (6" x 9")', 'Custom Size'];
  const bagTypes = ['Stand-Up Pouch', 'Flat Bottom', 'Side Gusset', 'Flat Pouch', 'Child-Resistant'];
  const finishes = ['Matte', 'Glossy', 'Soft Touch', 'Metallic', 'Holographic'];
  const states = ['California', 'Colorado', 'Washington', 'Oregon', 'Nevada', 'Michigan', 'Massachusetts', 'Other'];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Custom Mylar Design
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Create the perfect mylar bag design for your cannabis products.
            Our detailed form ensures we capture every aspect of your vision.
          </p>
        </div>

        <div className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Basic Information Section */}
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
                    Company/Brand Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="Your brand name"
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

            {/* Product Information Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-4">
                Product Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Product Type *
                  </label>
                  <select
                    name="productType"
                    required
                    value={formData.productType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select product type</option>
                    {productTypes.map((type, index) => (
                      <option key={index} value={type} className="bg-black text-white">{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Strain Name
                  </label>
                  <input
                    type="text"
                    name="strainName"
                    value={formData.strainName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="e.g., Blue Dream, OG Kush"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Product Weight
                  </label>
                  <select
                    name="productWeight"
                    value={formData.productWeight}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select weight</option>
                    {weights.map((weight, index) => (
                      <option key={index} value={weight} className="bg-black text-white">{weight}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Quantity Needed
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="Number of bags needed"
                  />
                </div>
              </div>
            </div>

            {/* Design Preferences Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-4">
                Design Preferences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Design Style *
                  </label>
                  <select
                    name="style"
                    required
                    value={formData.style}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select style</option>
                    {styles.map((style, index) => (
                      <option key={index} value={style} className="bg-black text-white">{style}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Color Scheme
                  </label>
                  <select
                    name="colorScheme"
                    value={formData.colorScheme}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select color scheme</option>
                    {colorSchemes.map((scheme, index) => (
                      <option key={index} value={scheme} className="bg-black text-white">{scheme}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Logo Design Needed?
                  </label>
                  <select
                    name="logoRequired"
                    value={formData.logoRequired}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select option</option>
                    <option value="yes" className="bg-black text-white">Yes, create new logo</option>
                    <option value="no" className="bg-black text-white">No, I have existing logo</option>
                    <option value="modify" className="bg-black text-white">Modify existing logo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Existing Branding Files
                  </label>
                  <input
                    type="text"
                    name="existingBranding"
                    value={formData.existingBranding}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="Link to existing branding materials"
                  />
                </div>
              </div>
            </div>

            {/* Technical Specifications Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-4">
                Technical Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Bag Size *
                  </label>
                  <select
                    name="bagSize"
                    required
                    value={formData.bagSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select bag size</option>
                    {bagSizes.map((size, index) => (
                      <option key={index} value={size} className="bg-black text-white">{size}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Bag Type
                  </label>
                  <select
                    name="bagType"
                    value={formData.bagType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select bag type</option>
                    {bagTypes.map((type, index) => (
                      <option key={index} value={type} className="bg-black text-white">{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Finish Type
                  </label>
                  <select
                    name="finish"
                    value={formData.finish}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select finish</option>
                    {finishes.map((finish, index) => (
                      <option key={index} value={finish} className="bg-black text-white">{finish}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Clear Window Needed?
                  </label>
                  <select
                    name="windowRequired"
                    value={formData.windowRequired}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select option</option>
                    <option value="yes" className="bg-black text-white">Yes</option>
                    <option value="no" className="bg-black text-white">No</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Compliance Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-4">
                Compliance & Content
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    THC Content (%)
                  </label>
                  <input
                    type="text"
                    name="thcContent"
                    value={formData.thcContent}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="e.g., 25.5%"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    CBD Content (%)
                  </label>
                  <input
                    type="text"
                    name="cbdContent"
                    value={formData.cbdContent}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="e.g., 1.2%"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Compliance State *
                  </label>
                  <select
                    name="complianceState"
                    required
                    value={formData.complianceState}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select state</option>
                    {states.map((state, index) => (
                      <option key={index} value={state} className="bg-black text-white">{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Special Warning Labels
                  </label>
                  <input
                    type="text"
                    name="warningLabels"
                    value={formData.warningLabels}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="Any specific warning requirements"
                  />
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-4">
                Additional Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Project Deadline
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  />
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
                    <option value="">Select budget range</option>
                    <option value="$500-$1000" className="bg-black text-white">$500 - $1,000</option>
                    <option value="$1000-$2500" className="bg-black text-white">$1,000 - $2,500</option>
                    <option value="$2500-$5000" className="bg-black text-white">$2,500 - $5,000</option>
                    <option value="$5000+" className="bg-black text-white">$5,000+</option>
                  </select>
                </div>
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
                  placeholder="Share any design inspiration, references, or links to designs you like..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Special Requests or Notes
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Any additional requirements, special requests, or important details..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] text-white font-semibold text-lg"
              >
                Submit Custom Mylar Request
              </button>
              <p className="text-center text-white/60 text-sm mt-4">
                We'll review your request and provide a detailed quote within 24 hours
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomMylarForm;