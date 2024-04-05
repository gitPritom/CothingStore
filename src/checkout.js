document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobileNo = document.querySelector("#mobileNo").value;
    const address = document.getElementById("address").value;
  
    // Here you can add code to handle the form submission, such as sending the data to a server
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Mobile No:", mobileNo);
    console.log("Address:", address);
  
    // For demonstration purposes, let's simply alert the user that the order has been placed
    alert("Your order has been placed!");
  });
  
