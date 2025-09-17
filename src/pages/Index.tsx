import React, { Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import AudienceChooser from "@/components/AudienceChooser";
import ConversionBanner from "@/components/ConversionBanner";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { usePageSEO } from "@/hooks/usePageSEO";
import { generateMarketingMeta } from "@/utils/seo";

// Lazy load non-critical components for better initial load performance
const Testimonials = React.lazy(() => import("@/components/Testimonials"));
const Contact = React.lazy(() => import("@/components/Contact"));



// Loading skeletons for lazy components
const TestimonialsLoading = () => (
  <section className="py-20 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <Skeleton className="h-6 w-32 mx-auto mb-4" />
        <Skeleton className="h-12 w-96 mx-auto mb-6" />
        <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
      </div>
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactLoading = () => (
  <section className="py-20 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <Skeleton className="h-6 w-32 mx-auto mb-4" />
        <Skeleton className="h-12 w-96 mx-auto mb-6" />
        <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
      </div>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="lg:col-span-2">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    </div>
  </section>
);



const Index = () => {
  console.log('Index component loading...');
  
  try {
    console.log('Setting up SEO...');
    usePageSEO(generateMarketingMeta('home'));
    console.log('SEO setup complete');
  } catch (error) {
    console.error('Error in SEO setup:', error);
  }
  
  console.log('Rendering Index component');
  return (
    <div className="min-h-screen dark">
      {/* Conversion banner for immediate attention */}
      {(() => {
        try {
          console.log('Loading ConversionBanner');
          return <ConversionBanner />;
        } catch (error) {
          console.error('Error loading ConversionBanner:', error);
          return null;
        }
      })()}
      
      {/* Critical above-the-fold content loads immediately */}
      {(() => {
        try {
          console.log('Loading Navigation');
          return <Navigation />;
        } catch (error) {
          console.error('Error loading Navigation:', error);
          return null;
        }
      })()}
      
      {(() => {
        try {
          console.log('Loading Hero');
          return <Hero />;
        } catch (error) {
          console.error('Error loading Hero:', error);
          return null;
        }
      })()}
      
      {(() => {
        try {
          console.log('Loading AudienceChooser');
          return <AudienceChooser extraNote={<>We also offer Microsoft Windows & Office, <strong>Linux alternative solutions</strong> for Enterprise, SME, Home User and Seniors</>} />;
        } catch (error) {
          console.error('Error loading AudienceChooser:', error);
          return null;
        }
      })()}
      
      {(() => {
        try {
          console.log('Loading About');
          return <About />;
        } catch (error) {
          console.error('Error loading About:', error);
          return null;
        }
      })()}
      
      {(() => {
        try {
          console.log('Loading Services');
          return <Services />;
        } catch (error) {
          console.error('Error loading Services:', error);
          return null;
        }
      })()}
      
      <Suspense fallback={<TestimonialsLoading />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<ContactLoading />}>
        <Contact />
      </Suspense>
      
      
      {/* Footer is critical for SEO and always loads */}
      <Footer />
    </div>
  );
};

export default Index;