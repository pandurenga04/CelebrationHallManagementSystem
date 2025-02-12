fetch("http://localhost:5000/bookings")
    .then(response => response.json())
    .then(data => {
        let html = "<table border='1'><tr><th>Name</th><th>Event</th><th>Date</th><th>Time</th><th>Status</th><th>Action</th></tr>";
        data.forEach(booking => {
            html += `<tr>
                <td>${booking.name}</td>
                <td>${booking.eventType}</td>
                <td>${booking.fromDate} to ${booking.toDate}</td>
                <td>${booking.fromTime} to ${booking.toTime}</td>
                <td>${booking.status}</td>
                <td>
                    <button onclick="updateBooking('${booking._id}', 'Approved')">Approve</button>
                    <button onclick="updateBooking('${booking._id}', 'Rejected')">Reject</button>
                </td>
            </tr>`;
        });
        html += "</table>";
        document.getElementById("bookingRequests").innerHTML = html;
    });

function updateBooking(id, status) {
    fetch("http://localhost:5000/update-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
    }).then(() => location.reload());
}
