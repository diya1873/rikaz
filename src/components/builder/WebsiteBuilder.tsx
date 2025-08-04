import { useState, useCallback } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Section, BuilderState, BuilderConfig } from "@/types/builder";
import { sectionTemplates } from "@/data/sectionTemplates";
import { SectionLibrary } from "./SectionLibrary";
import { PreviewCanvas } from "./PreviewCanvas";
import { PropertiesPanel } from "./PropertiesPanel";
import { ExportImportControls } from "./ExportImportControls";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff, Settings } from "lucide-react";

export const WebsiteBuilder = () => {
  const [builderState, setBuilderState] = useState<BuilderState>({
    sections: [],
    selectedSectionId: null,
  });
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);

  const addSection = useCallback((templateId: string) => {
    const template = sectionTemplates.find((t) => t.id === templateId);
    if (!template) return;

    const newSection: Section = {
      id: `${template.type}-${Date.now()}`,
      type: template.type,
      name: template.name,
      content: { ...template.defaultContent },
      styles: { ...template.defaultStyles },
    };

    setBuilderState((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
      selectedSectionId: newSection.id,
    }));

    toast({
      title: "Section Added",
      description: `${template.name} has been added to your page.`,
    });
  }, []);

  const deleteSection = useCallback((sectionId: string) => {
    setBuilderState((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== sectionId),
      selectedSectionId: prev.selectedSectionId === sectionId ? null : prev.selectedSectionId,
    }));

    toast({
      title: "Section Deleted",
      description: "Section has been removed from your page.",
    });
  }, []);

  const updateSection = useCallback((sectionId: string, updates: Partial<Section>) => {
    setBuilderState((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, ...updates } : section
      ),
    }));
  }, []);

  const selectSection = useCallback((sectionId: string | null) => {
    setBuilderState((prev) => ({
      ...prev,
      selectedSectionId: sectionId,
    }));
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setBuilderState((prev) => {
        const oldIndex = prev.sections.findIndex((s) => s.id === active.id);
        const newIndex = prev.sections.findIndex((s) => s.id === over.id);

        return {
          ...prev,
          sections: arrayMove(prev.sections, oldIndex, newIndex),
        };
      });

      toast({
        title: "Section Reordered",
        description: "Sections have been reordered successfully.",
      });
    }
  }, []);

  const exportConfig = useCallback(() => {
    const config: BuilderConfig = {
      title: "My Website",
      description: "Created with Website Builder",
      sections: builderState.sections,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `website-config-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Your website configuration has been downloaded.",
    });
  }, [builderState]);

  const importConfig = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config: BuilderConfig = JSON.parse(e.target?.result as string);
        setBuilderState({
          sections: config.sections,
          selectedSectionId: null,
        });

        toast({
          title: "Import Successful",
          description: "Your website configuration has been loaded.",
        });
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Invalid configuration file format.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  }, []);

  const selectedSection = builderState.sections.find(
    (s) => s.id === builderState.selectedSectionId
  );

  return (
    <div className="h-screen bg-builder-canvas flex flex-col overflow-hidden">
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-full">
        {/* Mobile Header with Toggle */}
        <div className="bg-builder-sidebar border-b border-builder-border p-2 flex items-center justify-between">
          <h1 className="text-lg font-bold text-sidebar-foreground">Website Builder</h1>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-1 text-xs"
            >
              {previewMode ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {previewMode ? "Edit" : "Preview"}
            </Button>
          </div>
        </div>

        {/* Mobile Tabs */}
        {!previewMode && (
          <div className="bg-builder-sidebar border-b border-builder-border flex">
            <button 
              className="flex-1 p-2 text-xs font-medium text-sidebar-foreground border-r border-builder-border"
              onClick={() => setShowPropertiesPanel(false)}
            >
              Sections ({builderState.sections.length})
            </button>
            <button 
              className="flex-1 p-2 text-xs font-medium text-sidebar-foreground"
              onClick={() => setShowPropertiesPanel(true)}
            >
              Properties
            </button>
          </div>
        )}

        {/* Mobile Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {!previewMode && !showPropertiesPanel && (
            <div className="h-32 bg-builder-sidebar border-b border-builder-border overflow-auto">
              <SectionLibrary onAddSection={addSection} />
            </div>
          )}

          {/* Canvas Area */}
          <div className="flex-1 overflow-auto">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={builderState.sections} strategy={verticalListSortingStrategy}>
                <PreviewCanvas
                  sections={builderState.sections}
                  selectedSectionId={builderState.selectedSectionId}
                  onSelectSection={selectSection}
                  onDeleteSection={deleteSection}
                  previewMode={previewMode}
                />
              </SortableContext>
            </DndContext>
          </div>

          {!previewMode && showPropertiesPanel && (
            <div className="h-64 bg-builder-sidebar border-t border-builder-border overflow-auto">
              <PropertiesPanel
                section={selectedSection}
                onUpdateSection={updateSection}
              />
            </div>
          )}
        </div>

        {/* Mobile Footer */}
        {!previewMode && (
          <div className="bg-builder-sidebar border-t border-builder-border p-2">
            <ExportImportControls onExport={exportConfig} onImport={importConfig} />
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-row h-full">
        {/* Section Library Sidebar */}
        {!previewMode && (
          <div className="w-80 bg-builder-sidebar border-r border-builder-border flex-shrink-0">
            <div className="p-4 border-b border-builder-border">
              <h2 className="text-lg font-semibold text-sidebar-foreground">Section Library</h2>
              <p className="text-sm text-muted-foreground">Click to add sections</p>
            </div>
            <SectionLibrary onAddSection={addSection} />
          </div>
        )}

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Toolbar */}
          <div className="bg-builder-sidebar border-b border-builder-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-sidebar-foreground">Website Builder</h1>
              <span className="text-sm text-muted-foreground">
                {builderState.sections.length} sections
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <ExportImportControls onExport={exportConfig} onImport={importConfig} />
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center gap-2"
              >
                {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {previewMode ? "Edit" : "Preview"}
              </Button>

              {!previewMode && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPropertiesPanel(!showPropertiesPanel)}
                  className="flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Properties
                </Button>
              )}
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Canvas */}
            <div className="flex-1 overflow-auto">
              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={builderState.sections} strategy={verticalListSortingStrategy}>
                  <PreviewCanvas
                    sections={builderState.sections}
                    selectedSectionId={builderState.selectedSectionId}
                    onSelectSection={selectSection}
                    onDeleteSection={deleteSection}
                    previewMode={previewMode}
                  />
                </SortableContext>
              </DndContext>
            </div>

            {/* Properties Panel */}
            {!previewMode && showPropertiesPanel && (
              <div className="w-80 bg-builder-sidebar border-l border-builder-border flex-shrink-0">
                <PropertiesPanel
                  section={selectedSection}
                  onUpdateSection={updateSection}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};