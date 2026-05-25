export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
        <p className="text-sm text-gray-400 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
