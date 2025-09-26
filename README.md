# Miyagi Canvas Repository

This repository contains widgets that sync with your Miyagi canvas.

## 🚀 FIRST-TIME SETUP (Required)

**IMPORTANT**: Run this command once after cloning the repository:

```bash
node setup-hooks.js
```

This sets up git hooks for automatic canvas synchronization.

## Structure

```
your-repo/
├── shape-widget-name/
│   ├── properties.json    # Widget configuration
│   ├── template.jsx       # React component
│   ├── template.html      # Compiled HTML (auto-generated)
│   └── storage.json       # Widget storage (auto-generated)
├── canvas-state.json      # Complete canvas state (auto-generated)
├── download-and-run.js    # Script management system
└── setup-hooks.js         # Git hooks setup (run once)
```

## How It Works

1. **Setup**: Run `node setup-hooks.js` once to install git hooks
2. **Create/Edit Widgets**: Add or modify `shape-*` directories
3. **Commit Changes**: Git hooks automatically:
   - Compile JSX to HTML (`pre-commit`)
   - Generate `canvas-state.json` (`pre-commit`)
4. **Pull Changes**: Git hooks automatically:
   - Unpack `canvas-state.json` into widget files (`post-merge`)
5. **Canvas Sync**: Changes sync bidirectionally with your canvas!

## Widget Structure

### properties.json
```json
{
  "id": "my-widget",
  "name": "My Widget",
  "x": 100,
  "y": 100,
  "w": 300,
  "h": 200,
  "color": "blue"
}
```

### template.jsx
```jsx
import React, { useState } from 'react';

function MyWidget() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default MyWidget;
```

## Manual Commands

```bash
# Generate canvas state locally
npm run generate-canvas

# Install dependencies
npm install
```

---

🚀 **Powered by Miyagi Canvas Sync**
