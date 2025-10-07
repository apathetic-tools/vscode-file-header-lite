// src/configTypes.ts

export interface FileHeaderLiteConfig {
	/** Replace an outdated header path when file moves */
	autoUpdate: boolean;

	// === Display Header Parts ===

	/** What file path form to show in header */
	filePathStyle: FilePathStyle;

	/** Show the main language label (from VSCode) */
	showLanguage: boolean;

	/** Show format label (e.g. "React", "GitHub Issue Template") */
	showFormat: boolean;

	/** Show matching role labels (e.g., “Page component”) */
	showRoles: boolean;

	// === Matching Toggles ===

	/** Use VS Code language templates (keyed by languageId) */
	useLanguagesById: boolean;

	/** Use filepath-based language templates (keyed by glob patterns) */
	useLanguagesByPath: boolean;

	/** Match by this type of path */
	matchStyle: FilePathStyle;

	// === Define Templates ===

	/** Language header templates keyed by VSCode language ID */
	languagesById: Record<VSCodeLangId, LanguagesById>;

	/** Language header templates keyed by filename/glob */
	languagesByPath?: Record<CustomLangId, LanguagesByPath>;

	/** Optional roles to match against file globs */
	roles?: Roles;
}

/** Language header template keyed by VSCode language ID */
export interface LanguagesById extends LanguageTemplate {
	/** Template state (default: "enabled"; "fallback" = defer to FilepathTemplate) */
	state?: "enabled" | "disabled" | "fallback";

	/** Optional additional filepath match criteria */
	fileMatch?: LangFileMatch | LangFileMatch[];
}

/** Language header template keyed by filename/glob */
export interface LanguagesByPath extends LanguageTemplate {
	/** Template state (default: "enabled") */
	state?: "enabled" | "disabled";

	/** Filepath match criteria */
	fileMatch: LangFileMatch | LangFileMatch[];
}

/** Base language template format */
export interface LanguageTemplate {
	/**
	 * Template string for the header comment.
	 * Must include the `${headerLine}` placeholder, which will be replaced
	 * with the computed file path or name.
	 */
	header: string;

	/** Override for match by this type of path */
	matchStyle?: FilePathStyle;

	/** Override for displayed language label */
	language?: LabelString;

	/** Optional format name (e.g. "React", "GitHub Issue Template") */
	format?: LabelString;

	/** Documentation metadata (used for generation, not runtime) */
	docs?: DocSource | DocSource[];
}

/** Role configuration for globs */
export interface Role {
	/** Role state (default: "enabled") */
	state?: "enabled" | "disabled";

	/** Override for match by this type of path */
	matchStyle?: FilePathStyle;

	/** Glob pattern to match files */
	glob: GlobString | GlobString[] | Glob[];

	/** Label text to append */
	role: LabelString;
}

/** A glob match entry */
export interface LangFileMatch {
	/** Override for match by this type of path */
	matchStyle?: FilePathStyle;

	/** Glob pattern to match files */
	glob: GlobString | GlobString[] | Glob[];

	/** Override language label */
	language?: LabelString;

	/** Override format label */
	format?: LabelString;

	/** Optional context Label (e.g., variant or part) */
	context?: LabelString;
}

export interface Glob {
	/** Override for match by this type of path */
	matchStyle?: FilePathStyle;

	/** Glob pattern to match files */
	glob: GlobString | GlobString[];
}

/** Documentation metadata (used for generation, not runtime) */
export interface DocSource {
	note?: string;
	url?: URLString;
}

/** What kind of path matching style to use */
export type FilePathStyle = "filename" | "relativePath" | "absolutePath";

// === Primitives for export ===
export type Roles = Record<RoleId, Role>;

// === Common string primitives for clarity ===
export type CustomLangId = string;
export type LabelString = string;
export type GlobString = string;
export type RoleId = string;
export type URLString = string;
export type VSCodeLangId = string;
