import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Locations from "@/components/Locations";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen dark">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Locations />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
