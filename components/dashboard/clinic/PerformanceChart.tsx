export default function PerformanceChart() {
  const data = [
    { month: "Gen", leads: 12 },
    { month: "Feb", leads: 18 },
    { month: "Mar", leads: 24 },
    { month: "Apr", leads: 20 },
    { month: "Mag", leads: 28 },
    { month: "Giu", leads: 24 },
  ];

  const maxValue = Math.max(...data.map((d) => d.leads));

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Andamento Lead</h3>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">{item.month}</span>
              <span className="text-gray-600">{item.leads} lead</span>
            </div>
            <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500"
                style={{ width: `${(item.leads / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}