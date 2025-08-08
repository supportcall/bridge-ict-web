import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Briefcase, Home as HomeIcon, ShieldCheck, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

const audiences = [
  {
    name: "Enterprise",
    to: "/services/rmm",
    Icon: Building2,
    points: ["Global-scale support", "Security & compliance", "Proactive monitoring"],
  },
  {
    name: "SME",
    to: "/services/wsystem",
    Icon: Briefcase,
    points: ["Cost‑effective packages", "Fast remote help", "Simple onboarding"],
  },
  {
    name: "Home User",
    to: "/remote-support",
    Icon: HomeIcon,
    points: ["On‑demand remote fixes", "Device tune‑ups", "Friendly guidance"],
  },
  {
    name: "Seniors",
    to: "/services/seniors",
    Icon: Headphones,
    points: ["Friendly remote help", "Scam & safety checks", "Device setup & support"],
  },
] as const;

const AudienceChooser: React.FC = () => {
  return (
    <section aria-labelledby="audience-heading" className="bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-6 text-center">
          <h2 id="audience-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Find the right ICT services for you
          </h2>
          <p className="mt-2 text-muted-foreground">
            Choose your path to see tailored information and get help faster.
          </p>
        </header>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(({ name, to, Icon, points }) => (
            <Card key={name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </span>
                  <CardTitle className="text-lg">{name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {points.map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span>{p}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full" asChild>
                  <Link to={to} aria-label={`Explore ${name} solutions`}>
                    View {name} solutions
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          Not sure? <Link to="#contact" onClick={(e) => { e.preventDefault(); const el = document.querySelector('#contact'); el?.scrollIntoView({ behavior: 'smooth' }); }} className="underline underline-offset-4">
            Talk to an expert
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AudienceChooser;
