// src/utils/getPathForMatch.ts

import type { FilePathStyle } from "../config";
import type { PathList } from "./types";

/**
 * Returns the path string to use for matching based on FilePathStyle.
 */
export function getPathForMatch(paths: PathList, style: FilePathStyle): string {
	switch (style) {
		case "filename":
			return paths.filename;
		case "absolutePath":
			return paths.absolutePath;
		case "relativePath":
		default:
			return paths.relativePath;
	}
}
