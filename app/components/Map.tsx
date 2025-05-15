"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { generateMockListings, type Listing } from "../lib/mock-listings";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const HCMC_DEFAULT_LAT = 10.7769;
const HCMC_DEFAULT_LNG = 106.7009;

interface MapComponentProps {
  initialLng?: number;
  initialLat?: number;
  initialZoom?: number;
  onMarkerClick: (listing: Listing) => void; // New prop to notify parent of marker click
}

if (!MAPBOX_TOKEN) {
  console.error(
    "Mapbox token is not set. Please add VITE_MAPBOX_TOKEN to your .env file"
  );
}

export default function MapComponent({
  initialLng = HCMC_DEFAULT_LNG,
  initialLat = HCMC_DEFAULT_LAT,
  initialZoom = 11,
  onMarkerClick, // Destructure new prop
}: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [displayedListings, setDisplayedListings] = useState<Listing[]>([]);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: initialLat,
    lng: initialLng,
  });
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null); // New state for selected listing

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`User location: ${latitude}, ${longitude}`);
          setMapCenter({ lat: latitude, lng: longitude });
          setDisplayedListings(generateMockListings(latitude, longitude));
        },
        (error) => {
          console.warn(
            `Error getting user location: ${error.message}. Using default location.`
          );
          setMapCenter({ lat: HCMC_DEFAULT_LAT, lng: HCMC_DEFAULT_LNG });
          setDisplayedListings(generateMockListings());
        }
      );
    } else {
      console.warn(
        "Geolocation is not supported by this browser. Using default location."
      );
      setMapCenter({ lat: HCMC_DEFAULT_LAT, lng: HCMC_DEFAULT_LNG });
      setDisplayedListings(generateMockListings());
    }
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || !MAPBOX_TOKEN) return;
    if (mapRef.current || displayedListings.length === 0) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [mapCenter.lng, mapCenter.lat],
      zoom: initialZoom,
      accessToken: MAPBOX_TOKEN,
    });
    mapRef.current = map;

    map.on("load", () => {
      setIsMapLoaded(true);
      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        }),
        "bottom-right"
      );

      displayedListings.forEach((listing: Listing) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([listing.coordinates.lng, listing.coordinates.lat])
          .addTo(map);

        marker.getElement().addEventListener("click", (e) => {
          e.stopPropagation(); // Prevent map click event if any
          setSelectedListing(listing); // Update selected listing state
          onMarkerClick(listing); // Call the passed-in handler
        });
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setIsMapLoaded(false);
      }
    };
  }, [displayedListings, mapCenter, initialZoom, onMarkerClick]); // Add onMarkerClick to dependencies

  if (!MAPBOX_TOKEN) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
        <p>Lỗi: Không thể tải bản đồ. Vui lòng kiểm tra cấu hình Mapbox.</p>
      </div>
    );
  }
  return <div ref={mapContainerRef} className="w-full h-full" />;
}
