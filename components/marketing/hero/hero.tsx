import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { HeroBackground } from "@/components/marketing/hero/hero-background";
import { HeroContent } from "@/components/marketing/hero/hero-content";
import { HeroStats } from "@/components/marketing/hero/hero-stats";
import { HeroTrustBar } from "@/components/marketing/hero/hero-trust-bar";
import { HeroVisual } from "@/components/marketing/hero/hero-visual";

export function Hero() {
  return (
    <Section className="relative overflow-hidden">
      <HeroBackground />
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col gap-10">
            <HeroContent />
            <HeroTrustBar />
          </div>
          <HeroVisual />
        </div>

        <div className="mt-16 border-t border-border-subtle pt-10 sm:mt-20 sm:pt-12">
          <HeroStats />
        </div>
      </Container>
    </Section>
  );
}
