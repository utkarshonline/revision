const express = require("express");
const mongoose = require("mongoose");
const { connection } = require("./db");
const authMiddleware = require("./middleware/authMiddleware.js");
const authRoutes = require("./routes/user.routes.js");
const flightRoutes = require("./routes/flight.routes.js");
const bookingRoutes = require("./routes/booking.routes.js");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api", authRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/bookings", authMiddleware, bookingRoutes);

app.listen(8080, async () => {
  try {
    await connection, console.log("connected to db");
    console.log("server is running at port 8080");
  } catch (err) {
    console.log(err);
  }
});
