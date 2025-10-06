// src/utils/mergeConfig.ts
import { type FileHeaderLiteConfig } from "../config";

/**
 * Recursively merges user config into defaults.
 * - Skips undefined values
 * - Deep merges plain objects
 * - Replaces arrays and primitives
 */
export function mergeConfig(
	defaultConfig: FileHeaderLiteConfig,
	userConfig: Partial<FileHeaderLiteConfig>,
): FileHeaderLiteConfig {
	return deepMerge(defaultConfig, userConfig);
}

// Generic helper that works on any object type
function deepMerge<T extends object>(base: T, override: Partial<T>): T {
	const result = structuredClone(base);

	for (const key of Object.keys(override) as (keyof T)[]) {
		const value = override[key];
		if (value === undefined) continue;

		const baseValue = result[key];

		if (isPlainObject(baseValue) && isPlainObject(value)) {
			// tell TS explicitly: these are both plain objects
			result[key] = deepMerge(
				baseValue as Record<string, unknown>,
				value as Record<string, unknown>,
			) as T[keyof T];
		} else {
			result[key] = value as T[keyof T];
		}
	}

	return result;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
