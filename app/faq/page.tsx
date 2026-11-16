import { supabase } from '@/lib/supabase/server';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { Faq } from '@/lib/types';

export const revalidate = 3600;

export const metadata = {
  title: 'Frequently Asked Questions',
  description: 'Answers to common questions about buying, renting, and listing properties in Madurai.',
};

export default async function FaqPage() {
  const { data } = await supabase
    .from('faqs')
    .select('*')
    .eq('active', true)
    .order('sort_order');

  const faqs = (data ?? []) as Faq[];
  const categorySet: { [key: string]: boolean } = {};
  faqs.forEach((f) => { categorySet[f.category] = true; });
  const categories = Object.keys(categorySet);

  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold sm:text-4xl">Frequently Asked Questions</h1>
        <p className="mt-2 text-muted-foreground">Everything you need to know about property in Madurai</p>

        <div className="mt-8 space-y-8">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="mb-3 text-lg font-semibold capitalize">{category}</h2>
              <Accordion type="single" collapsible className="rounded-lg border px-4">
                {faqs.filter((f) => f.category === category).map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-sm font-medium text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
