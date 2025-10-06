// tests/utils/findRoleLabel.test.ts

/*
	✓ returns matching role label when glob matches
	✓ returns undefined when no roles defined
	✓ returns undefined when no glob matches
	✓ ignores disabled roles
*/

import { defaultConfig } from "../../src/config";
import { findRoleLabel } from "../../src/utils/findRoleLabel";
import { PathList } from "../../src/utils/types";

describe("findRoleLabel()", () => {
	const basePaths: PathList = {
		absolutePath: "/abs/src/components/Button.tsx",
		relativePath: "src/components/Button.tsx",
		filename: "Button.tsx",
	};

	test("returns matching role label when glob matches", () => {
		const config = {
			...defaultConfig,
			roles: {
				component: { glob: "src/components/*", role: "React component" },
			},
		};

		const result = findRoleLabel(config, basePaths);
		expect(result).toBe("React component");
	});

	test("returns undefined when no roles defined", () => {
		const config = { ...defaultConfig, roles: undefined };
		const result = findRoleLabel(config, basePaths);
		expect(result).toBeUndefined();
	});

	test("returns undefined when no glob matches", () => {
		const config = {
			...defaultConfig,
			roles: {
				page: { glob: "src/pages/*", role: "Page component" },
			},
		};

		const result = findRoleLabel(config, basePaths);
		expect(result).toBeUndefined();
	});

	test("ignores disabled roles", () => {
		const config = {
			...defaultConfig,
			roles: {
				component: {
					glob: "src/components/*",
					role: "React component",
					state: "disabled",
				} as const,
			},
		};

		const result = findRoleLabel(config, basePaths);
		expect(result).toBeUndefined();
	});
});
