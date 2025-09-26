import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Plus, X, Eye } from "lucide-react";

interface LinkButton {
  label: string;
  url: string;
  enabled: boolean;
}

interface LinktreeConfig {
  pageName: string;
  route: string;
  title: string;
  username: string;
  profilePicture: string;
  bgImageSrc: string;
  buttons: LinkButton[];
}

const defaultConfig: LinktreeConfig = {
  pageName: "NewBrand",
  route: "/new-brand",
  title: "TD Studios",
  username: "@tdstudios",
  profilePicture: "https://i.imgur.com/tWH4c48.png",
  bgImageSrc: "https://i.imgur.com/KBjPwGI.jpg",
  buttons: [
    { label: "Instagram", url: "https://www.instagram.com/", enabled: true },
    { label: "Telegram", url: "https://t.me/", enabled: true },
    { label: "Website", url: "https://example.com", enabled: true },
    { label: "Contact", url: "mailto:hello@example.com", enabled: false },
    { label: "Shop", url: "/shop", enabled: false }
  ]
};

const generateLinktreeCode = (config: LinktreeConfig) => {
  const componentName = config.pageName
    .replace(/[^a-zA-Z0-9]+/g, "")
    .replace(/^./, str => str.toUpperCase());

  const enabledButtons = config.buttons.filter(btn => btn.enabled);

  return `import React from "react";
import { Button } from "@/components/ui/button";

const ${componentName} = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image */}
      <img
        src="${config.bgImageSrc}"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md text-center space-y-6">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <img
            src="${config.profilePicture}"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
        
        {/* Title & Username */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white">${config.title}</h1>
          <p className="text-white/80">${config.username}</p>
        </div>
        
        {/* Buttons */}
        <div className="space-y-3">
${enabledButtons.map(btn => `          <Button
            variant="chrome"
            className="w-full h-12 text-lg font-semibold rounded-xl font-bebas-neue text-black shadow-md"
            onClick={() => window.open('${btn.url}', '_blank')}
          >
            ${btn.label}
          </Button>`).join('\n')}
        </div>
      </div>
    </div>
  );
};

export default ${componentName};
`;
};

// Preview Component
const LinktreePreview: React.FC<{ config: LinktreeConfig }> = ({ config }) => {
  const enabledButtons = config.buttons.filter(btn => btn.enabled);
  
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden">
      <img
        src={config.bgImageSrc}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10 w-full max-w-sm text-center space-y-4">
        <div className="flex justify-center">
          <img
            src={config.profilePicture}
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-white shadow-lg object-cover"
          />
        </div>
        
        <div className="space-y-1">
          <h1 className="text-lg font-bold text-white">{config.title}</h1>
          <p className="text-sm text-white/80">{config.username}</p>
        </div>
        
        <div className="space-y-2">
          {enabledButtons.slice(0, 4).map((btn, index) => (
            <div
              key={index}
              className="w-full h-8 bg-white/90 rounded-lg flex items-center justify-center text-sm font-semibold text-black"
            >
              {btn.label}
            </div>
          ))}
          {enabledButtons.length > 4 && (
            <div className="text-xs text-white/60">+{enabledButtons.length - 4} more</div>
          )}
        </div>
      </div>
    </div>
  );
};

export const LinktreeBuilder = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<LinktreeConfig>(defaultConfig);
  const [showPreview, setShowPreview] = useState(true);

  const updateConfig = (updates: Partial<LinktreeConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const updateButton = (index: number, updates: Partial<LinkButton>) => {
    setConfig(prev => ({
      ...prev,
      buttons: prev.buttons.map((btn, i) => i === index ? { ...btn, ...updates } : btn)
    }));
  };

  const addButton = () => {
    setConfig(prev => ({
      ...prev,
      buttons: [...prev.buttons, { label: "New Link", url: "https://", enabled: true }]
    }));
  };

  const removeButton = (index: number) => {
    setConfig(prev => ({
      ...prev,
      buttons: prev.buttons.filter((_, i) => i !== index)
    }));
  };

  const copyCode = async () => {
    const code = generateLinktreeCode(config);
    await navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: "Linktree page code copied to clipboard"
    });
  };

  const createPage = async () => {
    try {
      const code = generateLinktreeCode(config);
      
      // For now, just copy to clipboard since we don't have a backend endpoint
      await navigator.clipboard.writeText(code);
      
      toast({
        title: "Page Generated",
        description: `Code for ${config.pageName} copied to clipboard. Create /src/pages/${config.pageName}.tsx manually.`,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to generate page";
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Linktree Builder</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? "Hide" : "Show"} Preview
            </Button>
          </div>
        </div>

        <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-2' : 'max-w-2xl'}`}>
          <div className="space-y-6">
            {/* Basic Config */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Page Name</Label>
                    <Input
                      value={config.pageName}
                      onChange={e => updateConfig({ pageName: e.target.value })}
                      placeholder="BrandName"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Route</Label>
                    <Input
                      value={config.route}
                      onChange={e => updateConfig({ route: e.target.value })}
                      placeholder="/brand-name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={config.title}
                    onChange={e => updateConfig({ title: e.target.value })}
                    placeholder="Your Brand Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input
                    value={config.username}
                    onChange={e => updateConfig({ username: e.target.value })}
                    placeholder="@username"
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Profile Picture URL</Label>
                  <Input
                    value={config.profilePicture}
                    onChange={e => updateConfig({ profilePicture: e.target.value })}
                    placeholder="https://i.imgur.com/profile.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Background Image URL</Label>
                  <Input
                    value={config.bgImageSrc}
                    onChange={e => updateConfig({ bgImageSrc: e.target.value })}
                    placeholder="https://i.imgur.com/background.jpg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Buttons Config */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Links</CardTitle>
                  <Button size="sm" onClick={addButton}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Link
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {config.buttons.map((button, index) => (
                  <div key={index} className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 items-center">
                    <Switch
                      checked={button.enabled}
                      onCheckedChange={enabled => updateButton(index, { enabled })}
                    />
                    <Input
                      value={button.label}
                      onChange={e => updateButton(index, { label: e.target.value })}
                      placeholder="Button Label"
                      disabled={!button.enabled}
                    />
                    <Input
                      value={button.url}
                      onChange={e => updateButton(index, { url: e.target.value })}
                      placeholder="https://..."
                      disabled={!button.enabled}
                    />
                    {config.buttons.length > 1 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeButton(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-2">
                  <Button onClick={copyCode} className="flex-1">
                    Copy Code
                  </Button>
                  <Button variant="secondary" onClick={createPage} className="flex-1">
                    Generate Page
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          {showPreview && (
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[600px] border rounded-md overflow-hidden">
                  <LinktreePreview config={config} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};