module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
    },
    plugins: ["@typescript-eslint", "unused-imports", "prettier"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "next/core-web-vitals",
        "plugin:prettier/recommended", // <- penting
        "prettier",
    ],
    rules: {
        // --- Best Practice ---
        "no-console": ["error", { allow: ["warn", "error"] }],
        "no-debugger": "error",
        eqeqeq: ["error", "always"],
        curly: ["error", "all"],
        "prefer-const": "error",

        // --- Import / Unused ---
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
            "warn",
            {
                vars: "all",
                varsIgnorePattern: "^_",
                args: "after-used",
                argsIgnorePattern: "^_",
            },
        ],

        // --- Prettier ---
        "prettier/prettier": "error",
    },
    overrides: [
        {
            files: ["next-env.d.ts"],
            rules: {
            "@typescript-eslint/triple-slash-reference": "off",
            },
        },
    ],
};
