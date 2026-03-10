export const StatementSkeleton = () => (
  <div className="space-y-4 p-2">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center justify-between p-3 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200"></div>
          <div className="space-y-2">
            <div className="w-32 h-3 bg-slate-200 rounded"></div>
            <div className="w-20 h-2 bg-slate-100 rounded"></div>
          </div>
        </div>
        <div className="w-16 h-4 bg-slate-200 rounded"></div>
      </div>
    ))}
  </div>
);
