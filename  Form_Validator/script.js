const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm_password');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check required fields
function checkRequired(inputs) {
    inputs.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// Check email validity
function checkEmail(input) {
    const regex = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    if (regex.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

// Check if passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    } else {
        showSuccess(input2);
    }
}

// Get field name with proper formatting
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1).replace('_', ' ');
}

// Event listener for form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Perform validations
    checkRequired([username, email, password, confirm_password]);
    checkLength(username, 3, 15); // Username: 3-15 characters
    checkLength(password, 6, 25); // Password: 6-25 characters
    checkEmail(email);            // Check email validity
    checkPasswordsMatch(password, confirm_password); // Check if passwords match
});
