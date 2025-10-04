// eslint.config.ts

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import type { Linter } from "eslint";

const config: Linter.FlatConfig[] = [
	js.configs.recommended,

	...tseslint.configs.recommended,

	{
		files: ["src/**/*.ts"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"no-unused-vars": "off", // handled by TS
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
			],
		},
	},

	// Turn off formatting rules so Prettier is the source of truth
	prettier,
];

export default config;
