import { memo } from "react";
import { Section } from "@/types/builder";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";
import { HeroSection } from "./sections/HeroSection";
import { HeaderSection } from "./sections/HeaderSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { CTASection } from "./sections/CTASection";
import { FooterSection } from "./sections/FooterSection";

interface SectionRendererProps {
  section: Section;
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
  previewMode: boolean;
}

export const SectionRenderer = memo(({
  section,
  isSelected,
  onClick,
  onDelete,
  previewMode
}: SectionRendererProps) => {
  const renderSection = () => {
    switch (section.type) {
      case "hero":
        return <HeroSection content={section.content as any} />;
      case "header":
        return <HeaderSection content={section.content as any} />;
      case "features":
        return <FeaturesSection content={section.content as any} />;
      case "testimonials":
        return <TestimonialsSection content={section.content as any} />;
      case "cta":
        return <CTASection content={section.content as any} />;
      case "footer":
        return <FooterSection content={section.content as any} />;
      default:
        return (
          <div className="p-8 text-center bg-muted">
            <p className="text-muted-foreground">Unknown section type: {section.type}</p>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative group transition-all duration-200 ${
        isSelected && !previewMode
          ? "ring-2 ring-builder-accent ring-offset-2 ring-offset-background"
          : ""
      } ${!previewMode ? "hover:ring-1 hover:ring-builder-accent/50 cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {/* Section Controls */}
      {!previewMode && (
        <div className="absolute top-1 lg:top-2 right-1 lg:right-2 z-20 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity flex gap-1">
          <Button
            size="sm"
            variant="destructive"
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              console.log('Delete button clicked for section:', section.id);
              onDelete();
            }}
            className="h-6 w-6 lg:h-8 lg:w-8 p-0 touch-manipulation hover:scale-110 transition-transform"
          >
            <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
          </Button>
        </div>
      )}

      {/* Drag Handle */}
      {!previewMode && (
        <div className="absolute left-1 lg:left-2 top-1/2 -translate-y-1/2 z-20 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
          <div className="bg-builder-accent/20 rounded p-1 cursor-grab active:cursor-grabbing touch-manipulation">
            <GripVertical className="w-3 h-3 lg:w-4 lg:h-4 text-builder-accent" />
          </div>
        </div>
      )}

      {/* Section Content */}
      <div className={!previewMode ? "ml-6 mr-8 lg:ml-8 lg:mr-12" : ""}>
        {renderSection()}
      </div>

      {/* Section Label */}
      {!previewMode && isSelected && (
        <div className="absolute bottom-2 left-2 z-10">
          <div className="bg-builder-accent text-builder-accent-foreground text-xs px-2 py-1 rounded">
            {section.name}
          </div>
        </div>
      )}
    </div>
  );
});