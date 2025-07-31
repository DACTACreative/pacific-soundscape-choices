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
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-8 py-24">
      <div className="text-center space-y-12">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            A Fictional Journey into the Blue Paradigm
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-gray-300 font-medium max-w-4xl mx-auto">
            Visual narratives that capture the essence of Pacific futures—each image tells a story of possibility, challenge, and hope across the Blue Pacific continent.
          </p>
        </div>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4">
                  <div className="relative group">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm font-medium">{image.alt}</p>
                    </div>
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