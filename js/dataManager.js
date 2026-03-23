class DataManager {
    constructor() {
        this.data = null;
        this.load();
    }

    async load() {
        try {
            const response = await fetch('data/blog-data.json');
            this.data = await response.json();
            console.log('数据加载成功:', this.data);
        } catch (error) {
            console.error('数据加载失败:', error);
            this.data = this.getDefaultData();
        }
    }

    getDefaultData() {
        return {
            articles: [
                {
                    id: 1,
                    title: "欢迎来到我的博客",
                    date: "2026-03-23",
                    category: "随笔",
                    excerpt: "这是我的第一篇博客文章，欢迎来到这里！我会在这里分享技术文章、生活感悟和有趣的内容。",
                    content: "<p>这是我的第一篇博客文章，欢迎来到这里！我会在这里分享技术文章、生活感悟和有趣的内容。</p><h2>关于这个博客</h2><p>这个博客使用纯 HTML、CSS 和 JavaScript 构建，可以轻松部署到 Cloudflare Pages 等静态网站托管平台。</p><h2>未来计划</h2><p>我计划在博客中分享以下内容：</p><ul><li>技术教程和心得</li><li>生活随笔和感悟</li><li>项目经验分享</li><li>读书笔记</li></ul><p>希望能和大家一起交流学习，共同进步！</p>",
                    status: "published"
                },
                {
                    id: 2,
                    title: "如何搭建个人博客",
                    date: "2026-03-22",
                    category: "技术",
                    excerpt: "本文将介绍如何使用简单的 HTML、CSS 和 JavaScript 搭建一个个人博客网站。",
                    content: "<p>搭建个人博客并不难，只需要掌握基本的 HTML、CSS 和 JavaScript 知识。本文将详细介绍从零开始搭建博客的步骤。</p><h2>准备工作</h2><p>在开始之前，你需要准备：</p><ul><li>一个代码编辑器（如 VS Code）</li><li>基本的 HTML、CSS 和 JavaScript 知识</li><li>一个域名（可选）</li></ul><h2>第一步：创建 HTML 结构</h2><p>首先创建一个基本的 HTML 文件，包含博客的基本结构：头部、导航、主要内容区域和页脚。</p><h2>第二步：添加样式</h2><p>使用 CSS 为博客添加美观的样式，包括颜色、布局、响应式设计等。</p><h2>第三步：添加交互功能</h2><p>使用 JavaScript 实现动态加载文章、页面导航等交互功能。</p><h2>第四步：部署</h2><p>将博客部署到 Cloudflare Pages 等静态网站托管平台，让全世界都能访问。</p>",
                    status: "published"
                },
                {
                    id: 3,
                    title: "Cloudflare Pages 部署指南",
                    date: "2026-03-21",
                    category: "技术",
                    excerpt: "学习如何将静态网站部署到 Cloudflare Pages，享受全球 CDN 加速服务。",
                    content: "<p>Cloudflare Pages 是一个优秀的静态网站托管平台，提供全球 CDN 加速、HTTPS、自动部署等功能。</p><h2>为什么选择 Cloudflare Pages？</h2><ul><li><strong>免费</strong>：完全免费使用，无需付费</li><li><strong>快速</strong>：全球 CDN 加速，访问速度快</li><li><strong>简单</strong>：一键部署，无需复杂配置</li><li><strong>安全</strong>：自动 HTTPS，DDoS 防护</li></ul><h2>部署步骤</h2><ol><li>注册 Cloudflare 账号</li><li>将你的代码推送到 GitHub</li><li>在 Cloudflare Pages 中创建新项目</li><li>连接你的 GitHub 仓库</li><li>配置构建设置（静态网站通常不需要）</li><li>点击部署</li></ol><h2>配置自定义域名</h2><p>如果你有 Cloudflare 托管的域名，可以轻松配置自定义域名：</p><ol><li>在 Cloudflare Pages 项目设置中添加自定义域名</li><li>选择你的域名</li><li>等待 DNS 生效</li></ol>",
                    status: "published"
                }
            ],
            categories: [
                {
                    id: 1,
                    name: "技术",
                    slug: "tech"
                },
                {
                    id: 2,
                    name: "生活",
                    slug: "life"
                },
                {
                    id: 3,
                    name: "随笔",
                    slug: "essay"
                },
                {
                    id: 4,
                    name: "科学上网",
                    slug: "network"
                }
            ],
            nodes: {
                subscription: {
                    selfBuilt: "https://last.whftest.dpdns.org/sub?token=d7665cc9aa732864499fde639336298",
                    highPurity: "https://weihongfan11.serv00.net/788a4aae"
                },
                vpsNodes: [
                    {
                        id: 1,
                        name: "节点 1 - 美国",
                        type: "VLESS",
                        link: "vless://b0437161-402e-483d-8462-65215b245b07@162.159.44.104:443?path=%2Fproxyip%3DProxyIP.CMLiussss.net&security=tls&encryption=none&host=last.whftest.dpdns.org&type=ws&sni=last.whftest.dpdns.org#edgetunnel",
                        purity: "高纯度",
                        status: "online"
                    }
                ]
            }
        };
    }

    getArticles() {
        return this.data.articles;
    }

    getArticleById(id) {
        return this.data.articles.find(article => article.id === id);
    }

    getArticlesByCategory(categorySlug) {
        const category = this.data.categories.find(cat => cat.slug === categorySlug);
        if (!category) return [];
        return this.data.articles.filter(article => article.category === category.name);
    }

    getCategories() {
        return this.data.categories;
    }

    getCategoryBySlug(slug) {
        return this.data.categories.find(cat => cat.slug === slug);
    }

    getNodes() {
        return this.data.nodes;
    }

    getSubscription() {
        return this.data.nodes.subscription;
    }

    getVpsNodes() {
        return this.data.nodes.vpsNodes;
    }

    async addArticle(article) {
        article.id = this.data.articles.length + 1;
        article.status = 'published';
        article.date = new Date().toISOString().split('T')[0];
        this.data.articles.unshift(article);
        await this.save();
        return article;
    }

    async updateArticle(id, updatedArticle) {
        const index = this.data.articles.findIndex(article => article.id === id);
        if (index !== -1) {
            this.data.articles[index] = { ...this.data.articles[index], ...updatedArticle };
            await this.save();
        }
        return this.data.articles[index];
    }

    async deleteArticle(id) {
        this.data.articles = this.data.articles.filter(article => article.id !== id);
        await this.save();
    }

    async addCategory(category) {
        category.id = this.data.categories.length + 1;
        category.slug = category.slug || category.name.toLowerCase();
        this.data.categories.push(category);
        await this.save();
        return category;
    }

    async updateNode(nodeId, updatedNode) {
        const index = this.data.nodes.vpsNodes.findIndex(node => node.id === nodeId);
        if (index !== -1) {
            this.data.nodes.vpsNodes[index] = { ...this.data.nodes.vpsNodes[index], ...updatedNode };
            await this.save();
        }
        return this.data.nodes.vpsNodes[index];
    }

    async addNode(node) {
        node.id = this.data.nodes.vpsNodes.length + 1;
        node.status = 'online';
        this.data.nodes.vpsNodes.unshift(node);
        await this.save();
        return node;
    }

    async deleteNode(nodeId) {
        this.data.nodes.vpsNodes = this.data.nodes.vpsNodes.filter(node => node.id !== nodeId);
        await this.save();
    }

    async updateSubscription(subscription) {
        this.data.nodes.subscription = subscription;
        await this.save();
        return this.data.nodes.subscription;
    }

    async save() {
        console.log('保存数据到本地存储...');
        localStorage.setItem('blogData', JSON.stringify(this.data));
    }
}

const dataManager = new DataManager();
export default dataManager;