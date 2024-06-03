import express from 'express';
import Datastore from 'nedb';
import validateProduct from '../middlewares/validateProduct.js'; // Importera middleware
import errorHandler from '../middlewares/orderMiddleWare.js';


const router = express.Router();
const dbCart = new Datastore({ filename: './db/cart.db', autoload: true });

// Funktion för att lägga till produkt i varukorgen
export function addToCart(product, callback) {
    dbCart.insert(product, callback);
}

router.post('/add-to-cart', validateProduct, (req, res, next) => { // Använd middleware
    addToCart(req.body, (err, newDoc) => {
        if (err) {
            return next(err); // Skickar fel till errorHandler
        }
        res.status(200).send({ message: 'Produkt tillagd i varukorgen', product: newDoc });
    });
});


// Funktion för att hämta alla produkter i varukorgen
export function getCart(callback) {
    dbCart.find({}, callback);
}

router.get('/cart', (req, res, next) => {
    getCart((err, products) => {
        if (err) {
            return next(err); // Skickar fel till errorHandler
        }

        // Beräkna totalpriset för produkterna i varukorgen
        const totalPrice = products.reduce((total, product) => total + Number(product.price), 0);

        // Skicka tillbaka produkterna tillsammans med totalpriset
        res.status(200).json({ products, totalPrice });
    });
});

// Function för att ta bort från varukorg     ---------------------------------------
export function deleteFromCart(productId, callback) {
    dbCart.remove({ _id: productId }, {}, callback);
}

router.delete('/cart/:id', (req, res, next) => {
    const productId = req.params.id;

    deleteFromCart(productId, (err, numRemoved) => {
        if (err) {
            return next(err);  // Skickar fel till errorHandler
        }
        if (numRemoved === 0) {
            return res.status(404).send('Produktet finns inte i varukorgen');
        }
        res.status(200).send('Produktet har tagits bort från varukorgen');
    });
});


router.post('/create-order', (req, res, next) => {
    const orderItems = req.body.items;
    const totalAmount = orderItems.reduce((total, item) => total + item.price, 0);

    const order = {
        userId: req.body.userId || 'guest',
        items: orderItems,
        totalAmount: totalAmount,
        status: 'Processing',
        createdAt: new Date()
    };

    dbCart.insert(order, (err, newDoc) => {
        if (err) {
            return next(err);
        }
        res.status(201).json({ message: 'Order skapad', orderId: newDoc._id });
    });
});



router.get('/history/:userId', (req, res, next) => {
    const userId = req.params.userId;

    dbCart.find({ userId }, (err, orders) => {
        if (err) {
            return next(err);
        }
        res.status(200).json(orders);
    });
});


// Använd errorHandler middleware
router.use(errorHandler);

export default router;
