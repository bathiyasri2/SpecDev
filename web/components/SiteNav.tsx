"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/episodes", label: "Episodes" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="site-nav" aria-label="Main">
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close menu" : "Menu"}
      </button>
      <ul id="nav-links" className={`nav-links${open ? " is-open" : ""}`}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={isActive(pathname, link.href) ? "nav-link is-active" : "nav-link"}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}