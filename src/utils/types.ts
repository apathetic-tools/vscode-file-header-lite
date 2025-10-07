export type PathList = {
	absolutePath: string;
	relativePath: string;
	filename: string;
};

export interface ResolvedLanguageTemplate {
	headerTemplate: string;
	state?: "enabled" | "disabled" | "fallback";
	language?: string;
	format?: string;
	context?: string;
}
