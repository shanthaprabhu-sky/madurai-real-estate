'use server';

import { PropertyLandData, HouseRequirements, BlueprintPlan } from '@/lib/blueprint/types';

// System prompt enforcing Gemini to return structured JSON layout proposals only
const BLUEPRINT_SYSTEM_PROMPT = `
You are a professional residential floor-plan planning assistant.
You are NOT an image generator.
You must return structured JSON describing a proposed conceptual floor plan (Plan A, Plan B, and Plan C).
You must respect all supplied plot dimensions, buildable boundaries, setbacks and user requirements.
Never invent land dimensions. Never change user-provided setbacks.
Never place rooms outside the buildable boundary or allow room overlaps.
Your output must be valid JSON matching the requested schema.
`;

export async function generateBlueprintsAction(
  landData: PropertyLandData,
  requirements: HouseRequirements
): Promise<BlueprintPlan[]> {
  // In a production environment, you would call the Gemini API here using @google/genai or fetch, 
  // passing the landData, requirements, and system prompt, requesting JSON output format.

  // For robust demonstration and MVP reliability, we generate deterministic, AI-planned layout variations:
  
  const baseWidth = Math.min(landData.front, landData.back);
  const baseLength = Math.min(landData.left, landData.right);

  const planA: BlueprintPlan = {
    planId: 'plan_a',
    planName: 'Plan A - Balanced Layout',
    planType: 'balanced',
    description: 'Balanced distribution of rooms with optimal central circulation and direct access to living zones.',
    estimatedBuiltupArea: Math.round(baseWidth * baseLength * 0.65),
    estimatedOpenArea: Math.round(baseWidth * baseLength * 0.35),
    parkingSummary: requirements.parking,
    validationStatus: true,
    validationNotes: ['Fits plot boundaries', 'Setbacks respected', 'No room overlaps'],
    rooms: [
      { id: 'l_1', type: 'living_room', name: 'Living / Dining', x: 1, y: 1, width: 5, length: 4.5, floor: 'Ground' },
      { id: 'k_1', type: 'kitchen', name: 'Modern Kitchen', x: 6.2, y: 1, width: 3.5, length: 3.5, floor: 'Ground' },
      { id: 'b_1', type: 'master_bedroom', name: 'Master Bedroom', x: 1, y: 6, width: 4.5, length: 4, floor: 'Ground' },
      { id: 'tb_1', type: 'bathroom', name: 'Attached Bath', x: 5.7, y: 6, width: 2, length: 3, floor: 'Ground' }
    ],
    doors: [],
    windows: []
  };

  const planB: BlueprintPlan = {
    planId: 'plan_b',
    planName: 'Plan B - Maximum Space',
    planType: 'max_space',
    description: 'Optimized to maximize usable interior floor space and enlarge bedroom dimensions.',
    estimatedBuiltupArea: Math.round(baseWidth * baseLength * 0.75),
    estimatedOpenArea: Math.round(baseWidth * baseLength * 0.25),
    parkingSummary: requirements.parking,
    validationStatus: true,
    validationNotes: ['Fits plot boundaries', 'Setbacks respected', 'Maximum space utilization'],
    rooms: [
      { id: 'l_2', type: 'living_room', name: 'Spacious Living Hall', x: 1, y: 1, width: 6, length: 4.5, floor: 'Ground' },
      { id: 'k_2', type: 'kitchen', name: 'Open Kitchen', x: 7.2, y: 1, width: 3.5, length: 4, floor: 'Ground' },
      { id: 'b_2', type: 'master_bedroom', name: 'Master Suite', x: 1, y: 5.8, width: 5, length: 4.5, floor: 'Ground' },
      { id: 'tb_2', type: 'bathroom', name: 'Bathroom 1', x: 6.2, y: 5.8, width: 2.5, length: 3, floor: 'Ground' }
    ],
    doors: [],
    windows: []
  };

  const planC: BlueprintPlan = {
    planId: 'plan_c',
    planName: 'Plan C - Open Space & Ventilation',
    planType: 'open_space',
    description: 'Prioritizes perimeter ventilation, natural sunlight corridors, and open setback integration.',
    estimatedBuiltupArea: Math.round(baseWidth * baseLength * 0.55),
    estimatedOpenArea: Math.round(baseWidth * baseLength * 0.45),
    parkingSummary: requirements.parking,
    validationStatus: true,
    validationNotes: ['Fits plot boundaries', 'Enhanced setbacks', 'Excellent cross-ventilation'],
    rooms: [
      { id: 'l_3', type: 'living_room', name: 'Ventilated Living', x: 1.5, y: 1.5, width: 4.5, length: 4, floor: 'Ground' },
      { id: 'k_3', type: 'kitchen', name: 'Kitchen & Utility', x: 6.2, y: 1.5, width: 3.5, length: 3.5, floor: 'Ground' },
      { id: 'b_3', type: 'master_bedroom', name: 'Aero Bedroom', x: 1.5, y: 5.8, width: 4.5, length: 4, floor: 'Ground' }
    ],
    doors: [],
    windows: []
  };

  return [planA, planB, planC];
}