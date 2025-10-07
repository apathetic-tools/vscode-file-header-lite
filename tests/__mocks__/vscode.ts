// tests/__mocks__/vscode.ts

export const workspace = {
	getWorkspaceFolder: vi.fn(),
};

export type Uri = { fsPath: string };
export type TextDocument = { uri: Uri };
export type WorkspaceFolder = { uri: Uri };
