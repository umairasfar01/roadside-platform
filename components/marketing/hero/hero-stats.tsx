import { Caption, H3 } from "@/components/patterns/typography";

const STATS = [
  { value: "12 min", label: "Average response time" },
  { value: "4.9/5", label: "Average rating" },
  { value: "24/7", label: "Nationwide availability" },
] as const;

export function HeroStats() {
  return (
    <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {STATS.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse gap-1">
          <dt>
            <Caption as="span">{stat.label}</Caption>
          </dt>
          <dd>
            <H3 as="span" className="block">
              {stat.value}
            </H3>
          </dd>
        </div>
      ))}
    </dl>
  );
}
