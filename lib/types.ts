export interface Locality {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  popular: boolean;
  property_count: number;
}

export interface Builder {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  rera_registration: string | null;
  website: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
}

export interface Project {
  id: string;
  builder_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  locality_id: string | null;
  rera_registration: string | null;
  brochure_url: string | null;
  possession_date: string | null;
  total_units: number | null;
  price_range_min: number | null;
  price_range_max: number | null;
  status: string;
  latitude: number | null;
  longitude: number | null;
  featured: boolean;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  listing_type: string;
  property_type: string;
  project_id: string | null;
  builder_id: string | null;
  locality_id: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  price: number;
  rent_amount: number | null;
  security_deposit: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  area_sqft: number | null;
  area_cents: number | null;
  area_acres: number | null;
  furnishing: string | null;
  facing: string | null;
  floor_number: string | null;
  total_floors: number | null;
  age_years: number | null;
  approval: string | null;
  verified: boolean;
  status: string;
  featured: boolean;
  virtual_tour_url: string | null;
  video_url: string | null;
  owner_name: string | null;
  owner_phone: string | null;
  owner_email: string | null;
  created_by: string | null;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
}

export interface PropertyFloorPlan {
  id: string;
  project_id: string | null;
  property_id: string | null;
  image_url: string;
  label: string | null;
  sort_order: number;
  created_at: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string | null;
  category: string;
}

export interface PropertyAmenity {
  amenity: Amenity;
}

export interface PropertyWithRelations extends Property {
  locality?: Locality | null;
  builder?: Builder | null;
  project?: Project | null;
  images?: PropertyImage[];
  amenities?: PropertyAmenity[];
}

export interface Enquiry {
  id: string;
  property_id: string | null;
  user_id: string | null;
  name: string;
  email: string | null;
  phone: string;
  message: string | null;
  enquiry_type: string;
  status: string;
  preferred_date: string | null;
  preferred_time: string | null;
  created_at: string;
}

export interface Favourite {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
}

export interface SavedSearch {
  id: string;
  user_id: string;
  name: string;
  filters: Record<string, unknown>;
  alert_enabled: boolean;
  alert_frequency: string;
  created_at: string;
}

export interface RecentlyViewed {
  id: string;
  user_id: string;
  property_id: string;
  viewed_at: string;
}

export interface Comparison {
  id: string;
  user_id: string;
  property_id: string;
  sort_order: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  author_name: string | null;
  category: string | null;
  tags: string[] | null;
  published: boolean;
  published_at: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  text: string;
  avatar_url: string | null;
  active: boolean;
  sort_order: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  link_url: string | null;
  button_text: string | null;
  active: boolean;
  sort_order: number;
}

export interface Faq {
  id: string;
  category: string;
  question: string;
  answer: string;
  sort_order: number;
  active: boolean;
}

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}
