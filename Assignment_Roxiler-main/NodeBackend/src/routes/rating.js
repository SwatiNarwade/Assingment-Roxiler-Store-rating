const express = require('express');
const authAndAuthorize = require('../middleware/authAndAuthorize');
const ratingRouter = express.Router();
const db = require('../config/db');

ratingRouter.post("/add-Rating", authAndAuthorize(1,2,3), (req, res) => {
    try {
        const UserId = req.user?.UserId;
        const { StoreId, rating, comment } = req.body;
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5." });
        }
        const query = `INSERT INTO ratings (UserId, StoreId, rating, comment)  VALUES (?, ?, ?, ?)`;

        db.pool.query(query, [UserId, StoreId, rating, comment], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: "You have already rated this store." });
                }
                return res.status(500).json({ message: err.message });
            }

            res.status(201).json({ message: "Rating submitted successfully." });
        });




    } catch (error) {
        res.status(500).json({ message: error.message });

    }

})



ratingRouter.patch("/update-rating", authAndAuthorize(1,2,3), (req, res) => {
    try {
        const UserId = req.user?.UserId;
 
        const { rating, comment,StoreId } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5." });
        }

        const updateQuery = `UPDATE ratings 
            SET rating = ?, comment = ?, rated_at = CURRENT_TIMESTAMP
            WHERE UserId = ? AND StoreId = ?
        `;

        db.pool.query(updateQuery, [rating, comment, UserId, StoreId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Rating not found for this user and store." });
            }

            res.status(200).json({ message: "Rating updated successfully." });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Get users who rated stores owned by the logged-in store owner 
ratingRouter.get("/store-ratings-users", authAndAuthorize(3), (req, res) => {
    const ownerId = req.user?.UserId;

    const query = `
        SELECT  r.ratingId, r.rating, r.comment,   r.rated_at, u.UserId, u.FirstName,  u.LastName,   u.Email,
            s.StoreId,  s.name AS StoreName  FROM ratings r
        JOIN users u ON r.UserId = u.UserId
        JOIN stores s ON r.StoreId = s.StoreId
        WHERE s.UserId = ?
    `;

    db.pool.query(query, [ownerId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(200).json({
            message: "List of users who rated your stores.",
            data: results
        });
    });
});


//user-ratings
ratingRouter.get("/user-ratings", authAndAuthorize(1, 2, 3), (req, res) => {
    const UserId = req.user?.UserId;
    const query = `SELECT StoreId, rating, comment FROM ratings WHERE UserId = ?`;
    db.pool.query(query, [UserId], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json(results);
    });
});




module.exports = ratingRouter;