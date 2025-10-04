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
