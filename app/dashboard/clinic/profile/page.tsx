import ClinicProfileForm from "@/components/dashboard/clinic/profile/ClinicProfileForm";
import ClinicProfileSidebar from "@/components/dashboard/clinic/profile/ClinicProfileSidebar";

export default function ClinicProfilePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profilo Clinica</h1>
        <p className="text-gray-600">Gestisci le informazioni della tua clinica</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <ClinicProfileSidebar />
        </div>

        {/* Main Form */}
        <div className="lg:col-span-3">
          <ClinicProfileForm />
        </div>
      </div>
    </div>
  );
}