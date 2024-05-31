import fs from 'fs';
import path from 'path';


//middleware för ladda menydata
const loadMenu = (req, res, next) => {
    //sökväg till filen menu.json
    const filePath = path.resolve('./data/menu.json');


    //läs in filen menu.json 
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to load menu data' });
        }
        try {
            const menuData = JSON.parse(data);
            req.menu = menuData.menu;
            next();
        } catch (parseError) {

            //hantera fel vid parsning av JSON-data
            return res.status(500).json({ error: 'Failed to parse menu data' });
        }
    });
};

export default loadMenu;
