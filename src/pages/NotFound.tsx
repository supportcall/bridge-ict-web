import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { usePageSEO } from "@/hooks/usePageSEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  usePageSEO({
    title: "404 - Page Not Found | SupportCALL",
    description: "The page you’re looking for could not be found.",
    noindex: true
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
        <Link to="/" className="text-primary underline underline-offset-4">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
