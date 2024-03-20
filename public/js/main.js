document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('orderForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = document.getElementById("orderForm");
    const formData = new FormData(form);
    const toppings = formData.getAll("toppings").filter(topping => topping !== "").join(", ");
    const json = Object.fromEntries(formData.entries());
    json.toppings = toppings;
    json.paid = formData.get("paymentConfirmation") === 'yes' ? "Yes" : "No";

    const response = await fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(json)
    });

    const text = await response.text();
    console.log("Response: ", text);

    $('#formSubmissionModal').modal('show');
  });
});
