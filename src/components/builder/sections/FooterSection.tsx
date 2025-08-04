import { memo } from "react";

interface Link {
  text: string;
  url: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface FooterSectionProps {
  content: {
    companyName: string;
    description: string;
    links: Link[];
    socialLinks: SocialLink[];
  };
}

export const FooterSection = memo(({ content }: FooterSectionProps) => {
  return (
    <footer className="bg-muted py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{content.companyName}</h3>
            <p className="text-muted-foreground">{content.description}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {content.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {content.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 {content.companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});