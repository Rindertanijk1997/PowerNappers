import fs from 'fs';
import path from 'path';

const loadMenu = (req, res, next) => {
    const filePath = path.resolve('./data/menu.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to load menu data' });
        }
        try {
            const menuData = JSON.parse(data);
            req.menu = menuData.menu;
            next();
        } catch (parseError) {
            return res.status(500).json({ error: 'Failed to parse menu data' });
        }
    });
};

export default loadMenu;
