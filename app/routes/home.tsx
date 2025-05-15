import type { Route } from "./+types/home";
import MapComponent from "../components/Map";
import SearchBar from "../components/SearchBar";
import ListingDetailCard from "../components/ListingDetailCard";
import { useState, useCallback } from "react";
import type { Listing } from "../lib/mock-listings";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nhà Cool | Tìm nhà theo cách của bạn" },
    {
      name: "description",
      content:
        "Tìm kiếm phòng trọ, căn hộ, nhà cho thuê nhanh chóng và tiện lợi.",
    },
  ];
}

// Sample data - will be used later when showing details from map interaction
// const sampleListings = [
//   {
//     id: 1,
//     title: "Căn hộ rộng rãi view thành phố",
//     address: "123 Đường Chính, Quận 1, TP.HCM",
//     price: "28 triệu/tháng",
//     imageUrl: "https://via.placeholder.com/400x300.png?text=Phòng+1",
//   },
//   {
//     id: 2,
//     title: "Phòng trọ gần trường đại học",
//     address: "456 Đường Đại Học, Quận 3, TP.HCM",
//     price: "12 triệu/tháng",
//     imageUrl: "https://via.placeholder.com/400x300.png?text=Phòng+2",
//   },
//   {
//     id: 3,
//     title: "Studio hiện đại ở Bình Thạnh",
//     address: "789 Đường Bờ Sông, Bình Thạnh, TP.HCM",
//     price: "18 triệu/tháng",
//     imageUrl: "https://via.placeholder.com/400x300.png?text=Phòng+3",
//   },
// ];

export default function HomePage() {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const handleMarkerClick = useCallback((listing: Listing) => {
    setSelectedListing(listing);
  }, []);

  const handleCloseDetailCard = useCallback(() => {
    setSelectedListing(null);
  }, []);

  return (
    <div className="w-full h-screen relative">
      {" "}
      {/* Container for full screen map */}
      {/* Map takes full screen */}
      <MapComponent onMarkerClick={handleMarkerClick} />{" "}
      {/* Updated component name */}
      {/* Search Bar overlaid at the top */}
      <div className="absolute top-0 left-0 right-0 p-4 z-10">
        <SearchBar
          className="max-w-md mx-auto" // Center and limit width for aesthetics
          onSearch={(query) => {
            console.log("Search triggered for:", query);
            // Implement search logic here
          }}
        />
      </div>
      {/* Details/Listings will be overlaid or shown in a modal/panel later based on map interaction */}
      <ListingDetailCard
        listing={selectedListing}
        onClose={handleCloseDetailCard}
      />
    </div>
  );
}
