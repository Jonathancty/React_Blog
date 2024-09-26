const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connect } = require("mongoose");
const path = require("path");
require("dotenv").config();
const upload = require("express-fileupload");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = ["https://sandwich-kongsi.onrender.com"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(upload());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../Front_end")));

// Catch-all route to serve `main.jsx` for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Front_end", "index.html"));
});

app.use(notFound);
app.use(errorHandler);

connect(process.env.MONGO_URI)
  .then(
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server is running on port ${process.env.PORT}`)
    )
  )
  .catch((err) => console.log(err));
