# 博客系统部署说明

## 📋 项目结构

```
my-blog/
├── data/                    # 数据层
│   └── blog-data.json     # 博客数据（文章、分类、节点）
├── js/                      # 逻辑层
│   ├── dataManager.js      # 数据管理（统一数据接口）
│   ├── articleManager.js   # 文章管理（增删改查）
│   └── nodeManager.js      # 节点管理（增删改查）
├── pages/                   # 表面层
│   ├── index.html         # 首页
│   ├── about.html         # 关于页面
│   ├── nodes.html         # 节点页面
│   └── article.html       # 文章详情页（待创建）
├── styles.css               # 样式文件
├── docker-compose.yml        # Docker 部署配置
└── README.md               # 本文档
```

---

## 🚀 部署步骤

### 步骤 1：上传代码到服务器

1. 将整个 `my-blog` 文件夹上传到你的服务器
2. 推荐路径：`/var/www/my-blog`

### 步骤 2：部署 Directus

1. 在服务器上创建 `docker-compose.yml` 文件
2. 运行以下命令：

```bash
cd /var/www/my-blog
docker-compose up -d
```

3. 等待容器启动（首次启动需要 2-3 分钟）

### 步骤 3：访问 Directus 后台

1. 打开浏览器访问：`http://your-server-ip:8055`
2. 默认登录账号：
   - 邮箱：`admin@example.com`
   - 密码：`admin123`
3. 首次登录后，**立即修改密码**！

---

## 📝 Directus 配置

### 1. 创建内容类型（Content Type）

1. 进入 **Settings** → **Content-Type Builder**
2. 创建以下内容类型：

**文章（Article）**
- Display Name: `文章`
- API ID: `article`
- Singular Display Name: `文章`
- Plural Display Name: `文章`

**分类（Category）**
- Display Name: `分类`
- API ID: `category`
- Singular Display Name: `分类`
- Plural Display Name: `分类`

**节点（Node）**
- Display Name: `节点`
- API ID: `node`
- Singular Display Name: `节点`
- Plural Display Name: `节点`

### 2. 创建字段（Fields）

为每种内容类型添加字段：

**文章字段：**
- `title` (Text, Required)
- `date` (Date, Required)
- `category` (Relation to Category, Required)
- `excerpt` (Text, Required)
- `content` (Rich Text, Required)
- `status` (Enum: draft, published, Required)

**节点字段：**
- `name` (Text, Required)
- `type` (Enum: VLESS, V2Ray, Trojan, Shadowsocks, Required)
- `link` (Text, Optional)
- `purity` (Enum: 高纯度, 普通, 低纯度, Required)
- `status` (Enum: online, offline, Required)

### 3. 创建权限（Permissions）

1. 进入 **Settings** → **Users & Roles**
2. 创建新角色：
   - **编辑者**：可以创建和编辑文章
   - **管理员**：完全权限

---

## 🔌 前端连接 Directus API

### API 端点

Directus 默认 API 地址：`http://your-server-ip:8055/api`

### 使用方式

前端 JavaScript 模块通过以下方式连接：

```javascript
// 获取文章列表
fetch('http://your-server-ip:8055/api/articles')
  .then(res => res.json())
  .then(data => console.log(data));

// 创建新文章
fetch('http://your-server-ip:8055/api/articles', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: '新文章标题',
    content: '文章内容',
    status: 'published'
  })
});
```

---

## 📊 数据管理

### 当前数据存储

- **方式 1**：Directus 数据库（推荐）
  - 优点：完整后台管理
  - 缺点：需要服务器

- **方式 2**：JSON 文件 + LocalStorage（当前实现）
  - 优点：简单、无需服务器
  - 缺点：功能有限

### 数据同步

如果使用 Directus：
1. 前端通过 API 读写数据
2. Directus 自动管理数据库
3. 数据持久化存储

如果使用 JSON 文件：
1. 数据存储在 `data/blog-data.json`
2. 前端通过 `dataManager.js` 管理
3. LocalStorage 缓存数据

---

## 🔧 常用命令

### Docker 命令

```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 查看日志
docker-compose logs -f

# 重启服务
docker-compose restart
```

### 数据库命令

```bash
# 进入数据库容器
docker exec -it directus-db psql -U directus -d directus

# 备份数据库
docker exec directus-db pg_dump -U directus directus > backup.sql

# 恢复数据库
docker exec -i directus-db psql -U directus -d directus < backup.sql
```

---

## 🌐 Cloudflare Pages 部署

### 静态前端部署

1. 将 `pages/` 文件夹推送到 GitHub
2. Cloudflare Pages 自动部署
3. 访问：`https://your-domain.com`

### 环境变量

在 Cloudflare Pages 中设置：
- `DIRECTUS_API_URL`: Directus API 地址
- `NODE_ENV`: `production`

---

## 🔒 安全配置

### 1. 修改默认密码

首次登录后立即修改：
- 进入 **Settings** → **My Profile**
- 修改邮箱和密码

### 2. 启用 HTTPS

Directus 默认启用 HTTPS，确保：
- 服务器防火墙开放 8055 端口
- 使用反向代理（Nginx）配置 SSL

### 3. 数据库安全

修改 `docker-compose.yml` 中的数据库密码：
```yaml
environment:
  POSTGRES_PASSWORD: your-secure-password-here
```

---

## 📱 维护

### 日常维护

1. 定期备份数据库
2. 监控服务器资源使用
3. 更新 Directus 版本
4. 检查日志排查问题

### 故障排查

**Directus 无法启动：**
```bash
docker-compose logs directus
```

**数据库连接失败：**
```bash
docker-compose logs directus-db
```

**前端无法连接 API：**
1. 检查 API 地址是否正确
2. 检查防火墙设置
3. 检查 CORS 配置

---

## 📞 技术支持

### Directus 文档
- 官方文档：https://docs.directus.io/
- GitHub：https://github.com/directus/directus

### Docker 文档
- 官方文档：https://docs.docker.com/
- Compose 文档：https://docs.docker.com/compose/

---

## 🎯 下一步

1. ✅ 部署 Directus 到服务器
2. ✅ 配置 Directus 内容类型和字段
3. ✅ 更新前端连接 Directus API
4. ✅ 部署前端到 Cloudflare Pages
5. ✅ 测试完整流程

---

## 💡 提示

- 首次部署建议在测试环境完成
- 生产环境部署前务必备份数据
- 定期更新系统和依赖
- 使用版本控制（Git）管理代码

---

## 📞 联系方式

如有问题，请通过以下方式联系：
- 邮箱：weihongfan12@gmail.com
- GitHub：https://github.com/weihongfan12/blog