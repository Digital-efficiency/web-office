# Chancery Office

一个现代化的在线文档预览和编辑工具，支持多种文档格式。

A modern online document preview and editing tool that supports multiple document formats.

## 功能特性 | Features

- 📝 支持预览和编辑多种文档格式 | Support preview and edit multiple document formats:
  - Microsoft Word (.docx)
  - Microsoft Excel (.xlsx)
  - PDF 文件 | PDF files
  - Markdown 文档 | Markdown documents
- 🎨 美观的界面 | Beautiful interface
- 💡 实时预览 | Real-time preview
- 📱 响应式设计，支持多种设备 | Responsive design, supports various devices
- ⚡️ 基于 Vue 3 和 Rsbuild，性能优异 | Based on Vue 3 and Rsbuild, excellent performance

## 主要技术栈 | Main Tech Stack

- Vue 3 - 渐进式 JavaScript 框架 | Progressive JavaScript Framework
- Vue Router - 官方路由管理器 | Official Router
- Rsbuild - 基于 Rspack 的构建工具 | Rspack-based Build Tool
- TypeScript - JavaScript 的超集，提供类型支持 | JavaScript Superset with Type Support
- Biome - 高性能的代码格式化和检查工具 | High-performance Code Formatter and Linter

## 快速开始 | Quick Start

### 环境要求 | Requirements

- Node.js >= 18
- pnpm >= 8

### 安装依赖 | Install Dependencies

```bash
pnpm install
```

### 开发服务器 | Development Server

启动开发服务器 | Start the dev server:

```bash
pnpm dev
```

### 构建生产版本 | Production Build

构建生产版本 | Build for production:

```bash
pnpm build
```

### 本地预览生产版本 | Preview Production Build

```bash
pnpm preview
```

### 代码格式化和检查 | Code Formatting and Linting

```bash
# 格式化代码 | Format code
pnpm format

# 代码检查 | Check code
pnpm check
```

## 项目结构 | Project Structure

```
src/
├── assets/      # 静态资源 | Static assets
├── components/  # 公共组件 | Common components
├── router/      # 路由配置 | Router configuration
├── utils/       # 工具函数 | Utility functions
└── views/       # 页面组件 | Page components
```

## 开源协议 | License

[MIT License](LICENSE)
