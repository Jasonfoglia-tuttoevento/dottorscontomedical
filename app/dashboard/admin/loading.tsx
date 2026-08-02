export default function AdminDashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse space-y-7">
      <div className="h-52 rounded-3xl bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-40 rounded-3xl bg-slate-200" />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]">
        <div className="h-96 rounded-3xl bg-slate-200" />
        <div className="h-96 rounded-3xl bg-slate-200" />
      </div>
    </div>
  );
}
