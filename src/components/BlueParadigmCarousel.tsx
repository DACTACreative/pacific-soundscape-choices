import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const BlueParadigmCarousel = () => {
  const images = [
    { src: "/data/BIKEHOUSE.png", alt: "Pacific Bike House Vision" },
    { src: "/data/COP.png", alt: "Climate Conference Pacific Voice" },
    { src: "/data/CORAIL.png", alt: "Coral Reef Conservation" },
    { src: "/data/FARM.png", alt: "Sustainable Pacific Farming" },
    { src: "/data/FOREST.png", alt: "Pacific Forest Conservation" },
    { src: "/data/INTERISLAND.png", alt: "Inter-Island Connectivity" },
    { src: "/data/LAGONFARM.png", alt: "Lagoon Farming Innovation" },
    { src: "/data/MARKET.png", alt: "Pacific Market Community" },
    { src: "/data/NOUMEA.png", alt: "Noumea Urban Future" },
    { src: "/data/PANEL.png", alt: "Pacific Climate Panel" },
    { src: "/data/STORY.png", alt: "Pacific Stories Heritage" },
    { src: "/data/SUVA.png", alt: "Suva Pacific Future" },
    { src: "/data/TEAUPO.png", alt: "Te Aupo Sacred Waters" },
    { src: "/data/TRAVEL.png", alt: "Pacific Travel Vision" },
    { src: "/data/WATER.png", alt: "Pacific Water Resources" },
    { src: "/lovable-uploads/4323d14e-e3a0-4ae5-9fe4-23efdecc54b9.png", alt: "Pacific Future Cityscape" },
    { src: "/lovable-uploads/70e1c33e-9535-45a2-a513-e51920cc504b.png", alt: "Sustainable Pacific Energy" },
    { src: "/lovable-uploads/e201c93d-80ac-4b42-8027-c13a11d0ac4a.png", alt: "Pacific Ocean Innovation" },
    { src: "/lovable-uploads/6632c13f-066c-4cac-aac5-e19176a7d07d.png", alt: "Pacific Green Architecture" },
    { src: "/lovable-uploads/c8630550-8323-4e4c-80e6-44baaa4eb2cc.png", alt: "Pacific Community Life" },
    { src: "/lovable-uploads/fc6432ca-b0cd-4e55-a99a-8a7b2544dfcc.png", alt: "Pacific Transportation Future" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-8 py-24">
      <div className="text-center space-y-12">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            A Fictional Journey into the Blue Paradigm
          </h2>
        </div>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/2">
                <div className="p-4">
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default BlueParadigmCarousel;