# FACILE MEDICAL — Beta Production deploy report

- Data e ora: 2026-08-02 12:09:03 CEST
- Stato: DEPLOY RIUSCITO
- Progetto Vercel: `dottorscontomedical`
- Scope Vercel: `jasonfoglia-tuttoeventos-projects`
- URL Preview verificato: https://dottorscontomedical-e2se562mz-jasonfoglia-tuttoeventos-projects.vercel.app
- URL Production finale: https://dottorscontomedical.vercel.app
- Deployment Production finale: https://dottorscontomedical-58khzm49d-jasonfoglia-tuttoeventos-projects.vercel.app
- Commit applicazione distribuito: `48e71508a53db2d3b3df49cb1096ee5e92fe52e6`
- Branch: `feat/marketplace-core`
- Push GitHub: completato su `origin/feat/marketplace-core`

## Audit e interventi

- `.env.local` presente, escluso da Git e non tracciato.
- Nessun secret rilevato nei contenuti versionati o staged.
- Confermata la presenza locale di `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`, senza stamparne i valori.
- Rimossa da Vercel la variabile preesistente `SUPABASE_SERVICE_ROLE_KEY`; nessuna chiave amministrativa è rimasta configurata nel progetto.
- Centralizzato il Site URL con priorità `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_VERCEL_URL`, `http://localhost:3001`.
- Nessun URL localhost hardcoded rilevato nei flussi di autenticazione.
- Protezioni di ruolo confermate nei layout server delle dashboard admin, clinic e patient.
- Nessun dato o schema Supabase modificato.

## Verifiche locali

| Verifica | Risultato |
| --- | --- |
| `npm ci` | Superata |
| `npm run audit:routes` | Superata |
| `npm run audit:dashboard` | Superata, 27 controlli |
| `npm run lint` | Superata con 2 warning non bloccanti |
| `npm run typecheck` | Superata |
| `npm run build` | Superata, 34 route generate |
| `git diff --check` e scansione secret staged | Superata |

## Smoke test Preview

La Preview è protetta da Vercel Authentication ed è stata verificata tramite bypass autenticato generato dalla Vercel CLI.

| Route | HTTP |
| --- | ---: |
| `/` | 200 |
| `/login` | 200 |
| `/register` | 200 |
| `/cliniche` | 200 |
| `/privacy` | 200 |
| `/termini` | 200 |
| `/brand/facilemedical-logo-full.png` | 200 |

## Smoke test Production finale

| Route | HTTP |
| --- | ---: |
| `/` | 200 |
| `/login` | 200 |
| `/register` | 200 |
| `/cliniche` | 200 |
| `/privacy` | 200 |
| `/termini` | 200 |
| `/brand/facilemedical-logo-full.png` | 200 |

Nessuna route pubblica verificata ha restituito HTTP 500.

## Variabili Vercel configurate

Valori intenzionalmente omessi.

- `NEXT_PUBLIC_SUPABASE_URL`: production, preview, development
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: production, preview, development
- `NEXT_PUBLIC_SITE_URL`: production, preview

## Warning residui

- Due warning ESLint `@next/next/no-img-element` in `components/clinics/profile/sections/GallerySection.tsx`; non bloccano lint o build.
- La CLI Vercel installata via `npx` ha segnalato dipendenze transitive deprecate (`stream-to-promise` e `tar`); non appartengono alle dipendenze dell'app e non hanno bloccato il deploy.
- La Preview richiede Vercel Authentication per l'accesso pubblico non autenticato.

## Azione manuale richiesta in Supabase

Nel pannello Supabase, aprire **Authentication → URL Configuration** e configurare esattamente:

- Site URL: `https://dottorscontomedical.vercel.app`
- Redirect URL Production: `https://dottorscontomedical.vercel.app/**`
- Redirect locale: `http://localhost:3001/**`
- Redirect Preview corrente: `https://dottorscontomedical-e2se562mz-jasonfoglia-tuttoeventos-projects.vercel.app/**`
- Redirect Preview wildcard del progetto: `https://dottorscontomedical-*-jasonfoglia-tuttoeventos-projects.vercel.app/**`

Questa configurazione manuale è l'unica attività residua. Non sono state usate chiavi amministrative Supabase e non sono state eseguite migration.

## Problemi non risolti

Nessun problema bloccante.
