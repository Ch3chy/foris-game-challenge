# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Estilos

### Path Aliases

El proyecto tiene configurados los siguientes alias en `vite.config.ts`:

```typescript
alias: {
  "@": "/src",
  "@styles": "/src/styles",
}
```

**Uso:**
```scss
// En archivos SCSS
@use "@styles/mixins/responsive" as responsive;
@use "@styles/variables/colors" as *;
```

```typescript
// En archivos TypeScript/TSX
import '@styles/index.scss';
import { MyComponent } from '@/components/MyComponent';
```

### Estructura

```
src/styles/
├── index.scss              # Punto de entrada principal
├── _colors.scss            # Genera CSS variables de colores
├── _fonts.scss             # Importa Google Fonts (Montserrat)
├── _variables.scss         # Genera CSS variables de fonts y breakpoints
├── _reset.scss             # Reset CSS básico
├── mixins/
│   ├── _maps.scss          # Mixin para generar CSS variables desde maps
│   └── _responsive.scss    # Mixins para media/container queries
└── variables/
    ├── _colors.scss        # Mapa de colores
    ├── _fonts.scss         # Mapa de fuentes y tamaños
    ├── _spacing.scss       # Variables de espaciado y border-radius
    └── _breakpoints.scss   # Mapa de breakpoints
```

### CSS Variables disponibles

Las variables se generan automáticamente y están disponibles en `:root`:

```css
/* Colores - Primary */
--Color-primary-base: #A2F2F9;
--Color-primary-hover: #49D5E1;
--Color-primary-dark: #1A7A83;

/* Colores - Secondary */
--Color-secondary-base: #D8E054;
--Color-secondary-hover: #B1B83B;
--Color-secondary-dark: #73781C;

/* Colores - Background */
--Color-background-base: #1e1e3f;
--Color-background-surface: #fffac2;

/* Colores - Text */
--Color-text-primary: #313D49;
--Color-text-secondary: #5a5a5a;
--Color-text-light: #ffffff;

/* Colores - Otros */
--Color-light: #ffffff;
--Color-warning: #e53935;

/* Fuentes */
--Font-family: "Montserrat", sans-serif;
--Font-size-xs: 0.75rem;
--Font-size-sm: 0.875rem;
--Font-size-base: 1rem;
--Font-size-lg: 1.125rem;
--Font-weight-regular: 400;
--Font-weight-medium: 500;
--Font-weight-semibold: 600;
--Font-weight-bold: 700;

/* Spacing */
--Spacing-padding-xs: 0.25rem;
--Spacing-padding-sm: 0.5rem;
--Spacing-padding-md: 1rem;
--Spacing-padding-lg: 1.5rem;
--Spacing-padding-xl: 2rem;
--Spacing-padding-2xl: 3rem;
--Spacing-padding-3xl: 4rem;

/* Border Radius */
--Spacing-radius-sm: 4px;
--Spacing-radius-md: 8px;
--Spacing-radius-lg: 12px;
--Spacing-radius-xl: 16px;
--Spacing-radius-full: 9999px;
```

### Uso en componentes

**Con CSS Variables (recomendado):**
```scss
.button {
  background: var(--Color-primary-base);
  font-family: var(--Font-family);
  font-weight: var(--Font-weight-semibold);
  
  &:hover {
    background: var(--Color-primary-hover);
  }
}

.card {
  padding: var(--Spacing-padding-md);
  border-radius: var(--Spacing-radius-lg);
  margin-bottom: var(--Spacing-padding-xl);
}
```

### Mixins de Responsive

```scss
@use '@styles/mixins/responsive' as responsive;

.container {
  padding: var(--Spacing-padding-sm);
  
  @include responsive.apply(md) {
    padding: var(--Spacing-padding-lg);
  }
  
  @include responsive.apply(lg, max) {
    // max-width: 1023.98px
  }
}
```

## Commits

El proyecto usa [commitlint](https://commitlint.js.org/) con [husky](https://typicode.github.io/husky/) para validar el formato de los commits.

### Formato

```
type(scope): descripción
```

### Types permitidos

| Type       | Descripción                          |
|------------|--------------------------------------|
| `feat`     | Nueva funcionalidad                  |
| `fix`      | Corrección de bug                    |
| `docs`     | Documentación                        |
| `style`    | Cambios de formato (no afectan lógica) |
| `refactor` | Refactorización de código            |
| `perf`     | Mejoras de rendimiento               |
| `test`     | Agregar o modificar tests            |
| `build`    | Cambios en build o dependencias      |
| `ci`       | Cambios en CI/CD                     |
| `chore`    | Tareas de mantenimiento              |
| `revert`   | Revertir commits                     |

### Scopes permitidos

| Scope   | Descripción                    |
|---------|--------------------------------|
| `root`  | Cambios generales del proyecto |
| `login` | Módulo de login                |
| `game`  | Módulo del juego               |

### Ejemplos

```bash
feat(login): add login form validation
fix(game): fix score calculation bug
docs(root): update readme with commit guidelines
chore(root): update dependencies
```

---

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
