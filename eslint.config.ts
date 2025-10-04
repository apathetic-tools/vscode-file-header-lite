// eslint.config.ts
import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";
import fs from "fs";
import path from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read .prettierignore and split into lines
const prettierIgnorePath = path.join(__dirname, ".prettierignore");
const prettierIgnores = fs
	.readFileSync(prettierIgnorePath, "utf-8")
	.split("\n")
	.map((line) => line.trim())
	.filter((line) => line && !line.startsWith("#"));

const config = defineConfig([
	// Ignore build + deps
	{
		ignores: prettierIgnores,
	},

	// Global config
	// JavaScript
	eslint.configs.recommended,
	// TypeScript
	...tseslint.configs.recommended,

	{
		files: ["src/**/*.ts"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: __dirname,
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

	// Prettier last — disables conflicting rules
	prettier,
]);

export default config;
