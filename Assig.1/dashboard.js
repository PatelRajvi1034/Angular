document.addEventListener('DOMContentLoaded', () => {
    const blogPostsContainer = document.getElementById('blogPosts');
    const userNameElement = document.getElementById('userName');
    const logoutBtn = document.getElementById('logoutBtn');

    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Display current user's name
    userNameElement.textContent = currentUser.username;

    // Load and display blog posts
    function loadBlogPosts() {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogPostsContainer.innerHTML = '';

        blogs.forEach(blog => {
            const blogPost = document.createElement('div');
            blogPost.className = 'blog-post';
            blogPost.innerHTML = `
                <div class="comment-count">${blog.comments.length} comments</div>
                <h2>${blog.title}</h2>
                <img src="${blog.image}" alt="${blog.title}">
                <p>${blog.content}</p>
                <div class="comments-section">
                    <h3>Comments</h3>
                    <div class="comments-list" id="comments-${blog.id}">
                        ${blog.comments.map(comment => `
                            <div class="comment" data-comment-id="${blog.id}">
                                <strong>${comment.username}</strong>
                                <p>${comment.content}</p>
                                <button class="edit-comment">Edit</button>
                            </div>
                        `).join('')}
                    </div>
                    <form class="comment-form" data-blog-id="${blog.id}">
                        <textarea placeholder="Add a comment..." required></textarea>
                        <button type="submit">Post Comment</button>
                    </form>
                </div>
            `;
            blogPostsContainer.appendChild(blogPost);
        });

        // Add event listeners for comment forms
        document.querySelectorAll('.comment-form').forEach(form => {
            form.addEventListener('submit', handleCommentSubmit);
        });

        // Add event listeners for edit buttons
        document.querySelectorAll('.edit-comment').forEach(button => {
            button.addEventListener('click', handleEditComment);
        });
    }

    function handleCommentSubmit(e) {
        e.preventDefault();
        const blogId = parseInt(e.target.dataset.blogId);
        const commentText = e.target.querySelector('textarea').value.trim();

        if (!commentText) return;

        const blogs = JSON.parse(localStorage.getItem('blogs'));
        const blog = blogs.find(b => b.id === blogId);

        if (blog) {
            blog.comments.push({
                username: currentUser.username,
                content: commentText
            });

            localStorage.setItem('blogs', JSON.stringify(blogs));
            e.target.querySelector('textarea').value = '';
            loadBlogPosts();
        }
    }

    function handleEditComment(e) {
        const commentDiv = e.target.closest('.comment');
        const blogId = parseInt(commentDiv.dataset.commentId);
        const currentContent = commentDiv.querySelector('p').textContent;

        const editForm = document.createElement('form');
        editForm.className = 'edit-comment-form';
        editForm.innerHTML = `
            <textarea>${currentContent}</textarea>
            <button type="submit">Save</button>
            <button type="button" class="cancel-edit">Cancel</button>
        `;

        commentDiv.innerHTML = '';
        commentDiv.appendChild(editForm);

        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newContent = e.target.querySelector('textarea').value.trim();
            
            if (newContent) {
                const blogs = JSON.parse(localStorage.getItem('blogs'));
                const blog = blogs.find(b => b.id === blogId);
                const comment = blog.comments.find(c => c.content === currentContent);
                
                if (comment) {
                    comment.content = newContent;
                    localStorage.setItem('blogs', JSON.stringify(blogs));
                    loadBlogPosts();
                }
            }
        });

        editForm.querySelector('.cancel-edit').addEventListener('click', () => {
            loadBlogPosts();
        });
    }

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });

    // Initial load
    loadBlogPosts();
}); 