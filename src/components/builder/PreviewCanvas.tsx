import { memo, useCallback } from "react";
import { Section } from "@/types/builder";
import { SortableItem } from "./SortableItem";
import { SectionRenderer } from "./SectionRenderer";

interface PreviewCanvasProps {
  sections: Section[];
  selectedSectionId: string | null;
  onSelectSection: (sectionId: string | null) => void;
  onDeleteSection: (sectionId: string) => void;
  previewMode: boolean;
}

export const PreviewCanvas = memo(({
  sections,
  selectedSectionId,
  onSelectSection,
  onDeleteSection,
  previewMode
}: PreviewCanvasProps) => {
  const handleSectionClick = useCallback((sectionId: string) => {
    if (!previewMode) {
      onSelectSection(sectionId);
    }
  }, [previewMode, onSelectSection]);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !previewMode) {
      onSelectSection(null);
    }
  }, [previewMode, onSelectSection]);

  if (sections.length === 0) {
    return (
      <div 
        className="flex-1 flex items-center justify-center bg-background/5 m-6 rounded-lg border-2 border-dashed border-builder-border animate-fade-in"
        onClick={handleCanvasClick}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Start Building</h3>
          <p className="text-muted-foreground max-w-md">
            Add sections from the library on the left to start building your website. 
            Click on any section template to add it to your page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-full bg-background/5 m-2 lg:m-6 rounded-lg overflow-hidden animate-fade-in"
      onClick={handleCanvasClick}
    >
      <div className="bg-background min-h-full">
        {sections.map((section) => (
          previewMode ? (
            <SectionRenderer
              key={section.id}
              section={section}
              isSelected={false}
              onClick={() => {}}
              onDelete={() => {}}
              previewMode={true}
            />
          ) : (
            <SortableItem key={section.id} id={section.id}>
              <SectionRenderer
                section={section}
                isSelected={selectedSectionId === section.id}
                onClick={() => handleSectionClick(section.id)}
                onDelete={() => onDeleteSection(section.id)}
                previewMode={false}
              />
            </SortableItem>
          )
        ))}
      </div>
    </div>
  );
});