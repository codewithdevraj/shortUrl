const express = require("express");
const path = require("path");
const { connectTOMongoDB } = require("./connection");
const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();

const PORT = 6003;

connectTOMongoDB("mongodb://localhost:27017/shortUrl").then(() =>
  console.log("MongoDB Connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/test", async (req, res) => {
  const allurls = await URL.find();
  return res.render("home", {
    urls: allurls,
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
