# 我的博客

一个简单、美观的个人博客网站，使用纯 HTML、CSS 和 JavaScript 构建。

## 功能特点

- 响应式设计，支持移动端和桌面端
- 文章列表和详情页面
- 关于页面
- 简洁美观的 UI 设计
- 快速加载，无需后端

## 部署到 Cloudflare Pages

### 方法一：通过 GitHub 部署（推荐）

1. 将代码推送到 GitHub 仓库
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 进入 Workers & Pages -> Pages
4. 点击 "Create a project"
5. 选择 "Connect to Git"
6. 授权 GitHub 并选择你的仓库
7. 配置构建设置：
   - Build command: 留空（静态网站不需要构建）
   - Build output directory: 留空或输入 `.`
8. 点击 "Save and Deploy"

### 方法二：直接上传

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 Workers & Pages -> Pages
3. 点击 "Create a project"
4. 选择 "Upload assets"
5. 将 `my-blog` 文件夹中的所有文件上传
6. 点击 "Deploy"

### 配置自定义域名

如果你有托管在 Cloudflare 的域名：

1. 在 Cloudflare Pages 项目设置中
2. 进入 "Custom domains"
3. 点击 "Set up a custom domain"
4. 输入你的域名（如 `blog.yourdomain.com`）
5. 点击 "Activate domain"

## 添加新文章

编辑 `script.js` 和 `post.js` 文件，在 `posts` 数组中添加新的文章对象：

```javascript
{
    id: 4,
    title: "文章标题",
    date: "2026-03-24",
    category: "分类",
    excerpt: "文章摘要",
    content: `<p>文章内容...</p>`
}
```

## 自定义样式

所有样式都在 `styles.css` 文件中，你可以根据需要修改颜色、布局等。

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)

## 许可证

MIT License