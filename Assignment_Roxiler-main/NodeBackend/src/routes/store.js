const express = require('express');
const authAndAuthorize = require('../middleware/authAndAuthorize');
const storeRouter = express.Router();
const db = require('../config/db');

//add store if role id of user is 3 i.e store owner;
storeRouter.post("/add-store", authAndAuthorize(1), async (req, res) => {
    try {
        const { name, description, location, UserId } = req.body;
        const statement = `SELECT roleId FROM users WHERE UserId = ?`
        const user = await new Promise((resolve, reject) => {
            db.pool.query(statement, [UserId], (error, users) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(users[0]);
                }
            });
        });
        if (!user || user.roleId !== 3) {
            return res.status(400).json({ message: "Invalid store owner" });
        }
        const statement2 = `INSERT INTO stores (name, description, location, UserId) VALUES (?, ?, ?, ?)`;
        db.pool.execute(statement2, [name, description, location, UserId], (error, results) => {
            if (error) {
                return res.status(500).json({ message: error.message });
            } else {
                console.log(results);
                res.status(201).json({ message: "Store registered successfully" });
            }



        })

    } catch (error) {
        res.status(400).json({ message: error.message })

    }
})



// list of stores
storeRouter.get("/all-stores",authAndAuthorize(1,2,3), (req, res) => {
    try {
        const query = `
            SELECT s.StoreId,
                s.name AS storeName,
                u.Email AS ownerEmail,
                u.Address AS storeAddress,
                ROUND(AVG(r.rating), 1) AS averageRating
            FROM stores s
            JOIN users u ON s.UserId = u.UserId
            LEFT JOIN ratings r ON s.StoreId = r.StoreId
            GROUP BY s.StoreId, s.name, u.Email, u.Address
            ORDER BY s.name ASC;
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










module.exports = storeRouter;