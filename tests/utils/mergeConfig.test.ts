// tests/utils/mergeConfig.test.ts

/*
  ✓ returns default config when user config is empty
  ✓ overrides primitive values from user config
  ✓ does not override defaults when user value is undefined
  ✓ deep merges nested objects
  ✓ replaces arrays instead of merging
*/

import type { FileHeaderLiteConfig } from "../../src/config";
import { mergeConfig } from "../../src/utils/mergeConfig";
import { makeDefaultConfig } from "../helpers";

describe("mergeConfig()", () => {
	test("returns default config when user config is empty", () => {
		const baseConfig = makeDefaultConfig();
		const result = mergeConfig(baseConfig, {});
		expect(result).toEqual(baseConfig);
	});

	test("overrides primitive values from user config", () => {
		const baseConfig = makeDefaultConfig();
		const userConfig: Partial<FileHeaderLiteConfig> = {
			autoUpdate: false,
			filePathStyle: "filename",
		};

		const result = mergeConfig(baseConfig, userConfig);

		expect(result.autoUpdate).toBe(false);
		expect(result.filePathStyle).toBe("filename");
	});

	test("does not override defaults when user value is undefined", () => {
		const baseConfig = makeDefaultConfig();
		const userConfig: Partial<FileHeaderLiteConfig> = {
			autoUpdate: undefined,
		};

		const result = mergeConfig(baseConfig, userConfig);

		expect(result.autoUpdate).toBe(baseConfig.autoUpdate);
	});

	test("deep merges nested objects", () => {
		const baseConfig = makeDefaultConfig({
			languagesById: {
				typescript: { headerTemplate: "// OLD", language: "TS" },
			},
		});

		const userConfig: Partial<FileHeaderLiteConfig> = {
			languagesById: {
				typescript: {
					headerTemplate: "// NEW",
				},
				javascript: {
					headerTemplate: "// JS",
				},
			},
		};

		const result = mergeConfig(baseConfig, userConfig);

		// Existing nested values should merge, not replace entirely
		expect(result.languagesById.typescript.language).toBe("TS");
		expect(result.languagesById.typescript.headerTemplate).toBe("// NEW");

		// New key should appear
		expect(result.languagesById.javascript.headerTemplate).toBe("// JS");
	});

	test("replaces arrays instead of merging", () => {
		const baseConfig = makeDefaultConfig({
			roles: { a: { role: "x", glob: "*" } },
		});
		const userConfig = { roles: { b: { role: "y", glob: "*" } } };

		const result = mergeConfig(baseConfig, userConfig);

		expect(result.roles).toEqual({
			a: { role: "x", glob: "*" },
			b: { role: "y", glob: "*" },
		});
	});
});
