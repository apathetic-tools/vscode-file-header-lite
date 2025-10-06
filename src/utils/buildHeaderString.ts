// src/utils/buildHeaderString.ts

import type { FileHeaderLiteConfig } from "../config";
import type { PathList } from "./types";

function formatfileLabel(
	config: FileHeaderLiteConfig,
	paths: PathList,
): string {
	let fileLabel = "";
	switch (config.filePathStyle) {
		case "filename":
			fileLabel = paths.filename;
			break;
		case "absolutePath":
			fileLabel = paths.absolutePath;
			break;
		case "relativePath":
		default:
			fileLabel = paths.relativePath;
			break;
	}
	return fileLabel;
}

function formatLanguageLabel(
	config: FileHeaderLiteConfig,
	languageId: string,
): string {
	const langEntry = config.languagesById[languageId];
	if (!langEntry || !langEntry.header || langEntry.state === "disabled")
		return "";

	const langLabel = config.showLanguage
		? ` (${langEntry.language ?? languageId.replace(/_/g, " ")})`
		: "";
	return langLabel;
}

function formatRoleLabel(roleLabel?: string): string {
	const roleText = roleLabel ? ` ${roleLabel}` : "";
	return roleText;
}

export function buildHeaderString(
	config: FileHeaderLiteConfig,
	languageId: string,
	paths: PathList,
	roleLabel?: string,
): string | undefined {
	const langEntry = config.languagesById[languageId];
	if (!langEntry || !langEntry.header || langEntry.state === "disabled")
		return "";

	return langEntry.header.replace(
		"${headerLine}",
		[
			formatfileLabel(config, paths),
			formatLanguageLabel(config, languageId),
			formatRoleLabel(roleLabel),
		].join(""),
	);
}
