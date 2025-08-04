import { memo } from "react";
import { sectionTemplates } from "@/data/sectionTemplates";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SectionLibraryProps {
  onAddSection: (templateId: string) => void;
}

export const SectionLibrary = memo(({ onAddSection }: SectionLibraryProps) => {
  return (
    <div className="p-4 space-y-3">
      {sectionTemplates.map((template) => (
        <Card 
          key={template.id}
          className="bg-card hover:bg-accent/50 transition-all duration-200 cursor-pointer group animate-fade-in border-builder-border"
          onClick={() => onAddSection(template.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">{template.icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-card-foreground group-hover:text-accent-foreground transition-colors">
                  {template.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {template.description}
                </p>
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto w-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddSection(template.id);
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
});