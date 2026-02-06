form = document.getElementById('registrationForm');
modal = document.getElementById('termsModal');
openTerms = document.getElementById('openTerms');
closeBtn = document.querySelector('.close-btn');
message = document.getElementById('message');
dobInput = document.getElementById('dob');
confirmPassword = document.getElementById('confirm_password');

openTerms.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = "block";
});
const birthDate = new Date(dobInput.value);
const today = new Date();
let age = today.getFullYear() - birthDate.getFullYear();
const monthDiff = today.getMonth() - birthDate.getMonth();

if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
}

if (age < 18) {
    alert("You must be at least 18 years old to register.");
    return; // Stop form submission
}
const profilePic = document.getElementById('profilePic');
const imagePreview = document.getElementById('imagePreview');

profilePic.addEventListener('change', function() {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        // When the file is loaded, set the src of the preview image
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'inline-block';
        }

        reader.readAsDataURL(file);
    } else {
        imagePreview.style.display = 'none';
    }
});

closeBtn.onclick = () => modal.style.display = "none";

// 3. Form Submission and Validation
function validatePasswords() {
    const val1 = password.value;
    const val2 = confirmPassword.value;

    // Only show messages if the second field isn't empty
    if (val2.length <= 0) {
        matchMessage.textContent = "";
        confirmPassword.classList.remove('error-border');
        return;
    }

    if (val1 === val2) {
        matchMessage.textContent = "Passwords match ✓";
        matchMessage.className = "match";
        confirmPassword.classList.remove('error-border');
    } else {
        matchMessage.textContent = "Passwords do not match ✗";
        matchMessage.className = "no-match";
        confirmPassword.classList.add('error-border');
    }
}

// Listen for typing events in both fields
password.addEventListener('input', validatePasswords);
confirmPassword.addEventListener('input', validatePasswords);

// Final check during form submission
form.addEventListener('submit', (e) => {
    if (password.value !== confirmPassword.value) {
        e.preventDefault(); // Stop the form from submitting
        alert("Passwords must match before registering!");
    }
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const isChecked = document.getElementById('termsCheck').checked;
    const gender = document.querySelector('input[name="gender"]:checked');

    if (!isChecked) {
        alert("Please agree to the terms!");
        return;
    }

    if (!gender) {
        alert("Please select a gender.");
        return;
    }

    // Success Manipulation
    message.style.color = "green";
    message.innerHTML = `<p>Welcome, <strong>${username}</strong>! Registration successful.</p>`;
    
    // Reset form after 2 seconds
    setTimeout(() => {
        form.reset();
        message.innerHTML = "";
    }, 3000);
});


window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}