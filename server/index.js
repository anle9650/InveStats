const express = require("express"),
    app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.static(__dirname + "/public"));
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

app.get(/.*/, (req, res) => res.sendFile("index"));

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});