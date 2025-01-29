// 📄 middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Récupération du token après "Bearer"

    if (!token) {
        return res.status(401).json({ error: 'Accès refusé. Aucun token fourni.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; 
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token invalide ou expiré.' });
    }
};

export const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token requis' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token invalide' });
        }

        req.user = user;
        next();
    });
};


