import { createClient } from "@/lib/supabase/server";

export default async function TestConnection() {
  const supabase = await createClient();
  
  // Test semplice: prova a fare una query
  const { data, error } = await supabase.from("profiles").select("count").limit(1);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Test Connessione Supabase
        </h1>
        
        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            <p className="font-semibold mb-2">❌ Errore di connessione</p>
            <p className="text-sm">{error.message}</p>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
            <p className="font-semibold mb-2">✅ Connessione riuscita!</p>
            <p className="text-sm">Supabase è connesso correttamente.</p>
            {data && <p className="text-xs mt-2">Dati: {JSON.stringify(data)}</p>}
          </div>
        )}
        
        <div className="mt-6 text-center">
          <a href="/" className="text-blue-600 hover:underline">
            ← Torna alla homepage
          </a>
        </div>
      </div>
    </div>
  );
}