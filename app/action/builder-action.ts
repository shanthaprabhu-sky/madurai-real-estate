'use server';

import { prisma } from '@/lib/db';
import { supabase } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createBuilderAction(formData: FormData) {
  const name = formData.get('name') as string;
  const reraNumber = formData.get('reraNumber') as string;
  const projectsCount = parseInt(formData.get('projectsCount') as string) || 0;
  const description = formData.get('description') as string;
  const imageFile = formData.get('builderImage') as File;

  let imageUrl = 'https://images.unsplash.com/photo-1541888946425-d0fbb18f7243';

  try {
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `builder-${Date.now()}.${fileExt}`;
      const filePath = `builders/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, imageFile);

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) {
          imageUrl = publicUrlData.publicUrl;
        }
      }
    }

    await prisma.builder.create({
      data: {
        name,
        reraNumber,
        projectsCount,
        description,
        imageUrl,
      },
    });

    revalidatePath('/builders');
    revalidatePath('/admin/builders');
    return { success: true, message: 'Builder profile published successfully!' };
  } catch (error: any) {
    console.error('Failed to create builder:', error);
    return { success: false, message: error.message || 'Failed to publish builder.' };
  }
}