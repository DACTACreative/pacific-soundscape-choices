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
  return;
}