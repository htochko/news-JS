import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // Global options
  {
    linterOptions: {
      noInlineConfig: true, // Disables inline comments like /* eslint-disable */
    },
  },
  // Recommended JavaScript rules
  js.configs.recommended,
  
  // Recommended TypeScript rules
  ...tseslint.configs.recommended,
  {
    ignores: [
      "dist/",
      "node_modules/",
      "webpack.config.js",
      "*.config.js"
    ],
  },
  // Custom rules & project configuration for TS files
  // alternative pattern 'src/**/*.{ts,tsx,js,jsx}'
  {
    files: ['src/**/*.ts', 'src/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      // Enforce no-explicit-any explicitly
      '@typescript-eslint/no-explicit-any': 'warn',
      'strict': 'warn',
      // 'noImplicitAny is from tsconfig.json
    },
  },
  // Disables ESLint formatting rules that conflict with Prettier (Must be last)
  eslintConfigPrettier,
];