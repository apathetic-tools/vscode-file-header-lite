import { defaultConfig } from "../src/config";
import { buildHeaderString } from "../src/utils/buildHeaderString";
import { PathList } from "../src/utils/types";

test("buildHeaderString returns correct header", () => {
	const config = defaultConfig;
	const paths: PathList = {
		absolutePath: "/abs/file.ts",
		relativePath: "src/file.ts",
		filename: "file.ts",
	};
	const header = buildHeaderString(config, "typescript", paths);
	expect(header?.startsWith("//")).toBe(true);
	expect(header?.includes("file.ts")).toBe(true);
});
