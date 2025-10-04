// src/defaultConfig.ts
import type { FilenameHeaderConfig } from "./configTypes";

export const defaultConfig: FilenameHeaderConfig = {
	languages: {
		css: "/* ${relativeFile} */",
		html: "<!-- ${relativeFile} -->",
		javascript: "// ${relativeFile}",
		jsonc: "// ${relativeFile}",
		md: "<!-- ${relativeFile} -->",
		python: "# ${relativeFile}",
		typescript: "// ${relativeFile}",
		cpp: "// ${relativeFile}",
		csharp: "// ${relativeFile}",
		sh: "# ${relativeFile}",
		toml: "# ${relativeFile}",
		yaml: "# ${relativeFile}",
	},
	roles: {},
	addLanguageLabel: true,
};
