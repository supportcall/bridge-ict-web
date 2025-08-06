import { Card, CardContent } from "@/components/ui/card";
import { Heart, Globe } from "lucide-react";

const Acknowledgement = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-l-4 border-l-primary/60 bg-background shadow-lg">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Heart className="w-5 h-5 text-primary/70" />
                <h3 className="text-lg font-medium text-muted-foreground uppercase tracking-wide">
                  Acknowledgement of Humanity & Country
                </h3>
                <Globe className="w-5 h-5 text-primary/70" />
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                We honour all people, from all cultures, lands, and histories - past and present. 
                Across Australia, Oceania, and the world, we stand for unity, respect, and shared humanity. 
                This includes acknowledging the enduring cultural connections of First Nations peoples, 
                while affirming dignity and equality for all.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Acknowledgement;