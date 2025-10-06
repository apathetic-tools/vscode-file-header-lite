// tests/utils/getEffectiveConfig.test.ts

/*
	✓ calls mergeConfig with default and user config
	✓ handles missing workspace settings gracefully
*/

import * as vscode from "vscode";
import type { FileHeaderLiteConfig } from "../../src/config";
import { defaultConfig } from "../../src/config";
import { getEffectiveConfig } from "../../src/utils/getEffectiveConfig";
import * as mergeConfigModule from "../../src/utils/mergeConfig";

describe("getEffectiveConfig()", () => {
	test("calls mergeConfig with default and user config", () => {
		const mergeSpy = vi
			.spyOn(mergeConfigModule, "mergeConfig")
			.mockReturnValue({
				...defaultConfig,
				autoUpdate: false,
				filePathStyle: "filename",
			} as FileHeaderLiteConfig);

		const mockVsConfig = {
			get: (key: string) => {
				const mockSettings: Record<string, unknown> = {
					autoUpdate: false,
					filePathStyle: "filename",
					showLanguage: true,
				};
				return mockSettings[key];
			},
			has: () => false,
			inspect: () => undefined,
			update: async () => {},
		} satisfies vscode.WorkspaceConfiguration;

		const result = getEffectiveConfig(defaultConfig, mockVsConfig);

		expect(mergeSpy).toHaveBeenCalledWith(
			defaultConfig,
			expect.objectContaining({
				autoUpdate: false,
				filePathStyle: "filename",
				showLanguage: true,
			}),
		);
		expect(result.filePathStyle).toBe("filename");

		mergeSpy.mockRestore();
	});

	test("handles missing workspace settings gracefully", () => {
		const mergeSpy = vi
			.spyOn(mergeConfigModule, "mergeConfig")
			.mockReturnValue(defaultConfig);

		const mockVsConfig = {
			get: () => undefined,
			has: () => false,
			inspect: () => undefined,
			update: async () => {},
		} satisfies vscode.WorkspaceConfiguration;

		const result = getEffectiveConfig(defaultConfig, mockVsConfig);

		expect(mergeSpy).toHaveBeenCalledWith(
			defaultConfig,
			expect.objectContaining({
				autoUpdate: undefined,
				filePathStyle: undefined,
				showLanguage: undefined,
			}),
		);

		expect(result).toEqual(defaultConfig);

		mergeSpy.mockRestore();
	});
});
