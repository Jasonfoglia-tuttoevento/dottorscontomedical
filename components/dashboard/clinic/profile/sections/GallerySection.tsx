"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, Image, Trash2, Plus, X } from "lucide-react";

interface Clinic {
  id: string;
  logo_url: string | null;
  cover_url: string | null;
}

export default function GallerySection({ clinic }: { clinic: Clinic }) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState(clinic.logo_url || "");
  const [coverUrl, setCoverUrl] = useState(clinic.cover_url || "");
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const uploadImage = async (file: File, type: "logo" | "cover") => {
    setUploading(type);

    const fileExt = file.name.split(".").pop();
    const fileName = `${clinic.id}-${type}-${Date.now()}.${fileExt}`;
    const filePath = `clinics/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      alert("Errore nel caricamento: " + uploadError.message);
      setUploading(null);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    if (type === "logo") {
      setLogoUrl(publicUrl);
      await supabase.from("clinics").update({ logo_url: publicUrl }).eq("id", clinic.id);
    } else {
      setCoverUrl(publicUrl);
      await supabase.from("clinics").update({ cover_url: publicUrl }).eq("id", clinic.id);
    }

    setUploading(null);
    alert("Immagine caricata con successo!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "cover") => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Il file deve essere inferiore a 5MB");
        return;
      }
      uploadImage(file, type);
    }
  };

  return (
    <section id="gallery" className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Galleria Foto</h2>
        <p className="text-sm text-gray-600 mt-1">
          Logo e foto di copertina della tua clinica
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Logo */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Logo Clinica
          </label>
          <div className="flex items-start gap-6">
            {/* Preview */}
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50 overflow-hidden">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="w-full h-full object-contain p-2" />
              ) : (
                <Image className="w-12 h-12 text-gray-300" />
              )}
            </div>

            {/* Upload */}
            <div className="flex-1">
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "logo")}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                disabled={uploading === "logo"}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg font-medium text-sm hover:bg-gray-50 transition disabled:opacity-50"
              >
                {uploading === "logo" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    Caricamento...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Carica Logo
                  </>
                )}
              </button>
              <p className="text-xs text-gray-500 mt-2">
                PNG, JPG o SVG. Max 5MB. Consigliato: 512x512px
              </p>
            </div>
          </div>
        </div>

        {/* Cover */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Foto di Copertina
          </label>
          <div className="space-y-4">
            {/* Preview */}
            <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50 overflow-hidden relative">
              {coverUrl ? (
                <>
                  <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
                  <button
                    onClick={() => {
                      setCoverUrl("");
                      supabase.from("clinics").update({ cover_url: null }).eq("id", clinic.id);
                    }}
                    className="absolute top-3 right-3 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="text-center text-gray-400">
                  <Image className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Nessuna foto di copertina</p>
                </div>
              )}
            </div>

            {/* Upload */}
            <div>
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "cover")}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                disabled={uploading === "cover"}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg font-medium text-sm hover:bg-gray-50 transition disabled:opacity-50"
              >
                {uploading === "cover" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    Caricamento...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Carica Foto di Copertina
                  </>
                )}
              </button>
              <p className="text-xs text-gray-500 mt-2">
                JPG o PNG. Max 5MB. Consigliato: 1200x400px
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}