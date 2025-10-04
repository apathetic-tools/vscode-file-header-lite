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

## Packaging

Build a `.vsix` package for local testing or publishing:

```sh
pnpm package
```

Install locally:

```sh
code --install-extension vscode-file-header-lite-0.0.1.vsix
```

## Publishing

1. Log in with your publisher ID (first time only):

```sh
vsce login apathetic-tools
```

2. Publish a new version:

```sh
pnpm publish
```

Version numbers are bumped automatically (use `major`, `minor`, or `patch`).

## Notes

- `dist/` is generated and not tracked in Git.
- `icon.png` is generated from `icon.svg`:

```sh
pnpm icon:png
```
