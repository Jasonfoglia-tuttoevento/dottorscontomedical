export default function ClinicDashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse space-y-6">
      <div className="h-72 rounded-3xl bg-gray-200" />
      <div className="grid gap-4 xl:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => <div key={index} className="h-44 rounded-2xl bg-gray-200" />)}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => <div key={index} className="h-44 rounded-2xl bg-gray-200" />)}
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="h-[32rem] rounded-2xl bg-gray-200 xl:col-span-2" />
        <div className="h-[32rem] rounded-2xl bg-gray-200" />
      </div>
    </div>
  );
}
