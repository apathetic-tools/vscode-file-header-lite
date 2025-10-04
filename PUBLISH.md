# <!-- PUBLISH.md -->

# Publishing vscode-file-header-lite

This guide is for maintainers who publish new versions of the extension.

---

## Prerequisites

- Install [Visual Studio Code Extension Manager (vsce)](https://code.visualstudio.com/api/working-with-extensions/publishing-extension):
  ```sh
  pnpm add -D @vscode/vsce
  ```
- You must be a member of the `apathetic-tools` publisher on the VS Code Marketplace.

Log in once (creates a personal access token):

```sh
vsce login apathetic-tools
```

---

## Steps to Publish

1. **Update version number** in `package.json`  
   Follow [semver](https://semver.org/):
   - Patch → bug fixes (`0.0.1 → 0.0.2`)
   - Minor → new features (`0.0.1 → 0.1.0`)
   - Major → breaking changes (`0.x → 1.0.0`)

2. **Commit & tag the release**

   ```sh
   git add package.json
   git commit -m "release: v0.0.x"
   git tag v0.0.x
   git push && git push --tags
   ```

3. **Build the extension package**

   ```sh
   pnpm package
   ```

   This creates `vscode-file-header-lite-x.y.z.vsix`.

4. **Publish to Marketplace**
   ```sh
   pnpm publish
   ```

---

## Verifying the Release

- The extension should appear/refresh on the [Marketplace page](https://marketplace.visualstudio.com/manage).
- Optionally test by installing the `.vsix` directly:
  ```sh
  code --install-extension vscode-file-header-lite-x.y.z.vsix
  ```

---

## Notes

- CI already ensures `pnpm check` and `pnpm compile` pass before merging into `main`.
- Publishing is manual for now — in the future this can be automated via GitHub Actions when tagging releases.
- Always bump version numbers before publishing, or the Marketplace will reject the upload.
