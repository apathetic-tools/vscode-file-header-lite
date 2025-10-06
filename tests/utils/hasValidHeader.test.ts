// tests/utils/hasValidHeader.test.ts

/*
 ✓ returns true when header contains relative path
  ✓ returns true when header contains filename only
  ✓ returns false when comment does not contain file info
  ✓ returns false when first line is not a comment
  ✓ returns false for empty document
  ✓ skips leading blank lines
*/

import { hasValidHeader } from "../../src/utils/hasValidHeader";
import type { PathList } from "../../src/utils/types";
import { makeMockDocument } from "../helpers";

describe("hasValidHeader()", () => {
	const paths: PathList = {
		absolutePath: "/abs/src/components/Button.tsx",
		relativePath: "src/components/Button.tsx",
		filename: "Button.tsx",
	};

	test("returns true when header contains relative path", () => {
		const doc = makeMockDocument([
			"// src/components/Button.tsx (React component)",
		]);
		expect(hasValidHeader(doc, paths)).toBe(true);
	});

	test("returns true when header contains filename only", () => {
		const doc = makeMockDocument(["// Button.tsx"]);
		expect(hasValidHeader(doc, paths)).toBe(true);
	});

	test("returns false when comment does not contain file info", () => {
		const doc = makeMockDocument(["// This is just a comment"]);
		expect(hasValidHeader(doc, paths)).toBe(false);
	});

	test("returns false when first line is not a comment", () => {
		const doc = makeMockDocument(["import React from 'react';"]);
		expect(hasValidHeader(doc, paths)).toBe(false);
	});

	test("returns false for empty document", () => {
		const doc = makeMockDocument([]);
		expect(hasValidHeader(doc, paths)).toBe(false);
	});

	test("skips leading blank lines", () => {
		const doc = makeMockDocument(["", "   ", "// src/components/Button.tsx"]);
		expect(hasValidHeader(doc, paths)).toBe(true);
	});
});
