import { memo } from "react";
import { Button } from "@/components/ui/button";

interface HeaderSectionProps {
  content: {
    logo: string;
    menuItems: string[];
  };
}

export const HeaderSection = memo(({ content }: HeaderSectionProps) => {
  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">
            {content.logo}
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {content.menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          <Button variant="outline" size="sm" className="md:hidden">
            Menu
          </Button>
        </div>
      </div>
    </header>
  );
});