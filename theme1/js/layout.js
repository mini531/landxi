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
    if (wrapper && toggle) {
        wrapper.classList.toggle('active');
        toggle.classList.toggle('active');
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

// Close dropdown when clicking outside
window.addEventListener('click', () => {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown && dropdown.classList.contains('active')) {
        dropdown.classList.remove('active');
    }
});

// Automatically load components when the DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadComponent('header-include', 'include/header.html'),
        loadComponent('footer-include', 'include/footer.html')
    ]);
});
