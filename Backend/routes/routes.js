const express = require("express");
const router = express();
const db = require("../Database/db");

router.use(express.json());

router.get("/get-data", (req, res) => {
    res.send("ответ");
});

router.post("/register-new-user", async (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const email = req.body.email;

    const register_res = await db.registerNewUser(login, password, email);

    if (register_res == "Пользователь с таким логином уже существует.") return res.status(501).json({message: register_res});
    else if (register_res == "Регистрация прошла успешно!") return res.status(201).json({message: register_res});

});

router.post("/login-user", async (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    const login_res = await db.loginUser(login, password);

    
});

module.exports = router;