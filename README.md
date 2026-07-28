# FACILEMEDICAL.IT

Facile Medical è la piattaforma digitale che semplifica l’accesso a visite, esami, check-up e strutture sanitarie. Permette ai pazienti di inviare richieste, confrontare le opzioni disponibili e mettersi in contatto con le strutture.

## Stack

- Next.js 16 con App Router
- React 19 e TypeScript
- Tailwind CSS 4
- Supabase per autenticazione, database e storage

## Avvio locale

Richiede una versione di Node.js compatibile con Next.js 16 e un progetto Supabase configurato.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

Non sovrascrivere un `.env.local` già configurato. Le variabili richieste sono documentate in `.env.example`; i valori reali e le credenziali non devono essere salvati nel repository.

## Verifiche

```bash
npm run lint
npm run build
```

## Produzione

Il dominio ufficiale previsto è [facilemedical.it](https://facilemedical.it). Le operazioni che richiedono accesso a DNS, hosting, Supabase, Resend e servizi esterni sono elencate in `FACILEMEDICAL_MIGRATION_CHECKLIST.md` e non sono eseguite automaticamente dal repository.
