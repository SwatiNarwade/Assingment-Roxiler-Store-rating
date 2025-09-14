const express = require('express');
const userRouter = express.Router();
const db = require("../config/db");
const authAndAuthorize = require('../middleware/authAndAuthorize');
const CryptoJS = require('crypto-js');


// GET all normal and admin users (roleId 1 and 2)
userRouter.get("/all-user", authAndAuthorize(1), async (req, res) => {
    try {
        const query = `
            SELECT 
                CONCAT(FirstName,' ', LastName) AS fullName,
                Email,
                Address,
                r.role AS userRole
            FROM users u
            JOIN roles r ON u.roleId = r.roleId
            WHERE  u.ActiveState = 1
            ORDER BY fullName ASC;
        `;

        db.pool.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


userRouter.patch("/update-password", authAndAuthorize(1, 2, 3), (req, res) => {
    try {
        const UserId = req.user?.UserId;
        const { Password } = req.body;
        const hashedPassword = CryptoJS.SHA256(Password).toString(CryptoJS.enc.Base64);
        const statement = `update users set Password = ? where UserId = ?`;
        db.pool.execute(statement, [hashedPassword, UserId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            return res.status(200).json({ message: "Password updated successfully." });

        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
module.exports = userRouter;