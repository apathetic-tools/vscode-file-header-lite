<!-- Roadmap.md -->

# 📘 Roadmap / TODO

## Status

✅ Core header insertion logic implemented  
✅ Builds successfully and runs in VS Code

📅 **Next milestone:** v0.1.0 — Publish to Marketplace  
🎯 Focus: Config schema + insertion edge cases

## 🧩 Header Insertion

- [ ] **Refactor** insertion logic into a separate module (`src/core/headerInserter.ts`)
- [ ] **Support full config schema**
  - [ ] `autoUpdate`: auto-reinsert header on save (via `workspace.onDidSaveTextDocument`)
  - [ ] `languagesByPath`: custom language overrides
- [ ] **Templates**
  - [ ] Implement language template
  - [ ] Implement format template
  - [ ] Implement role template
  - [ ] Implement context template
- [ ] **Shebang Support**
  - [ ] Insert after `#!` line when present
- [ ] **Header Detection**
  - [ ] Detect and skip existing license headers (regex-based)
- [ ] **Comment Style Handling**
  - [ ] Support single-line (`#`, `//`) and multi-line (`/* ... */`, `<!-- ... -->`) and doc (`/** */`) formats

## ⚙️ Configuration

- [ ] Expose `filenameHeader.languages` in VS Code settings (`contributes.configuration`)
- [ ] Add **auto-migration** for legacy config
  - [ ] Detect `.fileheader.json` or old `filenameHeader` keys
  - [ ] Migrate automatically or warn user
- [ ] Add **“Reload Header”** command to manually reinsert headers
- [ ] Generate a JSON Schema for validation and GUI integration
- [ ] Fill out additional languages in byPath
- [ ] Fill out additional special files (.gitignore) in byPath
- [ ] Decide if I should have default roles based on common project structures (.vscode? .github? tests/?)

## 🧪 Testing

- [ ] **Integration Tests**
  - [ ] `activate()` lifecycle (mock VS Code API)
  - [ ] `insertHeader()` end-to-end (temporary file workspace)

## 🚀 Deployment

- [ ] Tag first public release `v0.1.0`
- [ ] Publish to VSCode Marketplace 0.1.0 tagged release (`vsce publish`)

## 🔮 Future Considerations

- [ ] Extract `file-header-lite` as a standalone NPM library
  - [ ] Reuse in VS Code extension and CLI
- [ ] Create CLI tool (`npx file-header-lite`) for bulk file updates
- [ ] Validate config via JSON Schema
- [ ] Add template presets (e.g., MIT, Apache headers)
