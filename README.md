<!-- README.md -->

# vscode-file-header

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/apathetic-tools.vscode-file-header?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=apathetic-tools.vscode-file-header)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/apathetic-tools.vscode-file-header?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=apathetic-tools.vscode-file-header)
[![CI](https://github.com/apathetic-tools/vscode-file-header/actions/workflows/ci.yml/badge.svg)](https://github.com/apathetic-tools/vscode-file-header/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

📘 **[Roadmap](./Roadmap.md)** · 📝 **[Release Notes](https://github.com/apathetic-tools/vscode-file-header/releases)**

> Lightweight, zero-config file headers for AI chats and humans.  
> A VS Code extension by **Apathetic Tools**.

Adds a **single-line file header comment** containing the _relative filepath_ and an optional _role label_ at the top of your files.  
Perfect for developers who often paste files into chat — whether to **AI assistants** or **other humans**.

## Features

- 🧭 Inserts **relative filepath + filename** as a comment at the top of the file.
- 💬 Supports per-language comment styles (`//`, `#`, `<!-- -->`, etc.).
- 🧩 Optional **role** hints via glob patterns in settings.
- 🏷️ Optional language **format** modifier (e.g. `(TypeScript React)`).
- ⚙️ Works with user, `.code-workspace`, `.vscode`, and `.file-header` settings.
- ⚡ Minimal, fast, and MIT-licensed.

## Example

```ts
// src/components/Button.tsx (TypeScript React, React component)
```

## Configuration

In `.vscode/settings.json` or `.code-workspace`:

```json
{
  "filenameHeader.languages": {
    "javascript": "// ${relativeFile}",
    "python": "# ${relativeFile}"
  },
  "filenameHeader.roles": {
    "src/components/*": "React component",
    "src/pages/*": "Page component"
  },
  "filenameHeader.addLanguageLabel": true
}
```

- ${fileName} → just the basename
- ${relativeFile} → project-relative path

## Installation

Once published, install from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/)
Or, for local builds:

```sh
pnpm vsce package
code --install-extension vscode-file-header-0.0.1.vsix
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup and development instructions.

## License

[MIT](LICENSE) © 2025 Apathetic Tools

> ✨ _ChatGPT was used to help draft language, formatting, and code — plus we just love em dashes._
