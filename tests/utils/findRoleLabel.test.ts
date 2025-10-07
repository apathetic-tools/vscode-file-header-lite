// tests/utils/findRoleLabel.test.ts

/*
	✓ returns matching role label when glob matches
	✓ returns undefined when no roles defined
	✓ returns undefined when no glob matches
	✓ ignores disabled roles
	✓ respects global matchStyle = 'filename'
	✓ respects role-specific matchStyle = 'absolutePath'
	✓ falls back to config.matchStyle when role.matchStyle is not set
*/

import { findRoleLabel } from "../../src/utils/findRoleLabel";
import { PathList } from "../../src/utils/types";
import { defaultPathPreset, makeDefaultConfig, makePaths } from "../helpers";

describe("findRoleLabel()", () => {
	const basePaths: PathList = makePaths();

	test("returns matching role label when glob matches", () => {
		const config = makeDefaultConfig({
			roles: {
				component: {
					glob: `${defaultPathPreset.relative}/*`,
					role: defaultPathPreset.role,
				},
			},
		});

		const result = findRoleLabel(config, basePaths);
		expect(result).toBe(defaultPathPreset.role);
	});

	test("returns undefined when no roles defined", () => {
		const config = makeDefaultConfig({ roles: undefined });
		const result = findRoleLabel(config, basePaths);
		expect(result).toBeUndefined();
	});

	test("returns undefined when no glob matches", () => {
		const config = makeDefaultConfig({
			roles: {
				page: { glob: "src/pages/*", role: "Page component" },
			},
		});

		const result = findRoleLabel(config, basePaths);
		expect(result).toBeUndefined();
	});

	test("ignores disabled roles", () => {
		const config = makeDefaultConfig({
			roles: {
				component: {
					glob: `${defaultPathPreset.relative}/*`,
					role: defaultPathPreset.role,
					state: "disabled",
				} as const,
			},
		});

		const result = findRoleLabel(config, basePaths);
		expect(result).toBeUndefined();
	});

	test("respects global matchStyle = 'filename'", () => {
		const config = makeDefaultConfig({
			matchStyle: "filename",
			roles: {
				component: {
					glob: "Button.tsx",
					role: "React component",
				},
			},
		});
		const paths = makePaths("Button.tsx", "src/components");
		const result = findRoleLabel(config, paths);
		expect(result).toBe("React component");
	});

	test("respects role-specific matchStyle = 'absolutePath'", () => {
		const config = makeDefaultConfig({
			matchStyle: "relativePath", // global fallback ignored here
			roles: {
				component: {
					glob: "/abs/src/components/*",
					role: "React component",
					matchStyle: "absolutePath",
				},
			},
		});
		const paths = makePaths("Button.tsx", "src/components", "abs");
		const result = findRoleLabel(config, paths);
		expect(result).toBe("React component");
	});

	test("falls back to config.matchStyle when role.matchStyle is not set", () => {
		const config = makeDefaultConfig({
			matchStyle: "relativePath",
			roles: {
				component: {
					glob: "src/components/*",
					role: "React component",
				},
			},
		});
		const paths = makePaths("Button.tsx", "src/components");
		const result = findRoleLabel(config, paths);
		expect(result).toBe("React component");
	});
});
