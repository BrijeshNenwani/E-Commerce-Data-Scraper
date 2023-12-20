const express = require("express");
const suggestionRoute = require("./routes/suggested.js");
const watchRoute = require("./routes/watch.js");
const searchRoute = require("./routes/search.js");
const app = express();
app.use(require("cors")());
app.use(express.json());
//Routes
app.use("/suggested", suggestionRoute);
app.use("/watch", watchRoute);
app.use("/search", searchRoute);
app.listen(2800, () => console.log("listening on port: 2800"));
