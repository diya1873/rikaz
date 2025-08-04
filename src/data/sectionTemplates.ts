import { SectionTemplate } from "@/types/builder";

export const sectionTemplates: SectionTemplate[] = [
  {
    id: "hero",
    type: "hero", 
    name: "Hero Section",
    description: "Eye-catching header with title, subtitle, and call-to-action",
    icon: "🚀",
    defaultContent: {
      title: "Build Amazing Websites",
      subtitle: "Create stunning landing pages with our intuitive drag-and-drop builder",
      buttonText: "Get Started",
      buttonUrl: "#",
      backgroundImage: ""
    }
  },
  {
    id: "header",
    type: "header",
    name: "Navigation Header", 
    description: "Site navigation with logo and menu items",
    icon: "🧭",
    defaultContent: {
      logo: "Logo",
      menuItems: ["Home", "About", "Services", "Contact"]
    }
  },
  {
    id: "features",
    type: "features",
    name: "Features Grid",
    description: "Showcase key features in an organized grid layout",
    icon: "⭐",
    defaultContent: {
      title: "Key Features",
      subtitle: "Everything you need to succeed",
      features: [
        {
          title: "Fast Performance",
          description: "Lightning-fast loading times for optimal user experience",
          icon: "⚡"
        },
        {
          title: "Responsive Design", 
          description: "Looks perfect on desktop, tablet, and mobile devices",
          icon: "📱"
        },
        {
          title: "Easy to Use",
          description: "Intuitive interface that anyone can master quickly",
          icon: "🎯"
        }
      ]
    }
  },
  {
    id: "testimonials",
    type: "testimonials",
    name: "Testimonials",
    description: "Customer reviews and social proof",
    icon: "💬",
    defaultContent: {
      title: "What Our Customers Say",
      testimonials: [
        {
          name: "Sarah Johnson",
          role: "CEO, TechStart",
          content: "This builder transformed how we create landing pages. Absolutely fantastic!",
          avatar: ""
        },
        {
          name: "Mike Chen",
          role: "Designer",
          content: "The ease of use and beautiful templates make this a game-changer.",
          avatar: ""
        }
      ]
    }
  },
  {
    id: "cta",
    type: "cta",
    name: "Call to Action",
    description: "Compelling section to drive user engagement",
    icon: "📢",
    defaultContent: {
      title: "Ready to Get Started?",
      subtitle: "Join thousands of satisfied customers today",
      buttonText: "Start Free Trial",
      buttonUrl: "#",
      secondaryButtonText: "Learn More",
      secondaryButtonUrl: "#"
    }
  },
  {
    id: "footer",
    type: "footer",
    name: "Footer",
    description: "Site footer with links and company information",
    icon: "📄",
    defaultContent: {
      companyName: "Your Company",
      description: "Building amazing websites since 2024",
      links: [
        { text: "Privacy Policy", url: "#" },
        { text: "Terms of Service", url: "#" },
        { text: "Contact", url: "#" }
      ],
      socialLinks: [
        { platform: "Twitter", url: "#" },
        { platform: "LinkedIn", url: "#" },
        { platform: "GitHub", url: "#" }
      ]
    }
  }
];