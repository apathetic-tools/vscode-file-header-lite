// tests/helpers/makePaths.ts

import type { PathList } from "../../src/utils/types";

export const defaultPathPreset = {
	filename: "Button.tsx",
	relative: "src/components",
	absolute: "abs",
	role: "React component",
};

export function makePaths(
	filename = defaultPathPreset.filename,
	relative = defaultPathPreset.relative,
	absolute = defaultPathPreset.absolute,
): PathList {
	return {
		absolutePath: `/${absolute}/${relative}/${filename}`,
		relativePath: `${relative}/${filename}`,
		filename,
	};
}
