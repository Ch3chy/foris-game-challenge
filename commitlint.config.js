export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nueva funcionalidad
        'fix',      // Corrección de bug
        'docs',     // Documentación
        'style',    // Cambios de formato (no afectan lógica)
        'refactor', // Refactorización de código
        'perf',     // Mejoras de rendimiento
        'test',     // Agregar o modificar tests
        'build',    // Cambios en build o dependencias
        'ci',       // Cambios en CI/CD
        'chore',    // Tareas de mantenimiento
        'revert',   // Revertir commits
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'scope-enum': [
      2,
      'always',
      [
        'root',     // Cambios generales del proyecto
        'auth',    // Módulo de autenticación
        'game',     // Módulo del juego
      ],
    ],
    'scope-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 100],
  },
};
