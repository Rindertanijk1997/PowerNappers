/* import express from 'express';
import fs from 'fs';

const router = express.Router();

// Endpoint att hämta alla produkter
router.get('/', (req, res) => {
    // data från menu.json
    fs.readFile('./data/menu.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to load menu data' });
        }
        // Parsuj dane JSON
        const menuData = JSON.parse(data);
        // Zwróć dane jako odpowiedź
        res.json(menuData.menu);
    });
});

export default router;
 */


import express from 'express';
import loadMenu from '../middlewares/loadMenu.js';

const router = express.Router();

// Endpoint att hämta alla produkter
router.get('/', loadMenu, (req, res) => {
    res.json(req.menu);
});

export default router;
