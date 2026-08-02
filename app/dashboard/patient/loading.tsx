export default function PatientDashboardLoading() {
  return (
    <div className="min-h-screen animate-pulse bg-gray-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="h-20 rounded-2xl bg-white" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-28 rounded-2xl bg-white" />)}
        </div>
        <div className="h-72 rounded-2xl bg-white" />
      </div>
    </div>
  );
}
