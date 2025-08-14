import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { usePageSEO } from "@/hooks/usePageSEO";
import { generateServiceSchema } from "@/utils/seo";
import { useState } from "react";

const ClientServiceInterestPricing = () => {
  usePageSEO({
    title: "Survey - Client Service Interest & Pricing | SupportCALL",
    description: "Tell us which services you need and your price expectations to help us serve you better.",
    keywords: "pricing survey, services interest, SupportCALL",
    structuredData: generateServiceSchema(
      "Client Service Interest and Pricing Survey",
      "Survey to collect service interest and price point feedback for SupportCALL."
    ),
  });

  const [submitted, setSubmitted] = useState(false);
  // Simple human verification (math challenge)
  const [humanA] = useState(() => Math.floor(Math.random() * 9) + 1);
  const [humanB] = useState(() => Math.floor(Math.random() * 9) + 1);
  const [humanAnswer, setHumanAnswer] = useState("");
  const [humanError, setHumanError] = useState("");

  const serviceGroups: { title: string; items: string[] }[] = [
    {
      title: "IT and Software Development Services",
      items: [
        "APP Development",
        "Mobile Application Development",
        "Software Development",
        "Web Development",
        "IT Consulting Services",
        "Unified Communications",
      ],
    },
    {
      title: "Cloud and Data Services",
      items: [
        "CCTV Cloud Storage",
        "Cloud Services",
        "Data Backup Services",
        "Data Center Services",
        "SaaS Services",
        "Big Data",
      ],
    },
    {
      title: "Networking and Connectivity Services",
      items: [
        "Ethernet Cabling Callout",
        "Fibre Cabling Callouts",
        "ISP Services",
        "Long Distance Data Link",
        "WiFi Wireless",
        "Wireless Indoors",
        "Wireless Outdoors",
      ],
    },
    {
      title: "Cybersecurity and Business Continuity",
      items: [
        "Cybersecurity Services",
        "Business Continuity and Disaster Recovery",
        "MSP Managed IT Services",
      ],
    },
    {
      title: "Consultancy and Callout Services",
      items: ["Consultant Callout"],
    },
    {
      title: "Training and User Support",
      items: ["User Training", "1on1 Relationship"],
    },
    {
      title: "Artificial Intelligence and Emerging Technologies",
      items: ["Artificial Intelligence (AI)"],
    },
    {
      title: "Power and Energy Solutions",
      items: ["Solar Power", "Solar Power Rental"],
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputs = Array.from(form.querySelectorAll<HTMLInputElement>("input[required]"));
    for (const input of inputs) {
      if (input.value.trim() === "") {
        input.focus();
        return;
      }
    }
    if (parseInt(humanAnswer, 10) !== humanA + humanB) {
      setHumanError("Incorrect answer. Please try again.");
      const hv = form.querySelector<HTMLInputElement>("#human_verification");
      hv?.focus();
      return;
    } else {
      setHumanError("");
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen dark">
      <Navigation />

      <section className="pt-20 pb-12 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">Feedback & Insights</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Survey - Client Service Interest and Pricing</h1>
          <p className="text-white/80 max-w-3xl mx-auto">Help us align our services and pricing with your needs.</p>
        </div>
      </section>

      <main className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Your Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Your name</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div>
                      <Label htmlFor="surname">Your surname</Label>
                      <Input id="surname" name="surname" required />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Your email</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="contact">Direct contact number</Label>
                      <Input id="contact" name="contact" required />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company Name (optional)</Label>
                      <Input id="company" name="company" />
                    </div>
                    <div>
                      <Label htmlFor="website">Your website (optional)</Label>
                      <Input id="website" name="website" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Where are you from</Label>
                    <Input id="location" name="location" required />
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="anonymous" name="anonymous" type="checkbox" className="h-4 w-4" />
                    <Label htmlFor="anonymous">Remain Anonymous (personal information will not be shared with 3rd-parties)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="contact_me" name="contact_me" type="checkbox" className="h-4 w-4" />
                    <Label htmlFor="contact_me">I would like SupportCALL to contact me</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Local Technician Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="local_technician">Do you need a local technician at a remote site?</Label>
                  <Select name="local_technician" defaultValue="No">
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Services Interest and Ratings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {serviceGroups.map((group, idx) => (
                    <div key={group.title} className={idx > 0 ? "pt-6 mt-6 border-t border-border" : undefined}>
                      <h3 className="font-semibold mb-3">{group.title}</h3>
                      <ul className="space-y-2">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-center justify-between gap-3">
                            <label className="flex items-center gap-2">
                              <input type="checkbox" name={`services[${item}]`} className="h-4 w-4" />
                              <span>{item}</span>
                            </label>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Rate (1-3)</span>
                              <Input type="number" name={`ratings[${item}]`} min={1} max={3} className="w-20" />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="services[Other]" className="h-4 w-4" />
                      <span>Other</span>
                    </label>
                    <div className="mt-2 grid md:grid-cols-[1fr_100px] gap-3">
                      <Input name="other_service" placeholder="Other (please specify)" />
                      <Input type="number" name="ratings[Other]" min={1} max={3} placeholder="1-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Price Point Survey</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Technician Callout - Too expensive</span>
                      <Input type="number" name="price_tech_expensive" min={0} step={5} placeholder="R" />
                    </li>
                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Technician Callout - Too cheap</span>
                      <Input type="number" name="price_tech_cheap" min={0} step={5} placeholder="R" />
                    </li>
                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Technician Callout - Could Justify/High Side</span>
                      <Input type="number" name="price_tech_justify" min={0} step={5} placeholder="R" />
                    </li>
                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Technician Callout - Cheap/Good Value</span>
                      <Input type="number" name="price_tech_good_value" min={0} step={5} placeholder="R" />
                    </li>
                    <Separator className="my-4" />

                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Engineer Callout - Too expensive</span>
                      <Input type="number" name="price_engineer_expensive" min={0} step={5} placeholder="R" />
                    </li>
                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Engineer Callout - Too cheap</span>
                      <Input type="number" name="price_engineer_cheap" min={0} step={5} placeholder="R" />
                    </li>
                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Engineer Callout - Could Justify/High Side</span>
                      <Input type="number" name="price_engineer_justify" min={0} step={5} placeholder="R" />
                    </li>
                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Engineer Callout - Cheap/Good Value</span>
                      <Input type="number" name="price_engineer_good_value" min={0} step={5} placeholder="R" />
                    </li>
                    <Separator className="my-4" />

                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Ethernet Cabling Technician Callout - Too expensive</span>
                      <Input type="number" name="price_ethernet_expensive" min={0} step={5} placeholder="R" />
                    </li>
                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Ethernet Cabling Technician Callout - Too cheap</span>
                      <Input type="number" name="price_ethernet_cheap" min={0} step={5} placeholder="R" />
                    </li>
                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Ethernet Cabling Technician Callout - Could Justify/High Side</span>
                      <Input type="number" name="price_ethernet_justify" min={0} step={5} placeholder="R" />
                    </li>
                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Ethernet Cabling Technician Callout - Cheap/Good Value</span>
                      <Input type="number" name="price_ethernet_good_value" min={0} step={5} placeholder="R" />
                    </li>
                    <Separator className="my-4" />

                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Wireless Technician Callout - Too expensive</span>
                      <Input type="number" name="price_wireless_expensive" min={0} step={5} placeholder="R" />
                    </li>
                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Wireless Technician Callout - Too cheap</span>
                      <Input type="number" name="price_wireless_cheap" min={0} step={5} placeholder="R" />
                    </li>
                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Wireless Technician Callout - Could Justify/High Side</span>
                      <Input type="number" name="price_wireless_justify" min={0} step={5} placeholder="R" />
                    </li>
                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Wireless Technician Callout - Cheap/Good Value</span>
                      <Input type="number" name="price_wireless_good_value" min={0} step={5} placeholder="R" />
                    </li>
                    <Separator className="my-4" />

                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Consultant Callout - Too expensive</span>
                      <Input type="number" name="price_consultant_expensive" min={0} step={5} placeholder="R" />
                    </li>
                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Consultant Callout - Too cheap</span>
                      <Input type="number" name="price_consultant_cheap" min={0} step={5} placeholder="R" />
                    </li>
                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Consultant Callout - Could Justify/High Side</span>
                      <Input type="number" name="price_consultant_justify" min={0} step={5} placeholder="R" />
                    </li>
                    <li className="grid md:grid-cols-2 gap-3 items-center">
                      <span>ICT Consultant Callout - Cheap/Good Value</span>
                      <Input type="number" name="price_consultant_good_value" min={0} step={5} placeholder="R" />
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div>
                    <Label htmlFor="human_verification" className="text-foreground">Human verification: What is {humanA} + {humanB}?</Label>
                    <Input
                      id="human_verification"
                      name="human_verification"
                      type="number"
                      inputMode="numeric"
                      required
                      value={humanAnswer}
                      onChange={(e) => {
                        setHumanAnswer(e.target.value);
                        if (humanError) setHumanError("");
                      }}
                    />
                    {humanError && <p className="text-destructive text-sm mt-1">{humanError}</p>}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" variant="premium" size="lg">Submit Survey</Button>
              </div>
            </form>
          ) : (
            <Card className="p-8 text-center">
              <h2 className="text-2xl font-semibold mb-2">Thank you!</h2>
              <p className="text-muted-foreground">Your responses have been captured. We appreciate your time.</p>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClientServiceInterestPricing;
