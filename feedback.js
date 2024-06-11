function submitFeedback() {
  const textarea = document.getElementById("feedback-textarea");
  const emailInput = document.getElementById("feedback-email");

  let userFeedback,userEmail;
  userFeedback=document.getElementById("feedback-textarea").value;
  userEmail=document.getElementById("feedback-email").value;

  const textareaError = document.getElementById("textarea-error");
  const emailError = document.getElementById("email-error");
  const feedbackContainer = document.getElementById("feedback-container");

  let user_records = new Array();
        user_records = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
        user_records.push({
                "feedback":userFeedback,
                "email":userEmail
  }) 
  localStorage.setItem("users",JSON.stringify(user_records));

  // Validate textarea
  if (textarea.value.trim() === "") {
    textarea.classList.add("error");
    textareaError.textContent = "Please enter your feedback";
    return;
  } else {
    textarea.classList.remove("error");
    textareaError.textContent = "";
  }

  // Validate email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(emailInput.value)) {
    emailInput.classList.add("error");
    emailError.textContent = "Please enter a valid email address";
    return;
  } else {
    emailInput.classList.remove("error");
    emailError.textContent = "";
  }

  // If both fields are valid, replace the feedback container with a thank you message
  feedbackContainer.innerHTML = "<h1>Thank you for your feedback!</h1>";
}

// Add event listeners to all emoji buttons
var buttons = document.querySelectorAll(".emoji-box button");
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Remove highlight from all buttons
    buttons.forEach(function (btn) {
      btn.classList.remove("selected");
    });

    // Add highlight to the clicked button
    this.classList.add("selected");
  });
});