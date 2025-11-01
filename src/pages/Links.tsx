import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePageSEO } from "@/hooks/usePageSEO";
import { ExternalLink, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

// Simple item list schema generator
const buildItemListSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    url: item.url
  }))
});

type LinkItem = { name: string; url: string; type?: 'copy' };
type Category = { title: string; items: LinkItem[] };

const categories: Category[] = [
  {
    title: "SupportCALL Essentials",
    items: [
      { name: "Bank details [site]", url: "https://supportcall.com.au/bank.html" },
      { name: "Speedtest - Telemetry [site]", url: "http://speedtest.supportcall-isp.co.za/" },
      { name: "SC-Wiki [site]", url: "http://wiki.supportcall.com.au/" },
      { name: "Ticket System [site]", url: "http://tickets.supportcall-isp.co.za/" },
      { name: "WebDev - TestSite [site]", url: "https://clientsitetest.supportcall-isp.co.za/" },
      { name: "WAN IP Lookup [site]", url: "https://wanip.io/" }
    ]
  },
  {
    title: "Points of Presence",
    items: [
      { name: "Global PoP's - Interactive Map [site]", url: "https://www.google.com/maps/d/u/0/embed?mid=1JK87sp9NvlGv0-AOphrhFECN5m9P6EA&ehbc=2E312F&noprof=1" }
    ]
  },
  {
    title: "Security Tools & Downloads",
    items: [
      { name: "ESET Status [site]", url: "https://status.eset.com/" },
      { name: "Malwarebytes Status [site]", url: "https://status.malwarebytes.com/" },
      { name: "AdwCleaner [DL]", url: "https://downloads.malwarebytes.com/file/adwcleaner" },
      { name: "Malwarebytes FREE [DL]", url: "https://www.malwarebytes.com/mwb-download/thankyou" },
      { name: "ESET Home Downloads [site]", url: "https://www.eset.com/int/download-home/" },
      { name: "ESET Internet Security Premium [site]", url: "https://www.eset.com/int/home/smart-security-premium/download/" },
      { name: "ESET Online Installer [DL]", url: "https://download.eset.com/com/eset/tools/installers/live_eav/latest/eset_nod32_antivirus_live_installer.exe" },
      { name: "ESET v18.x Offline Installers [site]", url: "https://help.eset.com/esu/18/en-US/?installation_offline.html" },
      { name: "ESET Free Online Scanner [site]", url: "https://www.eset.com/za/home/online-scanner/" },
      { name: "ESET Tools & Utilities [site]", url: "https://www.eset.com/au/download-utilities/" },
      { name: "SC-USCS (SC - Ultimate Secure Clean Script) [site]", url: "https://sc-uscs.com/" }
    ]
  },
  {
    title: "Local Tech Tools",
    items: [
      { name: "XnConvert [site]", url: "https://www.xnview.com/en/xnconvert/" },
      { name: "XnConvert 32-bit [DL]", url: "https://download.xnview.com/XnConvert-win.exe" },
      { name: "XnConvert 64-bit [DL]", url: "https://download.xnview.com/XnConvert-win-x64.exe" },
      { name: "XnConvert profile ZIP [DL]", url: "http://www.supportcall.com.au/sc-extras/sc-resize-aspectfit-50-jpg.zip" },
      { name: "XnConvert profile XBS [DL]", url: "http://www.supportcall.com.au/sc-extras/sc-resize-aspectfit-50-jpg.xbs" }
    ]
  },
  {
    title: "Threat Maps",
    items: [
      { name: "Kaspersky Cybermap [site]", url: "https://cybermap.kaspersky.com/" },
      { name: "Fortiguard Threatmap [site]", url: "https://threatmap.fortiguard.com/" },
      { name: "Checkpoint Threatmap [site]", url: "https://threatmap.checkpoint.com/" },
      { name: "SpamHaus Threat Map [site]", url: "https://www.spamhaus.com/threat-map/" },
      { name: "Digital Attack Map [site]", url: "https://www.digitalattackmap.com/" },
      { name: "Talos Intelligence [site]", url: "https://talosintelligence.com/" }
    ]
  },
  {
    title: "Network & Status",
    items: [
      { name: "Submarine Cable Map [site]", url: "https://www.submarinecablemap.com/" },
      { name: "Australian IX Traffic [site]", url: "https://metrics.internet.asn.au/d/ix-aggregates/ix-aggregates?orgId=1&from=now-2d&to=now" }
    ]
  },
  {
    title: "Handy 3rd Party Sites",
    items: [
      { name: "Handy 3rd Party Sites [site]", url: "https://wiki.supportcall.com.au/doku.php?id=handy_site" }
    ]
  },
  // Newly added categories based on user request
  {
    title: "Remote Support - SupportDesk",
    items: [
      { name: "Latest install script (cmd) [DL & Run as Admin]", url: "https://www.supportcall.com.au/sc-extras/Install-SupportDESK-Latest-and-ApplyConfig.cmd" },
      { name: "Windows x64 (.exe) [DL & Run as Admin]", url: "https://www.supportcall.com.au/sc-extras/rustdesk-1.4-3-x86_64.exe" },
      { name: "Windows x64 (.msi) [DL & Run as Admin]", url: "https://www.supportcall.com.au/sc-extras/rustdesk-1.4-3-x86_64.msi" },
      { name: "Android (.apk) [DL]", url: "https://www.supportcall.com.au/sc-extras/host=scrdp01.supportcall.co.za,key=tOs01oX2M9d2RfgqinSaGklv5eJZDw8ViTabWlTqzqI=.apk" },
      { name: "Archive (.zip) [DL]", url: "https://www.supportcall.com.au/sc-extras/host=scrdp01.supportcall.co.za,key=tOs01oX2M9d2RfgqinSaGklv5eJZDw8ViTabWlTqzqI=.zip" },
      { name: "SupportDesk GitHub [site]", url: "https://github.com/rustdesk/rustdesk/releases/latest" },
      { name: "Download Site [site]", url: "http://156.155.253.71:8000/" },
      { name: "Relay Server (Copy Info)", url: "host=scrdp01.supportcall.com.au,key=tOs01oX2M9d2RfgqinSaGklv5eJZDw8ViTabWlTqsqI=", type: "copy" }
    ]
  },
  {
    title: "Remote Support - Google Remote Desktop",
    items: [
      { name: "Client - MSI [DL]", url: "https://dl.google.com/dl/edgedl/chrome-remote-desktop/chromeremotedesktophost.msi" },
      { name: "Web Client - Run in Browser [site]", url: "https://remotedesktop.google.com/support/" }
    ]
  },
  {
    title: "SupportCALL RMM",
    items: [
      { name: "Windows Workstation/Desktop x64 [DL & Run as Admin]", url: "https://www.supportcall.com.au/sc-extras/trmm-sc-newclients-workstation-amd64.exe" },
      { name: "Windows Workstation/Desktop x86 [DL & Run as Admin]", url: "https://www.supportcall.com.au/sc-extras/trmm-sc-newclients-workstation-386.exe" },
      { name: "Windows Server x64 [DL & Run as Admin]", url: "https://www.supportcall.com.au/sc-extras/trmm-sc-newclients-server-amd64.exe" },
      { name: "Windows Server x86 [DL & Run as Admin]", url: "https://www.supportcall.com.au/sc-extras/trmm-sc-newclients-server-386.exe" }
    ]
  },
  {
    title: "AnyDesk - No Longer Supported",
    items: [
      { name: "Download AnyDesk [site]", url: "https://anydesk.com/download" }
    ]
  },
  {
    title: "TeamViewer - No Longer Supported",
    items: [
      { name: "Download Latest TeamViewer [site]", url: "https://download.teamviewer.com/full" },
      { name: "TeamViewer v14 Portable [DL]", url: "https://download.teamviewer.com/download/version_14x/TeamViewerPortable.zip" },
      { name: "TeamViewer v14 QuickSupport [DL]", url: "https://download.teamviewer.com/download/version_14x/TeamViewerQS.exe" },
      { name: "TeamViewer v12 Portable [DL]", url: "https://download.teamviewer.com/download/version_12x/TeamViewerPortable.zip" },
      { name: "TeamViewer v12 QuickSupport [DL]", url: "https://download.teamviewer.com/download/version_12x/TeamViewerQS.exe" }
    ]
  }
];

const allItemsForSchema: LinkItem[] = categories.flatMap((c) => c.items);

const Links = () => {
  const { toast } = useToast();

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Relay server information has been copied successfully."
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard. Please copy manually.",
        variant: "destructive"
      });
    }
  };

  usePageSEO({
    title: "Links & Resources",
    description: "Curated SupportCALL links: tools, downloads, status dashboards, and trusted third‑party resources.",
    keywords: "SupportCALL links, IT tools, ESET downloads, malware removal, threat maps, ticket system",
    structuredData: buildItemListSchema(allItemsForSchema)
  });

  return (
    <div className="min-h-screen dark">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">Resources</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Links</h1>
            <p className="text-white/80 text-lg max-w-3xl mx-auto mb-8">
              Quick access to SupportCALL tools, downloads, status pages and reference resources.
            </p>
            
            {/* Key/Legend */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <h3 className="text-white font-medium mb-4 text-center">Key:</h3>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-mono">[site]</span>
                    <span>External websites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-mono">[DL]</span>
                    <span>Direct downloads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs">[DL & Run as Admin]</span>
                    <span>Download & right-click → Run as Administrator</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs">(Copy Info)</span>
                    <span>Click to copy to clipboard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Links Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Card key={cat.title} className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-foreground">{cat.title}</h2>
                <ul className="space-y-3 list-none pl-0">
                  {cat.items.map((item) => (
                    <li key={item.url}>
                      {item.type === 'copy' ? (
                        <button
                          onClick={() => handleCopyToClipboard(item.url)}
                          className="inline-flex items-center gap-2 text-primary hover:underline cursor-pointer"
                          aria-label={`Copy ${item.name} to clipboard`}
                        >
                          <Copy className="w-4 h-4 shrink-0" />
                          <span className="text-sm">{item.name}</span>
                        </button>
                      ) : (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:underline"
                          aria-label={`${item.name} (opens in a new tab)`}
                        >
                          <ExternalLink className="w-4 h-4 shrink-0" />
                          <span className="text-sm">{item.name}</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Toaster />
    </div>
  );
};

export default Links;
