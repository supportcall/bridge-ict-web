import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import AnimatedWorldMap from "@/components/AnimatedWorldMap";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Acknowledgement from "@/components/Acknowledgement";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen dark">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Global Presence
            </h2>
            <p className="text-lg text-muted-foreground">
              Serving clients across Africa and Oceania
            </p>
          </div>
          <AnimatedWorldMap />
        </div>
      </section>
      <Testimonials />
      <Contact />
      <Acknowledgement />
      <Footer />
    </div>
  );
};

export default Index;
