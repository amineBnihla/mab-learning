import Image from "next/image";

const footerLinks = ["Privacy Policy", "Terms of Service", "Help Center", "Feedback"] as const;

export function SiteFooter() {
  return (
    <footer id="footer" className="mt-8 border-t border-outline-variant bg-surface-container py-8">
      <div className="vertex-container flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div className="relative size-16 shrink-0 overflow-hidden">
          <Image
            alt="Vertex Intelligence"
            className="object-contain"
            fill
            sizes="64px"
            src="/images/learning-catalog/vertex-footer-logo.jpg"
          />
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {footerLinks.map((link) => (
            <a
              key={link}
              className="text-label-sm text-on-surface-variant underline underline-offset-2 transition-colors hover:text-primary"
              href="#footer"
            >
              {link}
            </a>
          ))}
        </nav>

        <p className="text-sm text-on-surface-variant">
          © 2024 Vertex AI Learning. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
