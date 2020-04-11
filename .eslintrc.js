module.exports = {
  parserOptions: {
    project: "./tsconfig.json"
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"]
      }
    }
  },
  extends: [
    "react-app",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:css-modules/recommended",
    // "plugin:redux-saga/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jest/recommended",
    "plugin:jest-dom/recommended",
    "plugin:testing-library/recommended",
    "plugin:testing-library/react"
  ],
  plugins: [
    "deprecate",
    "css-modules",
    "sort-imports-es6-autofix",
    "github",
    "prettier",
    "react-hooks",
    "redux-saga",
    "jest-dom",
    "testing-library",
    "jsx-a11y"
  ],
  rules: {
    // "testing-library/consistent-data-testid": [
    //   2,
    //   {
    //     testIdPattern: "^{fileName}(__[a-zA-Z]*)?$"
    //   }
    // ],
    curly: ["warn", "all"],
    "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "deprecate/import": ["warn"],
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "css-modules/no-unused-class": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/no-useless-path-segments": "warn",
    "import/namespace": "off",
    "import/prefer-default-export": "warn",
    "import/no-deprecated": "warn",
    "import/named": "off",
    "sort-imports-es6-autofix/sort-imports-es6": [
      "error",
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"]
      }
    ],
    "no-debugger": "warn",
    eqeqeq: ["error", "smart"],
    "no-console": "warn",
    "require-await": "error",
    "no-return-await": "error",
    "no-await-in-loop": "warn",
    "no-empty-pattern": "warn",
    "no-unused-expressions": [
      "warn",
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }
    ],
    "object-shorthand": "warn",
    "no-unused-labels": "warn",
    "no-useless-computed-key": "warn",
    "no-useless-concat": "warn",
    "prefer-template": "warn",
    "no-useless-constructor": "warn",
    "no-useless-escape": "warn",
    "no-useless-rename": [
      "warn",
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false
      }
    ],
    "no-constant-condition": "warn",
    "no-return-assign": "error",
    "no-sequences": "error",
    "no-var": "error",
    "prefer-const": "warn",
    "consistent-return": "error",
    "react/display-name": "off",
    "react/jsx-no-comment-textnodes": "warn",
    "react/jsx-no-duplicate-props": [
      "warn",
      {
        ignoreCase: true
      }
    ],
    "react/jsx-no-target-blank": "warn",
    "react/jsx-no-undef": "error",
    "react/jsx-pascal-case": [
      "warn",
      {
        allowAllCaps: true,
        ignore: []
      }
    ],
    "react/jsx-uses-react": "warn",
    "react/jsx-uses-vars": "warn",
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: false,
        shorthandFirst: false,
        reservedFirst: true
      }
    ],
    "react/no-deprecated": "warn",
    "react/no-unused-state": "warn",
    "react/no-direct-mutation-state": "error",
    "react/no-access-state-in-setstate": "error",
    "react/no-is-mounted": "warn",
    "react/no-children-prop": "warn",
    "react/no-danger-with-children": "error",
    "react/no-this-in-sfc": "error",
    "react/no-unused-prop-types": "warn",
    "react/jsx-handler-names": "warn",
    "react/jsx-key": "warn",
    "react/react-in-jsx-scope": "error",
    "react/require-render-return": "error",
    "react/no-unescaped-entities": "off",
    "react/style-prop-object": "warn",
    "react/button-has-type": "error",
    "react/no-unknown-property": "warn"
  }
};
