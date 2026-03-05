# Rick and Morty Memory Game

Juego de memoria basado en el universo de Rick and Morty. El usuario debe encontrar pares de cartas con personajes de la serie.

## Stack Tecnológico

- **React 19** + **TypeScript** + **Vite**
- **SASS** con CSS Variables
- **Zustand** para state management
- **React Router** para navegación
- **Formik + Yup** para formularios
- **Lucide React** para iconos

## Instalación

```bash
npm install
npm run dev
```

## Arquitectura

El proyecto sigue una arquitectura modular donde cada dominio tiene su propia estructura:

```
src/
├── components/          # Componentes reutilizables globales
│   ├── button/
│   └── text-field/
├── modules/             # Módulos de dominio
│   ├── auth/
│   │   ├── components/  # Componentes del módulo
│   │   ├── views/       # Vistas/páginas
│   │   ├── stores/      # Estado con Zustand
│   │   ├── services/    # Llamadas a APIs
│   │   └── routes.tsx   # Rutas del módulo
│   └── game/
│       ├── stores/
│       ├── services/
│       └── routes.tsx
├── router/
│   ├── components/      # ProtectedRoute, PublicRoute
│   └── index.tsx        # Configuración central de rutas
├── stores/              # Re-exports centralizados
└── styles/              # Sistema de estilos SASS
```

## Autenticación

Sistema de login simulado con las siguientes características:

- **Credenciales de prueba:** `admin` / `123456`
- Token almacenado en `localStorage`
- Rutas protegidas con redirección automática

### Flujo de navegación

| Escenario | Resultado |
|-----------|-----------|
| Sin token → `/game` | Redirige a `/auth/login` |
| Con token → `/auth/login` | Redirige a `/game` |

### Implementación

```
ProtectedRoute   → Verifica token, redirige a login si no existe
PublicRoute      → Redirige a /game si ya está autenticado
useAuthStore     → Estado global de autenticación (Zustand)
authService      → Servicio simulado con delay de 1s
```

## State Management con Zustand

### ¿Por qué Zustand?

Se eligió **Zustand** sobre otras alternativas (Redux, Context API) por:

| Característica | Beneficio |
|----------------|-----------|
| **Boilerplate mínimo** | Sin reducers, actions, dispatch. Solo funciones |
| **Sin providers** | No necesita envolver la app en contextos |
| **TypeScript nativo** | Inferencia de tipos automática |
| **Ligero** | ~1KB gzipped vs ~7KB de Redux Toolkit |
| **Selectores optimizados** | Re-renders solo cuando cambia lo seleccionado |

### Arquitectura implementada

Cada módulo define sus propios stores, manteniendo separación de responsabilidades:

```
src/modules/
├── auth/
│   └── stores/
│       ├── useAuthStore.ts   # Estado de autenticación
│       └── index.ts
└── game/
    └── stores/
        ├── useGameStore.ts   # Estado del juego
        └── index.ts

src/stores/
└── index.ts                  # Re-exports centralizados
```

### Uso en componentes

```tsx
// Solo re-renderiza cuando isAuthenticated cambia
const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

// Múltiples valores con selector
const { login, isLoading, error } = useAuthStore();
```

### Imports centralizados

```typescript
// Desde cualquier parte de la app
import { useAuthStore, useGameStore } from "@/stores";
```

## Estilos

### Path Aliases

```typescript
// vite.config.ts
alias: {
  "@": "/src",
  "@styles": "/src/styles",
}
```

### CSS Variables disponibles

```css
/* Colores */
--Color-primary-base: #A2F2F9;
--Color-secondary-base: #D8E054;
--Color-background-base: #1e1e3f;

/* Tipografía */
--Font-family: "Montserrat", sans-serif;
--Font-size-base: 1rem;

/* Spacing */
--Spacing-md: 1rem;
--Spacing-border-radius: 8px;
```

### Uso en componentes

```scss
.button {
  background: var(--Color-primary-base);
  padding: var(--Spacing-md);
  border-radius: var(--Spacing-border-radius);
  
  &:hover {
    background: var(--Color-primary-hover);
  }
}
```

## Commits

Formato: `type(scope): descripción`

### Types

| Type | Descripción |
|------|-------------|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Documentación |
| `refactor` | Refactorización |
| `chore` | Mantenimiento |

### Scopes

| Scope | Descripción |
|-------|-------------|
| `root` | Cambios generales |
| `login` | Módulo de login |
| `game` | Módulo del juego |

### Ejemplos

```bash
feat(login): add login form validation
fix(game): fix score calculation bug
chore(root): update dependencies
```
