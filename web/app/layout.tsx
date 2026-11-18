import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { show } from "@/content/show";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: show.name,
    template: `%s · ${show.name}`,
  },
  description: show.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <div className="header-inner">
              <Link href="/" className="brand-link">
                {show.name}
              </Link>
              <SiteNav />
            </div>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}