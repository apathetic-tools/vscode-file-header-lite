// tests/core/headerInserter.test.ts

/*
	✓ returns undefined when useLanguagesById=false
	✓ returns undefined when language not found
	✓ returns undefined when language is disabled
	✓ returns undefined when language has no header defined
	✓ returns header string when valid
*/

import { generateHeaderForDocument } from "../../src/core/generateHeaderForDocument";
import { makeDefaultConfig, makeMockDocument } from "../helpers";

describe("generateHeaderForDocument()", () => {
	test("returns undefined when useLanguagesById=false", () => {
		const config = makeDefaultConfig({ useLanguagesById: false });
		const doc = makeMockDocument({ languageId: "typescript" });
		expect(generateHeaderForDocument(config, doc)).toBeUndefined();
	});

	test("returns undefined when language is disabled", () => {
		const config = makeDefaultConfig();
		config.languagesById.typescript.state = "disabled";
		const doc = makeMockDocument({ languageId: "typescript" });
		expect(generateHeaderForDocument(config, doc)).toBeUndefined();
	});

	test("returns a valid header string when enabled", () => {
		const config = makeDefaultConfig();
		const doc = makeMockDocument({ languageId: "typescript" });
		const header = generateHeaderForDocument(config, doc);
		expect(header).toContain("file.ts");
		expect(header?.startsWith("//")).toBe(true);
	});

	test("returns undefined when language has no header defined", () => {
		const config = makeDefaultConfig();
		config.languagesById.typescript.headerTemplate = ""; // simulate missing template
		const doc = makeMockDocument({ languageId: "typescript" });
		expect(generateHeaderForDocument(config, doc)).toBeUndefined();
	});
});
