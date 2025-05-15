"use client";

import type { Listing } from "../lib/mock-listings";
import {
  X,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Tag,
  ListChecks,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ListingDetailCardProps {
  listing: Listing | null;
  onClose: () => void;
}

export default function ListingDetailCard({
  listing,
  onClose,
}: ListingDetailCardProps) {
  if (!listing) return null;

  const formatPrice = (priceString: string) => {
    return priceString.replace("/tháng", " VNĐ/tháng");
  };

  return (
    // Outer div: positioning, max-height, padding. No longer flex directly.
    <div className="fixed inset-x-0 bottom-16 md:inset-x-auto md:bottom-4 md:right-4 md:max-w-sm lg:max-w-md bg-background border-t md:border md:rounded-lg shadow-xl z-20 p-4 max-h-[75vh]">
      {/* Inner wrapper: takes full height of parent's content box, handles flex layout, AND NOW CLIPS ITS OWN OVERFLOW */}
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header part */}
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <h2 className="text-xl font-semibold truncate pr-2">
            {listing.title}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable content part */}
        <div className="overflow-y-auto flex-grow min-h-0 scrollbar-thin scrollbar-thumb-muted-foreground/50 scrollbar-track-transparent">
          <div className="aspect-video w-full mb-3">
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="w-full h-full object-cover rounded-md bg-muted"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-start text-sm">
              <MapPin className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
              <span>{listing.address}</span>
            </div>

            <div className="flex items-center text-sm">
              <Tag className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
              <span className="font-semibold text-lg text-primary">
                {formatPrice(listing.price)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <BedDouble className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                <span>{listing.bedrooms} phòng ngủ</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                <span>{listing.bathrooms} phòng tắm</span>
              </div>
              <div className="flex items-center">
                <Ruler className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                <span>{listing.area} m²</span>
              </div>
              <div className="flex items-center">
                <ListChecks className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                <span className="capitalize">{listing.type}</span>
              </div>
            </div>

            {listing.amenities && listing.amenities.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-1.5">Tiện nghi:</h3>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((amenity: string) => (
                    <Badge
                      key={amenity}
                      variant="secondary"
                      className="text-xs"
                    >
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium mb-1">Mô tả:</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {listing.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
