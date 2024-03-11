
const express = require("express");
const router = express.Router();
const bookingController = require("../controllrs/booking.controller");

router.post("/", bookingController.bookFlight);
router.get("/", bookingController.getAllBookings);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
