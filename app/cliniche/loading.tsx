export default function ClinicsLoading() {
  return (
    <div className="min-h-screen bg-[#F2F4F7] px-4 py-12 sm:px-6" aria-busy="true" aria-label="Caricamento cliniche">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-10 w-72 max-w-full rounded-lg bg-gray-200" />
        <div className="mt-8 h-36 rounded-3xl bg-white" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="h-96 rounded-3xl bg-white" />
          ))}
        </div>
      </div>
    </div>
  );
}
