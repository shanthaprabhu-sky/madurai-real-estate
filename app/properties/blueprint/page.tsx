import InteractiveLayoutBlueprint from '@/components/blueprint/interactive-layout';

export const metadata = {
  title: 'Interactive Architectural Blueprint | Madurai Property Hub',
  description: 'Inspect our Madurai township layout with CAD floor plans for every individual plot.',
};

export default function BlueprintPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <InteractiveLayoutBlueprint />
    </div>
  );
}