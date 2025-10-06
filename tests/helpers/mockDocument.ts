// tests/helpers/mockDocument.ts

import type * as vscode from "vscode";

/**
 * Creates a lightweight mock TextDocument for testing.
 * Only implements the fields and methods your utils actually use.
 */
export function makeMockDocument(lines: string[]): vscode.TextDocument {
	return {
		lineCount: lines.length,
		lineAt: (i: number) => ({ text: lines[i] }),
		// Minimal set of properties for type compatibility.
		// Add more stubs later if you test functions that need them.
		getText: () => lines.join("\n"),
		uri: { fsPath: "/workspace/mockfile.ts" } as vscode.Uri,
	} as unknown as vscode.TextDocument;
}
