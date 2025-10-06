// vitest.config.ts

import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		// Align Vite/Vitest import resolution with your TS config
		tsconfigPaths({ projects: ["./tsconfig.tests.json"] }),
	],
	test: {
		globals: true, // enable describe(), it(), expect()
		environment: "node", // node, not jsdom
		include: ["tests/**/*.test.ts"], // your test folder pattern
		typecheck: {
			tsconfig: "./tsconfig.tests.json", // ensures type checking uses test config
		},
		coverage: {
			provider: "v8",
			reporter: ["text", "html"],
		},
	},
});
