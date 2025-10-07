// tests/utils/buildHeaderString.test.ts

/*
 ✓ returns correct header
 ✓ respects filePathStyle = 'filename'
 ✓ returns empty string when language is disabled
 ✓ includes language label when showLanguage=true
 ✓ omits language label when showLanguage=false
 ✓ includes role label when showRoles=true
 ✓ omits role label when showRoles=false 
 ✓ includes format label when showFormat=true
 ✓ omits format label when showFormat=false
 ✓ includes both language and format joined by em dash
 ✓ includes only language when no format defined
 ✓ includes role when matching role glob and showRoles=true
 ✓ omits role when showRoles=false
 ✓ respects filePathStyle for display only (not matching)
*/

import { PathList, buildHeaderString, findRoleLabel } from "../../src/utils";
import type { ResolvedLanguageTemplate } from "../../src/utils/types";
import { makeDefaultConfig, makePaths } from "../helpers";

describe("buildHeaderString()", () => {
	const basePaths: PathList = makePaths("file.ts", "src");
	const baseTemplate: ResolvedLanguageTemplate = {
		headerTemplate: "// ${headerLine}",
		state: "enabled",
		language: "TypeScript",
		format: undefined,
		context: undefined,
	};

	test("returns correct header", () => {
		const config = makeDefaultConfig();
		const header = buildHeaderString(config, baseTemplate, basePaths);
		expect(header?.startsWith("//")).toBe(true);
		expect(header?.includes("file.ts")).toBe(true);
	});

	test("respects filePathStyle = 'filename'", () => {
		const config = makeDefaultConfig({ filePathStyle: "filename" });
		const header = buildHeaderString(config, baseTemplate, basePaths);
		expect(header).toContain("file.ts");
		expect(header).not.toContain("src/file.ts");
	});

	test("returns empty string when language is disabled", () => {
		const config = makeDefaultConfig();
		const disabledTemplate = { ...baseTemplate, state: "disabled" as const };
		expect(buildHeaderString(config, disabledTemplate, basePaths)).toBe("");
	});

	test("includes language label when showLanguage=true", () => {
		const config = makeDefaultConfig({
			showLanguage: true,
		});
		const header = buildHeaderString(config, baseTemplate, basePaths);
		expect(header).toContain("TypeScript");
	});

	test("omits language label when showLanguage=false", () => {
		const config = makeDefaultConfig({
			showLanguage: false,
		});
		const header = buildHeaderString(config, baseTemplate, basePaths);
		expect(header).not.toContain("TypeScript");
	});

	test("includes role label when showRoles=true", () => {
		const config = makeDefaultConfig({
			showRoles: true,
		});
		const header = buildHeaderString(
			config,
			baseTemplate,
			basePaths,
			"React component",
		);
		expect(header).toContain("React component");
	});

	test("omits role label when showRoles=false", () => {
		const config = makeDefaultConfig({
			showRoles: false,
		});
		const header = buildHeaderString(
			config,
			baseTemplate,
			basePaths,
			"React component",
		);
		expect(header).not.toContain("React component");
	});

	test("includes format label when showFormat=true", () => {
		const config = makeDefaultConfig({
			showFormat: true,
		});
		const template = {
			...baseTemplate,
			language: undefined,
			format: "React",
		};
		const header = buildHeaderString(config, template, basePaths);
		expect(header).toContain("React");
	});

	test("omits format label when showFormat=false", () => {
		const config = makeDefaultConfig({
			showFormat: false,
		});
		const header = buildHeaderString(config, baseTemplate, basePaths);
		expect(header).not.toContain("React");
	});

	test("includes both language and format joined by em dash", () => {
		const config = makeDefaultConfig({
			showLanguage: true,
			showFormat: true,
		});
		const template = {
			...baseTemplate,
			language: "TypeScript",
			format: "React",
		};
		const header = buildHeaderString(config, template, makePaths());
		expect(header).toContain("(TypeScript — React)");
	});

	test("includes only language when no format defined", () => {
		const config = makeDefaultConfig({
			showLanguage: true,
			showFormat: true,
		});
		const header = buildHeaderString(config, baseTemplate, makePaths());
		expect(header).toContain("(TypeScript)");
		expect(header).not.toContain("—");
	});

	test("includes role when matching role glob and showRoles=true", () => {
		const config = makeDefaultConfig({
			showRoles: true,
			roles: {
				component: {
					glob: "src/components/*",
					role: "React component",
				},
			},
		});

		const paths = makePaths("Button.tsx", "src/components");
		const roleLabel = findRoleLabel(config, paths);
		const header = buildHeaderString(config, baseTemplate, paths, roleLabel);

		expect(header).toContain("React component");
	});

	test("omits role when showRoles=false", () => {
		const config = makeDefaultConfig({
			showRoles: false,
			roles: {
				component: {
					glob: "src/components/*",
					role: "React component",
				},
			},
		});

		const paths = makePaths("Button.tsx", "src/components");
		const roleLabel = findRoleLabel(config, paths);
		const header = buildHeaderString(config, baseTemplate, paths, roleLabel);

		expect(header).not.toContain("React component");
	});

	test("respects filePathStyle for display only (not matching)", () => {
		const config = makeDefaultConfig({
			filePathStyle: "absolutePath",
			showRoles: true,
			roles: {
				component: {
					glob: "src/components/*", // still relative glob
					role: "React component",
				},
			},
		});
		const paths = makePaths(
			"Button.tsx",
			"src/components",
			"/Users/me/project",
		);
		const roleLabel = findRoleLabel(config, paths);
		const header = buildHeaderString(config, baseTemplate, paths, roleLabel);

		// Verify the header displays the absolute path
		expect(header).toContain("/Users/me/project/src/components/Button.tsx");

		// But the role still matched via relative path
		expect(header).toContain("React component");
	});
});
