'use server';

import { supabase } from '@/lib/supabase/server'; 
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db'; // ✅ Use the shared singleton

export async function createPropertyAction(formData: FormData) {
  const title = formData.get('title') as string;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const description = formData.get('description') as string;
  const location = formData.get('location') as string;
  const price = parseFloat(formData.get('price') as string) || 0;

  // New filter category fields
  const propertyType = formData.get('propertyType') as string || 'Residential Plot';
  const listingType = formData.get('listingType') as string || 'sale';
  const bedrooms = parseInt(formData.get('bedrooms') as string) || 0;
  const approval = formData.get('approval') as string || 'RERA Registered';
  const areaSqft = parseFloat(formData.get('areaSqft') as string) || 1200;
  const furnishing = formData.get('furnishing') as string || 'Unfurnished';

  const frontLength = parseFloat(formData.get('frontLength') as string) || 0;
  const backLength = parseFloat(formData.get('backLength') as string) || 0;
  const leftLength = parseFloat(formData.get('leftLength') as string) || 0;
  const rightLength = parseFloat(formData.get('rightLength') as string) || 0;
  const diagonal = parseFloat(formData.get('diagonal') as string) || null;
  const roadSide = formData.get('roadSide') as string || 'Front';
  const roadWidth = parseFloat(formData.get('roadWidth') as string) || 0;
  const northDirection = formData.get('northDirection') as string || 'Front';

  const imageFiles = formData.getAll('propertyImages') as File[];
  const uploadedImageUrls: string[] = [];

  try {
    // 1. Upload each image to Supabase Storage
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `listings/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Storage upload warning:', uploadError.message);
          continue;
        }

        const { data: publicUrlData } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) {
          uploadedImageUrls.push(publicUrlData.publicUrl);
        }
      }
    }

    const primaryImageUrl = uploadedImageUrls[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa';

    // 2. Save property, filters, and images using Prisma
    await prisma.property.create({
      data: {
        title,
        slug,
        description,
        location,
        price,
        imageUrl: primaryImageUrl,
        propertyType,
        listingType,
        bedrooms,
        approval,
        areaSqft,
        frontLength,
        backLength,
        leftLength,
        rightLength,
        diagonal,
        roadSide,
        roadWidth,
        northDirection,
        images: {
          create: uploadedImageUrls.map((url, index) => ({
            imageUrl: url,
            isPrimary: index === 0,
          })),
        },
      },
    });

    revalidatePath('/properties');
    revalidatePath('/admin/properties');
    return { success: true, message: 'Property, filter tags, and photos saved successfully!' };
  } catch (error: any) {
    console.error('Failed to create property with Prisma:', error);
    return { success: false, message: error.message || 'Failed to post property.' };
  }
}

export async function updatePropertyAction(propertyId: string, formData: FormData) {
  const title = formData.get('title') as string;
  const slug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : undefined;
  const description = formData.get('description') as string;
  const location = formData.get('location') as string;
  const price = parseFloat(formData.get('price') as string) || 0;

  const propertyType = formData.get('propertyType') as string || 'Residential Plot';
  const listingType = formData.get('listingType') as string || 'sale';
  const bedrooms = parseInt(formData.get('bedrooms') as string) || 0;
  const approval = formData.get('approval') as string || 'RERA Registered';
  const areaSqft = parseFloat(formData.get('areaSqft') as string) || 1200;
  const furnishing = formData.get('furnishing') as string || 'Unfurnished';

  const frontLength = parseFloat(formData.get('frontLength') as string) || 0;
  const backLength = parseFloat(formData.get('backLength') as string) || 0;
  const leftLength = parseFloat(formData.get('leftLength') as string) || 0;
  const rightLength = parseFloat(formData.get('rightLength') as string) || 0;
  const diagonal = parseFloat(formData.get('diagonal') as string) || null;
  const roadSide = formData.get('roadSide') as string || 'Front';
  const roadWidth = parseFloat(formData.get('roadWidth') as string) || 0;
  const northDirection = formData.get('northDirection') as string || 'Front';

  try {
    await prisma.property.update({
      where: { id: propertyId },
      data: {
        ...(title && { title, slug }),
        description,
        location,
        price,
        propertyType,
        listingType,
        bedrooms,
        approval,
        areaSqft,
        frontLength,
        backLength,
        leftLength,
        rightLength,
        diagonal,
        roadSide,
        roadWidth,
        northDirection,
      },
    });

    revalidatePath('/properties');
    revalidatePath('/admin/properties');
    return { success: true, message: 'Property updated successfully!' };
  } catch (error: any) {
    console.error('Failed to update property with Prisma:', error);
    return { success: false, message: error.message || 'Failed to update property.' };
  }
}

export async function deletePropertyAction(propertyId: string) {
  try {
    await prisma.property.delete({
      where: { id: propertyId },
    });
    revalidatePath('/properties');
    revalidatePath('/admin/properties');
    return { success: true, message: 'Property deleted successfully!' };
  } catch (error: any) {
    console.error('Failed to delete property:', error);
    return { success: false, message: error.message || 'Failed to delete property.' };
  }
}