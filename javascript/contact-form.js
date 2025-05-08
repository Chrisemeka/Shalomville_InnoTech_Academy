document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    // First, let's create a success modal if it doesn't exist
    if (!document.getElementById('contactSuccessModal')) {
        const modal = document.createElement('div');
        modal.id = 'contactSuccessModal';
        modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center hidden z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div class="text-center">
                    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                        <i class="fas fa-check text-green-600 text-xl"></i>
                    </div>
                    <h3 class="text-lg font-medium text-red-900 mb-2">Message Sent!</h3>
                    <div class="mt-2 text-sm text-gray-500">
                        <p>Thank you for contacting Shalomville InnoTech Academy. We will get back to you as soon as possible.</p>
                    </div>
                    <div class="mt-5">
                        <button type="button" onclick="closeContactModal()"
                            class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add the close modal function
        window.closeContactModal = function() {
            document.getElementById('contactSuccessModal').classList.add('hidden');
        };
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showValidationError('Please fill in all required fields');
                return;
            }
            
            // Change button to loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send data to server
            fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success modal
                    showContactModal();
                    contactForm.reset();
                } else {
                    // Show error message
                    showValidationError(data.message || 'Failed to send message. Please try again.');
                }
                
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            })
            .catch(error => {
                console.error('Error:', error);
                showValidationError('An error occurred. Please try again later.');
                
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Function to show the success modal
    function showContactModal() {
        document.getElementById('contactSuccessModal').classList.remove('hidden');
    }
    
    // Function to show validation errors
    function showValidationError(message) {
        // Create or get error container
        let errorContainer = document.getElementById('contactFormError');
        
        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.id = 'contactFormError';
            errorContainer.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 hidden';
            
            // Add close button
            const closeButton = document.createElement('span');
            closeButton.className = 'absolute top-0 bottom-0 right-0 px-4 py-3';
            closeButton.innerHTML = '<i class="fas fa-times"></i>';
            closeButton.onclick = function() {
                errorContainer.classList.add('hidden');
            };
            
            errorContainer.appendChild(closeButton);
            
            // Create message span
            const messageSpan = document.createElement('span');
            messageSpan.className = 'block sm:inline';
            messageSpan.id = 'errorMessage';
            errorContainer.appendChild(messageSpan);
            
            // Insert at the top of the form
            contactForm.insertBefore(errorContainer, contactForm.firstChild);
        }
        
        // Update message and show
        document.getElementById('errorMessage').textContent = message;
        errorContainer.classList.remove('hidden');
        
        // Scroll to error
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});