// Blog Management System
import { mockPosts, categoryData } from './page.js';

class BlogManager {
    constructor() {
        this.posts = [];
        this.filteredPosts = [];
        this.categories = new Set();
        this.currentFilter = 'all';
        this.currentView = 'grid';
        this.currentPage = 1;
        this.postsPerPage = 6;
        this.isLoading = false;
        
        this.init();
    }

    async init() {
        await this.loadPosts();
        this.setupEventListeners();
        this.renderPosts();
        this.renderCategories();
        this.updateStats();
        this.initScrollReveal();
    }

    async loadPosts() {
        try {
            this.showLoading(true);
            
            // Simulate API call - in real implementation, this would fetch from your backend
            // For now, we'll use a mock data generator
            await this.simulateLoading();
            
            // In a real implementation, you would fetch from an API
            // const response = await fetch('/api/blog-posts');
            // this.posts = await response.json();
            
            this.generateMockPosts();
            this.filteredPosts = [...this.posts];
            
        } catch (error) {
            console.error('Error loading posts:', error);
            this.showError('Không thể tải bài viết. Vui lòng thử lại sau.');
        } finally {
            this.showLoading(false);
        }
    }

    generateMockPosts() 
    {
        this.posts = mockPosts;
        
        // Extract categories
        this.categories = new Set(mockPosts.map(post => post.category));
    }

    simulateLoading() {
        return new Promise(resolve => setTimeout(resolve, 1500));
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('blog-search');
        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // View controls
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleViewChange(e.target);
            });
        });

        // Load more button
        document.getElementById('load-more').addEventListener('click', () => {
            this.loadMorePosts();
        });

        // Category cards
        document.addEventListener('click', (e) => {
            if (e.target.closest('.category-card')) {
                const category = e.target.closest('.category-card').dataset.category;
                this.filterByCategory(category);
            }
        });
    }

    handleFilterClick(button) {
        // Update active state
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Apply filter
        this.currentFilter = button.dataset.filter;
        this.currentPage = 1;
        this.applyFilters();
    }

    handleSearch(query) {
        this.searchQuery = query.toLowerCase();
        this.currentPage = 1;
        this.applyFilters();
    }

    handleViewChange(button) {
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        this.currentView = button.dataset.view;
        this.renderPosts();
    }

    applyFilters() {
        let filtered = [...this.posts];

        // Apply category filter
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(post => post.category === this.currentFilter);
        }

        // Apply search filter
        if (this.searchQuery) {
            filtered = filtered.filter(post => 
                post.title.toLowerCase().includes(this.searchQuery) ||
                post.summary.toLowerCase().includes(this.searchQuery)
            );
        }

        this.filteredPosts = filtered;
        this.renderPosts();
        this.updateStats();
    }

    filterByCategory(category) {
        const filterBtn = document.querySelector(`[data-filter="${category}"]`);
        if (filterBtn) {
            this.handleFilterClick(filterBtn);
        }
    }

    renderPosts() {
        const blogGrid = document.getElementById('blog-grid');
        const noPosts = document.getElementById('no-posts');
        const loadMoreBtn = document.getElementById('load-more');

        // Clear existing posts
        blogGrid.innerHTML = '';

        // Check if there are posts to show
        if (this.filteredPosts.length === 0) {
            noPosts.style.display = 'block';
            loadMoreBtn.style.display = 'none';
            return;
        }

        noPosts.style.display = 'none';

        // Calculate posts to show for current page
        const startIndex = 0;
        const endIndex = this.currentPage * this.postsPerPage;
        const postsToShow = this.filteredPosts.slice(startIndex, endIndex);

        // Render posts
        postsToShow.forEach(post => {
            const postElement = this.createPostElement(post);
            blogGrid.appendChild(postElement);
        });

        // Show/hide load more button
        loadMoreBtn.style.display = endIndex < this.filteredPosts.length ? 'block' : 'none';

        // Update grid class for view mode
        blogGrid.className = `blog-grid ${this.currentView}-view`;
    }

    createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'blog-post-summary';
        postDiv.innerHTML = `
            <div class="blog-post-image">
                ${post.image}
            </div>
            <div class="blog-post-content">
                <div class="blog-post-meta">
                    <span class="post-date">${this.formatDate(post.date)}</span>
                    <span class="post-category">${this.getCategoryName(post.category)}</span>
                </div>
                <h3><a href="pages/post-${post.id}.html">${post.title}</a></h3>
                <p>${post.summary}</p>
                <div class="blog-post-footer">
                    <span class="read-time"><i class="far fa-clock"></i> ${post.readTime}</span>
                    <a href="pages/post-${post.id}.html" class="btn">Đọc tiếp</a>
                </div>
            </div>
        `;
        return postDiv;
    }

    renderCategories() {
        const categoriesGrid = document.getElementById('categories-grid');

        categoriesGrid.innerHTML = '';

        this.categories.forEach(category => {
            const categoryInfo = categoryData[category] || { name: category, icon: '📄', color: '#118ab2' };
            const count = this.posts.filter(post => post.category === category).length;
            
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category-card';
            categoryElement.dataset.category = category;
            categoryElement.innerHTML = `
                <div class="category-icon">${categoryInfo.icon}</div>
                <h3>${categoryInfo.name}</h3>
                <div class="category-count">${count} bài viết</div>
            `;
            
            categoriesGrid.appendChild(categoryElement);
        });
    }

    loadMorePosts() {
        this.currentPage++;
        this.renderPosts();
    }

    updateStats() {
        document.getElementById('total-posts').textContent = this.filteredPosts.length;
        document.getElementById('total-categories').textContent = this.categories.size;
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    }

    getCategoryName(category) {
        const categoryNames = {
            programming: 'Lập trình',
            technology: 'Công nghệ',
            life: 'Cuộc sống'
        };
        return categoryNames[category] || category;
    }

    showLoading(show) {
        const spinner = document.getElementById('loading-spinner');
        const blogGrid = document.getElementById('blog-grid');
        
        if (show) {
            spinner.style.display = 'block';
            blogGrid.style.display = 'none';
            this.isLoading = true;
        } else {
            spinner.style.display = 'none';
            blogGrid.style.display = 'grid';
            this.isLoading = false;
        }
    }

    showError(message) {
        const blogGrid = document.getElementById('blog-grid');
        blogGrid.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Đã xảy ra lỗi</h3>
                <p>${message}</p>
                <button class="btn" onclick="blogManager.loadPosts()">Thử lại</button>
            </div>
        `;
    }

    initScrollReveal() {
        if (typeof ScrollReveal !== 'undefined') {
            const sr = ScrollReveal({
                duration: 1000,
                distance: '50px',
                easing: 'ease-out',
                reset: true
            });

            sr.reveal('.blog-post-summary', {
                interval: 100,
                origin: 'bottom'
            });

            sr.reveal('.category-card', {
                interval: 100,
                origin: 'bottom'
            });
        }
    }
}

// Initialize blog manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.blogManager = new BlogManager();
});