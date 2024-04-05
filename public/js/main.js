document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('orderForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = document.getElementById("orderForm");
    const formData = new FormData(form);
    const toppings = formData.getAll("toppings").filter(topping => topping !== "");
    const json = Object.fromEntries(formData.entries());
    json.toppings = toppings;
    json.paid = formData.get("paymentConfirmation") === 'yes' ? "Yes" : "No";

    // Retrieve the userEmail from localStorage
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      json.email = userEmail; // Add userEmail to your JSON object
    } else {
      console.error("User email not found in localStorage.");
      return; // Optionally, handle the case where the userEmail is not available
    }

    console.log(json);
    try {
      const response = await fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log("Response: ", result.message);
      $('#formSubmissionModal').modal('show');
    } catch (error) {
      console.error("Submission error: ", error.message);
    }
  });
});
