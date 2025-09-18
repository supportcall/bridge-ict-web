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
      { name: "Bank details [site]", url: "https://supportcall.co.za/bank.html" },
      { name: "Speedtest - Telemetry [site]", url: "http://speedtest.supportcall-isp.co.za/" },
      { name: "SC-Wiki [site]", url: "http://wiki.supportcall.co.za/" },
      { name: "Ticket System [site]", url: "http://tickets.supportcall-isp.co.za/" },
      { name: "WebDev - TestSite [site]", url: "https://clientsitetest.supportcall-isp.co.za/" }
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
      { name: "ESET Home Downloads [DL]", url: "https://www.eset.com/int/download-home/" },
      { name: "ESET Internet Security Premium [DL]", url: "https://www.eset.com/int/home/smart-security-premium/download/" },
      { name: "ESET Online Installer [DL]", url: "https://download.eset.com/com/eset/tools/installers/live_eav/latest/eset_nod32_antivirus_live_installer.exe" },
      { name: "ESET v18.x Offline Installers [site]", url: "https://help.eset.com/esu/18/en-US/?installation_offline.html" },
      { name: "ESET Free Online Scanner [site]", url: "https://www.eset.com/za/home/online-scanner/" },
      { name: "ESET Tools & Utilities [site]", url: "https://www.eset.com/au/download-utilities/" },
      { name: "SC-USCS (SC - Ultimate Secure Clean Script) [site]", url: "https://www.supportcall.co.za/store/index_sc-uscs.html" }
    ]
  },
  {
    title: "Local Tech Tools",
    items: [
      { name: "XnConvert [site]", url: "https://www.xnview.com/en/xnconvert/" },
      { name: "XnConvert 32-bit [DL]", url: "https://download.xnview.com/XnConvert-win.exe" },
      { name: "XnConvert 64-bit [DL]", url: "https://download.xnview.com/XnConvert-win-x64.exe" },
      { name: "XnConvert profile ZIP [DL]", url: "http://www.supportcall.co.za/sc-extras/sc-resize-aspectfit-50%-jpg.zip" },
      { name: "XnConvert profile XBS [DL]", url: "http://www.supportcall.co.za/sc-extras/sc-resize-aspectfit-50%-jpg.xbs" }
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
      { name: "Internet Exchange (IX) traffic monitoring dashboard [site]", url: "https://metrics.internet.asn.au/d/ix-aggregates/ix-aggregates?orgId=1" }
    ]
  },
  {
    title: "Handy 3rd Party Sites",
    items: [
      { name: "Handy 3rd Party Sites [site]", url: "https://wiki.supportcall.co.za/doku.php?id=handy_site" }
    ]
  },
  // Newly added categories based on user request
  {
    title: "Remote Support - SupportDesk",
    items: [
      { name: "Windows x64 (.exe) — Run as Administrator via PowerShell [DL]", url: "https://www.supportcall.co.za/sc-extras/host=scrdp01.supportcall.co.za,key=tOs01oX2M9d2RfgqinSaGklv5eJZDw8ViTabWlTqsqI=.exe" },
      { name: "Windows x64 (.msi) — Run as Administrator via PowerShell [DL]", url: "https://www.supportcall.co.za/sc-extras/host=scrdp01.supportcall.co.za,key=tOs01oX2M9d2RfgqinSaGklv5eJZDw8ViTabWlTqsqI=.msi" },
      { name: "Android (.apk) [DL]", url: "https://www.supportcall.co.za/sc-extras/host=scrdp01.supportcall.co.za,key=tOs01oX2M9d2RfgqinSaGklv5eJZDw8ViTabWlTqsqI=.apk" },
      { name: "Archive (.zip) [DL]", url: "https://www.supportcall.co.za/sc-extras/host=scrdp01.supportcall.co.za,key=tOs01oX2M9d2RfgqinSaGklv5eJZDw8ViTabWlTqsqI=.zip" },
      { name: "SupportDesk GitHub [site]", url: "https://github.com/rustdesk/rustdesk/releases/latest" },
      { name: "Download Site [site]", url: "http://156.155.253.71:8000/" },
      { name: "Relay Server (Copy Information)", url: "host=scrdp01.supportcall.co.za,key=tOs01oX2M9d2RfgqinSaGklv5eJZDw8ViTabWlTqsqI=", type: "copy" }
    ]
  },
  {
    title: "Remote Support - Google Remote Desktop",
    items: [
      { name: "Client — MSI Download [DL]", url: "https://dl.google.com/dl/edgedl/chrome-remote-desktop/chromeremotedesktophost.msi" },
      { name: "Web Client — Run in Browser [site]", url: "https://remotedesktop.google.com/support/" }
    ]
  },
  {
    title: "TacticalRMM",
    items: [
      { name: "Windows Workstation/Desktop x64 — Download (Run as Administrator) [DL]", url: "https://www.supportcall.co.za/sc-extras/trmm-sc-newclients-workstation-amd64.exe" },
      { name: "Windows Workstation/Desktop x86 — Download (Run as Administrator) [DL]", url: "https://www.supportcall.co.za/sc-extras/trmm-sc-newclients-workstation-386.exe" },
      { name: "Windows Server x64 — Download (Run as Administrator) [DL]", url: "https://www.supportcall.co.za/sc-extras/trmm-sc-newclients-server-amd64.exe" },
      { name: "Windows Server x86 — Download (Run as Administrator) [DL]", url: "https://www.supportcall.co.za/sc-extras/trmm-sc-newclients-server-386.exe" }
    ]
  },
  {
    title: "AnyDesk — No Longer Supported",
    items: [
      { name: "Download AnyDesk [site]", url: "https://anydesk.com/download" }
    ]
  },
  {
    title: "TeamViewer — No Longer Supported",
    items: [
      { name: "Download Latest TeamViewer [DL]", url: "https://download.teamviewer.com/full" },
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
            <p className="text-white/80 text-lg max-w-3xl mx-auto">
              Quick access to SupportCALL tools, downloads, status pages and reference resources.
            </p>
          </div>
        </div>
      </section>

      {/* Key/Legend Section */}
      <section className="py-4 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card/50 p-3 rounded border border-border/30">
            <h2 className="text-sm font-medium mb-2 text-muted-foreground">Key</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">[site]</Badge>
                <span className="text-muted-foreground">External websites</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">[DL]</Badge>
                <span className="text-muted-foreground">File downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <Copy className="w-4 h-4 text-primary shrink-0" />
                <span className="text-muted-foreground">Copy to clipboard</span>
              </div>
              <div className="col-span-full sm:col-span-2 lg:col-span-1">
                <div className="text-muted-foreground">
                  <strong>"Download (Run as Administrator)":</strong> Download file, then right-click and select "Run as Administrator"
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
