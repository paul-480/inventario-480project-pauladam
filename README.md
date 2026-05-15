# Inventario — Project & Resource Management Platform

A full-featured **SPA** built with React and TypeScript for managing clients, projects, development environments, team members and time tracking. Designed following **Clean Architecture** principles with a strict separation between domain, application, infrastructure and UI layers.

---

## ✨ Key Features

- **Client management** — full CRUD, sector assignment, contact management (main contact toggle)
- **Project management** — project lifecycle, client linking, active/inactive status, start date tracking
- **Development environments** — per-project developments with technology stack and environment links (Stage / Pre-production / Production)
- **Team management** — add / update / deactivate project members with role assignment
- **Time tracking** — user and project-level time entries with date range filters, hour validation and comments
- **User administration** — role-based access (Admin / Employee), password change (self & admin override)
- **Authentication** — JWT-based login with token decode, auto-logout on expiry via error handler

---

## 🏗️ Architecture

The codebase follows **Clean Architecture** with four explicit layers:

```
src/
├── domain/          # Entities, value objects, domain errors
├── application/     # Use cases (pure functions), DTOs
├── infrastructure/  # Repository interfaces, API implementations, schemas (Zod)
└── ui/              # React components, pages, hooks, Zustand stores
```

- **Domain** is completely framework-agnostic
- **Use cases** receive repositories via dependency injection — fully unit-testable without HTTP
- **Infrastructure** implements repository interfaces using Axios; validation with Zod
- **UI** consumes use cases through custom React hooks backed by Zustand for global state

---

## 🧪 Testing

Unit tests written with **Vitest** covering all non-trivial use cases across every domain:

| Domain | Coverage |
|---|---|
| Auth | Entity state machine, JWT mapper, schema validation, useAuth hook, error handler |
| Client | Create, GetById, Update + all contact use cases |
| Project | Create, GetById, Update, Development CRUD, team management, time entry queries |
| User | GetMyUser (token guard + decode), GetAllUsers (guard), ChangePassword |
| TimeEntry | Create, GetUser, UpdateProject, DeleteProject |
| Sector | Create, GetById, Update |
| Technology | Create, GetById, Update |

```bash
npm run test        # run all tests
npm run test:watch  # watch mode
```

Tests use **centralized mock repositories** per domain (`__mocks__/`) so each test file only defines its own fixtures.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand |
| HTTP | Axios |
| Validation | Zod |
| Auth | JWT (jwt-decode) |
| Testing | Vitest + Testing Library |
| Icons | Lucide React |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

> **Environment:** Create a `.env` file with `VITE_API_URL` pointing to your backend API.

---

## 📁 Project Structure (condensed)

```
src/
├── domain/
│   ├── auth/         # Auth entity + state machine
│   ├── client/       # Client, ClientSector entities
│   ├── project/      # Project entity + pure display helpers
│   ├── user/         # User entity, isAdmin, fullName helpers
│   └── shared/       # Uuid VO, UserRole VO, DomainError base
├── application/
│   ├── auth/         # useAuth hook, authErrorHandler
│   ├── client/       # 10 use cases + centralized mock
│   ├── project/      # 11 use cases + centralized mock
│   ├── user/         # 5 use cases + centralized mock
│   ├── timeEntry/    # 4 use cases
│   ├── sector/       # 3 use cases + centralized mock
│   └── technology/   # 3 use cases + centralized mock
├── infrastructure/
│   ├── api/          # Axios repository implementations
│   └── auth/         # tokenService, authMapper
└── ui/
    ├── components/   # Feature components (clients, projects, users…)
    ├── pages/        # Route-level pages
    ├── hooks/        # Custom React hooks per domain
    └── store/        # Zustand auth store
```
