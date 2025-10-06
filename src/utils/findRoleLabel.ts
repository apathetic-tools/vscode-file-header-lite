// src/utils/findRoleLabel
import { minimatch } from "minimatch";
import type { FileHeaderLiteConfig } from "../config";
import type { PathList } from "./types";

export function findRoleLabel(
	config: FileHeaderLiteConfig,
	paths: PathList,
): string | undefined {
	if (!config.roles) return;
	for (const role of Object.values(config.roles)) {
		if (role.state === "disabled") continue;
		if (
			typeof role.glob === "string" &&
			minimatch(paths.relativePath, role.glob)
		) {
			return role.role;
		}
	}
	return;
}
