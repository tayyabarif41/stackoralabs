export default function BlogSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
          <div className="w-full h-[180px] bg-[var(--bg-3)] animate-pulse" />
          <div className="p-5 space-y-3">
            <div className="h-2.5 w-16 bg-[var(--bg-3)] rounded-full animate-pulse" />
            <div className="h-4 w-4/5 bg-[var(--bg-3)] rounded-full animate-pulse" />
            <div className="h-4 w-3/5 bg-[var(--bg-3)] rounded-full animate-pulse" />
            <div className="h-3 w-full bg-[var(--bg-3)] rounded-full animate-pulse" />
            <div className="h-3 w-5/6 bg-[var(--bg-3)] rounded-full animate-pulse" />
            <div className="flex items-center gap-2 pt-2">
              <div className="w-6 h-6 rounded-full bg-[var(--bg-3)] animate-pulse" />
              <div className="h-3 w-20 bg-[var(--bg-3)] rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
