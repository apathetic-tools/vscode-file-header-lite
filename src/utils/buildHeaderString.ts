// src/utils/buildHeaderString.ts

import type { FileHeaderLiteConfig } from "../config";
import type { PathList, ResolvedLanguageTemplate } from "./types";

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
	langEntry: ResolvedLanguageTemplate,
): string {
	if (!langEntry || !langEntry.headerTemplate || langEntry.state === "disabled")
		return "";

	if (!config.showLanguage || !langEntry.language) return "";

	return langEntry.language.replace(/_/g, " ");
}

function formatFormatLabel(
	config: FileHeaderLiteConfig,
	langEntry: ResolvedLanguageTemplate,
): string {
	if (!langEntry || !langEntry.headerTemplate || langEntry.state === "disabled")
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
	langEntry: ResolvedLanguageTemplate,
) {
	const lang = formatLanguageLabel(config, langEntry);
	const format = formatFormatLabel(config, langEntry);

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
	langEntry: ResolvedLanguageTemplate,
	paths: PathList,
	roleLabel?: string,
): string | undefined {
	if (!langEntry || !langEntry.headerTemplate || langEntry.state === "disabled")
		return "";

	return langEntry.headerTemplate.replace(
		"${headerLine}",
		[
			formatfileLabel(config, paths),
			formatLanguageAndFormatLabel(config, langEntry),
			formatRoleLabel(config, roleLabel),
		].join(""),
	);
}
