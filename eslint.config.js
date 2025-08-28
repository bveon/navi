import path from 'node:path';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier/flat';
import turboConfig from 'eslint-config-turbo/flat';
import jsdoc from 'eslint-plugin-jsdoc';
import n from 'eslint-plugin-n';
import perfectionist from 'eslint-plugin-perfectionist';
import unicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint, {
  parser,
  configs as tseslintConfigs,
} from 'typescript-eslint';

const EXTERNAL_MODULE_FOLDERS = ['node_modules', 'node_modules/@types'];
const CJS_EXTENSIONS = ['.cjs', '.cts'];
const ESM_EXTENSIONS = ['.js', 'mjs', '.jsx', '.ts', 'mts', '.tsx'];
const JS_EXTENSIONS = ['.js', '.cjs', 'mjs', '.jsx'];
const TS_EXTENSIONS = ['.ts', '.cts', 'mts', '.tsx'];

const __dirname = import.meta.dirname;

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const project = path.join(__dirname, 'tsconfig.json');

/**
 * @param {string[]} extensions
 * @returns {string[]}
 */
function getFiles(extensions) {
  return extensions.map((extension) => `**/*${extension}`);
}

const config = tseslint.config([
  {
    files: [...getFiles(JS_EXTENSIONS), ...getFiles(TS_EXTENSIONS)],
    name: 'base/files',
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      parser,
      parserOptions: {
        ecmaFeatures: {
          globalReturn: false,
          jsx: false,
        },
        errorOnTypeScriptSyntacticAndSemanticIssues: true,
        errorOnUnknownASTType: true,
        jsDocParsingMode: 'all',
        projectService: true,
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    name: 'base/language-options',
  },
  {
    files: getFiles(CJS_EXTENSIONS),
    languageOptions: {
      sourceType: 'commonjs',
    },
    name: 'base/language-options/cjs',
  },
  {
    files: getFiles(ESM_EXTENSIONS),
    languageOptions: {
      sourceType: 'module',
    },
    name: 'base/language-options/esm',
  },
  {
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: 'error',
      reportUnusedInlineConfigs: 'error',
    },
    name: 'base/linter-options',
  },
  {
    name: 'base/settings',
    settings: {
      'import/extensions': [...JS_EXTENSIONS, ...TS_EXTENSIONS],
      'import/external-module-folders': EXTERNAL_MODULE_FOLDERS,
      'import/parsers': {
        '@typescript-eslint/parser': TS_EXTENSIONS,
      },
      'import/resolver': {
        node: {
          extensions: [...JS_EXTENSIONS, ...TS_EXTENSIONS],
        },
        typescript: {
          alwaysTryTypes: true,
          project,
        },
      },
    },
  },
  {
    extends: [js.configs.recommended],
    rules: {
      'func-style': [
        'error',
        'declaration',
        {
          allowArrowFunctions: true,
        },
      ],
      'no-unused-vars': 'off',
      'one-var': ['error', { initialized: 'never', uninitialized: 'always' }],
    },
  },
  {
    extends: [...compat.extends('plugin:eslint-comments/recommended')],
    rules: {
      'eslint-comments/disable-enable-pair': [
        'error',
        { allowWholeFile: true },
      ],
    },
  },
  {
    extends: [jsdoc.configs['flat/recommended-error']],
    rules: {
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-property-description': 'off',
      'jsdoc/require-returns-description': 'off',
    },
  },
  {
    extends: [jsdoc.configs['flat/recommended-typescript-error']],
    files: getFiles(TS_EXTENSIONS),
    rules: {
      'jsdoc/require-jsdoc': 'off',
    },
  },
  {
    extends: [
      tseslintConfigs.strictTypeChecked,
      tseslintConfigs.stylisticTypeChecked,
    ],
    files: getFiles(TS_EXTENSIONS),
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowConciseArrowFunctionExpressionsStartingWithVoid: false,
          allowDirectConstAssertionInArrowFunctions: false,
          allowExpressions: false,
          allowFunctionsWithoutTypeParameters: false,
          allowHigherOrderFunctions: false,
          allowIIFEs: false,
          allowTypedFunctionExpressions: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowAny: true,
          allowBoolean: true,
          allowNullish: true,
          allowNumber: true,
          allowRegExp: true,
        },
      ],
    },
  },
  {
    extends: [unicorn.configs.recommended],
    rules: {
      'unicorn/no-document-cookie': 'off',
      'unicorn/no-negated-condition': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  {
    extends: [
      ...compat.extends('plugin:import/recommended'),
      ...compat.extends('plugin:import/typescript'),
    ],
    rules: {
      'import/no-anonymous-default-export': 'error',
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/no-named-as-default': 'error',
      'import/no-named-as-default-member': 'error',
    },
  },
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    extends: [n.configs['flat/recommended-script']],
    files: getFiles(CJS_EXTENSIONS),
  },
  {
    extends: [n.configs['flat/recommended-module']],
    files: getFiles(ESM_EXTENSIONS),
    rules: {
      'n/no-missing-import': 'off',
    },
  },
  {
    extends: [perfectionist.configs['recommended-natural']],
    rules: {
      'perfectionist/sort-array-includes': [
        'error',
        {
          newlinesBetween: 'never',
        },
      ],
      'perfectionist/sort-classes': [
        'error',
        {
          newlinesBetween: 'always',
        },
      ],
      'perfectionist/sort-enums': [
        'error',
        {
          forceNumericSort: true,
          newlinesBetween: 'never',
        },
      ],
      'perfectionist/sort-exports': [
        'error',
        {
          groupKind: 'values-first',
        },
      ],
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'side-effect',
            'side-effect-style',
            'index',
            'object',
            'style',
            'builtin-type',
            'external-type',
            'internal-type',
            'parent-type',
            'sibling-type',
            'index-type',
            'unknown',
          ],
          sortSideEffects: true,
          tsconfigRootDir: __dirname,
        },
      ],
      'perfectionist/sort-interfaces': [
        'error',
        {
          groups: ['unknown', 'method'],
          newlinesBetween: 'never',
        },
      ],
      'perfectionist/sort-intersection-types': [
        'error',
        {
          groups: ['unknown', 'object'],
          newlinesBetween: 'never',
        },
      ],
      'perfectionist/sort-maps': [
        'error',
        {
          newlinesBetween: 'never',
        },
      ],
      'perfectionist/sort-modules': [
        'error',
        {
          groups: [
            'declare-enum',
            'enum',
            'declare-interface',
            'interface',
            'declare-type',
            'type',
            'declare-class',
            'class',
            'declare-function',
            'function',
            [
              'export-enum',
              'export-interface',
              'export-type',
              'export-class',
              'export-function',
            ],
            'unknown',
          ],
          type: 'unsorted',
        },
      ],
      'perfectionist/sort-named-exports': [
        'error',
        {
          groupKind: 'values-first',
        },
      ],
      'perfectionist/sort-named-imports': [
        'error',
        {
          groupKind: 'values-first',
        },
      ],
      'perfectionist/sort-object-types': [
        'error',
        {
          groups: ['unknown', 'method'],
          newlinesBetween: 'never',
        },
      ],
      'perfectionist/sort-objects': [
        'error',
        {
          groups: ['unknown', 'method'],
          newlinesBetween: 'never',
        },
      ],
      'perfectionist/sort-sets': [
        'error',
        {
          newlinesBetween: 'never',
        },
      ],
      'perfectionist/sort-union-types': [
        'error',
        {
          newlinesBetween: 'never',
        },
      ],
    },
  },
  {
    extends: [turboConfig],
  },
  {
    extends: [prettierConfig],
  },
]);

export default config;
