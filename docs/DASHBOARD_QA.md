# Dashboard QA pre-pitch

## Copertura statica

| Area | Schermata | Azioni verificate nel codice |
| --- | --- | --- |
| Admin | Panoramica | navigazione, sito pubblico, logout |
| Admin | Cliniche | ricerca, filtri, paginazione, profilo pubblico, verifica/revoca |
| Admin | Utenti | ricerca, filtro ruolo, paginazione, cambio ruolo protetto |
| Clinica | Panoramica | collegamenti KPI, priorità, anteprima, azioni rapide |
| Clinica | Lead | ricerca, filtri, reset, telefono/email, accetta/rifiuta |
| Clinica | Profilo | navigazione sezioni, salvataggi, immagini, orari, servizi CRUD |
| Paziente | Panoramica | logout, nuova richiesta, riepilogo e lista richieste |

## Breakpoint prioritari

- 320 px: larghezza minima supportata
- 375/390 px: smartphone moderni
- 768 px: tablet
- 1024 px: desktop compatto

## Verifiche runtime obbligatorie

I controlli statici e la build non sostituiscono i test con Supabase reale. Prima del pitch accedere con i tre ruoli e provare almeno una volta ogni operazione che scrive dati:

1. verifica/revoca clinica;
2. cambio ruolo di un utente non corrente;
3. accettazione e rifiuto di due lead diversi;
4. salvataggio di ogni sezione del profilo clinica;
5. caricamento logo e copertina;
6. creazione, modifica ed eliminazione di un servizio;
7. invio di una richiesta paziente.

Ogni errore RLS deve essere corretto nel database, non aggirato nel browser.
