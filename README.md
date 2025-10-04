<!-- README.md -->
# vscode-file-header-lite

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/apathetic-tools.vscode-file-header-lite?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=apathetic-tools.vscode-file-header-lite)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/apathetic-tools.vscode-file-header-lite?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=apathetic-tools.vscode-file-header-lite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)


Lightweight VS Code extension that adds a **single-line file header comment** with *filepath and optional role* at the top of files.  

Useful when often copy and pasting files in chat.

## Features

- Inserts **relative filepath + filename** as a comment at the top of the file.  
- Supports per-language comment styles (`//`, `#`, `<!-- -->`, etc.).  
- Optional **role/type hints** via glob patterns in settings.  
- Optional **language labels** (e.g. `(TypeScript React)`).  
- Minimal, fast, and MIT licensed.
- Supports checked in `.vscode/settings.json` even with `.code-workspace`.

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

* ${fileName} → just the basename
* ${relativeFile} → project-relative path

## Installation
Once published, install from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/)
Or, for local builds:

```sh
pnpm vsce package
code --install-extension vscode-file-header-lite-0.0.1.vsix
```

## License
[MIT](LICENSE) © 2025 Apathetic Tools

> ✨ *ChatGPT was used to help draft language, formatting, and code — plus we just love em dashes.*