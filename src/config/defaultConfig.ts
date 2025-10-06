// src/defaultConfig.ts
import type { FileHeaderLiteConfig } from "./configTypes";

export const defaultConfig: FileHeaderLiteConfig = {
	/** Replace an outdated header path when file moves */
	autoUpdate: false,

	// === Display Header Parts ===

	/** What file path form to show in header */
	filePathStyle: "relativePath",

	/** Show the main language label (from VSCode) */
	showLanguage: true,

	/** Show format label (e.g. "React", "GitHub Issue Template") */
	showFormat: true,

	/** Show matching role labels (e.g., “Page component”) */
	showRoles: true,

	// === Matching Toggles ===

	/** Use VS Code language templates (keyed by languageId) */
	useLanguagesById: true,

	/** Use filepath-based language templates (keyed by glob patterns) */
	useLanguagesByPath: true,

	/** Match by this type of path */
	matchStyle: "relativePath",

	// === Define Templates ===

	// Official lanaguage identifier list reference:
	//  - https://code.visualstudio.com/docs/languages/identifiers
	// Comment style references:
	//  - Its official specification (if it defines lexical syntax)
	//  - Or its VS Code grammar file under https://github.com/microsoft/vscode/tree/main/extensions/<language-id>
	//  - Goal: Keep comment styles to the most common single-line form per language
	languagesById: {
		// single line comments:

		// REM
		bat: {
			header: "REM ${headerLine}",
			docs: {
				url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/rem",
			},
		},

		// #
		coffeescript: {
			header: "# ${headerLine}",
			docs: { url: "https://coffeescript.org/#comments" },
		},
		dockercompose: {
			header: "# ${headerLine}",
			format: " (YAML)",
			docs: {
				note: "is YAML",
				url: "https://yaml.org/spec/1.2.2/#66-comments",
			},
		},
		diff: {
			header: "# ${headerLine}",
			docs: { note: "non-formal, quirk of processor and now convention" },
		},
		dockerfile: {
			header: "# ${headerLine}",
			docs: {
				note: "indirectly",
				url: "https://docs.docker.com/reference/dockerfile/#parser-directives",
			},
		},
		"git-commit": {
			header: "# ${headerLine}",
			docs: {
				note: "mentions core.commentChar",
				url: "https://git-scm.com/docs/git-commit#Documentation/git-commit.txt-commitcleanup",
			},
		},
		"git-rebase": {
			header: "# ${headerLine}",
			docs: {
				note: "example",
				url: "https://git-scm.com/docs/git-rebase#_rebasing_merges",
			},
		},
		julia: {
			header: "# ${headerLine}",
			docs: { url: "https://docs.julialang.org/en/v1/base/punctuation/" },
		},
		makefile: {
			header: "# ${headerLine}",
			docs: {
				url: "https://www.gnu.org/software/make/manual/html_node/Makefile-Contents.html",
			},
		},
		perl: {
			header: "# ${headerLine}",
			docs: { url: "https://perldoc.perl.org/perlsyn#Comments" },
		},
		perl6: {
			header: "# ${headerLine}",
			// label: "Raku", // not sure if VSCode already did this, will have to test
			docs: {
				note: "now called Raku",
				url: "https://docs.raku.org/language/syntax#Comments",
			},
		},
		plaintext: {
			// we probably could have specified all languageByPath here, but that would have been ugly.
			state: "fallback", // may be a special file based on filename
			header: "# ${headerLine}",
			docs: { note: "convention but could be rendered as content" },
		},
		powershell: {
			header: "# ${headerLine}",
			docs: {
				url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_comments?view=powershell-7.5",
			},
		},
		python: {
			header: "# ${headerLine}",
			docs: [
				{
					note: "v3",
					url: "https://docs.python.org/3/reference/lexical_analysis.html#comments",
				},
				{
					note: "v2",
					url: "https://docs.python.org/2.7/reference/lexical_analysis.html#comments",
				},
			],
		},
		r: {
			header: "# ${headerLine}",
			docs: {
				url: "https://cran.r-project.org/doc/manuals/r-release/R-lang.html#Comments",
			},
		},
		ruby: {
			header: "# ${headerLine}",
			docs: {
				url: "https://docs.ruby-lang.org/en/master/syntax/comments_rdoc.html",
			},
		},
		shellscript: {
			header: "# ${headerLine}",
			docs: {
				note: "defacto bash",
				url: "https://www.gnu.org/software/bash/manual/bash.html#Comments",
			},
		},
		yaml: {
			header: "# ${headerLine}",
			docs: { url: "https://yaml.org/spec/1.2.2/#66-comments" },
		},

		// %
		bibtex: {
			header: "% ${headerLine}",
			docs: {
				note: "same as TeX, section 6.1.1",
				url: "https://texdoc.org/serve/texbook/0",
			},
		},
		erlang: {
			header: "% ${headerLine}",
			docs: { url: "https://www.erlang.org/doc/system/modules.html#comments" },
		},
		latex: {
			header: "% ${headerLine}",
			docs: {
				note: "same as TeX, section 6.1.1",
				url: "https://texdoc.org/serve/texbook/0",
			},
		},
		tex: {
			header: "% ${headerLine}",
			docs: {
				note: "section 6.1.1",
				url: "https://texdoc.org/serve/texbook/0",
			},
		},

		// //
		c: {
			header: "// ${headerLine}",
			docs: {
				note: "C99+, section 6.4.9, page 54",
				url: "https://www.open-std.org/jtc1/sc22/wg14/www/docs/n2310.pdf",
			},
		},
		cpp: {
			header: "// ${headerLine}",
			language: "C++",
			docs: {
				note: "official spec is purchase only",
				url: "https://en.cppreference.com/w/cpp/comments.html",
			},
		},
		csharp: {
			header: "// ${headerLine}",
			docs: {
				url: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/comments",
			},
		},
		"cuda-cpp": {
			header: "// ${headerLine}",
			docs: {
				note: "example",
				url: "https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html?highlight=comment#lambda-expressions",
			},
		},
		d: {
			header: "// ${headerLine}",
			docs: { url: "https://dlang.org/spec/lex.html#comment" },
		},
		dart: {
			header: "// ${headerLine}",
			docs: { url: "https://dart.dev/language/comments" },
		},
		fsharp: {
			header: "// ${headerLine}",
			docs: {
				url: "https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/symbol-and-operator-reference/#comment-compiler-directive-and-attribute-symbols",
			},
		},
		go: {
			header: "// ${headerLine}",
			docs: { url: "https://go.dev/ref/spec#Comments" },
		},
		groovy: {
			header: "// ${headerLine}",
			docs: { url: "https://groovy-lang.org/syntax.html#_comments" },
		},
		java: {
			header: "// ${headerLine}",
			docs: {
				url: "https://docs.oracle.com/javase/specs/jls/se22/html/jls-3.html#jls-3.7",
			},
		},
		javascript: {
			header: "// ${headerLine}",
			format: " (ECMAScript)",
			docs: {
				note: "ECMAScript Spec",
				url: "https://tc39.es/ecma262/#prod-SingleLineComment",
			},
		},
		javascriptreact: {
			header: "// ${headerLine}",
			// base: " (ECMAScript + React)", // not sure what this is, will have to test, assumed for .jsx
			docs: {
				note: "example",
				url: "https://react.dev/learn/writing-markup-with-jsx#converting-html-to-jsx",
			},
		},
		json: {
			// clients may re-enable this and add FileMatch paths where they'd like it turned on for specific paths or files where they know json can have comments.
			// because we don't really support layered configs, they will need to define the entire object but this should give them an example to drop in and modify.
			state: "disabled",
			header: "// ${headerLine}",
			docs: { note: "does not officially or always support comments at all" },
		},
		jsonc: {
			header: "// ${headerLine}",
			docs: { url: "https://jsonc.org/#single-line-comments" },
		},
		"objective-c": {
			header: "// ${headerLine}",
			docs: {
				note: "example",
				url: "https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Conventions/Conventions.html#//apple_ref/doc/uid/TP40011210-CH6-SW9",
			},
		},
		"objective-cpp": {
			header: "// ${headerLine}",
			docs: {
				note: "ObjectiveC++ is Objective-c and C++ syntax, both same for comments",
				url: "https://en.wikipedia.org/wiki/Objective-C",
			},
		},
		php: {
			header: "// ${headerLine}",
			docs: {
				url: "https://www.php.net/manual/en/language.basic-syntax.comments.php",
			},
		},
		jade: {
			header: "// ${headerLine}",
			docs: {
				url: "https://secure.jadeworld.com/developer-centre/Jade2020/OnlineDocumentation/content/reurls/devref/ch1languageref/using_comments_in_your_methods.htm",
			},
		},
		rust: {
			header: "// ${headerLine}",
			docs: { url: "https://doc.rust-lang.org/reference/comments.html" },
		},
		sass: {
			header: "// ${headerLine}",
			docs: {
				note: "care next line isn't indended",
				url: "https://sass-lang.com/documentation/syntax/comments/#in-sass",
			},
		},
		scss: {
			header: "// ${headerLine}",
			docs: {
				note: "sass docs address scss",
				url: "https://sass-lang.com/documentation/syntax/comments/#in-scss",
			},
		},
		shaderlab: {
			header: "// ${headerLine}",
			docs: {
				note: "Unity3D Shaders, example",
				url: "https://docs.unity3d.com/6000.2/Documentation/Manual/built-in-shader-examples-single-color.html",
			},
		},
		stylus: {
			header: "// ${headerLine}",
			docs: { url: "https://stylus-lang.com/docs/comments.html" },
		},
		swift: {
			header: "// ${headerLine}",
			docs: {
				url: "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics/#Comments",
			},
		},
		typescript: {
			header: "// ${headerLine}",
			docs: {
				note: "shows inline comment examples",
				url: "https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#type",
			},
		},
		typescriptreact: {
			header: "// ${headerLine}",
			// base: " (Typescript + React)", // not sure what this is, will have to test, assumed for .tsx
			docs: {
				note: "same as javascriptreact, example",
				url: "https://react.dev/learn/writing-markup-with-jsx#converting-html-to-jsx",
			},
		},

		// //-
		pug: {
			header: "//- ${headerLine}",
			docs: { url: "https://pugjs.org/language/comments.html" },
		},

		// '
		vb: {
			header: "' ${headerLine}",
			docs: {
				url: "https://learn.microsoft.com/en-us/dotnet/visual-basic/language-reference/statements/rem-statement",
			},
		},

		// ;
		clojure: {
			header: ";; ${headerLine}",
			docs: {
				note: ";; is emphasis convention",
				url: "https://clojure.org/guides/weird_characters#_comment",
			},
		},
		ini: {
			header: "; ${headerLine}",
			docs: { url: "https://en.wikipedia.org/wiki/INI_file#Comments" },
		},

		// --
		haskell: {
			header: "-- ${headerLine}",
			docs: {
				url: "https://www.haskell.org/onlinereport/lexemes.html#sect2.3",
			},
		},
		lua: {
			header: "-- ${headerLine}",
			docs: { url: "https://www.lua.org/manual/5.4/manual.html#3.1" },
		},
		sql: {
			header: "-- ${headerLine}",
			docs: {
				note: "official spec is purchase only",
				url: "https://en.wikipedia.org/wiki/SQL_syntax#Comments",
			},
		},

		// *
		abap: {
			header: "* ${headerLine}",
			docs: {
				url: "https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm?file=abencomment.htm",
			},
		},

		// -#
		haml: {
			header: "-# ${headerLine}",
			docs: {
				url: "https://haml.info/docs/yardoc/file.REFERENCE.html#comments",
			},
		},

		// /
		slim: {
			header: "/ ${headerLine}",
			docs: { url: "https://rubydoc.info/gems/slim/frames#code-comment" },
		},

		// block comments:

		// /* ~ */
		css: {
			header: "/* ${headerLine} */",
			docs: { url: "https://www.w3.org/TR/css-syntax-3/#consume-comment" },
		},
		less: {
			header: "/* ${headerLine} */",
			docs: { url: "https://lesscss.org/#comments" },
		},

		// <!-- ~ -->
		html: {
			header: "<!-- ${headerLine} -->",
			docs: {
				url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Comments",
			},
		},
		markdown: {
			header: "<!-- ${headerLine} -->",
			docs: {
				note: "most support HTML style, rare do not",
				url: "https://spec.commonmark.org/0.31.2/#example-179",
			},
		},
		svelte: {
			header: "<!-- ${headerLine} -->",
			docs: { url: "https://svelte.dev/docs/svelte/basic-markup#Comments" },
		},
		vue: {
			header: "<!-- ${headerLine} -->",
			// base: " (HTML)", // let's experiment and see what is shown for Language
			docs: {
				note: "top-level is HTML style",
				url: "https://vuejs.org/api/sfc-spec.html#comments",
			},
		},
		"vue-html": {
			header: "<!-- ${headerLine} -->",
			// base: " (HTML)", // let's experiment and see what is shown for Language
			docs: {
				note: "top-level is HTML style",
				url: "https://vuejs.org/api/sfc-spec.html#comments",
			},
		},
		xml: {
			header: "<!-- ${headerLine} -->",
			docs: { url: "https://www.w3.org/TR/xml11/#sec-comments" },
		},
		xsl: {
			header: "<!-- ${headerLine} -->",
			docs: {
				note: "XSL uses XML notation",
				url: "https://www.w3.org/Style/XSL/WhatIsXSL.html",
			},
		},

		// (* ~ *)
		ocaml: {
			header: "(* ${headerLine} *)",
			docs: { url: "https://ocaml.org/manual/5.3/lex.html#ss:comments" },
		},

		// { ~ }
		pascal: {
			header: "{ ${headerLine} }",
			docs: {
				url: "https://www.freepascal.org/docs-html/ref/refse2.html#x10-90001.2",
			},
		},

		// {{! ~ }}
		handlebars: {
			header: "{{! ${headerLine} }}",
			docs: { url: "https://handlebarsjs.com/guide/#comments" },
		},

		// @* ~ *@
		razor: {
			header: "@* ${headerLine} *@",
			docs: {
				url: "https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor?view=aspnetcore-9.0#comments",
			},
		},
	},
	languagesByPath: {},
	roles: {},
};
