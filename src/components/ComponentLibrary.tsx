import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, Eye, Code, Palette, Settings } from "lucide-react";
import { AuthCard } from "./AuthCard";

interface ComponentConfig {
  id: string;
  name: string;
  category: string;
  component: React.ComponentType<Record<string, unknown>>;
  defaultProps: Record<string, unknown>;
  customizableProps: Array<{
    name: string;
    type: 'text' | 'color' | 'number' | 'boolean' | 'select';
    options?: string[];
  }>;
  code: string;
}

const componentLibrary: ComponentConfig[] = [
  {
    id: 'auth-card',
    name: 'Auth Card',
    category: 'Social',
    component: AuthCard,
    defaultProps: {
      title: "Tyler Studios",
      username: "@tylerstudios",
      image: "https://i.imgur.com/tWH4c48.png",
      bgImage: "https://i.imgur.com/KBjPwGI.jpg",
      buttons: [
        { label: "Instagram", url: "https://instagram.com/tylerstudios" },
        { label: "Website", url: "https://tylerstudios.com" }
      ]
    },
    customizableProps: [
      { name: 'title', type: 'text' },
      { name: 'username', type: 'text' },
      { name: 'image', type: 'text' },
      { name: 'bgImage', type: 'text' }
    ],
    code: `import { AuthCard } from "@/components/AuthCard";

<AuthCard
  title="Tyler Studios"
  username="@tylerstudios"
  image="https://i.imgur.com/tWH4c48.png"
  bgImage="https://i.imgur.com/KBjPwGI.jpg"
  buttons={[
    { label: "Instagram", url: "https://instagram.com/tylerstudios" },
    { label: "Website", url: "https://tylerstudios.com" }
  ]}
/>`
  },
  {
    id: 'glass-button',
    name: 'Glass Button',
    category: 'UI',
    component: Button,
    defaultProps: {
      variant: 'chrome',
      children: 'Glass Button',
      className: 'bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20'
    },
    customizableProps: [
      { name: 'children', type: 'text' },
      { name: 'variant', type: 'select', options: ['default', 'chrome', 'outline', 'ghost'] }
    ],
    code: `import { Button } from "@/components/ui/button";

<Button 
  variant="chrome"
  className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
>
  Glass Button
</Button>`
  },
  {
    id: 'glass-card',
    name: 'Glass Card',
    category: 'UI',
    component: Card,
    defaultProps: {
      className: 'bg-white/10 backdrop-blur-md border-white/20',
      children: (
        <CardContent className="p-6">
          <h3 className="text-white text-xl font-bold mb-2">Glass Card</h3>
          <p className="text-white/80">Beautiful glassmorphism card component</p>
        </CardContent>
      )
    },
    customizableProps: [
      { name: 'blur', type: 'select', options: ['sm', 'md', 'lg', 'xl'] },
      { name: 'opacity', type: 'select', options: ['5', '10', '20', '30'] }
    ],
    code: `import { Card, CardContent } from "@/components/ui/card";

<Card className="bg-white/10 backdrop-blur-md border-white/20">
  <CardContent className="p-6">
    <h3 className="text-white text-xl font-bold mb-2">Glass Card</h3>
    <p className="text-white/80">Beautiful glassmorphism card component</p>
  </CardContent>
</Card>`
  }
];

export const ComponentLibrary: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<ComponentConfig>(componentLibrary[0]);
  const [customProps, setCustomProps] = useState<Record<string, unknown>>(selectedComponent.defaultProps);
  const [activeTab, setActiveTab] = useState('preview');

  const categories = [...new Set(componentLibrary.map(c => c.category))];

  const updateProp = (propName: string, value: string) => {
    setCustomProps({ ...customProps, [propName]: value });
  };

  const copyCode = () => {
    navigator.clipboard.writeText(selectedComponent.code);
  };

  const downloadComponent = () => {
    const blob = new Blob([selectedComponent.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedComponent.id}.tsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const ComponentToRender = selectedComponent.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto p-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Component Library</h1>
          <p className="text-white/80">Visual component editor and code exporter</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Component List */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Components</CardTitle>
              </CardHeader>
              <CardContent>
                {categories.map(category => (
                  <div key={category} className="mb-4">
                    <h3 className="text-white/70 text-sm font-semibold mb-2 uppercase tracking-wide">
                      {category}
                    </h3>
                    <div className="space-y-1">
                      {componentLibrary
                        .filter(comp => comp.category === category)
                        .map(comp => (
                          <button
                            key={comp.id}
                            onClick={() => {
                              setSelectedComponent(comp);
                              setCustomProps(comp.defaultProps);
                            }}
                            className={`w-full text-left p-2 rounded transition-all ${
                              selectedComponent.id === comp.id
                                ? 'bg-white/20 text-white'
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {comp.name}
                          </button>
                        ))
                      }
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{selectedComponent.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={copyCode}>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                    <Button size="sm" variant="outline" onClick={downloadComponent}>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-white/10 border-white/20">
                    <TabsTrigger value="preview" className="data-[state=active]:bg-white/20 data-[state=active]:text-white">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="customize" className="data-[state=active]:bg-white/20 data-[state=active]:text-white">
                      <Settings className="w-4 h-4 mr-1" />
                      Customize
                    </TabsTrigger>
                    <TabsTrigger value="code" className="data-[state=active]:bg-white/20 data-[state=active]:text-white">
                      <Code className="w-4 h-4 mr-1" />
                      Code
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="preview" className="mt-6">
                    <div className="bg-black/20 rounded-lg p-8 min-h-64 flex items-center justify-center">
                      <ComponentToRender {...customProps} />
                    </div>
                  </TabsContent>

                  <TabsContent value="customize" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-white font-semibold">Properties</h3>
                        {selectedComponent.customizableProps.map(prop => (
                          <div key={prop.name}>
                            <Label className="text-white">{prop.name}</Label>
                            {prop.type === 'text' && (
                              <Input
                                value={customProps[prop.name] || ''}
                                onChange={(e) => updateProp(prop.name, e.target.value)}
                                className="bg-white/10 border-white/20 text-white"
                              />
                            )}
                            {prop.type === 'select' && prop.options && (
                              <select
                                value={customProps[prop.name] || ''}
                                onChange={(e) => updateProp(prop.name, e.target.value)}
                                className="w-full p-2 bg-white/10 border border-white/20 rounded text-white"
                              >
                                {prop.options.map(option => (
                                  <option key={option} value={option} className="bg-gray-800">
                                    {option}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-black/20 rounded-lg p-4 min-h-64 flex items-center justify-center">
                        <ComponentToRender {...customProps} />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="code" className="mt-6">
                    <div className="bg-black/40 rounded-lg p-4">
                      <pre className="text-white/80 text-sm overflow-x-auto whitespace-pre-wrap">
                        <code>{selectedComponent.code}</code>
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
