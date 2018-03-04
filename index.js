const express = require("express");
const getBundles = require("./getBundles");

const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/api/v1/list-all-broadband", (req, res, next) => {
    res.json({ success: true, combinations: getBundles() })
});

app.listen(8080);