'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createLeadAction(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !phone || !message) {
    return { success: false, message: 'Please fill in all required fields (Name, Phone, Message).' };
  }

  try {
    await prisma.lead.create({
      data: {
        name,
        phone,
        email: email || null,
        message,
        status: 'NEW',
      },
    });

    revalidatePath('/admin/leads', 'page');
    revalidatePath('/admin', 'layout');
    return { success: true, message: 'Your message has been sent successfully! Our team will contact you soon.' };
  } catch (error: any) {
    console.error('Failed to create lead:', error);
    return { success: false, message: error.message || 'Failed to submit inquiry. Please try again.' };
  }
}

export async function updateLeadStatusAction(leadId: string, status: string) {
  try {
    await prisma.lead.update({
      where: { id: leadId },
      data: { status },
    });

    revalidatePath('/admin/leads', 'page');
    revalidatePath('/admin', 'layout');
    return { success: true, message: 'Status updated successfully!' };
  } catch (error: any) {
    console.error('Failed to update lead status:', error);
    return { success: false, message: error.message || 'Failed to update status.' };
  }
}

export async function deleteLeadAction(leadId: string) {
  try {
    await prisma.lead.delete({
      where: { id: leadId },
    });

    revalidatePath('/admin/leads', 'page');
    revalidatePath('/admin', 'layout');
    return { success: true, message: 'Lead inquiry deleted successfully!' };
  } catch (error: any) {
    console.error('Failed to delete lead:', error);
    return { success: false, message: error.message || 'Failed to delete lead.' };
  }
}