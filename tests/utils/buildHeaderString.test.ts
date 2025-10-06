// tests/utils/buildHeaderString.test.ts

/*
 ✓ returns correct header
 ✓ respects filePathStyle = 'filename'
 ✓ returns empty string when language is disabled
*/

import { defaultConfig } from "../../src/config";
import { buildHeaderString } from "../../src/utils/buildHeaderString";
import { PathList } from "../../src/utils/types";
import { makePaths } from "../helpers";

describe("buildHeaderString()", () => {
	const basePaths: PathList = makePaths("file.ts", "Src");

	test("returns correct header", () => {
		const config = defaultConfig;
		const header = buildHeaderString(config, "typescript", basePaths);
		expect(header?.startsWith("//")).toBe(true);
		expect(header?.includes("file.ts")).toBe(true);
	});

	test("respects filePathStyle = 'filename'", () => {
		const config = { ...defaultConfig, filePathStyle: "filename" as const };
		const header = buildHeaderString(config, "typescript", basePaths);
		expect(header).toContain("file.ts");
		expect(header).not.toContain("src/file.ts");
	});

	test("returns empty string when language is disabled", () => {
		const config = structuredClone(defaultConfig);
		config.languagesById.typescript.state = "disabled";
		expect(buildHeaderString(config, "typescript", basePaths)).toBe("");
	});
});
