//import globals from "globals";
import eslint from '@eslint/js';
import tseslint from "typescript-eslint";
//import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
);