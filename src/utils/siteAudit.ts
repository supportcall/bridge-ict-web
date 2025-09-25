// SYSTEMATIC SITE AUDIT & FIXES
// Clean baseline approach - minimal fixes only

interface AuditResult {
  issue: string;
  severity: 'critical' | 'major' | 'minor';
  fix: string;
  file?: string;
  line?: number;
}

interface AuditReport {
  totalIssues: number;
  criticalIssues: AuditResult[];
  majorIssues: AuditResult[];
  minorIssues: AuditResult[];
  fixesApplied: string[];
  status: 'CLEAN' | 'NEEDS_ATTENTION' | 'CRITICAL';
}

class SiteAuditor {
  private results: AuditResult[] = [];
  private fixes: string[] = [];

  // 1. AUDIT: Self-contained check
  auditSelfContained(): void {
    // Check external favicon
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon?.getAttribute('href')?.startsWith('http')) {
      this.results.push({
        issue: 'External favicon dependency',
        severity: 'major',
        fix: 'Replace with local favicon',
        file: 'index.html',
        line: 9
      });
    }

    // Check external resources (except approved analytics)
    const approvedDomains = ['googletagmanager.com', 'google-analytics.com'];
    const externalResources = document.querySelectorAll('img[src^="http"], link[href^="http"], script[src^="http"]');
    
    externalResources.forEach(resource => {
      const src = resource.getAttribute('src') || resource.getAttribute('href') || '';
      const isApproved = approvedDomains.some(domain => src.includes(domain));
      
      if (!isApproved && src.startsWith('http')) {
        this.results.push({
          issue: `External resource: ${src}`,
          severity: 'major',
          fix: 'Host locally or remove dependency'
        });
      }
    });
  }

  // 2. AUDIT: H1 duplication check
  auditH1Tags(): void {
    const h1Tags = document.querySelectorAll('h1');
    if (h1Tags.length !== 1) {
      this.results.push({
        issue: `Found ${h1Tags.length} H1 tags, should be exactly 1`,
        severity: 'critical',
        fix: 'Ensure only one H1 per page for SEO'
      });
    }
  }

  // 3. AUDIT: Marketing popups
  auditMarketingPopups(): void {
    const potentialPopups = document.querySelectorAll(
      '[class*="popup"], [class*="modal"], [id*="popup"], [id*="modal"]'
    );
    
    potentialPopups.forEach(element => {
      const text = element.textContent?.toLowerCase() || '';
      const style = window.getComputedStyle(element);
      
      if ((text.includes('newsletter') || text.includes('discount') || text.includes('subscribe')) &&
          (style.position === 'fixed' || style.position === 'absolute')) {
        this.results.push({
          issue: 'Marketing popup detected',
          severity: 'critical',
          fix: 'Remove intrusive marketing popup'
        });
      }
    });
  }

  // 4. AUDIT: Cross-browser compatibility
  auditCrossBrowserCompatibility(): void {
    // Check for missing CSS fallbacks
    const requiresFallbacks = [
      'display: grid',
      'display: flex', 
      'position: sticky'
    ];

    // This is a simplified check - in reality we'd parse CSS
    const hasFlexbox = CSS.supports('display', 'flex');
    const hasGrid = CSS.supports('display', 'grid');
    
    if (!hasFlexbox || !hasGrid) {
      this.results.push({
        issue: 'Missing CSS fallbacks for older browsers',
        severity: 'major',
        fix: 'Add vendor prefixes and fallbacks'
      });
    }
  }

  // 5. AUDIT: Image optimization
  auditImageOptimization(): void {
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.getAttribute('alt')) {
        this.results.push({
          issue: `Image ${index + 1} missing alt attribute`,
          severity: 'major',
          fix: 'Add descriptive alt text for accessibility'
        });
      }
      
      if (!img.getAttribute('loading')) {
        this.results.push({
          issue: `Image ${index + 1} missing lazy loading`,
          severity: 'minor',
          fix: 'Add loading="lazy" for performance'
        });
      }
    });
  }

  // 6. AUDIT: Security headers
  auditSecurity(): void {
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="supportcall"])');
    externalLinks.forEach((link, index) => {
      if (!link.getAttribute('rel')?.includes('noopener')) {
        this.results.push({
          issue: `External link ${index + 1} missing security attributes`,
          severity: 'major',
          fix: 'Add rel="noopener noreferrer" to external links'
        });
      }
    });
  }

  // APPLY ESSENTIAL FIXES ONLY
  applyEssentialFixes(): void {
    try {
      // Fix 1: Image optimization
      const images = document.querySelectorAll('img:not([loading])');
      images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
        if (!img.getAttribute('alt')) {
          img.setAttribute('alt', 'SupportCALL professional technology services');
        }
      });
      if (images.length > 0) {
        this.fixes.push(`Optimized ${images.length} images with lazy loading and alt text`);
      }

      // Fix 2: Secure external links
      const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="supportcall"])');
      externalLinks.forEach(link => {
        if (!link.getAttribute('rel')?.includes('noopener')) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
      if (externalLinks.length > 0) {
        this.fixes.push(`Secured ${externalLinks.length} external links`);
      }

      // Fix 3: Accessibility - Skip link (if not exists)
      if (!document.querySelector('a[href="#main"]')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded';
        document.body.insertBefore(skipLink, document.body.firstChild);
        this.fixes.push('Added accessibility skip link');
      }

      // Fix 4: Main content identification
      if (!document.querySelector('main, [role="main"]')) {
        const firstSection = document.querySelector('section');
        if (firstSection) {
          firstSection.setAttribute('role', 'main');
          firstSection.id = 'main';
          this.fixes.push('Identified main content area for accessibility');
        }
      }

    } catch (error) {
      console.warn('Fix application error (non-critical):', error);
    }
  }

  // RUN COMPLETE AUDIT
  runAudit(): AuditReport {
    console.log('🔍 Running systematic site audit...');
    
    // Run all audits
    this.auditSelfContained();
    this.auditH1Tags();
    this.auditMarketingPopups();
    this.auditCrossBrowserCompatibility();
    this.auditImageOptimization();
    this.auditSecurity();

    // Apply essential fixes
    this.applyEssentialFixes();

    // Categorize results
    const criticalIssues = this.results.filter(r => r.severity === 'critical');
    const majorIssues = this.results.filter(r => r.severity === 'major');
    const minorIssues = this.results.filter(r => r.severity === 'minor');

    // Determine status
    let status: 'CLEAN' | 'NEEDS_ATTENTION' | 'CRITICAL';
    if (criticalIssues.length > 0) status = 'CRITICAL';
    else if (majorIssues.length > 0) status = 'NEEDS_ATTENTION';
    else status = 'CLEAN';

    const report: AuditReport = {
      totalIssues: this.results.length,
      criticalIssues,
      majorIssues, 
      minorIssues,
      fixesApplied: this.fixes,
      status
    };

    console.log('✅ Site audit completed');
    return report;
  }
}

export const runSiteAudit = (): AuditReport => {
  const auditor = new SiteAuditor();
  return auditor.runAudit();
};

export const printAuditReport = (report: AuditReport): void => {
  console.log('\n🎯 SYSTEMATIC SITE AUDIT REPORT');
  console.log('================================');
  console.log(`STATUS: ${report.status}`);
  console.log(`TOTAL ISSUES: ${report.totalIssues}`);
  
  if (report.criticalIssues.length > 0) {
    console.log('\n🚨 CRITICAL ISSUES:');
    report.criticalIssues.forEach((issue, i) => {
      console.log(`${i + 1}. ${issue.issue}`);
      console.log(`   Fix: ${issue.fix}`);
      if (issue.file) console.log(`   File: ${issue.file}:${issue.line || '?'}`);
    });
  }

  if (report.majorIssues.length > 0) {
    console.log('\n⚠️  MAJOR ISSUES:');
    report.majorIssues.forEach((issue, i) => {
      console.log(`${i + 1}. ${issue.issue}`);
      console.log(`   Fix: ${issue.fix}`);
      if (issue.file) console.log(`   File: ${issue.file}:${issue.line || '?'}`);
    });
  }

  if (report.minorIssues.length > 0) {
    console.log('\n📝 MINOR ISSUES:');
    report.minorIssues.forEach((issue, i) => {
      console.log(`${i + 1}. ${issue.issue}`);
      console.log(`   Fix: ${issue.fix}`);
    });
  }

  if (report.fixesApplied.length > 0) {
    console.log('\n✅ FIXES APPLIED:');
    report.fixesApplied.forEach((fix, i) => {
      console.log(`${i + 1}. ${fix}`);
    });
  }

  console.log('\n================================');
};

export default SiteAuditor;