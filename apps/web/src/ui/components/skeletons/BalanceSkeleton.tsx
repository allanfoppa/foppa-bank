export const BalanceSkeleton = () => (
  <div className="bg-slate-200 animate-pulse rounded-3xl p-8 h-[180px] w-full relative overflow-hidden">
    <div className="w-24 h-4 bg-slate-300 rounded mb-4"></div>
    <div className="w-48 h-10 bg-slate-300 rounded"></div>
    <div className="mt-6 flex gap-3">
      <div className="w-32 h-6 bg-slate-300 rounded-full"></div>
    </div>
  </div>
);
