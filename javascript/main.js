// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
});

// Function to show success modal (used in registration form)
function showModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('hidden');
}

// Function to close success modal
function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('hidden');
    // Redirect to home page after closing modal
    window.location.href = '../index.html';
}