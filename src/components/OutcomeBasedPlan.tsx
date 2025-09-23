import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, CheckCircle, Calculator, Clock, DollarSign } from "lucide-react";
import { useCurrencyPricing } from "@/components/CurrencySelector";
import CurrencySelector from "@/components/CurrencySelector";
import { openBooking } from "@/utils/booking";

const OutcomeBasedPlan = () => {
  const { currency, setCurrency, formatPrice } = useCurrencyPricing();

  const planFeatures = [
    "Fixed price quotes for desired outcomes",
    "No hourly billing surprises",
    "Clear project deliverables",
    "Transparent pricing upfront",
    "Flexible payment options",
    "3-month minimum commitment"
  ];

  const exampleOutcomes = [
    {
      outcome: "Complete network security audit and implementation",
      description: "Full security assessment with remediation plan"
    },
    {
      outcome: "Cloud migration for 50-user organization",
      description: "Complete migration with zero downtime guarantee"
    },
    {
      outcome: "Automated backup system implementation",
      description: "Fully configured disaster recovery solution"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Target className="w-4 h-4 mr-2" />
            Outcome-Based Solutions Plan
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Know Your IT Project Cost Upfront
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
            Stop worrying about hourly rates and surprise costs. Tell us what you want achieved, 
            and we'll provide a <strong className="text-primary">fixed price quote</strong> for your desired outcome.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
            Our aim is a worry-free outcome-focused solution.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Monthly subscription is required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Pricing Card */}
          <Card className="border-primary/20 bg-card shadow-elegant">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Outcome-Based Solutions Plan</CardTitle>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="text-3xl font-bold text-primary">
                    {formatPrice(10)}<span className="text-lg text-muted-foreground">/month</span>
                  </p>
                </div>
                <CurrencySelector 
                  selectedCurrency={currency}
                  onCurrencyChange={setCurrency}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Minimum 3 months • Pay monthly or the minimum upfront
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {planFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="bg-card">
            <CardHeader>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="text-2xl text-center">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Subscribe to the Plan</h4>
                    <p className="text-sm text-muted-foreground">
                      Sign up for our outcome-based subscription starting at {formatPrice(10)}/month
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Tell Us Your Desired Outcome</h4>
                    <p className="text-sm text-muted-foreground">
                      Describe exactly what you want achieved, not how you want it done
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Get Fixed Price Quote</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive a guaranteed fixed price regardless of time or complications
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">We Deliver Results</h4>
                    <p className="text-sm text-muted-foreground">
                      We handle everything to achieve your desired outcome within the quoted price
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Example Outcomes */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-8">Example Outcome-Based Projects</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {exampleOutcomes.map((example, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Target className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        {example.outcome}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {example.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Options */}
        <Card className="border-accent/20 bg-accent/5 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Clock className="w-6 h-6 text-accent" />
              <h4 className="text-xl font-semibold text-foreground">Flexible Payment Options</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div className="bg-card p-4 rounded-lg">
                <h5 className="font-semibold text-foreground mb-2">Monthly Payments</h5>
                <p className="text-sm text-muted-foreground">
                  Pay {formatPrice(10)} per month for minimum 3 months commitment
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h5 className="font-semibold text-foreground mb-2">Upfront Payment</h5>
                <p className="text-sm text-muted-foreground">
                  Pay {formatPrice(30)} upfront for 3 months and save on transaction fees
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Ready for Predictable IT Project Costs?
          </h3>
          <p className="text-muted-foreground mb-8">
            Start with our Outcome-Based Solutions Plan and never worry about hourly billing again
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="premium" 
              size="lg"
              onClick={() => openBooking()}
              className="animate-pulse hover:animate-none"
            >
              Book FREE Consultation
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Learn More About Pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutcomeBasedPlan;