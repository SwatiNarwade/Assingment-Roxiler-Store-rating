const express = require('express');
const authRouter = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const { validateRegister } = require('../utils/validateRegister');
const authAndAuthorize = require('../middleware/authAndAuthorize');


authRouter.post("/user-register", (req, res) => {
    try {
        const { FirstName, LastName, Email, Phone, Address, Password } = req.body;
        console.log(req.body);
        validateRegister(req);
        const hashedPassword = CryptoJS.SHA256(Password).toString(CryptoJS.enc.Base64);

        const query = `insert into users (FirstName,LastName,Email,Phone,Address,roleId,Password) values (?,?,?,?,?,?,?)`;
        db.pool.execute(query, [FirstName, LastName, Email, Phone, Address, 2, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            } else {
                const savedUser = {
                    id: result.insertId,
                    FirstName,
                    LastName,
                    Email,
                    Phone,
                    Address,
                    role: "Normal User"
                };
                res.json({
                    message: "User Created Succesfull",
                    savedUser: savedUser
                })
            }

        })



    } catch (error) {
        res.status(400).json({ message: error.message });

    }
})

authRouter.post("/login", (req, res) => {
    try {
        const { Email, Password } = req.body;

        const statement = `select  UserId,FirstName,LastName,Email,Phone,Address,roleId,ActiveState from users where Email = ? and Password = ? `;
        const hashedPassword = CryptoJS.SHA256(Password).toString(CryptoJS.enc.Base64);
        db.pool.query(statement, [Email, hashedPassword], (err, users) => {
            if (err) res.status(400).json({ message: err.message })

            if (users.length == 0) res.status(404).json({ message: "Invalid Credentials" })
            else {
                const user = users[0];
                if (user.ActiveState == 0) {
                    res.status(410).json({ message: "User already deleted " });
                } else {
                    const payload = {
                        UserId: user.UserId,
                        roleId: user.roleId
                    }
                    const token = jwt.sign(payload, "@secretKey", { expiresIn: "1h" })
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "lax",
                        path: "/",
                        maxAge: 60 * 60 * 1000
                    })
                    console.log(user);

                    res.json({
                        user: user
                    })

                }


            }


        })




    } catch (error) {
        res.status(400).json({ message: error.message })

    }
})

// Registeration of  Normal User , Store Owner and system administrator only by system administrator,

authRouter.post("/admin/register", authAndAuthorize(1), (req, res) => {
    try {
        const { FirstName, LastName, Email, Phone, Address, RoleId, Password } = req.body;
        validateRegister(req);
        const hashedPassword = CryptoJS.SHA256(Password).toString(CryptoJS.enc.Base64);
        const query = `insert into users (FirstName,LastName,Email,Phone,Address,roleId,Password) values(?,?,?,?,?,?,?)`;
        db.pool.execute(query, [FirstName, LastName, Email, Phone, Address, RoleId, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            } else {
                const savedUser = {
                    id: result.insertId,
                    FirstName,
                    LastName,
                    Email,
                    Phone,
                    Address,
                    Role: RoleId == 2 ? "Normal User" : "Store Owner",
                    roleId: RoleId
                };
                res.json({
                    message: "User Created Succesfull",
                    savedUser: savedUser
                })
            }
        })


    } catch (error) {
        res.status(400).json({ message: error.message });

    }
})


authRouter.post("/logout", authAndAuthorize(1, 2, 3), (req, res) => {

    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"

        })
        console.log("cleared Cookies");
        res.json({
            ok: true,
            message: "Logged Out"
        })


    } catch (error) {
        res.status(400).json({ message: error.message })

    }
})








module.exports = authRouter;