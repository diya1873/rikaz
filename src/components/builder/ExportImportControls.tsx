import { memo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";

interface ExportImportControlsProps {
  onExport: () => void;
  onImport: (file: File) => void;
}

export const ExportImportControls = memo(({ onExport, onImport }: ExportImportControlsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      // Reset the input so the same file can be selected again
      e.target.value = '';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onExport}
        className="flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        Export
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleImportClick}
        className="flex items-center gap-2"
      >
        <Upload className="w-4 h-4" />
        Import
      </Button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
});