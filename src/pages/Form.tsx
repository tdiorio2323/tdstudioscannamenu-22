import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const cardTypes = [
  { id: "minimal", label: "Minimal Card", description: "Clean and simple design" },
  { id: "modern", label: "Modern Card", description: "Contemporary styling with gradients" },
  { id: "glassmorphism", label: "Glass Card", description: "Translucent glass effect" },
  { id: "neumorphism", label: "Soft Card", description: "Soft shadowed design" },
  { id: "neon", label: "Neon Card", description: "Bright neon accents" },
  { id: "retro", label: "Retro Card", description: "Vintage inspired design" },
  { id: "corporate", label: "Corporate Card", description: "Professional business style" },
  { id: "creative", label: "Creative Card", description: "Artistic and unique" },
  { id: "dark", label: "Dark Theme Card", description: "Dark mode design" },
  { id: "colorful", label: "Colorful Card", description: "Vibrant color schemes" }
];

const backgroundTypes = [
  { id: "solid", label: "Solid Color", description: "Single color background" },
  { id: "gradient", label: "Gradient", description: "Color transition background" },
  { id: "image", label: "Custom Image", description: "Your own background image" },
  { id: "pattern", label: "Pattern", description: "Geometric or decorative patterns" },
  { id: "video", label: "Video Background", description: "Animated video background" },
  { id: "animated", label: "Animated Gradient", description: "Moving color transitions" },
  { id: "minimal", label: "Minimal", description: "Clean white/light background" },
  { id: "nature", label: "Nature", description: "Natural scenery backgrounds" },
  { id: "abstract", label: "Abstract", description: "Artistic abstract designs" },
  { id: "space", label: "Space/Galaxy", description: "Cosmic themed backgrounds" }
];

const Form = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Contact info
    name: "",
    email: "",
    phone: "",
    
    // Page content
    title: "",
    username: "",
    subtitle: "",
    picture: "",
    
    // Links (up to 7)
    links: [
      { label: "", url: "" },
      { label: "", url: "" },
      { label: "", url: "" },
      { label: "", url: "" },
      { label: "", url: "" },
      { label: "", url: "" },
      { label: "", url: "" }
    ],
    
    // Design choices
    cardType: "",
    backgroundType: "",
    
    // Additional info
    description: "",
    timeline: "",
    budget: ""
  });

  const updateLink = (index: number, field: 'label' | 'url', value: string) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Form Submitted!",
      description: "We'll get back to you within 24 hours with a custom quote."
    });
    console.log("Form submission:", formData);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Custom Link-in-Bio Page Request
            </CardTitle>
            <p className="text-lg text-gray-600 mt-2">
              Get your personalized link-in-bio page built professionally
            </p>
          </CardHeader>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Page Content */}
          <Card>
            <CardHeader>
              <CardTitle>Page Content</CardTitle>
              <p className="text-sm text-gray-600">What should appear on your page?</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Page Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., John Smith"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username/Handle</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="e.g., @johnsmith"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle/Bio</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="e.g., Photographer & Content Creator"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="picture">Profile Picture URL</Label>
                <Input
                  id="picture"
                  value={formData.picture}
                  onChange={(e) => setFormData(prev => ({ ...prev, picture: e.target.value }))}
                  placeholder="https://example.com/your-photo.jpg"
                />
                <p className="text-xs text-gray-500">
                  We can help you upload your image if you don't have a URL
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Links Section */}
          <Card>
            <CardHeader>
              <CardTitle>Your Links (Up to 7)</CardTitle>
              <p className="text-sm text-gray-600">Add your important links</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.links.map((link, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor={`link-label-${index}`}>Link {index + 1} Title</Label>
                    <Input
                      id={`link-label-${index}`}
                      value={link.label}
                      onChange={(e) => updateLink(index, 'label', e.target.value)}
                      placeholder="e.g., My Instagram, Shop Now, Book a Call"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`link-url-${index}`}>URL</Label>
                    <Input
                      id={`link-url-${index}`}
                      value={link.url}
                      onChange={(e) => updateLink(index, 'url', e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Design Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Design Preferences</CardTitle>
              <p className="text-sm text-gray-600">Choose your style</p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Card Style</Label>
                <Select value={formData.cardType} onValueChange={(value) => setFormData(prev => ({ ...prev, cardType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a card style" />
                  </SelectTrigger>
                  <SelectContent>
                    {cardTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-gray-500">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Background Style</Label>
                <Select value={formData.backgroundType} onValueChange={(value) => setFormData(prev => ({ ...prev, backgroundType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a background" />
                  </SelectTrigger>
                  <SelectContent>
                    {backgroundTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-gray-500">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Special Requests or Notes</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  placeholder="Any specific colors, fonts, animations, or special features you want?"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeline">When do you need this?</Label>
                  <Input
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                    placeholder="e.g., ASAP, 1 week, flexible"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <Input
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    placeholder="e.g., $100-300, let me know"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <Card>
            <CardContent className="pt-6">
              <Button type="submit" size="lg" className="w-full md:w-auto">
                Submit Request
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                We'll get back to you within 24 hours with a custom quote and preview!
              </p>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Form;