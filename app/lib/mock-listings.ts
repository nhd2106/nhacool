export interface Listing {
  id: string;
  title: string;
  address: string;
  price: string;
  type: 'apartment' | 'house' | 'room';
  bedrooms: number;
  bathrooms: number;
  area: number; // in square meters
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  amenities: string[];
  description: string;
}

// Helper function to generate random coordinates around a central point
function getRandomCoordinates(centerLat: number, centerLng: number, radiusKm: number) {
  const y0 = centerLat;
  const x0 = centerLng;
  // Convert radius from kilometers to degrees
  const rd = radiusKm / 111.32; // 1 degree = 111.32 km

  const u = Math.random();
  const v = Math.random();

  const w = rd * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  // Adjust the x-coordinate for the shrinking of the east-west distances
  const newLng = x / Math.cos(y0 * Math.PI / 180);

  return {
    lat: parseFloat((y0 + y).toFixed(6)),
    lng: parseFloat((x0 + newLng).toFixed(6)),
  };
}

const HCMC_CENTER_DEFAULT = { lat: 10.7769, lng: 106.7009 }; // Default center
const propertyTypes: Array<'apartment' | 'house' | 'room'> = ['apartment', 'house', 'room'];
const sampleAmenities = [
  'WiFi', 'Máy lạnh', 'Chỗ đậu xe', 'Ban công', 'Nội thất đầy đủ', 
  'Gần chợ', 'An ninh 24/7', 'Cho nuôi thú cưng', 'Giờ giấc tự do'
];

export function generateMockListings(
  centerLat: number = HCMC_CENTER_DEFAULT.lat,
  centerLng: number = HCMC_CENTER_DEFAULT.lng,
  count: number = 20,
  radiusKm: number = 5
): Listing[] {
  return Array.from({ length: count }, (_, i) => {
    const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const numBedrooms = type === 'room' ? 1 : Math.floor(Math.random() * 4) + 1;
    const numBathrooms = type === 'room' ? 1 : Math.floor(Math.random() * numBedrooms) + 1;
    const area = type === 'room' ? Math.floor(Math.random() * 20) + 15 : Math.floor(Math.random() * 100) + 40;
    const priceValue = type === 'room' ? (Math.random() * 5 + 2).toFixed(1) :
                       type === 'apartment' ? (Math.random() * 15 + 7).toFixed(1) :
                       (Math.random() * 30 + 10).toFixed(1);
    
    const numAmenities = Math.floor(Math.random() * 4) + 2; // 2 to 5 amenities
    const currentAmenities = [...sampleAmenities].sort(() => 0.5 - Math.random()).slice(0, numAmenities);

    return {
      id: `listing-${i + 1}`,
      title: `${type === 'room' ? 'Phòng cho thuê' : type === 'apartment' ? 'Căn hộ cho thuê' : 'Nhà cho thuê'} #${i + 1}`,
      address: `Địa chỉ ${i + 1}, Gần vị trí của bạn`,
      price: `${priceValue} triệu/tháng`,
      type: type,
      bedrooms: numBedrooms,
      bathrooms: numBathrooms,
      area: area,
      imageUrl: `https://picsum.photos/seed/nhacool${i+1}/400/300`,
      coordinates: getRandomCoordinates(centerLat, centerLng, radiusKm),
      amenities: currentAmenities,
      description: `Mô tả chi tiết cho ${type} #${i + 1}. Không gian ${area}m², ${numBedrooms} phòng ngủ, ${numBathrooms} phòng vệ sinh. ${currentAmenities.join(', ')}. Giá thuê: ${priceValue} triệu/tháng.`
    };
  });
}
