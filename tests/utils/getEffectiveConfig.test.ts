// tests/utils/getEffectiveConfig.test.ts

/*
	✓ calls mergeConfig with default and user config
	✓ handles missing workspace settings gracefully
*/

import type { FileHeaderLiteConfig } from "../../src/config";
import { defaultConfig } from "../../src/config";
import { getEffectiveConfig } from "../../src/utils/getEffectiveConfig";
import * as mergeConfigModule from "../../src/utils/mergeConfig";
import { mockVsConfig } from "../helpers";

describe("getEffectiveConfig()", () => {
	test("calls mergeConfig with default and user config", () => {
		const mergeSpy = vi
			.spyOn(mergeConfigModule, "mergeConfig")
			.mockReturnValue({
				...defaultConfig,
				autoUpdate: false,
				filePathStyle: "filename",
			} as FileHeaderLiteConfig);

		const vsConfig = mockVsConfig({
			autoUpdate: false,
			filePathStyle: "filename",
			showLanguage: true,
		});

		const result = getEffectiveConfig(defaultConfig, vsConfig);

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

		const vsConfig = mockVsConfig();

		const result = getEffectiveConfig(defaultConfig, vsConfig);

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
