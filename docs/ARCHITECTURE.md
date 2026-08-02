# FACILE MEDICAL — Architettura

## Regole

- `app/`: routing e composizione delle pagine.
- `components/`: componenti UI piccoli e riutilizzabili.
- `lib/`: accesso dati, autenticazione, tipi e logica di dominio.
- `public/brand/`: soltanto asset ottimizzati e pubblici.
- `assets/brand-source/`: originali locali, esclusi da Git e dal deploy.
- `supabase/migrations/`: unica sede futura delle modifiche versionate al database.

Le dashboard devono usare il proprio `layout.tsx`; le singole pagine non devono duplicare sidebar o header.
Le funzioni non implementate devono essere mostrate come disabilitate, mai collegate a route inesistenti.
