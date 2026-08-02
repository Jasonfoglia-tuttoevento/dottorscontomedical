# Supabase

La cartella è predisposta per versionare schema, trigger e policy RLS.

Prima della pubblicazione pubblica occorre esportare lo schema reale in una migration baseline, verificare le policy di `profiles`, `clinics`, `services`, `checkups` e `matches`, quindi testare separatamente i ruoli `admin`, `clinic` e `patient`.

Non inserire mai secret key, service role o valori `.env` nel repository.
