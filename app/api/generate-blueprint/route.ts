import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini with the server-side environment variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { landData, requirements } = await req.json();

    const prompt = `
      Act as an expert residential architect and Vastu specialist. 
      Generate a precise architectural floor plan configuration for a plot with dimensions: Front ${landData.front}ft, Depth ${landData.left}ft.
      User Configurations: BHK: ${requirements.bhk}, Floors: ${requirements.floors}, Parking: ${requirements.parking}.
      
      Return a valid JSON object containing an array of rooms named "rooms", where each room has:
      - id (string)
      - name (string)
      - width (number in feet)
      - length (number in feet)
      - x (number coordinate)
      - y (number coordinate)
      - areaSqFt (number)
      Ensure no rooms overlap and dimensions scale properly to fit within the plot boundary.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('No response text received from Gemini');
    }

    return NextResponse.json(JSON.parse(text));
  } catch (error: any) {
    console.error('Gemini Blueprint Generation Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate blueprint' }, { status: 500 });
  }
}