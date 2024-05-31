import express from 'express';
import Datastore from 'nedb';

const router = express.Router();
const dbCart = new Datastore({ filename: './db/cart.db', autoload: true });

// function för att ta bort från varukorg
export function deleteFromCart(productId, callback) {
    dbCart.remove({ _id: productId }, {}, callback);
}

router.delete('/:id', (req, res, next) => {
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

export default router;
