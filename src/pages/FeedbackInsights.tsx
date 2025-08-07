import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Star, 
  TrendingUp, 
  Users,
  ExternalLink,
  ClipboardCheck
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const FeedbackInsights = () => {
  const surveys = [
    {
      title: "Customer Satisfaction Survey",
      description: "Help us understand your experience with our services and identify areas for improvement",
      icon: <Star className="w-6 h-6" />,
      url: "https://www.supportcall.co.za/store/xsurvey-customer-satisfaction.html",
      type: "Satisfaction"
    },
    {
      title: "Client Service Interest & Pricing Feedback",
      description: "Share your thoughts on our service offerings and pricing structure to help us better serve you",
      icon: <TrendingUp className="w-6 h-6" />,
      url: "https://supportcall.co.za/store/xsurvey-client_interest_&_pricing.html",
      type: "Pricing"
    }
  ];

  const insights = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Client-Centric Approach",
      description: "Your feedback directly influences our service improvements and strategic decisions"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Continuous Improvement",
      description: "We use your insights to enhance our processes and deliver better outcomes"
    },
    {
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "Regular feedback helps us maintain our high standards and identify new opportunities"
    }
  ];

  return (
    <div className="min-h-screen dark">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Your Voice Matters
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Feedback & Insights
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Help us serve you better by sharing your thoughts and experiences. 
              Your feedback shapes our services and drives continuous improvement.
            </p>
          </div>
        </div>
      </section>

      {/* Surveys Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Share Your Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Take a moment to complete our surveys and help us understand how we can better serve your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {surveys.map((survey, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <div className="text-primary">
                        {survey.icon}
                      </div>
                    </div>
                    <Badge variant="outline">{survey.type}</Badge>
                  </div>
                  <CardTitle className="text-xl">{survey.title}</CardTitle>
                  <p className="text-muted-foreground">{survey.description}</p>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full" 
                    onClick={() => window.open(survey.url, '_blank')}
                  >
                    Take Survey
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Your Feedback Matters */}
      <section className="py-20 bg-card border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Your Feedback Matters
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Every piece of feedback contributes to our mission of delivering exceptional IT services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {insights.map((insight, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <div className="text-primary">
                    {insight.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{insight.title}</h3>
                <p className="text-muted-foreground">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for Feedback */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Have Additional Feedback?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            We're always open to hearing from you. Reach out directly if you have specific suggestions or concerns.
          </p>
          <Button variant="premium" size="lg" onClick={() => window.location.href = '#contact'}>
            Contact Us Directly
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeedbackInsights;