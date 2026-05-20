require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user");
const corsHandler = require("./middleware/corsHandler");
const errorHandler = require("./middleware/errorHandler");
const noteRoutes = require("./routes/note");
const blogRoutes = require("./routes/blog");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use(corsHandler);

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/blogs", blogRoutes);

app.use(errorHandler);

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // await initMailer(process.env);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Startup error", err);
    process.exit(1);
  }
})();
