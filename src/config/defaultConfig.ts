// src/defaultConfig.ts
import type { FilenameHeaderConfig } from "./configTypes";

export const defaultConfig: FilenameHeaderConfig = {
	// Official lanaguage identifier list reference:
	//  - https://code.visualstudio.com/docs/languages/identifiers
	// Comment style references:
	//  - Its official specification (if it defines lexical syntax)
	//  - Or its VS Code grammar file under https://github.com/microsoft/vscode/tree/main/extensions/<language-id>
	//  - Goal: Keep comment styles to the most common single-line form per language
	languages: {
		// single line comments:

		// REM
		bat: "REM ${relativeFile}", // https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/rem

		// #
		coffeescript: "# ${relativeFile}", // https://coffeescript.org/#comments
		dockercompose: "# ${relativeFile}", // is YAML: https://yaml.org/spec/1.2.2/#66-comments
		diff: "# ${relativeFile}", // non-formal, quirk of processor and now convention
		dockerfile: "# ${relativeFile}", // indirectly: https://docs.docker.com/reference/dockerfile/#parser-directives
		"git-commit": "# ${relativeFile}", // mentions core.commentChar: https://git-scm.com/docs/git-commit#Documentation/git-commit.txt-commitcleanup
		"git-rebase": "# ${relativeFile}", // example: https://git-scm.com/docs/git-rebase#_rebasing_merges
		julia: "# ${relativeFile}", // https://docs.julialang.org/en/v1/base/punctuation/
		makefile: "# ${relativeFile}", // https://www.gnu.org/software/make/manual/html_node/Makefile-Contents.html
		perl: "# ${relativeFile}", // https://perldoc.perl.org/perlsyn#Comments
		perl6: "# ${relativeFile}", // now called Raku: https://docs.raku.org/language/syntax#Comments
		// plaintext: "# ${relativeFile}", // convention but could be rendered as content
		powershell: "# ${relativeFile}", // https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_comments?view=powershell-7.5
		python: "# ${relativeFile}", // v3 https://docs.python.org/3/reference/lexical_analysis.html#comments // v2 https://docs.python.org/2.7/reference/lexical_analysis.html#comments
		r: "# ${relativeFile}", // https://cran.r-project.org/doc/manuals/r-release/R-lang.html#Comments
		ruby: "# ${relativeFile}", // https://docs.ruby-lang.org/en/master/syntax/comments_rdoc.html
		shellscript: "# ${relativeFile}", // defacto bash: https://www.gnu.org/software/bash/manual/bash.html#Comments
		yaml: "# ${relativeFile}", // https://yaml.org/spec/1.2.2/#66-comments

		// %
		bibtex: "% ${relativeFile}", // same as TeX, section 6.1.1: https://texdoc.org/serve/texbook/0
		erlang: "% ${relativeFile}", // https://www.erlang.org/doc/system/modules.html#comments
		latex: "% ${relativeFile}", // same as TeX, section 6.1.1: https://texdoc.org/serve/texbook/0
		tex: "% ${relativeFile}", // section 6.1.1: https://texdoc.org/serve/texbook/0

		// //
		c: "// ${relativeFile}", // C99+, section 6.4.9, page 54: https://www.open-std.org/jtc1/sc22/wg14/www/docs/n2310.pdf
		cpp: "// ${relativeFile}", // official spec is purchase only: https://en.cppreference.com/w/cpp/comments.html
		csharp: "// ${relativeFile}", // https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/comments
		"cuda-cpp": "// ${relativeFile}", // example: https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html?highlight=comment#lambda-expressions
		d: "// ${relativeFile}", // https://dlang.org/spec/lex.html#comment
		dart: "// ${relativeFile}", // https://dart.dev/language/comments
		fsharp: "// ${relativeFile}", // https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/symbol-and-operator-reference/#comment-compiler-directive-and-attribute-symbols
		go: "// ${relativeFile}", // https://go.dev/ref/spec#Comments
		groovy: "// ${relativeFile}", // https://groovy-lang.org/syntax.html#_comments
		java: "// ${relativeFile}", // https://docs.oracle.com/javase/specs/jls/se22/html/jls-3.html#jls-3.7
		javascript: "// ${relativeFile}", // ECMAScript Spec https://tc39.es/ecma262/#prod-SingleLineComment
		javascriptreact: "// ${relativeFile}", // example: https://react.dev/learn/writing-markup-with-jsx#converting-html-to-jsx
		// json: "// ${relativeFile}", // does not officially or always support comments at all
		jsonc: "// ${relativeFile}", // https://jsonc.org/#single-line-comments
		"objective-c": "// ${relativeFile}", // example: https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Conventions/Conventions.html#//apple_ref/doc/uid/TP40011210-CH6-SW9
		"objective-cpp": "// ${relativeFile}", // ObjectiveC++ is Objective-c and C++ syntax, both same for comments: https://en.wikipedia.org/wiki/Objective-C
		php: "// ${relativeFile}", // https://www.php.net/manual/en/language.basic-syntax.comments.php
		jade: "// ${relativeFile}", // https://secure.jadeworld.com/developer-centre/Jade2020/OnlineDocumentation/content/resources/devref/ch1languageref/using_comments_in_your_methods.htm
		rust: "// ${relativeFile}", // https://doc.rust-lang.org/reference/comments.html
		sass: "// ${relativeFile}", // care next line isn't indended: https://sass-lang.com/documentation/syntax/comments/#in-sass
		scss: "// ${relativeFile}", // sass docs address scss: https://sass-lang.com/documentation/syntax/comments/#in-scss
		shaderlab: "// ${relativeFile}", // Unity3D Shaders, example: https://docs.unity3d.com/6000.2/Documentation/Manual/built-in-shader-examples-single-color.html
		stylus: "// ${relativeFile}", // https://stylus-lang.com/docs/comments.html
		swift: "// ${relativeFile}", // https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics/#Comments
		typescript: "// ${relativeFile}", // shows inline comment examples: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#type
		typescriptreact: "// ${relativeFile}", // same as javascriptreact, example: https://react.dev/learn/writing-markup-with-jsx#converting-html-to-jsx

		// //-
		pug: "//- ${relativeFile}", // https://pugjs.org/language/comments.html

		// '
		vb: "' ${relativeFile}", // https://learn.microsoft.com/en-us/dotnet/visual-basic/language-reference/statements/rem-statement

		// ;
		clojure: ";; ${relativeFile}", // ;; is emphasis convention: https://clojure.org/guides/weird_characters#_comment
		ini: "; ${relativeFile}", // https://en.wikipedia.org/wiki/INI_file#Comments

		// --
		haskell: "-- ${relativeFile}", // https://www.haskell.org/onlinereport/lexemes.html#sect2.3
		lua: "-- ${relativeFile}", // https://www.lua.org/manual/5.4/manual.html#3.1
		sql: "-- ${relativeFile}", // official spec is purchase only: https://en.wikipedia.org/wiki/SQL_syntax#Comments

		// *
		abap: "* ${relativeFile}", // https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/index.htm?file=abencomment.htm

		// -#
		haml: "-# ${relativeFile}", // https://haml.info/docs/yardoc/file.REFERENCE.html#comments

		// /
		slim: "/ ${relativeFile}", // https://rubydoc.info/gems/slim/frames#code-comment

		// block comments:

		// /* ~ */
		css: "/* ${relativeFile} */", // https://www.w3.org/TR/css-syntax-3/#consume-comment
		less: "/* ${relativeFile} */", // https://lesscss.org/#comments

		// <!-- ~ -->
		html: "<!-- ${relativeFile} -->", // https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Comments
		markdown: "<!-- ${relativeFile} -->", // most support HTML style, rare do not: https://spec.commonmark.org/0.31.2/#example-179
		svelte: "<!-- ${relativeFile} -->", // https://svelte.dev/docs/svelte/basic-markup#Comments
		vue: "<!-- ${relativeFile} -->", // top-level is HTML style: https://vuejs.org/api/sfc-spec.html#comments
		"vue-html": "<!-- ${relativeFile} -->", // top-level is HTML style: https://vuejs.org/api/sfc-spec.html#comments
		xml: "<!-- ${relativeFile} -->", // https://www.w3.org/TR/xml11/#sec-comments
		xsl: "<!-- ${relativeFile} -->", // XSL uses XML notation: https://www.w3.org/Style/XSL/WhatIsXSL.html

		// (* ~ *)
		ocaml: "(* ${relativeFile} *)", // https://ocaml.org/manual/5.3/lex.html#ss:comments

		// { ~ }
		pascal: "{ ${relativeFile} }", // https://www.freepascal.org/docs-html/ref/refse2.html#x10-90001.2

		// {{! ~ }}
		handlebars: "{{! ${relativeFile} }}", // https://handlebarsjs.com/guide/#comments

		// @* ~ *@
		razor: "@* ${relativeFile} *@", // https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor?view=aspnetcore-9.0#comments
	},
	roles: {},
	addLanguageLabel: true,
};
