import express from 'express';
import Datastore from 'nedb';
import validateProduct from '../middlewares/validateProduct.js'; 
import errorHandler from '../middlewares/orderMiddleWare.js';


const router = express.Router();
const dbCart = new Datastore({ filename: './db/cart.db', autoload: true });

export function addToCart(product, callback) {
    dbCart.insert(product, callback);
}

router.post('/add-to-cart', validateProduct, (req, res, next) => { 
    addToCart(req.body, (err, newDoc) => {
        if (err) {
            return next(err);
        }
        res.status(200).send({ message: 'Produkt tillagd i varukorgen', product: newDoc });
    });
});


export function getCart(callback) {
    dbCart.find({}, callback);
}

router.get('/cart', (req, res, next) => {
    getCart((err, products) => {
        if (err) {
            return next(err); 
        }

        const totalPrice = products.reduce((total, product) => total + Number(product.price), 0);

        res.status(200).json({ products, totalPrice });
    });
});

export function deleteFromCart(productId, callback) {
    dbCart.remove({ _id: productId }, {}, callback);
}

router.delete('/cart/:id', (req, res, next) => {
    const productId = req.params.id;

    deleteFromCart(productId, (err, numRemoved) => {
        if (err) {
            return next(err);  
        }
        if (numRemoved === 0) {
            return res.status(404).send('Produktet finns inte i varukorgen');
        }
        res.status(200).send('Produktet har tagits bort från varukorgen');
    });
});


router.post('/create-order', (req, res, next) => {
    console.log("Route /create-order träffad");
    const orderItems = req.body.items;
    const totalAmount = orderItems.reduce((total, item) => total + item.price, 0);

    const processingTime = new Date();
    processingTime.setMinutes(processingTime.getMinutes() + 15);

    const order = {
        userId: req.body.userId || 'guest',
        items: orderItems,
        totalAmount: totalAmount,
        status: 'Levereras: ' + processingTime.toLocaleTimeString(), 
        createdAt: new Date()
    };

    dbCart.insert(order, (err, newDoc) => {
        if (err) {
            return next(err);
        }
        console.log(order);
    res.status(201).json({ message: 'Order skapad', orderId: newDoc._id, order: order });
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


router.use(errorHandler);

export default router;
