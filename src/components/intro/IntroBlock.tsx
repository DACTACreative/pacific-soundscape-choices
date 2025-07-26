interface IntroBlockProps {
  id: string;
  content: React.ReactNode;
  imageBg: string;
  imageAlt: string;
  imageFilename: string;
  isReversed?: boolean;
}

export default function IntroBlock({ 
  id, 
  content, 
  imageBg, 
  imageAlt, 
  imageFilename, 
  isReversed = false 
}: IntroBlockProps) {
  return (
    <section 
      id={id}
      data-scroll-section 
      className="h-screen flex items-center justify-center bg-black"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex items-center">
        <div className={`w-full flex items-center gap-16 ${isReversed ? 'flex-row-reverse' : 'flex-row'}`}>
          
          {/* Text Content */}
          <div className="w-1/2 flex justify-center" data-scroll data-scroll-speed="1">
            <div className="max-w-2xl text-white">
              {content}
            </div>
          </div>

          {/* Image */}
          <div 
            className="w-1/2 flex justify-center" 
            data-scroll 
            data-scroll-sticky 
            data-scroll-target={`#${id}`}
          >
            <div className={`w-full max-w-md aspect-[3/4] ${imageBg} rounded-lg overflow-hidden shadow-2xl relative`}>
              <img src="/placeholder.svg" alt={imageAlt} className="w-full h-full object-cover" />
              <div className={`absolute bottom-4 text-xs bg-black bg-opacity-50 p-2 rounded ${isReversed ? 'left-4' : 'right-4'}`}>
                {imageFilename}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}