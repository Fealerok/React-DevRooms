const express = require("express");
const router = express();

router.use(express.json());

router.get("/get-data", (req, res) => {
    res.send("ответ");
});

module.exports = router;