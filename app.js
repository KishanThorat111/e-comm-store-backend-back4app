require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
// const MongoStore = require("connect-mongo");
const app = express();
// const port = 8080;
const port = process.env.PORT || 8080;
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");
const { verifyToken, isAdmin } = require("./middleware/auth-middleware");

// app.set("trust proxy", 1);

//mongodb://localhost:27017
// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION, {
      dbName: "e-comm-store-db",
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

connectDB();

app.use(express.json());

// CORS configuration
const allowedOrigins = [
  "https://victorious-forest-0704fbe00.4.azurestaticapps.net",
  "https://nodejs-hgtc.onrender.com",
  "http://localhost:8080", // Local development // Add your Render.com backend URL here
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error("Not allowed by CORS")); // Deny the origin
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all HTTP methods
  credentials: true, // Allow credentials (cookies, headers, etc.)
  preflightContinue: false, // Continue handling preflight requests
  optionsSuccessStatus: 204, // Allow credentials (cookies, headers, etc.)
};

// Enable CORS for the application
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
// app.use(express.json());
app.get("/", (req, res) => {
  res.send("server running");
});

app.use("/category", verifyToken, isAdmin, categoryRoutes);
app.use("/brand", verifyToken, isAdmin, brandRoutes);
app.use("/orders", verifyToken, isAdmin, orderRoutes);
app.use("/product", verifyToken, isAdmin, productRoutes);
app.use("/customer", verifyToken, customerRoutes);
app.use("/auth", authRoutes);

// //mongodb://localhost:27017
// async function connectDB() {
//   await mongoose.connect(process.env.MONGO_CONNECTION, {
//     dbName: "e-comm-store-db",
//   });
//   console.log("MongoDB connected");
// }

// connectDB().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
