const express = require("express");
const router = express();
const db = require("../Database/db");
const JwtMethods = require("../JWT/jwt");
const jwt = require("jsonwebtoken");
const {loginMiddleware, registerMiddleware, refreshTokens} = require("../Middleware/auth.middleware");
require("dotenv").config();
const env = process.env;

router.use(express.json());

router.post("/register-new-user", registerMiddleware, async (req, res, error) => {
    const register_res = req.register_res;

    if (register_res == "Пользователь с таким логином уже существует.") return res.status(501).json({message: register_res});
    else if (register_res == "Регистрация прошла успешно!") return res.status(201).json({message: register_res});

});

router.post("/login-user", loginMiddleware, async (req, res) => {
    const login_res = req.login_res;


    if (login_res == "Пароли не совпадают") return res.status(401).json({message: login_res});
    else if (login_res == "Пользователя с таким логином не существует.") return res.status(401).json({message: login_res});

    const accessToken = JwtMethods.generateAccessToken(login_res);
    const refreshToken = JwtMethods.generateRefreshToken(login_res);

    const decoded_access = jwt.verify(accessToken, env.JWT_ACCESS_SECRET);

    await db.saveRefreshToken(refreshToken, login_res);

    return res.status(201).json({
        message: "Успешный вход!",
        accessToken: accessToken,
        refreshToken: refreshToken,
        decoded: decoded_access
    });
});


router.post("/check-tokens", (req, res) => {

    try {
        const accessToken = req.headers.authorization.split(" ")[1];
        const refreshToken = req.headers["refresh-token"];
        
        jwt.verify(accessToken, env.JWT_ACCESS_SECRET, (err, decoded_access) => {
            if (err){
                console.log("Access токен не валидный");

                jwt.verify(refreshToken, env.JWT_REFRESH_SECRET, async (err, decoded_refresh) => {
                    if (err){
                        console.log("Refresh Token не валидный");

                        return res.status(401).json({
                            accessToken: null,
                            refreshToken: null,
                            decoded: null
                        });
                    }


                    const dbRefreshToken = await db.getRefreshToken(decoded_refresh.id);

                    if (refreshToken !== dbRefreshToken) return res.status(401).json({
                        accessToken: null,
                        refreshToken: null,
                        decoded: null
                    });

                    const newAccessToken = JwtMethods.generateAccessToken({
                        id: decoded_refresh.id,
                        login: decoded_refresh.login,
                        role: decoded_refresh.role,
                    });

                    return res.status(200).json({
                        accessToken: newAccessToken,
                        refreshToken: refreshToken,
                        decoded: decoded_refresh
                    });
                });
            }

            else{
                return res.status(200).json({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    decoded: decoded_access
                });
            }
        });
        


    } catch (error) {
        console.log(`Ошибка проверки токенов в route: ${error}`);
        return res.status(401).json();
    }
});

router.post("/get-user-nickname", (req, res) => {
    const {accessToken} = req.body;
});

module.exports = router;