# Chancery Office

一个现代化的在线文档预览和编辑工具，支持多种文档格式。

## 功能特性

- 支持预览和编辑多种文档格式：
  - Microsoft Word (.docx)
  - Microsoft Excel (.xlsx)
  - PDF 文件
  - Markdown 文档
- 美观的界面
- 实时预览
- 响应式设计，支持多种设备
- 基于 Vue 3 和 Rsbuild，性能优异

## 主要技术栈

- Vue 3 - 渐进式 JavaScript 框架
- Vue Router - 官方路由管理器
- Rsbuild - 基于 Rspack 的构建工具
- TypeScript - JavaScript 的超集，提供类型支持
- Biome - 高性能的代码格式化和检查工具

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 开发服务器

启动开发服务器：

```bash
pnpm dev
```

### 构建生产版本

构建生产版本：

```bash
pnpm build
```

### 本地预览生产版本

```bash
pnpm preview
```

### 代码格式化和检查

```bash
# 格式化代码
pnpm format

# 代码检查
pnpm check
```

## 项目结构

```
src/
├── assets/      # 静态资源
├── components/  # 公共组件
├── router/      # 路由配置
├── utils/       # 工具函数
└── views/       # 页面组件
```

## License

[MIT License](LICENSE)
