/**
 * Accessibility skip link to jump to main content
 * Meets WCAG 2.1 Level A requirement
 */
const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[10000] focus:p-4 focus:bg-primary focus:text-primary-foreground focus:font-medium focus:rounded-br-lg focus:shadow-lg"
    >
      Skip to main content
    </a>
  );
};

export default SkipLink;
