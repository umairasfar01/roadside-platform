import { Navbar } from "@/components/layout/navbar";
import { CtaLink } from "@/components/marketing/cta-link";
import { Logo } from "@/components/marketing/logo";
import { NavLink } from "@/components/marketing/nav-link";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const NAV_ITEMS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#for-mechanics", label: "For mechanics" },
  { href: "#pricing", label: "Pricing" },
] as const;

export function MarketingNavbar() {
  return (
    <Navbar
      logo={<Logo />}
      navigation={
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      }
      actions={
        <>
          <ThemeToggle />
          <CtaLink href="/sign-in" size="sm" className="hidden sm:inline-flex">
            Get help now
          </CtaLink>
        </>
      }
    />
  );
}
