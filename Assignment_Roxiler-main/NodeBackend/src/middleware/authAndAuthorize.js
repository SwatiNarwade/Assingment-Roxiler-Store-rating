const jwt = require('jsonwebtoken')
const db = require('../config/db')

// pass allowed role IDs as arguments
//Role  ID = 1 for System Administrator
//Role Id =2 for  Normal User 
//Role Id =3 for  Store Owner

const authAndAuthorize = (...allowedRoles) => {
    return async (req, res, next) => {
        // console.log(req.cookies);
        const token = req.cookies?.token;
        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Token not found" });
        }

        try {
            const decoded = jwt.verify(token, "@secretKey"); 
            const UserId = decoded.UserId;
            const RoleId = decoded.roleId;
            console.log("Decoded token:", decoded);

           const statement = `select UserId,FirstName,LastName,Email,Phone,Address,roleId from users where UserId = ? and RoleId = ?`;
                      // Wrap the query in a promise to use with async/await
            const user = await new Promise((resolve, reject) => {
                db.pool.query(statement, [UserId, RoleId], (error, users) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(users[0]);
                    }
                });
            });

            // If no user is found, return 404 or a suitable error
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            req.user = user;  // Set the user in req.user
            console.log("Decoded user:", req.user); 


            if (!allowedRoles.includes(decoded.roleId)) {
                return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
            }

            next();
        } catch (err) {
            return res.status(403).json({ message: "Forbidden: Invalid token",
                error : err.message
             });
        }
    };
};

module.exports = authAndAuthorize;
