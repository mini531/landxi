/**
 * Layout Loader for Land-XI Prototype
 * Dynamically injects common header and footer components.
 */

async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const text = await response.text();
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = text;
        }
    } catch (error) {
        console.error(`Error loading component from ${file}:`, error);
    }
}

/**
 * Mobile Menu Toggle Function
 */
function toggleMenu() {
    const wrapper = document.getElementById('nav-wrapper');
    const toggle = document.getElementById('mobile-toggle');
    const backdrop = document.getElementById('sidebar-backdrop');
    
    if (wrapper && toggle) {
        wrapper.classList.toggle('active');
        toggle.classList.toggle('active');
        if (backdrop) backdrop.classList.toggle('active');
    }
}

/**
 * User Menu Toggle Function
 */
function toggleUserMenu(event) {
    if (event) event.stopPropagation();
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// Close dropdown or mobile menu when clicking outside
window.addEventListener('click', (event) => {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown && dropdown.classList.contains('active')) {
        dropdown.classList.remove('active');
    }
    
    // Backdrop click to close menu (optional but good practice)
    if (event.target.id === 'sidebar-backdrop') {
        toggleMenu();
    }
});

/**
 * Handle Window Resize
 * Automatically close mobile menu when switching to desktop view (> 1024px)
 */
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        const wrapper = document.getElementById('nav-wrapper');
        const toggle = document.getElementById('mobile-toggle');
        const backdrop = document.getElementById('sidebar-backdrop');
        
        if (wrapper && wrapper.classList.contains('active')) {
            wrapper.classList.remove('active');
            if (toggle) toggle.classList.remove('active');
            if (backdrop) backdrop.classList.remove('active');
        }
    }
});

// Automatically load components when the DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadComponent('header-include', 'include/header.html'),
        loadComponent('footer-include', 'include/footer.html')
    ]);
});
