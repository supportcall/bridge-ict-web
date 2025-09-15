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
import { submitFormWithFallback } from "@/utils/formSubmission";
import { useToast } from "@/hooks/use-toast";
import { validateFormData, sanitizeInput, sanitizeInputRealtime, RateLimiter } from "@/utils/validation";

const CustomerSatisfactionSurvey = () => {
  const { toast } = useToast();
  const [rateLimiter] = useState(() => new RateLimiter(2, 300000)); // 2 attempts per 5 minutes for surveys
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  // Simple human verification (math challenge)
  const [humanA] = useState(() => Math.floor(Math.random() * 9) + 1);
  const [humanB] = useState(() => Math.floor(Math.random() * 9) + 1);
  const [humanAnswer, setHumanAnswer] = useState("");
  const [humanError, setHumanError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});

    // Rate limiting check
    if (!rateLimiter.canAttempt()) {
      const timeUntilReset = Math.ceil(rateLimiter.getTimeUntilReset() / 1000);
      toast({
        title: "Too Many Attempts",
        description: `Please wait ${timeUntilReset} seconds before trying again.`,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const rawData = Object.fromEntries(formData.entries());
    
    // Sanitize all text inputs
    const sanitizedData: Record<string, any> = {};
    Object.entries(rawData).forEach(([key, value]) => {
      if (typeof value === 'string') {
        if (key === 'improvement' || key === 'reference' || key === 'suggested_companies') {
          // Preserve spaces for textarea fields but limit length
          sanitizedData[key] = value.replace(/[<>]/g, "").slice(0, 1000);
        } else {
          sanitizedData[key] = sanitizeInput(value);
        }
      } else {
        sanitizedData[key] = value;
      }
    });

    // Comprehensive validation
    const basicFormData = {
      name: sanitizedData.name as string,
      email: sanitizedData.email as string,
      phone: sanitizedData.contact as string,
      company: sanitizedData.company as string,
      service: 'Survey', // surveys don't have service field
      message: sanitizedData.improvement as string || 'Customer satisfaction survey'
    };

    const validation = validateFormData(basicFormData);
    if (!validation.isValid) {
      // Map phone errors to contact field since that's the actual field name
      const mappedErrors = { ...validation.errors };
      if (mappedErrors.phone) {
        mappedErrors.contact = mappedErrors.phone;
        delete mappedErrors.phone;
      }
      setFormErrors(mappedErrors);
      toast({
        title: "Form Validation Error",
        description: "Please correct the highlighted fields and try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Human verification
    if (parseInt(humanAnswer, 10) !== humanA + humanB) {
      setHumanError("Incorrect answer. Please try again.");
      const hv = form.querySelector<HTMLInputElement>("#human_verification");
      hv?.focus();
      toast({
        title: "Verification failed",
        description: "Please answer the human verification question correctly.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    } else {
      setHumanError("");
    }

    // Prepare CSV data
    const csvData = [{
      'Survey Type': 'Customer Satisfaction',
      'Submission Date': new Date().toLocaleString(),
      'Name': `${sanitizedData.name} ${sanitizedData.surname}`,
      'Email': sanitizedData.email as string,
      'Contact': sanitizedData.contact as string,
      'Company': sanitizedData.company as string || 'Not provided',
      'Website': sanitizedData.website as string || 'Not provided',
      'Location': sanitizedData.location as string,
      'Overall Satisfaction': sanitizedData.satisfaction as string,
      'Response Time': sanitizedData.response_time as string,
      'Knowledgeable': sanitizedData.knowledgeable as string,
      'Issue Resolution': sanitizedData.issue_resolution as string,
      'Recommendation (1-3)': sanitizedData.recommendation as string,
      'Ease of Reaching': sanitizedData.ease_of_reaching as string,
      'Communication Clarity': sanitizedData.communication_clarity as string,
      'Professionalism': sanitizedData.professionalism as string,
      'Contact Preference': sanitizedData.contact_preference as string,
      'Improvement Feedback': sanitizedData.improvement as string || 'None provided',
      'Reference': sanitizedData.reference as string || 'None provided',
      'Suggested Companies': sanitizedData.suggested_companies as string || 'None provided',
      'Recommend to Others': sanitizedData.recommendation_to_others as string
    }];

    // Submit form with enhanced email handling
    const submissionData = {
      formTitle: "Customer Satisfaction Survey",
      userEmail: sanitizedData.email as string,
      formData: sanitizedData,
      recipients: [
        "info@supportcall.co.za",
        "info@supportcall.com.au",
        "feedback@supportcall.co.za",
        "feedback@supportcall.com.au",
        "scmyhelp@gmail.com"
      ],
      csvData
    };

    await submitFormWithFallback(submissionData);
    
    toast({
      title: "Survey Submitted",
      description: "Your feedback has been submitted. Thank you for your time!",
    });
    
    setSubmitted(true);
    setIsSubmitting(false);
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
                       <Input 
                         id="name" 
                         name="name" 
                         required 
                         className={formErrors.name ? "border-destructive" : ""}
                       />
                       {formErrors.name && (
                         <p className="text-sm text-destructive mt-1">{formErrors.name}</p>
                       )}
                     </div>
                     <div>
                       <Label htmlFor="surname">Your surname</Label>
                       <Input id="surname" name="surname" required />
                     </div>
                   </div>
                   <div className="grid md:grid-cols-2 gap-4">
                     <div>
                       <Label htmlFor="email">Your email</Label>
                       <Input 
                         id="email" 
                         name="email" 
                         type="email" 
                         required 
                         className={formErrors.email ? "border-destructive" : ""}
                       />
                       {formErrors.email && (
                         <p className="text-sm text-destructive mt-1">{formErrors.email}</p>
                       )}
                     </div>
                      <div>
                        <Label htmlFor="contact">Direct contact number</Label>
                        <Input 
                          id="contact" 
                          name="contact" 
                          required 
                          placeholder="+27 or +61 phone number"
                          className={formErrors.contact ? "border-destructive" : ""}
                        />
                        {formErrors.contact && (
                          <p className="text-sm text-destructive mt-1">{formErrors.contact}</p>
                        )}
                      </div>
                   </div>
                   <div className="grid md:grid-cols-2 gap-4">
                     <div>
                       <Label htmlFor="company">Company name (optional)</Label>
                       <Input 
                         id="company" 
                         name="company" 
                         className={formErrors.company ? "border-destructive" : ""}
                       />
                       {formErrors.company && (
                         <p className="text-sm text-destructive mt-1">{formErrors.company}</p>
                       )}
                     </div>
                     <div>
                       <Label htmlFor="website">Your website (optional)</Label>
                       <Input id="website" name="website" />
                     </div>
                   </div>
                   <div>
                     <Label htmlFor="location">Where are you from</Label>
                     <Input 
                       id="location" 
                       name="location" 
                       required 
                       className={formErrors.location ? "border-destructive" : ""}
                     />
                     {formErrors.location && (
                       <p className="text-sm text-destructive mt-1">{formErrors.location}</p>
                     )}
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
                    <Textarea id="improvement" name="improvement" placeholder="Type your customer service experience feedback here..." maxLength={200} />
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
                        <p className="text-sm text-muted-foreground mt-1">Refer a client who becomes a long-term customer (min 6 months) and enjoy a 6-month discounted callout rate or a small gift as a thank you.</p>
                        <Textarea id="suggested_companies" name="suggested_companies" placeholder="Name companies that could benefit from our services..." maxLength={300} />
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

                  <div>
                    <Label htmlFor="human_verification">Human verification: What is {humanA} + {humanB}?</Label>
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

                   <div className="flex justify-end">
                     <Button 
                       type="submit" 
                       variant="premium" 
                       size="lg"
                       disabled={isSubmitting}
                     >
                       {isSubmitting ? "Submitting..." : "Submit Survey"}
                     </Button>
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
