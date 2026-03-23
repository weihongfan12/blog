import dataManager from './dataManager.js';

class ArticleManager {
    constructor() {
        this.currentArticle = null;
    this.currentCategory = null;
    this.searchQuery = '';
    }

    async init() {
        await this.renderArticleList();
        this.renderCategories();
        this.setupEventListeners();
    }

    async renderArticleList(categorySlug = null) {
        let articles;
        
        if (categorySlug) {
            articles = dataManager.getArticlesByCategory(categorySlug);
        } else {
            articles = dataManager.getArticles();
        }

        const container = document.querySelector('.blog-posts');
        const postsContainer = container.querySelector('#posts-container');
        
        if (!postsContainer) {
            const newContainer = document.createElement('div');
            newContainer.id = 'posts-container';
            container.appendChild(newContainer);
            postsContainer = newContainer;
        }

        postsContainer.innerHTML = '';

        if (articles.length === 0) {
            postsContainer.innerHTML = '<p class="no-articles">暂无文章</p>';
            return;
        }

        articles.forEach(article => {
            const postCard = document.createElement('div');
            postCard.className = 'post-card';
            postCard.innerHTML = `
                <h3><a href="article.html?id=${article.id}">${article.title}</a></h3>
                <div class="meta">
                    <span>${article.date}</span> | <span>${article.category}</span>
                </div>
                <p class="excerpt">${article.excerpt}</p>
                <a href="article.html?id=${article.id}" class="read-more">阅读更多 →</a>
            `;
            postsContainer.appendChild(postCard);
        });
    }

    renderCategories() {
        const categories = dataManager.getCategories();
        const widget = document.querySelector('.widget ul');
        
        if (!widget) return;

        widget.innerHTML = categories.map(cat => 
            `<li><a href="#" data-category="${cat.slug}">${cat.name}</a></li>`
        ).join('');

        const categoryLinks = widget.querySelectorAll('a[data-category]');
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterByCategory(e.target.dataset.category);
            });
        });
    }

    filterByCategory(categorySlug) {
        this.currentCategory = categorySlug;
        this.renderArticleList(categorySlug);
        
        const categoryLinks = document.querySelectorAll('.widget ul a');
        categoryLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.category === categorySlug) {
                link.classList.add('active');
            }
        });
    }

    setupEventListeners() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = '搜索文章...';
        searchInput.className = 'search-input';
        
        const searchContainer = document.querySelector('.blog-posts');
        const searchWrapper = document.createElement('div');
        searchWrapper.className = 'search-wrapper';
        searchWrapper.innerHTML = '<h2>搜索</h2>';
        searchWrapper.appendChild(searchInput);
        searchContainer.insertBefore(searchWrapper, searchContainer.firstChild);

        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.searchArticles();
        });
    }

    searchArticles() {
        const articles = dataManager.getArticles();
        const filtered = articles.filter(article => 
            article.title.toLowerCase().includes(this.searchQuery) ||
            article.excerpt.toLowerCase().includes(this.searchQuery)
        );

        const postsContainer = document.querySelector('#posts-container');
        if (!postsContainer) return;

        postsContainer.innerHTML = '';

        if (filtered.length === 0) {
            postsContainer.innerHTML = '<p class="no-articles">未找到相关文章</p>';
            return;
        }

        filtered.forEach(article => {
            const postCard = document.createElement('div');
            postCard.className = 'post-card';
            postCard.innerHTML = `
                <h3><a href="article.html?id=${article.id}">${article.title}</a></h3>
                <div class="meta">
                    <span>${article.date}</span> | <span>${article.category}</span>
                </div>
                <p class="excerpt">${article.excerpt}</p>
                <a href="article.html?id=${article.id}" class="read-more">阅读更多 →</a>
            `;
            postsContainer.appendChild(postCard);
        });
    }

    async loadArticleDetail(articleId) {
        const article = dataManager.getArticleById(parseInt(articleId));
        
        if (!article) {
            document.querySelector('#post-content').innerHTML = '<p>文章不存在</p>';
            return;
        }

        document.title = `${article.title} - 我的博客`;
        
        const postContent = document.querySelector('#post-content');
        postContent.innerHTML = `
            <div class="post-card">
                <h1>${article.title}</h1>
                <div class="meta">
                    <span>${article.date}</span> | <span>${article.category}</span>
                </div>
                <div class="post-body">
                    ${article.content}
                </div>
            </div>
        `;
    }
}

const articleManager = new ArticleManager();
export default articleManager;