// orders.js
import express from 'express';
import Datastore from 'nedb';
import errorHandler from '../middlewares/orderMiddleWare.js'; 

const router = express.Router();
const db = new Datastore({ filename: './db/cart.db', autoload: true });

// Funktion för att lägga till produkt i varukorgen
export function addToCart(product, callback) {
    db.insert(product, callback);
}

router.post('/add-to-cart', (req, res, next) => {
    addToCart(req.body, (err, newDoc) => {
        if (err) {
            return next(err);  // Skickar fel till errorHandler
        }
        res.status(200).send('Produkt tillagd i varukorgen');
    });
});

// Funktion för att hämta alla produkter i varukorgen
export function getCart(callback) {
    db.find({}, callback);
}

router.get('/cart', (req, res, next) => {
    getCart((err, products) => {
        if (err) {
            return next(err);  // Skickar fel till errorHandler
        }
        res.status(200).json(products);
    });
});

// Använd errorHandler middleware
router.use(errorHandler);

export default router;  

