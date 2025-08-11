import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePageSEO } from "@/hooks/usePageSEO";
import { generateServiceSchema } from "@/utils/seo";
import { useState } from "react";

const CustomerSatisfactionSurvey = () => {
  usePageSEO({
    title: "Survey - Customer Satisfaction | SupportCALL",
    description: "Share your SupportCALL experience to help us improve our customer service.",
    keywords: "customer satisfaction survey, SupportCALL feedback",
    structuredData: generateServiceSchema(
      "Customer Satisfaction Survey",
      "Survey to collect customer satisfaction feedback for SupportCALL services."
    ),
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputs = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input[required], textarea[required]"));
    for (const input of inputs) {
      if (input.value.trim() === "") {
        input.focus();
        return;
      }
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen dark">
      <Navigation />

      <section className="pt-20 pb-12 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">Feedback & Insights</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Survey - Customer Satisfaction</h1>
          <p className="text-white/80 max-w-3xl mx-auto">Help us improve by sharing your recent experience with SupportCALL.</p>
        </div>
      </section>

      <main className="py-12 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {!submitted ? (
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Your Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      <Label htmlFor="company">Company name (optional)</Label>
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

                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Survey Questions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Overall customer service experience</Label>
                        <Select name="satisfaction" defaultValue="Very satisfied">
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Very satisfied">Very satisfied</SelectItem>
                            <SelectItem value="Satisfied">Satisfied</SelectItem>
                            <SelectItem value="Neutral">Neutral</SelectItem>
                            <SelectItem value="Dissatisfied">Dissatisfied</SelectItem>
                            <SelectItem value="Very dissatisfied">Very dissatisfied</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Response time</Label>
                        <Select name="response_time" defaultValue="Very quickly">
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Very quickly">Very quickly</SelectItem>
                            <SelectItem value="Quickly">Quickly</SelectItem>
                            <SelectItem value="Average">Average</SelectItem>
                            <SelectItem value="Slowly">Slowly</SelectItem>
                            <SelectItem value="Very slowly">Very slowly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Knowledgeable and helpful</Label>
                        <Select name="knowledgeable" defaultValue="Extremely knowledgeable">
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Extremely knowledgeable">Extremely knowledgeable</SelectItem>
                            <SelectItem value="Somewhat knowledgeable">Somewhat knowledgeable</SelectItem>
                            <SelectItem value="Neutral">Neutral</SelectItem>
                            <SelectItem value="Not knowledgeable">Not knowledgeable</SelectItem>
                            <SelectItem value="Not at all knowledgeable">Not at all knowledgeable</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Issue resolved to your satisfaction?</Label>
                        <Select name="issue_resolution" defaultValue="Yes">
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="Partially">Partially</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Likelihood to recommend (1-3)</Label>
                        <Input type="number" name="recommendation" min={1} max={3} />
                      </div>
                      <div>
                        <Label>Ease of reaching support</Label>
                        <Select name="ease_of_reaching" defaultValue="Very easy">
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Very easy">Very easy</SelectItem>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Neutral">Neutral</SelectItem>
                            <SelectItem value="Difficult">Difficult</SelectItem>
                            <SelectItem value="Very difficult">Very difficult</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Communication clarity</Label>
                        <Select name="communication_clarity" defaultValue="Yes">
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="Somewhat">Somewhat</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Professionalism and courtesy</Label>
                        <Select name="professionalism" defaultValue="Very satisfied">
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Very satisfied">Very satisfied</SelectItem>
                            <SelectItem value="Satisfied">Satisfied</SelectItem>
                            <SelectItem value="Neutral">Neutral</SelectItem>
                            <SelectItem value="Dissatisfied">Dissatisfied</SelectItem>
                            <SelectItem value="Very dissatisfied">Very dissatisfied</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Preferred contact method</Label>
                        <Select name="contact_preference" defaultValue="Email">
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Phone call">Phone call</SelectItem>
                            <SelectItem value="Email">Email</SelectItem>
                            <SelectItem value="Face to Face">Face to Face</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <div>
                    <Label htmlFor="improvement">What could we do to improve your experience?</Label>
                    <Textarea id="improvement" name="improvement" placeholder="Your feedback..." maxLength={200} />
                  </div>

                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>Additional Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="reference">Brief reference</Label>
                        <Textarea id="reference" name="reference" placeholder="Write a brief reference (max 5 sentences)..." maxLength={300} />
                      </div>
                      <div>
                        <Label htmlFor="suggested_companies">Suggested companies for us to connect to</Label>
                        <Textarea id="suggested_companies" name="suggested_companies" placeholder="Names of companies..." maxLength={300} />
                      </div>
                      <div>
                        <Label>Would you recommend our services to others?</Label>
                        <Select name="recommendation_to_others" defaultValue="Not sure">
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Not sure">Not sure</SelectItem>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end">
                    <Button type="submit" variant="premium" size="lg">Submit Survey</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
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

export default CustomerSatisfactionSurvey;
