// tests/helpers/makeDefaultConfig.ts

import type { FileHeaderConfig } from "../../src/config";
import { defaultConfig } from "../../src/config";

/**
 * Returns a deep clone of the extension's default configuration.
 * Optionally accepts a partial override to modify only specific fields.
 *
 * This ensures tests remain stable even if `defaultConfig` changes shape later.
 */
export function makeDefaultConfig(
	overrides: Partial<FileHeaderConfig> = {},
): FileHeaderConfig {
	// Deep clone so tests never mutate the shared default
	const clone = structuredClone(defaultConfig);
	return {
		...clone,
		...overrides,
	};
}
