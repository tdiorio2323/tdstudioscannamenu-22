import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

type Variant = "default" | "secondary" | "outline" | "ghost" | "link";

const generateCode = (name: string, title: string, body: string, primary?: { label: string; variant: Variant }, secondary?: { label: string; variant: Variant }) => {
  const compName = name.replace(/[^a-zA-Z0-9]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map(s => s[0].toUpperCase() + s.slice(1))
    .join("");

  const btnImports = (primary || secondary) ? ", Button" : "";
  const buttons = [
    primary && `<Button variant="${primary.variant}">${primary.label}</Button>`,
    secondary && `<Button variant="${secondary.variant}">${secondary.label}</Button>`
  ].filter(Boolean).join("\n            ");

  return `import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";${btnImports}

const ${compName} = () => {
  return (
    <div className="min-h-screen p-6">
      <Card>
        <CardHeader>
          <CardTitle>${title || compName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">${body || "Scaffolded page."}</p>
          ${(primary || secondary) ? `<div className=\"flex gap-2\">\n            ${buttons}\n          </div>` : ""}
        </CardContent>
      </Card>
    </div>
  );
};

export default ${compName};
`;
};

const Builder = () => {
  const { toast } = useToast();
  const [name, setName] = useState("NewPage");
  const [route, setRoute] = useState("/new-page");
  const [title, setTitle] = useState("New Page");
  const [body, setBody] = useState("This page was created with the builder.");
  const [pLabel, setPLabel] = useState("Primary");
  const [pVariant, setPVariant] = useState<Variant>("default");
  const [sLabel, setSLabel] = useState("Secondary");
  const [sVariant, setSVariant] = useState<Variant>("outline");
  const [includePrimary, setIncludePrimary] = useState(true);
  const [includeSecondary, setIncludeSecondary] = useState(false);

  const code = useMemo(() => generateCode(
    name,
    title,
    body,
    includePrimary ? { label: pLabel, variant: pVariant } : undefined,
    includeSecondary ? { label: sLabel, variant: sVariant } : undefined,
  ), [name, title, body, includePrimary, includeSecondary, pLabel, pVariant, sLabel, sVariant]);

  // Valid button variants for selects
  const variants: Variant[] = ["default", "secondary", "outline", "ghost", "link"];

  const createPage = async () => {
    try {
      const res = await fetch("/__scaffold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, route, code }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast({ title: "Page created", description: `${name} -> ${route}` });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    toast({ title: "Copied", description: "Component code copied to clipboard." });
  };

  return (
    <div className="min-h-screen p-6 grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Page Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name (Component)</Label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="About" />
            </div>
            <div className="space-y-2">
              <Label>Route</Label>
              <Input value={route} onChange={e => setRoute(e.target.value)} placeholder="/about" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Body</Label>
            <Textarea value={body} onChange={e => setBody(e.target.value)} rows={4} />
          </div>

          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Primary Button</Label>
                <input type="checkbox" checked={includePrimary} onChange={e => setIncludePrimary(e.target.checked)} />
              </div>
              <Input value={pLabel} onChange={e => setPLabel(e.target.value)} disabled={!includePrimary} />
              <Select value={pVariant} onValueChange={(v: Variant) => setPVariant(v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {variants.map(v => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Secondary Button</Label>
                <input type="checkbox" checked={includeSecondary} onChange={e => setIncludeSecondary(e.target.checked)} />
              </div>
              <Input value={sLabel} onChange={e => setSLabel(e.target.value)} disabled={!includeSecondary} />
              <Select value={sVariant} onValueChange={(v: Variant) => setSVariant(v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {variants.map(v => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={copyCode}>Copy Code</Button>
            <Button variant="secondary" onClick={createPage}>Create Page</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Simple live preview */}
          <div className="min-h-[300px] p-4 border rounded-md">
            <Card>
              <CardHeader><CardTitle>{title || name}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{body}</p>
                <div className="flex gap-2">
                  {includePrimary && <Button variant={pVariant}>{pLabel}</Button>}
                  {includeSecondary && <Button variant={sVariant}>{sLabel}</Button>}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Builder;
