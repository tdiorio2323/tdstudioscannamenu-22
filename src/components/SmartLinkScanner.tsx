import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Search, Copy, Download, ExternalLink, Image } from "lucide-react";

interface ScannedData {
  url: string;
  title: string;
  description: string;
  image: string;
  siteName: string;
  type: 'profile' | 'website' | 'social' | 'unknown';
  platform: string;
  username?: string;
  followers?: string;
  verified?: boolean;
}

interface ButtonData {
  label: string;
  url: string;
}

export const SmartLinkScanner: React.FC = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState({
    title: '',
    username: '',
    image: '',
    bgImage: '',
    buttons: [] as ButtonData[]
  });

  const detectPlatform = (url: string): { platform: string; type: 'profile' | 'website' | 'social' } => {
    const domain = new URL(url).hostname.toLowerCase();
    
    const platforms = {
      'instagram.com': { platform: 'Instagram', type: 'profile' as const },
      'twitter.com': { platform: 'Twitter', type: 'profile' as const },
      'x.com': { platform: 'X (Twitter)', type: 'profile' as const },
      'tiktok.com': { platform: 'TikTok', type: 'profile' as const },
      't.me': { platform: 'Telegram', type: 'profile' as const },
      'youtube.com': { platform: 'YouTube', type: 'profile' as const },
      'linkedin.com': { platform: 'LinkedIn', type: 'profile' as const },
      'facebook.com': { platform: 'Facebook', type: 'profile' as const },
      'snapchat.com': { platform: 'Snapchat', type: 'profile' as const },
      'discord.gg': { platform: 'Discord', type: 'social' as const },
      'twitch.tv': { platform: 'Twitch', type: 'profile' as const },
      'onlyfans.com': { platform: 'OnlyFans', type: 'profile' as const },
      'linktr.ee': { platform: 'Linktree', type: 'social' as const },
      'bio.link': { platform: 'Bio.link', type: 'social' as const }
    };

    for (const [domain_check, info] of Object.entries(platforms)) {
      if (domain.includes(domain_check)) {
        return info;
      }
    }

    return { platform: 'Website', type: 'website' };
  };

  const extractUsernameFromUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname;
      
      // Instagram: instagram.com/username
      if (url.includes('instagram.com')) {
        const match = path.match(/\/([^/?]+)/);
        return match ? `@${match[1]}` : '';
      }
      
      // Twitter: twitter.com/username or x.com/username
      if (url.includes('twitter.com') || url.includes('x.com')) {
        const match = path.match(/\/([^/?]+)/);
        return match ? `@${match[1]}` : '';
      }
      
      // TikTok: tiktok.com/@username
      if (url.includes('tiktok.com')) {
        const match = path.match(/\/@([^/?]+)/);
        return match ? `@${match[1]}` : '';
      }
      
      // YouTube: youtube.com/@username or youtube.com/c/username
      if (url.includes('youtube.com')) {
        const match = path.match(/\/(@[^/?]+|c\/[^/?]+)/);
        return match ? (match[1].startsWith('@') ? match[1] : `@${match[1].replace('c/', '')}`) : '';
      }
      
      return '';
    } catch {
      return '';
    }
  };

  const scanUrl = async (url: string) => {
    setLoading(true);
    
    try {
      // Detect platform and type
      const { platform, type } = detectPlatform(url);
      const username = extractUsernameFromUrl(url);
      
      // For demo purposes, we'll simulate scanning
      // In a real app, you'd use a service like:
      // - OpenGraph scraper
      // - Social media APIs
      // - Puppeteer for screenshots
      
      const mockData: ScannedData = {
        url,
        title: username ? username.replace('@', '').charAt(0).toUpperCase() + username.slice(2) : 'Profile',
        description: `${platform} profile`,
        image: 'https://via.placeholder.com/400x400?text=Profile+Image',
        siteName: platform,
        type: type,
        platform,
        username,
        followers: '10.2K',
        verified: Math.random() > 0.5
      };

      // Create card data
      const newCardData = {
        title: mockData.title,
        username: mockData.username || '',
        image: mockData.image,
        bgImage: mockData.image,
        buttons: [
          {
            label: mockData.platform,
            url: mockData.url
          }
        ]
      };

      setScannedData(mockData);
      setCardData(newCardData);
      
    } catch (error) {
      console.error('Failed to scan URL:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScan = () => {
    if (inputUrl.trim()) {
      scanUrl(inputUrl.trim());
    }
  };

  const generateCardCode = () => {
    return `import { AuthCard } from "@/components/AuthCard";

<AuthCard
  title="${cardData.title}"
  username="${cardData.username}"
  image="${cardData.image}"
  bgImage="${cardData.bgImage}"
  buttons={${JSON.stringify(cardData.buttons, null, 2)}}
/>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCardCode());
  };

  const addToCardCollection = async () => {
    // This would save to your authCards.json file
    try {
      const response = await fetch('/api/add-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: cardData.username.replace('@', ''),
          ...cardData
        })
      });
      
      if (response.ok) {
        console.log('Card added to collection');
      }
    } catch (error) {
      console.error('Failed to add card:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Smart Link Scanner</h1>
          <p className="text-white/80">Paste any social or website URL to auto-generate link cards</p>
        </div>

        {/* URL Input */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Scan URL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-white">Paste URL</Label>
                <Input
                  placeholder="https://instagram.com/username or any social/website URL"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleScan} 
                  disabled={loading || !inputUrl.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  Scan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {scannedData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Scanned Data */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Scanned Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={scannedData.image} 
                    alt="Profile" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                  />
                  <div>
                    <h3 className="text-white font-semibold">{scannedData.title}</h3>
                    <p className="text-white/70">{scannedData.username}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                        {scannedData.platform}
                      </span>
                      {scannedData.verified && (
                        <span className="bg-white/10 text-white/80 px-2 py-1 rounded">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <Label className="text-white/70">Description</Label>
                    <p className="text-white">{scannedData.description}</p>
                  </div>
                  {scannedData.followers && (
                    <div>
                      <Label className="text-white/70">Followers</Label>
                      <p className="text-white">{scannedData.followers}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-white/70">URL</Label>
                    <p className="text-white text-sm break-all">{scannedData.url}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generated Card Preview */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Generated Card
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black/30 rounded-lg p-4 mb-4 max-h-96 overflow-hidden">
                  {/* Mini preview of AuthCard */}
                  <div className="scale-75 origin-top">
                    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-6 text-center max-w-sm mx-auto">
                      <img 
                        src={cardData.image} 
                        alt={cardData.title}
                        className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white/20"
                      />
                      <h2 className="text-white text-xl font-bold mb-1">{cardData.title}</h2>
                      <p className="text-white/80 mb-4">{cardData.username}</p>
                      {cardData.buttons.map((button, index) => (
                        <button 
                          key={index}
                          className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white py-2 px-4 rounded-lg mb-2 font-semibold"
                        >
                          {button.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={copyToClipboard}
                    variant="outline" 
                    className="flex-1 bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button 
                    onClick={addToCardCollection}
                    className="flex-1 bg-white text-black hover:bg-white/90"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Add to Collection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Supported Platforms */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10 mt-8">
          <CardContent className="p-6">
            <h3 className="text-white font-semibold mb-4">Supported Platforms</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                'Instagram', 'Twitter/X', 'TikTok', 'YouTube', 'LinkedIn', 'Facebook',
                'Telegram', 'Discord', 'Twitch', 'Snapchat', 'OnlyFans', 'Any Website'
              ].map(platform => (
                <div key={platform} className="bg-white/10 text-white text-center py-2 px-3 rounded text-sm">
                  {platform}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
