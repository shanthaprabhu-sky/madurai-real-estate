'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteProperty(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;

  try {
    await prisma.property.delete({
      where: { id },
    });
    revalidatePath('/admin/properties');
  } catch (error) {
    console.error('Error deleting property:', error);
  }
}