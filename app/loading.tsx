export default function GlobalLoading() {
  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {/* Top Amber Progress Bar */}
      <div className="h-1 w-full bg-amber-100 overflow-hidden">
        <div className="h-full w-1/2 bg-amber-600 animate-pulse rounded-r-full" />
      </div>
    </div>
  );
}