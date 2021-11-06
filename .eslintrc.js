module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  "extends": [
    'airbnb',
    'eslint-config-prettier',
    "next/core-web-vitals",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {
        "project": "./tsconfig.json"
      },
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
          "js": "never",
          "jsx": "never",
          "ts": "never",
          "tsx": "never"
      }
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "import/no-unresolved": [2, { "commonjs": true, "amd": true }],
    "react/require-default-props": "off",
    "@next/next/no-img-element": "off",
    "react-hooks/exhaustive-deps": "off"
  }
}
