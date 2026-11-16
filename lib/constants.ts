export const COMPANY = {
  name: 'Madurai Real Estate',
  tagline: 'Find Your Dream Home in the Temple City',
  phone: '+91 98658 71173',
  whatsapp: '919865871173',
  email: 'info@maduraipropertyhub.in',
  address: '121, Tallakulam Main Road, Madurai, Tamil Nadu 625002',
  reraRegistration: 'TN/29/2024/RA0001',
  mapsEmbedKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
};

export const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'independent_house', label: 'Independent House' },
  { value: 'plot', label: 'Residential Plot' },
  { value: 'shop', label: 'Commercial Shop' },
  { value: 'office', label: 'Office Space' },
  { value: 'commercial', label: 'Commercial' },
] as const;

export const LISTING_TYPES = [
  { value: 'buy', label: 'Buy' },
  { value: 'rent', label: 'Rent' },
] as const;

export const FURNISHING_TYPES = [
  { value: 'unfurnished', label: 'Unfurnished' },
  { value: 'semi_furnished', label: 'Semi-Furnished' },
  { value: 'fully_furnished', label: 'Fully Furnished' },
] as const;

export const APPROVAL_TYPES = [
  { value: 'dtcp', label: 'DTCP Approved' },
  { value: 'rera', label: 'RERA Registered' },
  { value: 'cmda', label: 'CMDA Approved' },
  { value: 'none', label: 'Not Available' },
] as const;

export const FACING_DIRECTIONS = [
  'North', 'South', 'East', 'West',
  'North-East', 'North-West', 'South-East', 'South-West',
];

export const BUDGET_RANGES = [
  { label: 'Under 20 Lakhs', min: 0, max: 2000000 },
  { label: '20 - 50 Lakhs', min: 2000000, max: 5000000 },
  { label: '50 Lakhs - 1 Crore', min: 5000000, max: 10000000 },
  { label: '1 - 2 Crores', min: 10000000, max: 20000000 },
  { label: 'Above 2 Crores', min: 20000000, max: 100000000 },
];

export const BHK_OPTIONS = [
  { value: '1', label: '1 BHK' },
  { value: '2', label: '2 BHK' },
  { value: '3', label: '3 BHK' },
  { value: '4', label: '4 BHK' },
  { value: '4+', label: '4+ BHK' },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'area_large', label: 'Area: Large to Small' },
  { value: 'area_small', label: 'Area: Small to Large' },
];

export const formatPrice = (price: number, listingType?: string) => {
  if (listingType === 'rent') {
    return `₹${price.toLocaleString('en-IN')}/mo`;
  }
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} Lakhs`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
};

export const formatArea = (sqft: number | null | undefined, cents: number | null | undefined) => {
  if (sqft) return `${sqft.toLocaleString('en-IN')} sq.ft`;
  if (cents) return `${cents} cents`;
  return '—';
};

export const formatPricePerSqft = (price: number, sqft: number | null | undefined) => {
  if (!sqft || sqft === 0) return '';
  const perSqft = Math.round(price / sqft);
  return `₹${perSqft.toLocaleString('en-IN')}/sq.ft`;
};
