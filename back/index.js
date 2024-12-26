// 📄 server.js
import express from 'express';
import router from './router.js';
import { PORT } from './config/env.js';

const app = express();
app.use(express.json());

// Utilisation du routeur global
app.use('/api', router);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
