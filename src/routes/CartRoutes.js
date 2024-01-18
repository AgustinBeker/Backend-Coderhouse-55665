import { Router } from "express";
import CartManager from "../cartManager.js";

const router = Router();

const CM = new CartManager(`../src/carritos`);

router.get("/", async (req, res) => {
    const carritos = await CM.getCart();
    res.send(carritos);
});

router.get("/:cid", async (req, res) => {
    const Cart = await CM.getCartById(Number(req.params.cid));
    if (!Cart) return res.send({ error: "Carrito no encontardo" });
        res.send(Cart);
});

router.post("/", async (req, res) => {
    const newCart = await CM.createCart();
    res.send(newCart);
});

router.post("/:cid/product/:pid", async (req, res) => {
    let cartId = Number(req.params.cid);
    let productId = Number(req.params.pid);
    const addProduct = await CM.addProductCart(cartId, productId);
    res.send(addProduct);
});

export default router;