export const authorizeRoles = (roles) => {
    return (req, res, next) => {
        console.log('User Role:', req.user.role); // Ajoutez ce log

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Accès refusé. Rôle insuffisant." });
        }
        next();
    };
};
