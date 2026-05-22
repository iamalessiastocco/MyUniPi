# MyUniPi

Portale studenti dell'Università di Pisa — monorepo full-stack con app web, app mobile e API REST.

## Panoramica

MyUniPi è una piattaforma universitaria che consente agli studenti di accedere ai servizi accademici da un'unica interfaccia. Il progetto è organizzato come monorepo con workspaces npm e include tre applicazioni principali e cinque pacchetti condivisi.

**Funzionalità pianificate**
- Autenticazione con credenziali istituzionali (`@studenti.unipi.it`)
- Gestione iscrizioni agli appelli d'esame
- Consultazione orario settimanale delle lezioni
- Badge universitario digitale
- Forum tra studenti
- Calcolo media e punteggio tesi

---

## Struttura del monorepo

```
MyUniPi/
├── apps/
│   ├── web/           # SPA React + TypeScript
│   ├── mobile/        # App React Native + Expo
│   ├── api/           # API REST Laravel 12
│   └── admin/         # Pannello amministrativo (in sviluppo)
├── packages/
│   ├── api-client/    # Client HTTP condiviso (scaffolding)
│   ├── shared-types/  # Tipi TypeScript condivisi (scaffolding)
│   ├── ui-components/ # Libreria componenti condivisi (scaffolding)
│   ├── config/        # Configurazioni condivise (scaffolding)
│   └── utils/         # Utility condivise (scaffolding)
├── docs/              # Documentazione (scaffolding)
├── tests/             # Test e2e e di integrazione (scaffolding)
└── docker-compose.yml
```

---

## Stack tecnologico

| Layer | Tecnologie |
|---|---|
| **Web frontend** | React 19, TypeScript, Vite 7, React Router 7, Axios, Lucide React |
| **Mobile** | React Native 0.79, Expo 53, TypeScript, React Navigation 6 |
| **Backend** | Laravel 12, PHP 8.2, Laravel Sanctum, SQLite |
| **Testing** | PHPUnit 11 (solo API — test web/mobile non ancora configurati) |
| **Tooling** | npm workspaces, concurrently, ESLint, Laravel Pint |

---

## Prerequisiti

- **Node.js** 18+
- **PHP** 8.2+ con estensioni: `pdo_sqlite`, `mbstring`, `openssl`, `tokenizer`, `xml`
- **Composer** 2+
- **Expo** — non richiede installazione globale, viene usato tramite `npx expo`

---

## Installazione

**1. Clona il repository**

```bash
git clone https://github.com/<tuo-utente>/myunipi.git
cd myunipi
```

**2. Installa le dipendenze JavaScript**

```bash
npm install
```

**3. Configura il backend Laravel**

```bash
cd apps/api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
```

**4. Configura le variabili d'ambiente del frontend web**

Crea il file `apps/web/.env`:

```
VITE_API_URL=http://localhost:9000/api
```

---

## Avvio in sviluppo

**Avvia tutte le applicazioni contemporaneamente**

```bash
npm run dev
```

Questo comando avvia in parallelo:
- **Web** → http://localhost:5173
- **API** → http://localhost:9000
- **Mobile** → Expo DevTools (scan QR con Expo Go)

**Avvio singolo per applicazione**

```bash
npm run dev:web      # Solo frontend React
npm run dev:api      # Solo API Laravel
npm run dev:mobile   # Solo app Expo
```

**Mobile su simulatore specifico**

```bash
cd apps/mobile
npm run android      # Emulatore Android
npm run ios          # Simulatore iOS (solo macOS)
```

---

## Architettura API

Base URL: `http://localhost:9000/api`

### Autenticazione (implementata)

| Metodo | Endpoint | Protezione | Descrizione |
|--------|----------|------------|-------------|
| `POST` | `/auth/login` | Pubblica | Login con email e password |
| `POST` | `/auth/logout` | Sanctum | Logout — revoca il token |
| `GET` | `/auth/user` | Sanctum | Dati dell'utente corrente |

### Endpoint pianificati (definiti nel client, non ancora implementati nel backend)

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| `GET` | `/exams` | Lista appelli d'esame |
| `POST` | `/exams/{id}/enroll` | Iscrizione a un appello |
| `DELETE` | `/exams/{id}/enroll` | Disiscrizione da un appello |
| `GET` | `/timetable` | Orario lezioni settimanale |
| `GET` | `/courses` | Lista corsi |
| `GET` | `/courses/{id}/reviews` | Recensioni di un corso |
| `POST` | `/courses/{id}/reviews` | Pubblica una recensione |
| `GET` | `/badge` | Badge universitario digitale |
| `GET` | `/calculate/average` | Calcolo media ponderata |
| `GET` | `/calculate/thesis-score` | Calcolo punteggio tesi |

L'autenticazione utilizza **Laravel Sanctum** con token Bearer (`Authorization: Bearer <token>`). Il token viene generato al login e salvato nel `localStorage` lato client.

---

## Struttura frontend web

```
apps/web/src/
├── assets/images/       # Logo Università di Pisa
├── components/
│   ├── atoms/           # Componenti base
│   ├── molecules/       # Componenti compositi
│   ├── organisms/       # Sezioni UI complesse
│   └── Layout/          # Layout con header e navigazione
├── contexts/
│   └── AuthContext.tsx  # Stato globale autenticazione
├── screens/
│   ├── Auth/            # Schermata di login
│   └── Dashboard/       # Dashboard principale
├── services/
│   ├── api.ts           # Client Axios con interceptor
│   └── auth.ts          # Servizio autenticazione
└── App.tsx              # Router con rotte protette/pubbliche
```

**Routing:** rotte protette (`/dashboard`) richiedono autenticazione. In caso di risposta 401, il logout avviene automaticamente.

---

## Schema database

### Tabella `users`

| Colonna | Tipo | Note |
|---------|------|------|
| `id` | bigint | Primary key |
| `name` | string | Nome completo |
| `email` | string | Unique |
| `password` | string | Hash bcrypt |
| `email_verified_at` | timestamp | Nullable |
| `remember_token` | string | Nullable |
| `created_at` / `updated_at` | timestamp | — |

Database predefinito: **SQLite** (`apps/api/database/database.sqlite`). Configurabile via `.env` per MySQL o PostgreSQL in produzione.

---

## Eseguire i test

```bash
# Test API (PHPUnit)
cd apps/api && php artisan test
```

> I test per web e mobile non sono ancora configurati.

---

## Build di produzione

```bash
# Build web e mobile
npm run build

# Preview build web in locale
cd apps/web && npm run preview
```

---

## Variabili d'ambiente

### `apps/api/.env`

| Variabile | Default | Descrizione |
|-----------|---------|-------------|
| `APP_KEY` | — | **Obbligatoria** — generata con `php artisan key:generate` |
| `APP_ENV` | `local` | Ambiente (`local`, `production`) |
| `APP_URL` | `http://localhost` | URL base dell'applicazione |
| `DB_CONNECTION` | `sqlite` | Driver database |
| `SESSION_DRIVER` | `database` | Driver sessioni |

### `apps/web/.env`

| Variabile | Default | Descrizione |
|-----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:9000/api` | URL base delle API Laravel |

---

## Stato del progetto

| Componente | Stato |
|------------|-------|
| Web — UI login | ✅ Implementato |
| Web — Dashboard (UI) | ✅ Implementato |
| API — Autenticazione (Sanctum) | ✅ Implementato |
| API — Esami, orari, corsi | 🚧 In sviluppo |
| Integrazione API Cineca | 📋 Da implementare |
| App mobile | 🚧 Scaffolding iniziale |
| Pacchetti condivisi | 🚧 Struttura definita, non implementati |
| Test web/mobile | 📋 Da configurare |
| Pannello admin | 📋 Da implementare |

---

## Contribuire

1. Crea un branch: `git checkout -b feature/nome-feature`
2. Committa le modifiche: `git commit -m "feat: descrizione"`
3. Apri una Pull Request verso `main`
