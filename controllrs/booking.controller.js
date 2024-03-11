const Booking = require("../model/booking.model");

exports.bookFlight = async (req, res) => {
  try {
    const { user, flight } = req.body;
    const booking = new Booking({ user, flight });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user").populate("flight");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
