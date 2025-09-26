import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { AuthPage } from "@/components/AuthPage";

interface AuthCardConfig {
  pageName: string;
  route: string;
  title: string;
  username: string;
  profilePicture: string;
  bgImageSrc: string;
  buttons: Array<{
    label: string;
    url: string;
    enabled: boolean;
  }>;
}

const defaultConfig: AuthCardConfig = {
  pageName: "NewBrand",
  route: "/new-brand",
  title: "TD Studios",
  username: "@tdstudios",
  profilePicture: "https://i.imgur.com/tWH4c48.png",
  bgImageSrc: "https://i.imgur.com/KBjPwGI.jpg",
  buttons: [
    { label: "Telegram", url: "https://t.me/+mx113PockSVjNzgx", enabled: true },
    { label: "Instagram", url: "https://www.instagram.com/punkiez__/", enabled: true },
    { label: "Website", url: "https://tdstudios.com", enabled: true },
    { label: "Contact", url: "mailto:hello@tdstudios.com", enabled: false },
    { label: "Portfolio", url: "#", enabled: false },
    { label: "Shop", url: "/shop", enabled: false }
  ]
};

const generateAuthPageCode = (config: AuthCardConfig) => {
  const componentName = config.pageName.replace(/[^a-zA-Z0-9]+/g, "")
    .split("")
    .map((char, i) => i === 0 ? char.toUpperCase() : char)
    .join("")
    .replace(/([a-z])([A-Z])/g, '$1$2');

  const enabledButtons = config.buttons.filter(btn => btn.enabled);
  const hasEnabledButtons = enabledButtons.length > 0;

  // Generate custom buttons override if needed
  const customButtonsCode = hasEnabledButtons ? `
          <div className="space-y-3">
            ${enabledButtons.map(btn => `<Button
              variant="chrome"
              className="w-full h-12 text-2xl font-semibold rounded-xl font-bebas-neue text-black shadow-md"
              onClick={() => window.open('${btn.url}', '_blank')}
            >
              ${btn.label}
            </Button>`).join('\n            ')}
          </div>` : '';

  return `import React from "react";
import { AuthPage } from "@/components/AuthPage";

const ${componentName} = () => {
  return (
    <AuthPage
      brandLogoSrc="${config.brandLogoSrc}"
      bounceSrc="${config.bounceLogoSrc}"
      showBounceOnMobile={${config.showBounceOnMobile}}
      hideExtraButtons={${config.hideExtraButtons}}
      hideAuthForm={${config.hideAuthForm}}${config.extraImageSrc ? `
      extraImageSrc="${config.extraImageSrc}"` : ''}${config.bgImageSrc ? `
      bgImageSrc="${config.bgImageSrc}"` : ''}
    />
  );
};

export default ${componentName};
`;
};

export const AuthCardBuilder = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<AuthCardConfig>(defaultConfig);

  const updateConfig = (updates: Partial<AuthCardConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const updateButton = (index: number, updates: Partial<typeof config.buttons[0]>) => {
    setConfig(prev => ({
      ...prev,
      buttons: prev.buttons.map((btn, i) => i === index ? { ...btn, ...updates } : btn)
    }));
  };

  const createAuthPage = async () => {
    try {
      const code = generateAuthPageCode(config);
      
      // Create the page file
      const response = await fetch('/api/create-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: config.pageName,
          route: config.route,
          code: code
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create page');
      }

      toast({
        title: "Auth Page Created",
        description: `${config.pageName} → ${config.route}`,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to create auth page";
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      });
    }
  };

  const copyCode = async () => {
    const code = generateAuthPageCode(config);
    await navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: "Auth page code copied to clipboard"
    });
  };

  const previewProps = {
    brandLogoSrc: config.brandLogoSrc,
    bounceSrc: config.bounceLogoSrc,
    showBounceOnMobile: config.showBounceOnMobile,
    hideExtraButtons: config.hideExtraButtons,
    hideAuthForm: config.hideAuthForm,
    extraImageSrc: config.extraImageSrc || undefined,
    bgImageSrc: config.bgImageSrc || undefined
  };

  return (
    <div className="min-h-screen p-6 grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        {/* Basic Config */}
        <Card>
          <CardHeader>
            <CardTitle>Auth Page Builder</CardTitle>
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

            <Separator />

            <div className="space-y-2">
              <Label>Brand Logo (Card Center)</Label>
              <Input
                value={config.brandLogoSrc}
                onChange={e => updateConfig({ brandLogoSrc: e.target.value })}
                placeholder="https://i.imgur.com/logo.png"
              />
            </div>

            <div className="space-y-2">
              <Label>Bouncing Background Logo</Label>
              <Input
                value={config.bounceLogoSrc}
                onChange={e => updateConfig({ bounceLogoSrc: e.target.value })}
                placeholder="https://i.imgur.com/bounce.png"
              />
            </div>

            <div className="space-y-2">
              <Label>Background Image</Label>
              <Input
                value={config.bgImageSrc}
                onChange={e => updateConfig({ bgImageSrc: e.target.value })}
                placeholder="https://i.imgur.com/background.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label>Extra Image/Embed (Optional)</Label>
              <Input
                value={config.extraImageSrc}
                onChange={e => updateConfig({ extraImageSrc: e.target.value })}
                placeholder="https://i.imgur.com/promo.jpg"
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={config.showBounceOnMobile}
                  onCheckedChange={checked => updateConfig({ showBounceOnMobile: checked })}
                />
                <Label>Show bouncing logo on mobile</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={config.hideAuthForm}
                  onCheckedChange={checked => updateConfig({ hideAuthForm: checked })}
                />
                <Label>Hide auth form</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={config.hideExtraButtons}
                  onCheckedChange={checked => updateConfig({ hideExtraButtons: checked })}
                />
                <Label>Hide extra buttons (keep only first 2)</Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={copyCode}>Copy Code</Button>
              <Button variant="secondary" onClick={createAuthPage}>Create Page</Button>
            </div>
          </CardContent>
        </Card>

        {/* Button Config */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {config.buttons.map((button, index) => (
              <div key={index} className="grid grid-cols-[auto_1fr_1fr] gap-2 items-center">
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
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-screen border rounded-md overflow-hidden">
            <AuthPage {...previewProps} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};