const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/hallBooking', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

const BookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    eventType: { type: String, required: true },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
    fromTime: { type: String, required: true },
    toTime: { type: String, required: true },
    status: { type: String, default: "Pending" }
});

const Booking = mongoose.model("Booking", BookingSchema);

// ✅ Add a new booking (Check if email already exists)
app.post('/book', async (req, res) => {
    try {
        const existingBooking = await Booking.findOne({ email: req.body.email });
        if (existingBooking) {
            return res.status(400).json({ error: "Booking already exists for this email!" });
        }

        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.json({ message: "✅ Booking request sent for approval!" });
    } catch (error) {
        res.status(500).json({ error: "❌ Server Error" });
    }
});

// ✅ Get all bookings
app.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: "❌ Error fetching bookings" });
    }
});

// ✅ Update booking status (using PUT method)
app.put('/update-booking/:id', async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ error: " Booking not found!" });
        }

        res.json({ message: " Booking status updated!", updatedBooking });
    } catch (error) {
        res.status(500).json({ error: " Error updating status" });
    }
});

// Start Server
app.listen(5000, () => console.log(" Server running on port 5000"));
