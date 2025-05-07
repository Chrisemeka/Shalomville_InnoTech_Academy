document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            resetErrors();
            
            // Validate form fields
            const isValid = validateForm();
            
            if (isValid) {
                // Form is valid, show success modal
                showModal();
                
                // In a real application, you would submit the form data to a server here
                // For this demo, we'll just log the form data
                const formData = new FormData(registrationForm);
                const formObject = {};
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                console.log('Form data:', formObject);
            }
        });
    }
    
    function resetErrors() {
        const errorElements = document.querySelectorAll('[id$="Error"]');
        errorElements.forEach(element => {
            element.classList.add('hidden');
        });
        
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.remove('border-red-500');
            input.classList.add('border-gray-300');
        });
    }
    
    function validateForm() {
        let isValid = true;
        
        // Validate required text fields
        const requiredTextFields = ['firstName', 'lastName', 'email', 'phone', 'dob', 'goals'];
        requiredTextFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                showError(fieldId, 'This field is required');
                isValid = false;
            }
        });
        
        // Validate email format
        const email = document.getElementById('email');
        if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone number (simple validation)
        const phone = document.getElementById('phone');
        if (phone.value && !/^[\d\s\-()+]{10,}$/.test(phone.value)) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate program selection
        const programSelected = document.querySelector('input[name="program"]:checked');
        if (!programSelected) {
            showError('program', 'Please select a program');
            isValid = false;
        }
        
        // Validate start date
        const startDate = document.getElementById('startDate');
        if (!startDate.value) {
            showError('startDate', 'Please select a start date');
            isValid = false;
        }
        
        // Validate payment option
        const paymentSelected = document.querySelector('input[name="payment"]:checked');
        if (!paymentSelected) {
            showError('payment', 'Please select a payment option');
            isValid = false;
        }
        
        // Validate experience level
        const experience = document.getElementById('experience');
        if (!experience.value) {
            showError('experience', 'Please select your experience level');
            isValid = false;
        }
        
        // Validate education level
        const education = document.getElementById('education');
        if (!education.value) {
            showError('education', 'Please select your education level');
            isValid = false;
        }
        
        // Validate terms checkbox
        const terms = document.getElementById('terms');
        if (!terms.checked) {
            showError('terms', 'You must agree to the terms and conditions');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement && inputElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
            inputElement.classList.remove('border-gray-300');
            inputElement.classList.add('border-red-500');
        }
    }
});