function validateForm() {
    // Get the input values from the form
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");

    // Regular expression for name and email validation
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate name
    if (!nameRegex.test(nameInput.value)) {
        // Invalid input
        nameInput.classList.add("is-invalid");
        return false; // Prevent form submission
    } else {
        nameInput.classList.remove("is-invalid");
    }

    // Validate email
    if (!emailRegex.test(emailInput.value)) {
        // Invalid input
        emailInput.classList.add("is-invalid");
        return false; // Prevent form submission
    } else {
        emailInput.classList.remove("is-invalid");
    }

    // If both email and name are valid
    return true; // Allow form submission
    alert("The form is successfully validated")
}
