import express from "express";
import http from "http";
import productRouter from "../src/routes/productRoutes.js";
import cartRouter from "../src/routes/cartRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(8080, () => console.log("Servidor encendido"));

app.get("/products", (req, res) => {
    let query = req.query;

    if (!!query.limit) {
        let limit = parseInt(query.limit);

        let productLimit = [];

    for (let i = 0; i < limit; i++) {
        productLimit.push(products[i]);
    }
        res.send(productLimit);
    } else {
        res.send(products);
    }
});
app.get("/products/:pid", (req, res) => {
    let idUsuarioCapturado = req.params.pid;

    let idUsuarioFiltrado = products.find((u) => u.id == idUsuarioCapturado);

    if (!idUsuarioFiltrado) return res.send({ error: "Usuario no encontrado" });

    res.send({ idUsuarioFiltrado });
});

app.listen(8080, () => console.log("Server on"));
