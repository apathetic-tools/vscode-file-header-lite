// tests/utils/buildHeaderString.test.ts

/*
   Core behavior:
 ✓ returns correct header
 ✓ respects filePathStyle = 'filename'
 ✓ returns undefined when language is disabled
 ✓ includes both language and format joined by em dash
 ✓ includes only language when no format defined
 ✓ includes role when role glob matches and showRoles=true
 ✓ omits role when no role glob matches and showRoles=true
 ✓ respects filePathStyle for display only (not matching)

   Visibility toggles:
 ✓ includes language label when showLanguage=true
 ✓ omits language label when showLanguage=false
 ✓ includes role label when showRoles=true
 ✓ omits role label when showRoles=false 
 ✓ includes format label when showFormat=true
 ✓ omits format label when showFormat=false

   Template customization:
 ✓ returns undefined when headerTemplate missing
 ✓ applies custom filePathTemplate
 ✓ applies custom languageTemplate
 ✓ applies custom formatTemplate
 ✓ applies custom jointLanguageAndFormatTemplate
 ✓ applies contextTemplate when context defined
 ✓ applies roleTemplate when showRoles=true

	Safety & integrity:
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

	test("returns undefined when language is disabled", () => {
		const config = makeDefaultConfig();
		const disabledTemplate = { ...baseTemplate, state: "disabled" as const };
		expect(
			buildHeaderString(config, disabledTemplate, basePaths),
		).toBeUndefined();
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

	test("includes role when role glob matches and showRoles=true", () => {
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

	test("omits role when no role glob matches and showRoles=true", () => {
		const config = makeDefaultConfig({
			showRoles: true,
			roles: {
				component: {
					glob: "src/components/*",
					role: "React component",
				},
			},
		});

		const paths = makePaths("Button.tsx", "src/overrides");
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

	test("returns undefined when headerTemplate missing", () => {
		const config = makeDefaultConfig();

		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- intentional omit for test
		const { headerTemplate: _unusedHeaderTemplate, ...rest } = baseTemplate;
		const template = { ...rest }; // headerTemplate is now absent

		// @ts-expect-error intentionally passing object without headerTemplate
		const header = buildHeaderString(config, template, basePaths);

		expect(header).toBeUndefined();
	});

	test("applies custom filePathTemplate", () => {
		const config = makeDefaultConfig({ filePathTemplate: "📄 ${filePath}" });
		const header = buildHeaderString(config, baseTemplate, basePaths);
		expect(header).toContain("📄 src/file.ts");
	});

	test("applies custom languageTemplate", () => {
		const config = makeDefaultConfig({ languageTemplate: " <${language}>" });
		const header = buildHeaderString(config, baseTemplate, basePaths);
		expect(header).toContain("<TypeScript>");
	});

	test("applies custom formatTemplate", () => {
		const config = makeDefaultConfig({ formatTemplate: " [${format}]" });
		const template = { ...baseTemplate, language: undefined, format: "React" };
		const header = buildHeaderString(config, template, basePaths);
		expect(header).toContain("[React]");
	});

	test("applies custom jointLanguageAndFormatTemplate", () => {
		const config = makeDefaultConfig({
			jointLanguageAndFormatTemplate: " (${language}|${format})",
		});
		const template = { ...baseTemplate, format: "React" };
		const header = buildHeaderString(config, template, basePaths);
		expect(header).toContain("(TypeScript|React)");
	});

	test("applies contextTemplate when context defined", () => {
		const config = makeDefaultConfig();
		const template = { ...baseTemplate, context: "Component" };
		const header = buildHeaderString(config, template, basePaths);
		expect(header).toContain("[Component]");
	});

	test("applies roleTemplate when showRoles=true", () => {
		const config = makeDefaultConfig({ roleTemplate: " <<${role}>>" });
		const header = buildHeaderString(
			config,
			baseTemplate,
			basePaths,
			"React component",
		);
		expect(header).toContain("<<React component>>");
	});
});
