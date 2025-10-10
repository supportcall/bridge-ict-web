import { useEffect } from 'react';
import { runSiteAudit, printAuditReport } from '@/utils/siteAudit';
import applyCrossBrowserFixes from '@/utils/crossBrowserFixes';

/**
 * CLEAN BASELINE - Systematic audit & essential fixes only
 * NO aggressive DOM manipulation, NO runtime behavior alterations
 * React-friendly, minimal, error-isolated, focused fixes
 */
export const useOptimizations = () => {
  useEffect(() => {
    const runSystematicOptimization = async () => {
      try {
        console.log('🚀 Starting systematic site optimization...');
        
        // Apply essential cross-browser fixes immediately
        applyCrossBrowserFixes();
        
        // Apply mobile viewport height fix
        const setVH = () => {
          const vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        setVH();
        window.addEventListener('resize', setVH, { passive: true });

        // Run systematic audit after DOM is fully ready
        setTimeout(() => {
          const auditReport = runSiteAudit();
          printAuditReport(auditReport);
          
          // Summary
          if (auditReport.status === 'CLEAN') {
            console.log('🏆 SITE STATUS: CLEAN - Best practices maintained!');
          } else {
            console.log(`⚠️  SITE STATUS: ${auditReport.status} - ${auditReport.totalIssues} issues identified`);
          }
        }, 1000);
        
      } catch (error) {
        console.warn('⚠️ Optimization error (non-critical):', error);
      }
    };

    // Run after DOM is ready
    const timeoutId = setTimeout(runSystematicOptimization, 100);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
};