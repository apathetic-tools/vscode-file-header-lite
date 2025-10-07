// tests/utils/buildHeaderString.test.ts

/*
 ✓ returns correct header
 ✓ respects filePathStyle = 'filename'
 ✓ returns empty string when language is disabled
 ✓ includes language label when showLanguage=true
 ✓ omits language label when showLanguage=false
 ✓ includes role label when showRoles=true
 ✓ omits role label when showRoles=false 
*/

import { buildHeaderString } from "../../src/utils/buildHeaderString";
import { PathList } from "../../src/utils/types";
import { makeDefaultConfig, makePaths } from "../helpers";

describe("buildHeaderString()", () => {
	const basePaths: PathList = makePaths("file.ts", "Src");

	test("returns correct header", () => {
		const config = makeDefaultConfig();
		const header = buildHeaderString(config, "typescript", basePaths);
		expect(header?.startsWith("//")).toBe(true);
		expect(header?.includes("file.ts")).toBe(true);
	});

	test("respects filePathStyle = 'filename'", () => {
		const config = makeDefaultConfig({ filePathStyle: "filename" });
		const header = buildHeaderString(config, "typescript", basePaths);
		expect(header).toContain("file.ts");
		expect(header).not.toContain("src/file.ts");
	});

	test("returns empty string when language is disabled", () => {
		const config = makeDefaultConfig();
		config.languagesById.typescript.state = "disabled";
		expect(buildHeaderString(config, "typescript", basePaths)).toBe("");
	});

	test("includes language label when showLanguage=true", () => {
		const config = makeDefaultConfig({
			showLanguage: true,
			languagesById: {
				typescript: {
					header: "// ${headerLine}",
					language: "TypeScript",
				},
			},
		});
		const header = buildHeaderString(config, "typescript", basePaths);
		expect(header).toContain("TypeScript");
	});

	test("omits language label when showLanguage=false", () => {
		const config = makeDefaultConfig({
			showLanguage: false,
			languagesById: {
				typescript: {
					header: "// ${headerLine}",
					language: "TypeScript",
				},
			},
		});
		const header = buildHeaderString(config, "typescript", basePaths);
		expect(header).not.toContain("TypeScript");
	});

	test("includes role label when showRoles=true", () => {
		const config = makeDefaultConfig({
			showRoles: true,
			languagesById: {
				typescript: {
					header: "// ${headerLine}",
					language: "TypeScript",
				},
			},
		});
		const header = buildHeaderString(
			config,
			"typescript",
			basePaths,
			"React component",
		);
		expect(header).toContain("React component");
	});

	test("omits role label when showRoles=false", () => {
		const config = makeDefaultConfig({
			showRoles: false,
			languagesById: {
				typescript: {
					header: "// ${headerLine}",
					language: "TypeScript",
				},
			},
		});
		const header = buildHeaderString(
			config,
			"typescript",
			basePaths,
			"React component",
		);
		expect(header).not.toContain("React component");
	});
});
