// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Include ESLint's built-in recommended rules
  js.configs.recommended,
  
  // Include typescript-eslint's recommended rules
  ...tseslint.configs.recommended,
  
  {
    files: ['**/*.{js,ts,tsx}'],
    rules: {
      // You can override or add custom rules here if needed, e.g.:
      // '@typescript-eslint/no-unused-vars': 'warn',
    },
  }
);