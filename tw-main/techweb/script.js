document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const top_menu_links = document.querySelectorAll('.top-menu a');
    const logo = document.getElementById('logo');
    const left_nav = document.getElementById('leftNav');
    const main_content = document.getElementById('mainContent');
    const menu_toggle = document.querySelector('.menu-toggle');
    const top_menu = document.querySelector('.top-menu');
    
    // Mobile menu toggle
    menu_toggle.addEventListener('click', function() {
        top_menu.classList.toggle('active');
    });
    
    // Initial Load (Default page - Course Info)
    load_menu_content('course-info');
    load_article_content('course-overview');
    
    // Set the first top menu item as active
    top_menu_links[0].classList.add('active');
    
    // Logo click handler
    logo.addEventListener('click', function() {
        set_active_top_menu('course-info');
        load_menu_content('course-info');
        load_article_content('course-overview');
    });
    
    // Top menu click handlers
    top_menu_links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const menu_target = this.getAttribute('data-target');
            set_active_top_menu(menu_target);
            load_menu_content(menu_target);
            
            // Load the first article from the left menu
            const first_article_id = get_first_article_from_menu(menu_target);
            load_article_content(first_article_id);
            
            // Close mobile menu after selection
            if (window.innerWidth <= 768) {
                top_menu.classList.remove('active');
            }
        });
    });
    
    // Function to get first article ID from a menu
    function get_first_article_from_menu(menu_id) {
        const template = document.getElementById(`${menu_id}-menu`);
        if (template) {
            const content = template.content.cloneNode(true);
            const first_link = content.querySelector('a');
            if (first_link) {
                return first_link.getAttribute('data-article');
            }
        }
        return null;
    }
    
    // Function to set active top menu
    function set_active_top_menu(menu_id) {
        top_menu_links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === menu_id) {
                link.classList.add('active');
            }
        });
    }
    
    // Function to load left menu content
    function load_menu_content(menu_id) {
        // Clear existing menu
        left_nav.innerHTML = '';
        
        // Get template content
        const template = document.getElementById(`${menu_id}-menu`);
        if (template) {
            const content = template.content.cloneNode(true);
            
            // Add event listeners to left menu links
            const left_menu_links = content.querySelectorAll('a');
            left_menu_links.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove active class from all links
                    document.querySelectorAll('.left-nav a').forEach(l => {
                        l.classList.remove('active');
                    });
                    
                    // Add active class to clicked link
                    this.classList.add('active');
                    
                    const article_id = this.getAttribute('data-article');
                    load_article_content(article_id);
                });
            });
            
            // Set first link as active
            if (left_menu_links.length > 0) {
                left_menu_links[0].classList.add('active');
            }
            
            left_nav.appendChild(content);
        }
    }
    
    // Function to load article content
    function load_article_content(article_id) {
        // Clear existing content
        main_content.innerHTML = '';
        
        // Get template content
        const template = document.getElementById(`${article_id}-content`);
        if (template) {
            const content = template.content.cloneNode(true);
            main_content.appendChild(content);
        }
    }
});
