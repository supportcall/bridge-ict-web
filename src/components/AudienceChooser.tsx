import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Building2, Briefcase, Home as HomeIcon, ShieldCheck, Headphones } from "lucide-react";


const audiences = [
  {
    name: "Enterprise",
    to: "/services/rmm",
    Icon: Building2,
    categories: [
      {
        title: "TacticalRMM (Remote Monitoring & Managment)",
        items: [
          "Remote system monitoring",
          "Automated patch management",
          "Asset inventory",
          "Scripted task automation",
          "Real-time alerting",
          "Issue resolution immediately or ASAP",
        ],
      },
      {
        title: "W.system (Unified XDR and SIEM)",
        items: [
          "Intrusion detection alerts",
          "Log data analysis",
          "Compliance reporting tools",
          "Threat intelligence feeds",
          "File integrity monitoring",
        ],
      },
      {
        title: "ICT Technical Support",
        items: [
          "Consoltation",
          "Hardware diagnostics repair",
          "Software installation updates",
          "Virus malware removal",
          "Network troubleshooting support",
          "Data backup recovery (optional)",
          "ICT trouble shooting",
        ],
      },
      {
        title: "Wireless",
        items: [
          "Wi-Fi network design",
          "Wi-Fi network setup",
          "Wi-Fi Point to Point",
          "Wi-Fi Mesh",
          "Signal coverage optimization",
          "Wireless device integration",
          "Guest network management",
        ],
      },
      {
        title: "Cabling",
        items: [
          "Structured cable installation",
          "Cable installation",
          "Cable testing",
          "Rack cabinet management",
          "Data cabling",
        ],
      },
    ],
  },
  {
    name: "SME",
    to: "/services/wsystem",
    Icon: Briefcase,
    categories: [
      {
        title: "TacticalRMM (Remote Monitoring & Managment)",
        items: [
          "Remote system monitoring",
          "Automated patch management",
          "Asset inventory",
          "Scripted task automation",
          "Real-time alerting",
          "Issue Resolution ASAP",
        ],
      },
      {
        title: "W.system (Unified XDR and SIEM)",
        items: [
          "Intrusion detection alerts",
          "Log data analysis",
          "Compliance reporting tools",
          "Threat intelligence feeds",
          "File integrity monitoring",
        ],
      },
      {
        title: "ICT Technical Support",
        items: [
          "Consoltation",
          "Hardware diagnostics repair",
          "Software installation updates",
          "Virus malware removal",
          "Network troubleshooting support",
          "Data backup recovery (optional)",
          "ICT trouble shooting",
        ],
      },
      {
        title: "Wireless",
        items: [
          "Wi-Fi network design",
          "Wi-Fi network setup",
          "Wi-Fi Point to Point",
          "Wi-Fi Mesh",
          "Signal coverage optimization",
          "Wireless device integration",
          "Guest network management",
        ],
      },
      {
        title: "Cabling",
        items: [
          "Structured cable installation",
          "Cable installation",
          "Cable testing",
          "Rack cabinet management",
          "Data cabling",
        ],
      },
    ],
  },
  {
    name: "Home User",
    to: "/remote-support",
    Icon: HomeIcon,
    categories: [
      {
        title: "TacticalRMM (Remote Monitoring & Managment)",
        items: [
          "Remote system monitoring",
          "Automated patch management",
          "Scripted task automation",
          "Real-time alerting",
          "Issue Resolution ASAP (Client Availability)",
        ],
      },
      {
        title: "W.system (Unified XDR and SIEM)",
        items: [
          "Intrusion detection alerts",
          "Log data analysis",
          "Compliance reporting tools",
          "Threat intelligence feeds",
          "File integrity monitoring",
        ],
      },
      {
        title: "ICT Technical Support",
        items: [
          "Consoltation",
          "Hardware diagnostics repair",
          "Software installation updates",
          "Virus malware removal",
          "Network troubleshooting support",
          "Data backup recovery (optional)",
          "ICT trouble shooting",
        ],
      },
      {
        title: "Wireless",
        items: [
          "Wi-Fi network design",
          "Wi-Fi network setup",
          "Wi-Fi Point to Point",
          "Wi-Fi Mesh",
          "Signal coverage optimization",
          "Wireless device integration",
          "Guest network management",
        ],
      },
      {
        title: "Cabling",
        items: [
          "Cable installation",
          "Cable testing",
          "Data cabling",
        ],
      },
    ],
  },
  {
    name: "Seniors",
    to: "/services/seniors",
    Icon: Headphones,
    categories: [
      {
        title: "TacticalRMM (Remote Monitoring & Managment)",
        items: [
          "Remote system monitoring",
          "Automated patch management",
          
          "Scripted task automation",
          "Real-time alerting",
          "Issue Resolution ASAP (Client Availability)",
        ],
      },
      {
        title: "ICT Technical Support",
        items: [
          "Hardware diagnostics",
          "Software installation updates",
          "Virus malware protection",
          "Virus malware removal",
          "Scammer analises and guidance",
          "Data backup recovery (optional)",
          "ICT trouble shooting",
        ],
      },
      {
        title: "Wireless",
        items: [
          "Wi-Fi consoltation",
          "Wi-Fi network connection assistance",
          "Wireless device integration",
        ],
      },
    ],
  },
] as const;

interface AudienceChooserProps { extraNote?: React.ReactNode; }
const AudienceChooser: React.FC<AudienceChooserProps> = ({ extraNote }) => {
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
          {audiences.map(({ name, Icon, categories }) => (
            <Card key={name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </span>
                  <CardTitle className="text-lg">{name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p><em>All ICT services are available, but primary focus services in this sector are:</em></p>
                <details className="group">
                  <summary className="cursor-pointer text-primary underline underline-offset-4">
                    View focus services
                  </summary>
                  <div className="mt-3 space-y-4">
                    {categories.map((cat) => (
                      <article key={cat.title}>
                        <h3 className="font-medium text-foreground">{cat.title}</h3>
                        <ul className="mt-1 space-y-1">
                          {cat.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            {item === "Resolution ASAP" ? (
                              <span className="inline-block w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            ) : (
                              <ShieldCheck className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                            )}
                            <span>{item}</span>
                          </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </details>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          Not sure? <a href="#contact" onClick={(e) => { e.preventDefault(); const el = document.querySelector('#contact'); el?.scrollIntoView({ behavior: 'smooth' }); }} className="underline underline-offset-4">
            Talk to an expert
          </a>
          {extraNote && <p className="mt-1">{extraNote}</p>}
        </div>
      </div>
    </section>
  );
};

export default AudienceChooser;
