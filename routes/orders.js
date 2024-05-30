import express from 'express';
import { addToCart } from './db/napperDB.js';

const router = express.Router();

// POST-route för att lägga till en produkt i varukorgen
router.post('/add-to-cart', async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const updatedCart = await addToCart(productId, quantity);
    res.status(200).json({ message: 'Produkt tillagd i varukorgen!', cart: updatedCart });
  } catch (error) {
    res.status(500).json({ message: 'Ett fel uppstod när produkten skulle läggas till i varukorgen.', error: error.message });
  }
});

export default orders;