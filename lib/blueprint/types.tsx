export type OrientationSide = 'Front' | 'Back' | 'Left' | 'Right';

export interface PropertyLandData {
  propertyId: string;
  front: number;      // metres or feet
  back: number;
  left: number;
  right: number;
  diagonal?: number;
  roadSide: OrientationSide;
  roadWidth: number;
  northDirection: OrientationSide;
}

export interface HouseRequirements {
  bhk: '2BHK' | '3BHK' | '4BHK';
  floors: 'Ground' | 'Ground + 1' | 'Ground + 2';
  parking: 'No parking' | 'Bike parking' | 'Car parking' | 'Car + Bike parking';
  carCount?: number;
  bikeCount?: number;
  totalBathrooms: number;
  attachedBathrooms: number;
  commonBathrooms: number;
  kitchenType: 'Normal/Closed Kitchen' | 'Open Kitchen' | 'Open Kitchen + Dining';
  additionalRooms: string[]; // e.g. ['Pooja Room', 'Store Room', 'Utility Room']
  staircase: 'Inside' | 'Outside' | 'AI Recommended';
  balcony: 'No Balcony' | 'Front' | 'Back' | 'Side' | 'Multiple';
  openSpacePreference: 'Front' | 'Back' | 'Both' | 'Maximum Possible';
  setbacks: {
    front: number;
    back: number;
    left: number;
    right: number;
  };
}

export interface RoomLayoutItem {
  id: string;
  type: string;
  name: string;
  x: number;      // offset from buildable origin (metres/feet)
  y: number;
  width: number;
  length: number;
  floor: string;
}

export interface BlueprintPlan {
  planId: string;
  planName: string; // e.g., "Plan A - Balanced Layout"
  planType: 'balanced' | 'max_space' | 'open_space';
  description: string;
  estimatedBuiltupArea: number;
  estimatedOpenArea: number;
  parkingSummary: string;
  validationStatus: boolean;
  validationNotes: string[];
  rooms: RoomLayoutItem[];
  doors: { x: number; y: number; width: number; orientation: string }[];
  windows: { x: number; y: number; width: number }[];
  stairs?: { x: number; y: number; width: number; length: number }[];
}

// Deterministic Geometry Helper: Area & Buildable Zone Calculations
export function calculateLandMetrics(land: PropertyLandData, setbacks: HouseRequirements['setbacks']) {
  const avgLength = (land.front + land.back) / 2;
  const avgWidth = (land.left + land.right) / 2;
  const estimatedArea = avgLength * avgWidth;

  // Buildable region bounds
  const buildableWidth = Math.max(0, avgWidth - (setbacks.left + setbacks.right));
  const buildableLength = Math.max(0, avgLength - (setbacks.front + setbacks.back));
  const buildableArea = buildableWidth * buildableLength;

  return {
    estimatedArea,
    buildableArea,
    buildableWidth,
    buildableLength
  };
}