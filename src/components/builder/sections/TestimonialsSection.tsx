import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

interface TestimonialsSectionProps {
  content: {
    title: string;
    testimonials: Testimonial[];
  };
}

export const TestimonialsSection = memo(({ content }: TestimonialsSectionProps) => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content.title}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {content.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-lg shadow-sm border animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <blockquote className="text-lg mb-6 text-muted-foreground italic">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});