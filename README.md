# 李园 · 个人求职网站

基于 React + Vite + Tailwind CSS 构建的单页个人求职网站，内容聚焦嵌入式软件工程师方向。

## 本地预览

```bash
npm install
npm run dev      # 开发模式，访问 http://localhost:5173
npm run build    # 生产构建，产物输出到 dist/
npm run preview  # 本地预览构建产物
```

## 修改内容

所有网站文案、经历、项目、技能都集中在 **`src/data/profile.json`** 一个文件中，
修改后重新 `npm run build` 即可生效，无需改动任何组件代码。

常用修改点：

| 字段 | 说明 |
|------|------|
| `name` / `age` / `title` / `tagline` | 首屏基础信息 |
| `email` / `phone` / `github` | 联系方式（github 填你的真实用户名） |
| `jobIntentions` | 求职意向（岗位 / 薪资 / 到岗时间 / 城市） |
| `about` | 自我评价 |
| `highlights` | 核心优势卡片 |
| `experience` | 工作经历（数组，可多条） |
| `education` | 教育背景 |
| `skills` | 技能分类 |
| `projects` | 项目经验（数组，可多条） |
| `resumeFile` | 简历 PDF（放在 `public/resume.pdf`） |

> 替换简历：把新 PDF 覆盖到 `public/resume.pdf` 即可，文件名保持一致。

## 部署到 GitHub Pages（自动）

本项目已配置 GitHub Actions 自动部署，推送 `main` 分支即自动上线。

### 步骤

1. 在 GitHub 新建仓库（两种任选其一）：
   - **用户站点**：仓库名必须为 `你的用户名.github.io`，最终访问地址 `https://你的用户名.github.io/`
   - **项目站点**：任意仓库名，如 `portfolio`，访问地址 `https://你的用户名.github.io/portfolio/`

2. 本地初始化并提交（仓库根目录即 `portfolio/`）：

   ```bash
   git init
   git add .
   git commit -m "init: personal portfolio site"
   git branch -M main
   git remote add origin https://github.com/你的用户名/仓库名.git
   git push -u origin main
   ```

3. 在仓库 **Settings → Pages → Build and deployment** 中，
   将 Source 改为 **GitHub Actions**。

4. 推送后 Actions 会自动构建部署，约 1 分钟后在上方地址访问。

> 若使用项目站点（非 `xxx.github.io` 仓库），`vite.config.js` 中的 `base: './'`
> 已确保相对路径正确，无需额外修改。

## 技术栈

- React 18 + Vite 5
- Tailwind CSS v4
- Framer Motion（滚动入场动画）
- React Icons
