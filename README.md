# Rick and Morty Memory Game

Juego de memoria basado en el universo de Rick and Morty. El usuario debe encontrar pares de cartas con personajes de la serie.

🎮 **[Ver Demo](https://ch3chy.github.io/foris-game-challenge/)**

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

## Testing

### Stack

- **Vitest** - Test runner compatible con Vite
- **React Testing Library** - Testing de componentes React
- **@testing-library/user-event** - Simulación de interacciones de usuario

### Comandos

```bash
npm test              # Watch mode
npm run test:run      # Single run
npm run test:coverage # Con reporte de cobertura
```

### Estructura

Los tests se ubican junto a los archivos que testean con extensión `.test.ts` o `.test.tsx`:

```
src/
├── components/
│   ├── button/
│   │   ├── button.tsx
│   │   └── button.test.tsx
│   └── text-field/
│       ├── text-field.tsx
│       └── text-field.test.tsx
├── modules/
│   ├── auth/
│   │   ├── services/authService.test.ts
│   │   ├── stores/useAuthStore.test.ts
│   │   ├── utils/login-validation.test.ts
│   │   ├── components/login-form/login-form.test.tsx
│   │   └── views/login/login.test.tsx
│   └── game/
│       ├── services/characterService.test.ts
│       ├── stores/useGameStore.test.ts
│       ├── components/card/card.test.tsx
│       ├── components/characters-grid/characters-grid.test.tsx
│       └── views/game-board/game-board.test.tsx
├── router/components/
│   ├── ProtectedRoute.test.tsx
│   └── PublicRoute.test.tsx
└── utils/
    └── array.utils.test.ts
```

### Cobertura

| Módulo | Tests | Descripción |
|--------|-------|-------------|
| **Components** | 34 | Button, TextField |
| **Auth** | 55 | Service, Store, LoginForm, Validation, Login view |
| **Game** | 47 | Service, Store, Card, Grid, GameBoard, Congratulations |
| **Router** | 6 | ProtectedRoute, PublicRoute |
| **Utils** | 16 | shuffleArray, getRandomElements |

### Hooks

El proyecto usa **Husky** para ejecutar tests automáticamente:

- **pre-push**: Ejecuta `npm run test:run` antes de cada push

## Deploy

El proyecto está desplegado en **GitHub Pages**.

### Desplegar

```bash
npm run deploy
```

Este comando ejecuta `build` y publica la carpeta `dist` en la rama `gh-pages`.

### URL

🔗 https://ch3chy.github.io/foris-game-challenge/

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

## Desarrollo Asistido por IA

Este proyecto fue desarrollado con el apoyo de **GitHub Copilot** (Claude Opus 4.5) como herramienta de asistencia en el desarrollo.

### ¿Cómo se utilizó la IA?

| Área | Uso |
|------|-----|
| **Arquitectura** | Definición de estructura modular, patrones de diseño |
| **Configuración** | Setup de Vite, TypeScript, SASS, Commitlint, Husky |
| **Componentes** | Scaffolding de componentes reutilizables (Button, TextField) |
| **Estado global** | Implementación de stores con Zustand |
| **Testing** | Generación de casos de prueba con Vitest |
| **Documentación** | Redacción y estructura del README |

### Rol del desarrollador

La IA fue utilizada como **herramienta de productividad**, no como reemplazo del criterio técnico. El desarrollador:

- Definió los requerimientos y decisiones de arquitectura
- Revisó y validó todo el código generado
- Realizó ajustes según las necesidades específicas del proyecto
- Tomó decisiones sobre qué implementar y cómo estructurarlo
- Garantizó la calidad y coherencia del código final

### Reflexión

El uso de IA en el desarrollo permite:
- Acelerar tareas repetitivas (boilerplate, tests)
- Explorar diferentes enfoques de implementación
- Mantener consistencia en patrones y estilos
- Enfocarse en la lógica de negocio y UX

> La IA es una herramienta poderosa, pero el conocimiento técnico sigue siendo esencial para guiarla, evaluarla y tomar decisiones informadas.
