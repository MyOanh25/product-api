const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });

app.get("/", (req, res) => {
    res.send("Product API is running");
});
app.get("/health", (req, res) => {
    if (mongoose.connection.readyState === 1) {
        return res.status(200).json({
            status: "healthy",
            mongodb: "connected"
        });
    }

    res.status(503).json({
        status: "unhealthy",
        mongodb: "disconnected"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});