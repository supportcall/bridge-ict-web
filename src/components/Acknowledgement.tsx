import { Card, CardContent } from "@/components/ui/card";
import { Heart, Globe, Users, Handshake } from "lucide-react";

const Acknowledgement = () => {
  return (
    <section className="py-20 bg-gradient-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary-glow rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-primary-glow rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-primary-glow rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden">
          <CardContent className="p-0">
            {/* Header section with icons */}
            <div className="bg-gradient-primary p-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center animate-scale-in">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center animate-scale-in delay-100">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center animate-scale-in delay-200">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center animate-scale-in delay-300">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-2 animate-fade-in">
                ACKNOWLEDGEMENT OF HUMANITY & COUNTRY
              </h3>
              <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
            </div>
            
            {/* Content section */}
            <div className="p-8 md:p-12">
              <p className="text-lg md:text-xl text-white/90 leading-relaxed text-center max-w-4xl mx-auto animate-fade-in delay-400">
                We honour all people, from all cultures, lands, and histories - past and present. 
                Across Australia, Oceania, and the world, we stand for unity, respect, and shared humanity. 
                This includes acknowledging the enduring cultural connections of First Nations peoples, 
                while affirming dignity and equality for all.
              </p>
              
              {/* Decorative elements */}
              <div className="flex justify-center mt-8 space-x-8 opacity-60">
                <div className="text-center animate-fade-in delay-500">
                  <div className="w-3 h-3 bg-primary-glow rounded-full mx-auto mb-2"></div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">Unity</div>
                </div>
                <div className="text-center animate-fade-in delay-600">
                  <div className="w-3 h-3 bg-primary-glow rounded-full mx-auto mb-2"></div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">Respect</div>
                </div>
                <div className="text-center animate-fade-in delay-700">
                  <div className="w-3 h-3 bg-primary-glow rounded-full mx-auto mb-2"></div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">Humanity</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Acknowledgement;