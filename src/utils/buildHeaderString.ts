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
		? (langEntry.language ?? languageId.replace(/_/g, " "))
		: "";
	return langLabel;
}

function formatFormatLabel(
	config: FileHeaderLiteConfig,
	languageId: string,
): string {
	const langEntry = config.languagesById[languageId];
	if (!langEntry || !langEntry.header || langEntry.state === "disabled")
		return "";

	if (!config.showFormat || !langEntry.format) return "";

	return langEntry.format;
}

function formatRoleLabel(
	config: FileHeaderLiteConfig,
	roleLabel?: string,
): string {
	if (!config.showRoles || !roleLabel) return "";
	return ` ${roleLabel}`;
}

function formatLanguageAndFormatLabel(
	config: FileHeaderLiteConfig,
	languageId: string,
) {
	const lang = formatLanguageLabel(config, languageId);
	const format = formatFormatLabel(config, languageId);

	if (lang && format) {
		return ` (${lang} — ${format})`;
	} else if (lang) {
		return ` (${lang})`;
	} else if (format) {
		return ` (${format})`;
	} else {
		return "";
	}
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
			formatLanguageAndFormatLabel(config, languageId),
			formatRoleLabel(config, roleLabel),
		].join(""),
	);
}
