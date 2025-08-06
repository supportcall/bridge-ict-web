import { Card, CardContent } from "@/components/ui/card";
import { Heart, Globe } from "lucide-react";

const Acknowledgement = () => {
  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-l-4 border-l-primary bg-primary/5">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <div className="flex items-center space-x-2 text-primary mt-1">
                <Heart className="w-6 h-6" />
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  ACKNOWLEDGEMENT OF HUMANITY & COUNTRY
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We honour all people, from all cultures, lands, and histories - past and present. 
                  Across Australia, Oceania, and the world, we stand for unity, respect, and shared humanity. 
                  This includes acknowledging the enduring cultural connections of First Nations peoples, 
                  while affirming dignity and equality for all.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Acknowledgement;