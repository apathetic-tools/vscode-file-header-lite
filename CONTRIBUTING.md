<!-- CONTRIBUTING.md -->

# Contributing to vscode-file-header-lite

Thanks for your interest in contributing!  
This guide covers setup, development workflow, packaging, and publishing.

---

## Setup

Clone the repo and install dependencies:

```sh
pnpm install
```

We use [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged) to run checks automatically when you commit.

- Changed files are automatically formatted with Prettier.
- TypeScript/ESLint checks run to prevent broken code from being committed.

👉 If your commit is blocked, fix the errors shown or run:

```sh
pnpm format
pnpm check
```

## Note about VSCode and Node.js versions

While you should keep the target ECMAScript version in mind when developing, you should run the latest **Node.js LTS** listed in our [.nvmrc](.nvmrc) so that all modern tooling works locally.  
The **VS Code runtime** itself bundles its own Node version; the ECMAScript and Node targets for the built extension are defined in [`tsconfig.json`](tsconfig.json) for the compiled `dist/` output.

### VS Code → Node.js → ECMAScript Compatibility

| VS Code Version | VS Code Release Date | ECMAScript Target | Minimum Node.js Version | Notes                                                        |
| --------------- | -------------------- | ----------------- | ----------------------- | ------------------------------------------------------------ |
| 1.90+           | 2025 Q1 – Present    | ES2024            | Node 22+                | Current Insider / Stable builds; supports newest JS features |
| 1.85 – 1.89     | 2024 Q3 – Q4         | ES2022            | Node 20+                | Most modern extensions target this range                     |
| 1.75 – 1.84     | 2023 Q2 – 2024 Q2    | ES2022            | Node 18+                | Safe default for compatibility with older VS Code installs   |
| 1.65 – 1.74     | 2022 Q2 – 2023 Q1    | ES2021            | Node 16+                | Introduced `Promise.any`, logical assignment ops             |
| 1.55 – 1.64     | 2021 Q2 – 2022 Q1    | ES2020            | Node 14+                | Good baseline for broad compatibility                        |
| 1.45 – 1.54     | 2020 Q2 – 2021 Q1    | ES2019            | Node 12+                | Legacy builds; Marketplace no longer targets these           |
| < 1.45          | pre-2020             | ES2018            | Node 10 or earlier      | Deprecated and unsupported for Marketplace publishing        |

We currently target **VS Code ^1.80.0** (see `"engines.vscode"` in [`package.json`](package.json)),  
so aim for **ES2020** in [`tsconfig.json`](tsconfig.json).

> The Marketplace enforces `"engines.vscode"` in your `package.json`, so declare the minimum VS Code version you test against.

## Development workflow

Start TypeScript in watch mode:

```sh
pnpm dev
```

Then press **F5** in VS Code and select **Run Extension (watch)**.  
This launches a new **Extension Development Host** with the extension loaded.

- Edit files in `src/` → rebuilds automatically into `dist/`.
- Reload the Extension Host (`Ctrl+R` / `Cmd+R`) to pick up changes.
- Breakpoints work directly in `.ts` files (source maps are enabled).

## Committing

- All staged files will be auto-formatted and linted before the commit is created.
- If Prettier or ESLint make fixes, just re-add the files and commit again.
- This ensures a consistent code style across the project.

## Fixing formatting or lint issues

Our pre-commit hooks automatically run **Prettier** and **ESLint** on changed files, so most of the time you won’t need to worry about formatting.

However, if CI fails because of formatting or lint issues in files you didn’t touch, run:

```sh
pnpm fix
```

This will apply Prettier and ESLint fixes to the entire codebase.
After running it, re-commit and push your branch:

```sh
git add .
git commit -m "chore: apply fixes"
git push
```

CI will then pass.

## Packaging

Build a `.vsix` package for local testing or publishing:

```sh
pnpm package
```

Install locally:

```sh
code --install-extension vscode-file-header-lite-x.y.z.vsix
```

## Publishing

Maintainers only — see [PUBLISH.md](PUBLISH.md) for release instructions.

## Maintainers Guide (for reviewers only)

When reviewing pull requests:

- ✅ Lite scope
  - Ensure changes fit the minimal “file header only” purpose of the extension.
  - Reject or redirect feature creep (complex templates, metadata beyond filename/role/language, etc.).
- ✅ Checks must pass
  - PR should pass CI (pnpm check → Prettier, ESLint, TSC).
  - Confirm contributor followed PR checklist.
- ✅ Test in Extension Host
  - Pull branch locally, run pnpm dev, press F5, and test that header insertion works.
  - Verify headers insert once, with no duplication.
- ✅ Docs stay accurate
  - If config changed, README/CONTRIBUTING must be updated in same PR.
- ✅ Versioning
  - Contributors don’t bump version numbers — maintainers handle version bumps before publishing.

> [!NOTE]
> This section is only for maintainers, so contributors know the “rules of the road” are consistent, but it doesn’t burden them.

### Maintainer Review Checklist ✅

- [ ] Fits the **lite spirit** (no unnecessary complexity).
- [ ] CI checks passed (`pnpm check`).
- [ ] Tested in Extension Development Host (F5) → header inserts correctly, no duplicates.
- [ ] Documentation (README/CONTRIBUTING) updated if behavior or config changed.
- [ ] No version bump (maintainers handle this before publishing).
