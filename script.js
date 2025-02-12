function redirectTo(role) {
    if (role === 'admin') {
        window.location.href = "admin.html";
    } else if (role === 'user') {
        window.location.href = "login.html";
    }
}

// Store user details and redirect to booking page
document.getElementById("userLoginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    localStorage.setItem("userDetails", JSON.stringify({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value
    }));
    window.location.href = "booking.html";
});

// Dynamic Pricing Calculation
const eventPrices = { "1": 5000, "2": 10000, "3": 8000, "4": 15000, "5": 12000 };
document.getElementById("eventType")?.addEventListener("change", function () {
    let eventId = this.value;
    document.getElementById("price").innerText = `₹${eventPrices[eventId]}`;
});

// Submit booking request
document.getElementById("bookingForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const bookingData = {
        eventType: document.getElementById("eventType").value,
        fromDate: document.getElementById("fromDate").value,
        toDate: document.getElementById("toDate").value,
        fromTime: document.getElementById("fromTime").value,
        toTime: document.getElementById("toTime").value,
        price: document.getElementById("price").innerText,
        status: "Pending"
    };

    fetch("http://localhost:5000/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
    }).then(() => alert("Booking request sent for approval!"));
});
