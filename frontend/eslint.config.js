import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

export default tseslint.config([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		ignores: ["**/*.gen.ts", "**/*.gen.tsx"],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs["recommended-latest"],
			reactRefresh.configs.vite,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		"import/no-restricted-paths": [
			"error",
			{
				zones: [
					// enforce unidirectional codebase:
					// e.g. src/app can import from src/features but not the other way around
					{
						target: "./src/features",
						from: "./src/app",
					},

					// e.g src/features and src/app can import from these shared modules but not the other way around
					{
						target: ["./src/components", "./src/hooks", "./src/lib", "./src/types", "./src/utils"],
						from: ["./src/features", "./src/app"],
					},
				],
			},
		],
	},
]);
