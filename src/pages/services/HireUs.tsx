import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, 
  DollarSign,
  AlertCircle,
  Calendar,
  FileText,
  Shield,
  Users,
  CheckCircle
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

const HireUs = () => {
  const [currency, setCurrency] = useState("ZAR");

  const exchangeRates = {
    ZAR: 1,
    USD: 0.055,
    AUD: 0.083
  };

  const formatPrice = (zarPrice: number) => {
    const rate = exchangeRates[currency as keyof typeof exchangeRates];
    const convertedPrice = zarPrice * rate;
    const symbol = currency === "USD" ? "$" : currency === "AUD" ? "A$" : "R";
    return `${symbol}${convertedPrice.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen dark">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Consulting & Rates
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Rate and Billing Information
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Professional IT consulting and support services with transparent pricing
            </p>
          </div>
        </div>
      </section>

      {/* Currency Selector and Disclaimer */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <label htmlFor="currency" className="text-sm font-medium text-foreground">
                Currency:
              </label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ZAR">ZAR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="AUD">AUD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4" />
              <span>All pricing serves as a guide. Please confirm rates when booking.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Rate and Billing Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image placeholder */}
            <div className="flex items-center justify-center">
              <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                <Users className="w-24 h-24 text-muted-foreground" />
              </div>
            </div>

            {/* Rate Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Rate and Billing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Consulting with SupportCALL starts at <strong>{formatPrice(550)}</strong> per hour, billed in 30-minute increments, with a 1-hour minimum purchase required.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Callouts range between <strong>{formatPrice(400)}</strong> to <strong>{formatPrice(1500)}</strong> per hour, billed in 30-minute increments, with a 1-hour minimum purchase required.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Ask us regarding our rates for retirement homes and pensioners. (subject to verification)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Rates vary by the complexity of the project or job.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Estimates can be given upfront if a clearly defined scope of work is provided.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>A 1-hour appointment may be required to discuss larger/more complex projects.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Any work performed outside of normal business hours or on holidays will be billed at a higher rate.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>If you would like to request a consultation with David Maree directly, the rate will be higher.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>If your consulting project involves some of the following products, the hourly rate will increase due to the advanced nature of the work involved. The list includes but is not limited to:
                        <ul className="ml-4 mt-2 space-y-1">
                          <li>• XCP-ng</li>
                          <li>• HAProxy</li>
                          <li>• TrueNAS</li>
                        </ul>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Hours can be pre-purchased upon request or when required by a project.</span>
                    </li>
                    <li className="flex items-start gap-2 ml-4">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>An account is required for pre-purchase hours. To set up your account we will request billing information, then an invoice will be generated and sent for the estimated hours we discussed and that time will be credited to your account upon receipt of payment.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>When you purchase a block of hours, those hours are credited to your account for use during our regularly scheduled times.</span>
                    </li>
                    <li className="flex items-start gap-2 ml-4">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Invoices are due immediately. We look forward to starting work once payment is confirmed.</span>
                    </li>
                    <li className="flex items-start gap-2 ml-4">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Unused hours expire 1 year from the date of purchase</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    What hours are you open for consulting?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Our normal service hours are Monday through Friday 09H00 until 16H00.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    What tools do you use to coordinate meetings?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Teams and Skype are used to communicate during meetings.</span>
                    </li>
                    <li className="flex items-start gap-2 ml-4">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Webcams are optional and if a mic is not available on your computer, you may use a phone to call into the meeting. You'll receive this information after your appointment is confirmed by a technician.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>If any remote configuration is required, we will have you connect us to your computer via Screenconnect at the beginning of your appointment.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>We prefer not to use other meeting clients or remote connection software.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    We also have a ticket system
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">A ticket system login is created for registered clients to allow these clients to create callout requests in this way.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    What if I want to send you documentation or screenshots before our appointment?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>After we respond to your initial request with a booking link, you may send us whatever information you think will help during your appointment if needed.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Any information sent prior to an appointment will only be reviewed at the technician's discretion. We are not required to review any documentation prior to a meeting as that is considered billable time.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>DO NOT send any passwords or sensitive information via email or this contact form. The technician will either request that information during your meeting or coordinate a secure way to send the information otherwise.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Warranty Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Due to the nature of the work that we perform, there is no warranty on hourly work.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Each hour that we work is billable regardless of the outcome of said work.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>While we will make recommendations on the level of effort required to implement a solution or fix an issue, it is up to you to let us know if there is a cap on the number of hours we spend per engagement.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Appointment and Signup Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button variant="premium" size="lg" className="flex-1">
                  Book an appointment
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  Signup now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HireUs;