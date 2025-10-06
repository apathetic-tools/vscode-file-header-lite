// tests/utils/hasValidHeader.test.ts

/*
 ✓ returns true when header contains relative path
  ✓ returns true when header contains filename only
  ✓ returns false when comment does not contain file info
  ✓ returns false when first line is not a comment
  ✓ returns false for empty document
  ✓ skips leading blank lines
*/

import * as vscode from "vscode";
import { hasValidHeader } from "../../src/utils/hasValidHeader";
import type { PathList } from "../../src/utils/types";

// helper to create a mock TextDocument
function mockDocument(lines: string[]): vscode.TextDocument {
	return {
		lineCount: lines.length,
		lineAt: (i: number) => ({ text: lines[i] }),
	} as unknown as vscode.TextDocument;
}

describe("hasValidHeader()", () => {
	const paths: PathList = {
		absolutePath: "/abs/src/components/Button.tsx",
		relativePath: "src/components/Button.tsx",
		filename: "Button.tsx",
	};

	test("returns true when header contains relative path", () => {
		const doc = mockDocument([
			"// src/components/Button.tsx (React component)",
		]);
		expect(hasValidHeader(doc, paths)).toBe(true);
	});

	test("returns true when header contains filename only", () => {
		const doc = mockDocument(["// Button.tsx"]);
		expect(hasValidHeader(doc, paths)).toBe(true);
	});

	test("returns false when comment does not contain file info", () => {
		const doc = mockDocument(["// This is just a comment"]);
		expect(hasValidHeader(doc, paths)).toBe(false);
	});

	test("returns false when first line is not a comment", () => {
		const doc = mockDocument(["import React from 'react';"]);
		expect(hasValidHeader(doc, paths)).toBe(false);
	});

	test("returns false for empty document", () => {
		const doc = mockDocument([]);
		expect(hasValidHeader(doc, paths)).toBe(false);
	});

	test("skips leading blank lines", () => {
		const doc = mockDocument(["", "   ", "// src/components/Button.tsx"]);
		expect(hasValidHeader(doc, paths)).toBe(true);
	});
});
