"use client";

import { useRef, useState } from "react";
import { Image as ImageIcon, Trash2, Upload } from "lucide-react";
import ProfileSaveMessage, { type ProfileSaveState } from "@/components/clinics/profile/ProfileSaveMessage";
import { createClient } from "@/lib/supabase/client";
import type { Clinic } from "@/lib/types/database";

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export default function GallerySection({ clinic }: { clinic: Clinic }) {
  const [uploading, setUploading] = useState<"logo" | "cover" | null>(null);
  const [removingCover, setRemovingCover] = useState(false);
  const [message, setMessage] = useState<ProfileSaveState | null>(null);
  const [logoUrl, setLogoUrl] = useState(clinic.logo_url || "");
  const [coverUrl, setCoverUrl] = useState(clinic.cover_url || "");
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const uploadImage = async (file: File, type: "logo" | "cover") => {
    setMessage(null);

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      setMessage({ kind: "error", text: "Formato non supportato. Usa JPG, PNG o WEBP." });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ kind: "error", text: "Il file deve essere inferiore a 5 MB." });
      return;
    }

    setUploading(type);
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filePath = `clinics/${clinic.id}-${type}-${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file, { upsert: false, contentType: file.type });

    if (uploadError) {
      setMessage({ kind: "error", text: `Caricamento non riuscito: ${uploadError.message}` });
      setUploading(null);
      return;
    }

    const { data: publicData } = supabase.storage.from("images").getPublicUrl(filePath);
    const publicUrl = publicData.publicUrl;
    const field = type === "logo" ? "logo_url" : "cover_url";
    const { data, error: updateError } = await supabase
      .from("clinics")
      .update({ [field]: publicUrl })
      .eq("id", clinic.id)
      .select("id")
      .maybeSingle();

    if (updateError || !data) {
      await supabase.storage.from("images").remove([filePath]);
      setMessage({ kind: "error", text: updateError?.message || "Immagine caricata ma profilo non aggiornato." });
      setUploading(null);
      return;
    }

    if (type === "logo") setLogoUrl(publicUrl);
    else setCoverUrl(publicUrl);

    setMessage({ kind: "success", text: type === "logo" ? "Logo aggiornato." : "Copertina aggiornata." });
    setUploading(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: "logo" | "cover") => {
    const file = event.target.files?.[0];
    if (file) void uploadImage(file, type);
    event.target.value = "";
  };

  const removeCover = async () => {
    if (!window.confirm("Rimuovere la foto di copertina?")) return;
    setRemovingCover(true);
    setMessage(null);

    const { data, error } = await supabase
      .from("clinics")
      .update({ cover_url: null })
      .eq("id", clinic.id)
      .select("id")
      .maybeSingle();

    if (error || !data) {
      setMessage({ kind: "error", text: error?.message || "Copertina non rimossa." });
    } else {
      setCoverUrl("");
      setMessage({ kind: "success", text: "Copertina rimossa." });
    }

    setRemovingCover(false);
  };

  return (
    <section id="gallery" className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-4 sm:p-6">
        <h2 className="text-xl font-bold text-gray-900">Galleria foto</h2>
        <p className="mt-1 text-sm text-gray-600">Logo e copertina della pagina pubblica.</p>
      </div>

      <div className="space-y-8 p-4 sm:p-6">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Logo clinica</h3>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo della clinica" className="h-full w-full object-contain p-2" />
              ) : (
                <ImageIcon className="h-12 w-12 text-gray-300" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <input
                ref={logoInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) => handleFileChange(event, "logo")}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                disabled={uploading !== null}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-gray-50 disabled:cursor-wait disabled:opacity-50 sm:w-auto"
              >
                <Upload className="h-4 w-4" />
                {uploading === "logo" ? "Caricamento..." : "Carica logo"}
              </button>
              <p className="mt-2 text-xs leading-5 text-gray-500">JPG, PNG o WEBP. Massimo 5 MB. Formato consigliato: quadrato.</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Foto di copertina</h3>
          <div className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 sm:h-56">
            {coverUrl ? (
              <>
                <img src={coverUrl} alt="Copertina della clinica" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={removeCover}
                  disabled={removingCover || uploading !== null}
                  aria-label="Rimuovi copertina"
                  className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-rose-700 shadow-lg transition hover:bg-white disabled:cursor-wait disabled:opacity-60"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            ) : (
              <div className="text-center text-gray-400">
                <ImageIcon className="mx-auto h-12 w-12" />
                <p className="mt-2 text-sm">Nessuna copertina</p>
              </div>
            )}
          </div>

          <input
            ref={coverInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => handleFileChange(event, "cover")}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            disabled={uploading !== null}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-gray-50 disabled:cursor-wait disabled:opacity-50 sm:w-auto"
          >
            <Upload className="h-4 w-4" />
            {uploading === "cover" ? "Caricamento..." : "Carica copertina"}
          </button>
          <p className="mt-2 text-xs leading-5 text-gray-500">JPG, PNG o WEBP. Massimo 5 MB. Formato orizzontale consigliato.</p>
        </div>

        <ProfileSaveMessage state={message} />
      </div>
    </section>
  );
}
