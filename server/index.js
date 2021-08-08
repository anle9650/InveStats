const express = require("express"),
    app = express(),
    cors = require("cors"),
    mongoose = require("mongoose"),
    apiRoutes = require("./routes/apiRoutes");

mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/investats",
    { useNewUrlParser: true }
);

app.set("port", process.env.PORT || 3000);

app.use(express.static(__dirname + "/public"));
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use(cors());
app.use("/api", apiRoutes);

app.get(/.*/, (req, res) => res.sendFile(__dirname, "index"));

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});