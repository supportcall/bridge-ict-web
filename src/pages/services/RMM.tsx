import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Monitor, 
  Shield, 
  Bell, 
  BarChart3, 
  Settings, 
  Clock,
  CheckCircle,
  ArrowRight,
  Users,
  Server,
  AlertTriangle,
  Download,
  Calendar
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const RMM = () => {
  const keyFeatures = [
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Proactive Monitoring",
      description: "Our system constantly tracks critical metrics like CPU and memory usage, disk space, and SMART status to ensure your systems are running smoothly. With real-time alerts, potential issues are flagged before they disrupt your business."
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Patch Management",
      description: "Keeping your systems up-to-date with the latest patches is essential for security and performance. TacticalRMM streamlines this process, reducing vulnerabilities and improving system reliability."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Checks",
      description: "We perform continuous security checks to safeguard your data and infrastructure from potential threats, ensuring your environment remains secure."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Backup (Optional as Extra)",
      description: "Optional backup solutions are available to ensure that critical data is regularly backed up and can be quickly restored if needed, adding an extra layer of security for your business."
    }
  ];

  const whyChooseFeatures = [
    "Proactive Issue Resolution: We don't just monitor; we act. With SupportCALL's tacticalRMM, we identify and resolve potential problems before they affect your business operations.",
    "Enhanced Security: Continuous real-time monitoring ensures your data and systems are always secure. We help protect against potential vulnerabilities and cyber threats.",
    "Cost Efficiency: By addressing issues early and automating maintenance tasks, tacticalRMM reduces downtime and costly repairs, ensuring your IT infrastructure runs smoothly.",
    "Custom Alerts: Stay informed with personalized notifications for critical events, so you're always in the loop about your system's health and security.",
    "Peace of Mind: With SupportCALL's expertise, you can rest easy knowing your IT systems are optimized, secure, and always running at their best.",
    "Reduced Need for IT Callouts: By leveraging SupportCALL's tacticalRMM, many routine IT issues can be addressed proactively, reducing the frequency of on-site IT callouts. This not only helps optimize your IT infrastructure but also reduces associated costs and downtime."
  ];

  const benefits = [
    "For Clients: TacticalRMM ensures smooth, uninterrupted operations with enhanced security and system reliability. Proactive monitoring and maintenance reduce the risk of downtime and improve the overall performance of your IT infrastructure.",
    "For MSPs: TacticalRMM offers a streamlined approach to managing multiple client systems with ease. Automated tasks, remote support capabilities, and real-time alerts make it easier to provide superior service while reducing operational costs."
  ];

  const osSupport = [
    { os: "Windows OS", supported: "SUPPORTED", color: "text-green-500" },
    { os: "Linux OS", supported: "Contact us for pricing (once-off per site charge)", color: "text-blue-500" },
    { os: "Mac OS", supported: "Contact us for pricing (once-off per site charge)", color: "text-blue-500" }
  ];

  const pricingTiers = [
    {
      category: "Senior/Pensioner",
      description: "Discounted rate with standard features (including 30min Remote Standard Support)",
      price: "$11",
      priceRange: "$8-$14",
      features: ["30min Remote Standard Support", "Standard monitoring", "Security patching", "Proactive maintenance"]
    },
    {
      category: "Individual",
      description: "Standard features with included remote support",
      price: "$14",
      priceRange: "$8-$17",
      features: ["30min Remote Standard Support", "Standard monitoring", "Security patching", "Proactive maintenance"],
      extras: [
        { name: "Extra Monitoring Points", price: "$5", range: "$3-$8" },
        { name: "Advanced Support per 30min", price: "$19", range: "$3-$28" }
      ]
    },
    {
      category: "SME",
      description: "Standard features with volume discounts available",
      price: "$14",
      priceRange: "$6-$17",
      volumeDiscounts: [
        { devices: "15-24 Devices", price: "$12", discount: "10%" },
        { devices: "25-34 Devices", price: "$11", discount: "20%" },
        { devices: "35+ Devices", price: "$10", discount: "30%" }
      ],
      sitePackages: [
        { devices: "25+ Devices per site", price: "$195", range: "$110-$280" },
        { devices: "50+ Devices per site", price: "$385", range: "$110-$840" }
      ]
    },
    {
      category: "Corporate",
      description: "Enterprise-level features and support",
      configFee: "$167",
      packages: [
        { devices: "50-199 Devices per site", price: "$1,395", range: "$560-$2,230" },
        { devices: "200-999 Devices per site", price: "$5,025", range: "$2,230-$8,370" },
        { devices: "1000+ Devices per site", price: "$8,370+", range: "$8,370+" }
      ]
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
              SupportCALL's tacticalRMM
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Confidence in Your IT Systems
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto mb-8">
              SupportCALL's tacticalRMM offers extensive Remote Monitoring and Management (RMM) services, designed to ensure your IT systems run at peak performance. With our proactive monitoring and management tools, businesses can focus on growth and productivity, while we handle the technical details—maintaining security, reliability, and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="premium" 
                size="lg"
                onClick={() => window.open('https://calendar.google.com/calendar/appointments/AcZssZ080B_PhEBAKSwXoxQoRe5UoUNhjEfq07OIxgo=?gv=true', '_blank')}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book an Appointment
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-white border-white hover:bg-white hover:text-primary"
                onClick={() => window.open('https://www.supportcall.co.za/store/forms/SC-RegForm.pdf', '_blank')}
              >
                <Download className="w-5 h-5 mr-2" />
                Signup Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Current Special */}
      <section className="py-12 bg-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-8 text-center">
              <Badge variant="secondary" className="mb-4">
                CURRENT SPECIAL
              </Badge>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Signup for 6 months and get 2 months free!
              </h3>
              <p className="text-muted-foreground">
                tacticalRMM for up to 10 devices (laptop or PC). Standard monitoring only. 
                Additional services and requests will be billed separately. 
                Not available for senior/pensioner or individuals.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Key Features of SupportCALL's tacticalRMM
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Operating System Support */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Operating System Support
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {osSupport.map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{item.os}</h3>
                  <p className={`text-sm ${item.color}`}>{item.supported}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose SupportCALL's tacticalRMM?
            </h2>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {whyChooseFeatures.map((feature, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-6 h-6 text-primary mr-4 flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proactive and Reactive Support */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Proactive and Reactive Support
            </h2>
            <p className="text-lg text-foreground max-w-4xl mx-auto">
              TacticalRMM offers both proactive and reactive support. Proactively, we monitor and automate system maintenance to avoid issues before they arise. If a problem does occur, our team can quickly react, accessing your systems remotely to diagnose and resolve issues swiftly, minimizing downtime and disruptions.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              The Benefits of SupportCALL's tacticalRMM for MSPs and Clients
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary mr-4 flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{benefit}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              tacticalRMM Pricing
            </h2>
            <p className="text-lg text-foreground max-w-3xl mx-auto mb-8">
              RMM, Patching and Security with 30min Remote Support. Pricing below is per device per month (USD).
            </p>
            <Badge variant="secondary" className="mb-4">
              MSP partners: Contact your account manager for your pricing
            </Badge>
          </div>

          <div className="grid gap-8">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold text-primary">{tier.category}</CardTitle>
                      <p className="text-muted-foreground mt-2">{tier.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{tier.price}</div>
                      <div className="text-sm text-muted-foreground">Range: {tier.priceRange}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {tier.category === "Corporate" && tier.configFee && (
                    <div className="mb-6 p-4 bg-primary/10 rounded-lg">
                      <p className="font-semibold">One-time Configuration Fee: {tier.configFee}</p>
                    </div>
                  )}
                  
                  {tier.features && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Standard Features:</h4>
                      <ul className="space-y-2">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {tier.extras && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Optional Extras:</h4>
                      <div className="space-y-2">
                        {tier.extras.map((extra, extraIndex) => (
                          <div key={extraIndex} className="flex justify-between items-center text-sm">
                            <span>{extra.name}</span>
                            <span className="font-semibold">{extra.price} ({extra.range})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tier.volumeDiscounts && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Volume Discounts:</h4>
                      <div className="space-y-2">
                        {tier.volumeDiscounts.map((discount, discountIndex) => (
                          <div key={discountIndex} className="flex justify-between items-center text-sm">
                            <span>{discount.devices}</span>
                            <span className="font-semibold">{discount.price} (-{discount.discount})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tier.sitePackages && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Site Packages:</h4>
                      <div className="space-y-2">
                        {tier.sitePackages.map((pkg, pkgIndex) => (
                          <div key={pkgIndex} className="flex justify-between items-center text-sm">
                            <span>{pkg.devices}</span>
                            <span className="font-semibold">{pkg.price} ({pkg.range})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tier.packages && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Enterprise Packages:</h4>
                      <div className="space-y-2">
                        {tier.packages.map((pkg, pkgIndex) => (
                          <div key={pkgIndex} className="flex justify-between items-center text-sm">
                            <span>{pkg.devices}</span>
                            <span className="font-semibold">{pkg.price} ({pkg.range})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <p className="text-blue-800 dark:text-blue-200 font-semibold">
                  We want to partner with you, our MSP, to win more business. If price is a barrier with a potential client, let's talk. We're committed to finding a win-win solution that works for everyone. A deal rather than no deal.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Struggling to Manage Your IT Systems?
          </h2>
          <div className="space-y-2 mb-6">
            <h3 className="text-2xl font-bold text-white">Too busy with the normal stuff?</h3>
            <h3 className="text-2xl font-bold text-white">No time to manage hundreds of little things?</h3>
            <h3 className="text-2xl font-bold text-white">Let us help you with it.</h3>
          </div>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Worried about system downtime or security risks? SupportCALL's tacticalRMM simplifies IT management, ensuring your business runs smoothly and securely. Empowering businesses with proactive support and peace of mind. Call today!
          </p>
          <div className="mb-8">
            <h4 className="text-2xl font-bold text-white mb-4">
              Empowering Businesses with Proactive IT Management and Security!
            </h4>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="premium" 
              size="lg"
              onClick={() => window.open('https://calendar.google.com/calendar/appointments/AcZssZ080B_PhEBAKSwXoxQoRe5UoUNhjEfq07OIxgo=?gv=true', '_blank')}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book an Appointment
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-white border-white hover:bg-white hover:text-primary"
              onClick={() => window.open('https://www.supportcall.co.za/store/forms/SC-RegForm.pdf', '_blank')}
            >
              <Download className="w-5 h-5 mr-2" />
              Signup Now
            </Button>
          </div>

          <div className="mt-12">
            <p className="text-white/70 text-sm">
              SupportCALL's tacticalRMM is the ideal solution for businesses seeking to maintain peak system performance while helping to safeguard their data and reducing the risk of costly disruptions.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RMM;