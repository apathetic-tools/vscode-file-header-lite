// tests/utils/pathHelpers.test.ts

import * as vscode from "vscode";
import { getFilePaths } from "../../src/utils/pathHelpers";
import type { PathList } from "../../src/utils/types";

describe("getFilePaths()", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	test("returns relative path when workspace folder exists", () => {
		const mockUri = { fsPath: "/workspace/src/utils/file.ts" } as vscode.Uri;
		const mockDoc = { uri: mockUri } as vscode.TextDocument;

		vi.spyOn(vscode.workspace, "getWorkspaceFolder").mockReturnValue({
			uri: { fsPath: "/workspace" },
		} as vscode.WorkspaceFolder);

		const result: PathList = getFilePaths(mockDoc);

		expect(result.absolutePath).toBe("/workspace/src/utils/file.ts");
		expect(result.relativePath).toBe("src/utils/file.ts");
		expect(result.filename).toBe("file.ts");
	});

	test("returns basename as relative path when no workspace folder", () => {
		const mockUri = { fsPath: "/other/file.ts" } as vscode.Uri;
		const mockDoc = { uri: mockUri } as vscode.TextDocument;

		vi.spyOn(vscode.workspace, "getWorkspaceFolder").mockReturnValue(undefined);

		const result: PathList = getFilePaths(mockDoc);

		expect(result.absolutePath).toBe("/other/file.ts");
		expect(result.relativePath).toBe("file.ts");
		expect(result.filename).toBe("file.ts");
	});

	test("normalizes Windows-style backslashes", () => {
		const mockUri = { fsPath: "C:\\workspace\\src\\file.ts" } as vscode.Uri;
		const mockDoc = { uri: mockUri } as vscode.TextDocument;

		vi.spyOn(vscode.workspace, "getWorkspaceFolder").mockReturnValue({
			uri: { fsPath: "C:\\workspace" },
		} as vscode.WorkspaceFolder);

		const result: PathList = getFilePaths(mockDoc);

		expect(result.absolutePath).toBe("C:/workspace/src/file.ts");
		expect(result.relativePath.replace(/\\/g, "/")).toContain("file.ts");
		expect(result.filename).toBe("file.ts");
	});
});
