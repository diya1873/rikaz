import { memo, useCallback } from "react";
import { Section } from "@/types/builder";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Settings, Type, Image } from "lucide-react";

interface PropertiesPanelProps {
  section: Section | undefined;
  onUpdateSection: (sectionId: string, updates: Partial<Section>) => void;
}

export const PropertiesPanel = memo(({ section, onUpdateSection }: PropertiesPanelProps) => {
  const updateContent = useCallback((key: string, value: any) => {
    if (!section) return;
    
    onUpdateSection(section.id, {
      content: {
        ...section.content,
        [key]: value,
      },
    });
  }, [section, onUpdateSection]);

  const updateFeature = useCallback((index: number, key: string, value: string) => {
    if (!section || !section.content.features) return;
    
    const features = [...section.content.features];
    features[index] = { ...features[index], [key]: value };
    
    updateContent('features', features);
  }, [section, updateContent]);

  const updateTestimonial = useCallback((index: number, key: string, value: string) => {
    if (!section || !section.content.testimonials) return;
    
    const testimonials = [...section.content.testimonials];
    testimonials[index] = { ...testimonials[index], [key]: value };
    
    updateContent('testimonials', testimonials);
  }, [section, updateContent]);

  if (!section) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-sidebar-foreground mb-2">No Section Selected</h3>
          <p className="text-sm text-muted-foreground">
            Select a section from the canvas to edit its properties.
          </p>
        </div>
      </div>
    );
  }

  const renderSectionProperties = () => {
    switch (section.type) {
      case "hero":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                Title
              </Label>
              <Input
                id="title"
                value={section.content.title || ""}
                onChange={(e) => updateContent("title", e.target.value)}
                placeholder="Hero title"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                value={section.content.subtitle || ""}
                onChange={(e) => updateContent("subtitle", e.target.value)}
                placeholder="Hero subtitle"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={section.content.buttonText || ""}
                onChange={(e) => updateContent("buttonText", e.target.value)}
                placeholder="Call to action"
              />
            </div>
            <div>
              <Label htmlFor="backgroundImage" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                Background Image URL
              </Label>
              <Input
                id="backgroundImage"
                value={section.content.backgroundImage || ""}
                onChange={(e) => updateContent("backgroundImage", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        );

      case "header":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="logo">Logo Text</Label>
              <Input
                id="logo"
                value={section.content.logo || ""}
                onChange={(e) => updateContent("logo", e.target.value)}
                placeholder="Your Logo"
              />
            </div>
            <div>
              <Label>Menu Items</Label>
              {section.content.menuItems?.map((item: string, index: number) => (
                <Input
                  key={index}
                  value={item}
                  onChange={(e) => {
                    const items = [...section.content.menuItems];
                    items[index] = e.target.value;
                    updateContent("menuItems", items);
                  }}
                  placeholder={`Menu item ${index + 1}`}
                  className="mt-2"
                />
              ))}
            </div>
          </div>
        );

      case "features":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="featuresTitle">Section Title</Label>
              <Input
                id="featuresTitle"
                value={section.content.title || ""}
                onChange={(e) => updateContent("title", e.target.value)}
                placeholder="Features title"
              />
            </div>
            <div>
              <Label htmlFor="featuresSubtitle">Section Subtitle</Label>
              <Textarea
                id="featuresSubtitle"
                value={section.content.subtitle || ""}
                onChange={(e) => updateContent("subtitle", e.target.value)}
                placeholder="Features subtitle"
                rows={2}
              />
            </div>
            <Separator />
            <div>
              <Label className="text-sm font-medium">Features</Label>
              {section.content.features?.map((feature: any, index: number) => (
                <Card key={index} className="mt-3">
                  <CardContent className="p-4 space-y-3">
                    <Input
                      value={feature.title || ""}
                      onChange={(e) => updateFeature(index, "title", e.target.value)}
                      placeholder="Feature title"
                    />
                    <Textarea
                      value={feature.description || ""}
                      onChange={(e) => updateFeature(index, "description", e.target.value)}
                      placeholder="Feature description"
                      rows={2}
                    />
                    <Input
                      value={feature.icon || ""}
                      onChange={(e) => updateFeature(index, "icon", e.target.value)}
                      placeholder="Icon (emoji)"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "testimonials":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="testimonialsTitle">Section Title</Label>
              <Input
                id="testimonialsTitle"
                value={section.content.title || ""}
                onChange={(e) => updateContent("title", e.target.value)}
                placeholder="Testimonials title"
              />
            </div>
            <Separator />
            <div>
              <Label className="text-sm font-medium">Testimonials</Label>
              {section.content.testimonials?.map((testimonial: any, index: number) => (
                <Card key={index} className="mt-3">
                  <CardContent className="p-4 space-y-3">
                    <Input
                      value={testimonial.name || ""}
                      onChange={(e) => updateTestimonial(index, "name", e.target.value)}
                      placeholder="Customer name"
                    />
                    <Input
                      value={testimonial.role || ""}
                      onChange={(e) => updateTestimonial(index, "role", e.target.value)}
                      placeholder="Customer role"
                    />
                    <Textarea
                      value={testimonial.content || ""}
                      onChange={(e) => updateTestimonial(index, "content", e.target.value)}
                      placeholder="Testimonial content"
                      rows={3}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "cta":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ctaTitle">Title</Label>
              <Input
                id="ctaTitle"
                value={section.content.title || ""}
                onChange={(e) => updateContent("title", e.target.value)}
                placeholder="CTA title"
              />
            </div>
            <div>
              <Label htmlFor="ctaSubtitle">Subtitle</Label>
              <Textarea
                id="ctaSubtitle"
                value={section.content.subtitle || ""}
                onChange={(e) => updateContent("subtitle", e.target.value)}
                placeholder="CTA subtitle"
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="primaryButton">Primary Button Text</Label>
              <Input
                id="primaryButton"
                value={section.content.buttonText || ""}
                onChange={(e) => updateContent("buttonText", e.target.value)}
                placeholder="Primary action"
              />
            </div>
            <div>
              <Label htmlFor="secondaryButton">Secondary Button Text</Label>
              <Input
                id="secondaryButton"
                value={section.content.secondaryButtonText || ""}
                onChange={(e) => updateContent("secondaryButtonText", e.target.value)}
                placeholder="Secondary action"
              />
            </div>
          </div>
        );

      case "footer":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={section.content.companyName || ""}
                onChange={(e) => updateContent("companyName", e.target.value)}
                placeholder="Your Company"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={section.content.description || ""}
                onChange={(e) => updateContent("description", e.target.value)}
                placeholder="Company description"
                rows={2}
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-sm text-muted-foreground">
            No properties available for this section type.
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-builder-border">
        <h3 className="text-lg font-semibold text-sidebar-foreground">Properties</h3>
        <p className="text-sm text-muted-foreground">{section.name}</p>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {renderSectionProperties()}
      </div>
    </div>
  );
});