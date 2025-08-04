import { memo } from "react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  content: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonUrl: string;
    backgroundImage?: string;
  };
}

export const HeroSection = memo(({ content }: HeroSectionProps) => {
  return (
    <section className="relative py-20 px-6 text-center bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
      {content.backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${content.backgroundImage})` }}
        />
      )}
      <div className="relative max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
          {content.title}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
          {content.subtitle}
        </p>
        <Button 
          size="lg" 
          className="animate-scale-in bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300"
        >
          {content.buttonText}
        </Button>
      </div>
    </section>
  );
});