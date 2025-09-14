const express = require('express');
const authAndAuthorize = require('../middleware/authAndAuthorize');
const db = require('../config/db');

const dashboardRouter = express.Router();

// Dashboard  (accessible by admin)
dashboardRouter.get('/admin-dashboard-summary', authAndAuthorize(1), (req, res) => {
    const query = `
        SELECT 
            (SELECT COUNT(*) FROM users) AS totalUsers,
            (SELECT COUNT(*) FROM stores) AS totalStores,
            (SELECT COUNT(*) FROM ratings) AS totalRatings
    `;

    db.pool.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(200).json({
            message: "Dashboard summary fetched successfully",
            data: results[0]
        });
    });
});

module.exports = dashboardRouter;
