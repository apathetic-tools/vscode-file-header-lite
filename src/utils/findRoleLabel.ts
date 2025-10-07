// src/utils/findRoleLabel
import { minimatch } from "minimatch";
import type { FileHeaderLiteConfig } from "../config";
import { getPathForMatch } from "./getPathForMatch";
import type { PathList } from "./types";

export function findRoleLabel(
	config: FileHeaderLiteConfig,
	paths: PathList,
): string | undefined {
	if (!config.roles) return;
	for (const role of Object.values(config.roles)) {
		if (role.state === "disabled") continue;

		const style = role.matchStyle ?? config.matchStyle;
		const pathToMatch = getPathForMatch(paths, style);

		const globs = Array.isArray(role.glob) ? role.glob : [role.glob];

		if (globs.some((glob) => minimatch(pathToMatch, glob as string))) {
			return role.role;
		}
	}
	return;
}
