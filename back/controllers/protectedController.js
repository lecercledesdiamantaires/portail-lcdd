// 📄 controllers/protectedController.js
export const protectedRoute = (req, res) => {
    res.json({ message: 'Bienvenue dans une route protégée !', user: req.user });
};
