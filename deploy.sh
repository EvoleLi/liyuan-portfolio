#!/usr/bin/env bash
# 一键部署到 GitHub Pages
# 用法: ./deploy.sh            (默认仓库名 liyuan-portfolio)
#       ./deploy.sh my-repo    (自定义仓库名)
set -euo pipefail

REPO_NAME="${1:-liyuan-portfolio}"
BRANCH="main"

echo "==> 检查 git 状态"
if [ -n "$(git status --porcelain)" ]; then
  echo "发现未提交改动，先提交..."
  git add -A
  git commit -m "chore: 部署前自动提交" || true
fi

echo "==> 检查 GitHub 登录状态"
if ! gh auth status >/dev/null 2>&1; then
  echo "未登录 GitHub，请按提示完成授权："
  gh auth login
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "==> 创建仓库并关联远程 origin（公开）"
  gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
else
  echo "==> 已存在远程 origin，推送当前分支 $BRANCH"
  git push -u origin "$BRANCH"
fi

echo ""
echo "✅ 推送成功！GitHub Actions 正在自动构建并部署。"
echo "👉 首次部署请到仓库 Settings → Pages → Build and deployment → Source 选择 \"GitHub Actions\""
echo "👉 等 Actions 里 \"Deploy to GitHub Pages\" 跑绿后，即可访问 https://<你的用户名>.github.io/$REPO_NAME/"
