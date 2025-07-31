interface BlockSectionProps {
  children: React.ReactNode;
  imageLeft?: boolean;
  imageUrl?: string;
  className?: string;
}

export default function BlockSection({ 
  children, 
  imageLeft = false, 
  imageUrl = "https://images.unsplash.com/photo-1500375592092-40eb2168fd21", 
  className = "" 
}: BlockSectionProps) {
  return (
    <div className={`min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-4 md:px-8 lg:px-12 xl:px-16 ${className}`}>
      {imageLeft ? (
        <>
          {/* Image Left */}
          <div className="flex justify-center order-1 lg:order-1">
            <img 
              src={imageUrl} 
              alt="Pacific Future" 
              className="w-full max-w-lg rounded-lg object-cover"
            />
          </div>
          {/* Content Right */}
          <div className="space-y-6 order-2 lg:order-2">
            {children}
          </div>
        </>
      ) : (
        <>
          {/* Content Left */}
          <div className="space-y-6 order-2 lg:order-1">
            {children}
          </div>
          {/* Image Right */}
          <div className="flex justify-center order-1 lg:order-2">
            <img 
              src={imageUrl} 
              alt="Pacific Future" 
              className="w-full max-w-lg rounded-lg object-cover"
            />
          </div>
        </>
      )}
    </div>
  );
}