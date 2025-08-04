import { memo } from "react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  content: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonUrl: string;
    secondaryButtonText: string;
    secondaryButtonUrl: string;
  };
}

export const CTASection = memo(({ content }: CTASectionProps) => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {content.title}
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {content.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            {content.buttonText}
          </Button>
          <Button size="lg" variant="outline">
            {content.secondaryButtonText}
          </Button>
        </div>
      </div>
    </section>
  );
});