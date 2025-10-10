import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingScrollToTop from "@/components/FloatingScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RMM from "./pages/services/RMM";
import WSystem from "./pages/services/WSystem";
import Seniors from "./pages/services/Seniors";
import HireUs from "./pages/services/HireUs";
import FeedbackInsights from "./pages/FeedbackInsights";
import PointOfPresence from "./pages/PointOfPresence";
import RemoteSupport from "./pages/RemoteSupport";
import Links from "./pages/Links";
import CustomerSatisfactionSurvey from "./pages/surveys/CustomerSatisfactionSurvey";
import ClientServiceInterestPricing from "./pages/surveys/ClientServiceInterestPricing";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <FloatingScrollToTop />
          <GoogleAnalytics measurementId="G-GNYHGV5NNM" />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services/rmm" element={<RMM />} />
            <Route path="/services/wsystem" element={<WSystem />} />
            <Route path="/services/seniors" element={<Seniors />} />
            <Route path="/services/hire-us" element={<HireUs />} />
            <Route path="/feedback-insights" element={<FeedbackInsights />} />
            <Route path="/point-of-presence" element={<PointOfPresence />} />
            <Route path="/remote-support" element={<RemoteSupport />} />
            <Route path="/links" element={<Links />} />
            <Route path="/surveys/customer-satisfaction" element={<CustomerSatisfactionSurvey />} />
            <Route path="/surveys/client-service-interest-pricing" element={<ClientServiceInterestPricing />} />
            <Route path="/IndustryLeadersChooseSupportCALL" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);
};

export default App;
