import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const builders = await prisma.builder.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(builders);
  } catch (error: any) {
    console.error('API Error fetching builders:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const name = body.name || 'Unnamed Builder';
    const reraNumber = body.reraNumber || body.rera_number || '';
    const projectsCount = parseInt(body.projectsCount || body.projects_count) || 0;
    const description = body.description || '';
    const imageUrl = body.imageUrl || body.image_url || 'https://images.unsplash.com/photo-1541888946425-d0fbb18f7243';

    const newBuilder = await prisma.builder.create({
      data: {
        name,
        reraNumber,
        projectsCount,
        description,
        imageUrl,
      },
    });

    return NextResponse.json({ success: true, builder: newBuilder });
  } catch (error: any) {
    console.error('API Error creating builder:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}