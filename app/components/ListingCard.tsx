import { cn } from '@/lib/utils';

interface ListingCardProps {
  id: string | number;
  title: string;
  address: string;
  price: string;
  imageUrl?: string;
  className?: string;
}

export default function ListingCard({
  id,
  title,
  address,
  price,
  imageUrl,
  className,
}: ListingCardProps) {
  return (
    <div
      className={cn(
        'border rounded-lg bg-card text-card-foreground shadow-sm overflow-hidden',
        className
      )}
    >
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 object-cover" 
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 truncate" title={title}>{title}</h3>
        <p className="text-sm text-muted-foreground mb-1 truncate" title={address}>{address}</p>
        <p className="text-base font-semibold text-primary">{price}</p>
        {/* Add to favorites button or other actions can go here */}
      </div>
    </div>
  );
}
