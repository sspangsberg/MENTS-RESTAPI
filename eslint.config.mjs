import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

/**
 * Configuration for eslint for TypeScript
 */
export default tseslint.config(
    {
        plugins: {
            '@stylistic': stylistic
        },
        rules: {
            '@stylistic/indent': ['error', 4],
            // ...
        },
        ignores: [
            'node_modules/',
            'dist/', // exclude specific folder
            '**/*.js', // exclude all JavaScript files
        ],
    },
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            tseslint.configs.recommended,
        ],
    },
);