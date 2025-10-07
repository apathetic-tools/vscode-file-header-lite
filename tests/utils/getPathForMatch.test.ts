// tests/utils/getPathForMatch.test.ts

/*
	✓ returns filename for matchStyle='filename'
	✓ returns relative path for matchStyle='relativePath'
	✓ returns absolute path for matchStyle='absolutePath'
	✓ defaults to relative path when style is unknown
*/

import { getPathForMatch } from "../../src/utils/getPathForMatch";
import type { PathList } from "../../src/utils/types";

describe("getPathForMatch()", () => {
	const paths: PathList = {
		filename: "Button.tsx",
		relativePath: "src/components/Button.tsx",
		absolutePath: "/home/user/project/src/components/Button.tsx",
	};

	test("returns filename for matchStyle='filename'", () => {
		expect(getPathForMatch(paths, "filename")).toBe("Button.tsx");
	});

	test("returns relative path for matchStyle='relativePath'", () => {
		expect(getPathForMatch(paths, "relativePath")).toBe(
			"src/components/Button.tsx",
		);
	});

	test("returns absolute path for matchStyle='absolutePath'", () => {
		expect(getPathForMatch(paths, "absolutePath")).toBe(
			"/home/user/project/src/components/Button.tsx",
		);
	});

	test("defaults to relative path when style is unknown", () => {
		// @ts-expect-error intentional invalid style
		expect(getPathForMatch(paths, "invalid")).toBe("src/components/Button.tsx");
	});
});
