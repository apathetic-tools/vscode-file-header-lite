import { defaultConfig, type FilenameHeaderConfig } from "../config/";

export function mergeConfig(
	userConfig: Partial<FilenameHeaderConfig>,
): FilenameHeaderConfig {
	return {
		...defaultConfig,
		...userConfig,
		languages: {
			...defaultConfig.languages,
			...userConfig.languages,
		},
		roles: {
			...defaultConfig.roles,
			...userConfig.roles,
		},
	};
}
