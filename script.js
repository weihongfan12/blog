const posts = [
    {
        id: 1,
        title: "欢迎来到我的博客",
        date: "2026-03-23",
        category: "随笔",
        excerpt: "这是我的第一篇博客文章，欢迎来到这里！我会在这里分享技术文章、生活感悟和有趣的内容。",
        content: "这是我的第一篇博客文章，欢迎来到这里！我会在这里分享技术文章、生活感悟和有趣的内容。希望能和大家一起交流学习。"
    },
    {
        id: 2,
        title: "如何搭建个人博客",
        date: "2026-03-22",
        category: "技术",
        excerpt: "本文将介绍如何使用简单的 HTML、CSS 和 JavaScript 搭建一个个人博客网站。",
        content: "搭建个人博客并不难，只需要掌握基本的 HTML、CSS 和 JavaScript 知识。本文将详细介绍从零开始搭建博客的步骤。"
    },
    {
        id: 3,
        title: "Cloudflare Pages 部署指南",
        date: "2026-03-21",
        category: "技术",
        excerpt: "学习如何将静态网站部署到 Cloudflare Pages，享受全球 CDN 加速服务。",
        content: "Cloudflare Pages 是一个优秀的静态网站托管平台，提供全球 CDN 加速、HTTPS、自动部署等功能。"
    }
];

function renderPosts() {
    const container = document.getElementById('posts-container');
    
    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        
        postCard.innerHTML = `
            <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
            <div class="meta">
                <span>${post.date}</span> | <span>${post.category}</span>
            </div>
            <p class="excerpt">${post.excerpt}</p>
            <a href="post.html?id=${post.id}" class="read-more">阅读更多 →</a>
        `;
        
        container.appendChild(postCard);
    });
}

document.addEventListener('DOMContentLoaded', renderPosts);