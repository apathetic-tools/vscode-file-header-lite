import type { FilenameHeaderConfig } from "../config/configTypes";
import { defaultConfig } from "../config/defaultConfig";

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
