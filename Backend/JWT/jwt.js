const jsonwebtoken = require("jsonwebtoken");

class JwtMethods{
    generateAccessToken = (userData) => {
        const token = jsonwebtoken.sign({id: userData.id, login: userData.login, role: userData.role}, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "30s"
        });

        return token;
    }

    generateRefreshToken = (userData) => {
        const token =  jsonwebtoken.sign({id: userData.id, login: userData.login, role: userData.role}, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "1m"
        });

        return token;
    }
}

module.exports = new JwtMethods();