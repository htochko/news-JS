// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: ['dist/**', 'build/**'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            strict: 'warn',
            noexplicitAny: 'error',
        },
    },
];
