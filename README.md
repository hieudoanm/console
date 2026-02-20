# `@console/sdk`

## Table of Contents

- [`@console/sdk`](#consolesdk)
  - [Table of Contents](#table-of-contents)
  - [👋 Introduction](#-introduction)
  - [✨ Features](#-features)
  - [📦 Installation](#-installation)
  - [🚀 Quick Start](#-quick-start)
  - [🧭 Scoped Logging](#-scoped-logging)
  - [📊 Table Logging](#-table-logging)
  - [⏱ Performance Timing](#-performance-timing)
  - [⚙️ Configuration](#️-configuration)
    - [Options](#options)
  - [🖥 Viewing Logs](#-viewing-logs)
  - [🧠 Philosophy](#-philosophy)
  - [📄 License](#-license)

## 👋 Introduction

A functional, native browser console wrapper with scoped logging, grouping, timestamps, level filtering, and styled output.

Built for modern frontend applications.

---

## ✨ Features

- Functional API (no classes)
- Native console.* under the hood
- Scoped loggers
- Natural grouping pattern
- Table logging support
- Performance timers
- Configurable minimum log level
- Optional timestamps
- Works in any browser environment

---

## 📦 Installation

```bash
pnpm install @console/sdk
```

---

## 🚀 Quick Start

```typescript
import { createLogger } from '@console/sdk';

const logger = createLogger({
  showTimestamp: true,
});

logger.info('Application started');
logger.warn('Deprecated API usage');
logger.error('Request failed', { status: 500 });
logger.debug('Debug payload', { foo: 'bar' });
```

---

## 🧭 Scoped Logging

Create scoped loggers to organize logs by domain.

```typescript
const auth = logger.withScope('Auth');

auth.group('Login Flow', (log) => {
  log.info('Validating credentials');
  log.debug('Payload prepared');
  log.warn('Slow response detected');
  log.error('Invalid token');
});
```

---

## 📊 Table Logging

```typescript
logger.table([
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'User' }
]);
```

---

## ⏱ Performance Timing

```typescript
logger.group('Performance Test', (log) => {
  log.time('fetch');

  setTimeout(() => {
    log.timeEnd('fetch');
  }, 500);
});
```

---

## ⚙️ Configuration

```typescript
createLogger({
  enabled: true,
  showTimestamp: true,
  minLevel: 'debug',
  scope: 'App'
});
```

### Options

| Option        | Type                                   | Description                |
| ------------- | -------------------------------------- | -------------------------- |
| enabled       | boolean                                | Enable or disable logging  |
| showTimestamp | boolean                                | Prefix logs with timestamp |
| minLevel      | `debug` \| `info` \| `warn` \| `error` | Minimum log level shown    |
| scope         | string                                 | Default logger scope       |

---

## 🖥 Viewing Logs

Logs appear in the browser console.

Open DevTools:

Mac: `⌘ + Option + J`

Windows / Linux: `Ctrl + Shift + J`

---

## 🧠 Philosophy

- Functional only
- No classes
- No external runtime dependencies
- Built entirely on native browser console API
- Lightweight and predictable

---

## 📄 License

GPL-3.0
