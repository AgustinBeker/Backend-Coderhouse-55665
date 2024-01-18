import fs from "fs";

export default class ProductManager {
    constructor(file) {
    this.file = file + ".JSON";
    this.products = [];
    }

    async addProduct(product) {
    try {
        if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
            this.products = JSON.parse(data);
            console.log(this.products);
            if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock
            ) {
            return { error: "Los atributos ingresados no son correctos" };
            }
            if (this.products.find((p) => p.code === product.code)) {
            return { error: "el codigo ya existe" };
            }
            product.id = Date.now();
            this.products.push(product);
            await fs.promises.writeFile(
            this.file,
            JSON.stringify(this.products, null, "\t")
            );
        }
        return { status: 200, message: "Producto añadido exitosamente" };
        } else {
        return { error: "Base de datos no encontrada" };
        }
    } catch (error) {
        console.log("Error: ", error);
    }
    }
    async getProducts() {
    try {
        if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
            this.products = JSON.parse(data);
            return this.products;
        }
        } else {
        console.log("No existe el archivo, por favor cree uno");
        }
    } catch (error) {
        throw new Error("Error: ", error);
    }
    }

    async getProductById(id) {
    try {
        if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
            this.products = JSON.parse(data);
            const product = await this.products.find((p) => p.id === id);
            if (product) {
            return product;
            } else {
                return {
                    status: 404,
                    message: `Error: Producto con el id "${id}" no encontrado`,
                };
            }
        }
        } else {
        console.log("No existe el archivo, por favor cree uno");
        }
    } catch (error) {
        throw new Error("Error: ", error);
    }
    }
    async updateProduct(id, product) {
    try {
        if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
            this.products = JSON.parse(data);
            const index = this.products.findIndex((p) => p.id === id);

            if (index !== -1) {
                this.products[index] = { ...this.products[index], ...product };
                await fs.promises.writeFile(
                    this.file,
                    JSON.stringify(this.products, null, "\t")
                );
                return {
                    status: 200,
                    message: "Has actualizado correctamente el producto",
                };
            } else {
                return { status: 404, error: "Producto no encontrado" };
            }
        } else {
            return { error: "base de datos no encontrada" };
        }
        }
    } catch (error) {
        throw new Error("Error: ", error);
    }
    }
    async removeProduct(id) {
    try {
        if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
            this.products = JSON.parse(data);
            const index = this.products.findIndex((p) => p.id === id);
            if (index !== -1) {
            this.products.splice(index, 1);
            await fs.promises.writeFile(
                this.file,
                JSON.stringify(this.products, null, "\t")
            );
            return {
                status: 200,
                message: "Su producto de elimino correctamente",
            };
            }
        } else {
            return { status: 404, message: "Producto no encontrado" };
        }
        } else {
            return {
                status: 404,
                message: "Archivo no encontrado, por favor cree uno",
            };
        }
    } catch (error) {
        throw new Error("Error: ", error);
    }
    }
async removeAllProducts() {
    try {
        if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
            this.products = [];
            await fs.promises.writeFile(
            this.file,
            JSON.stringify(this.products, null, "\t")
            );
            console.log("Todos los productos han sido eliminados");
        } else {
            console.log("No hay productos para eliminar");
        }
        }
    } catch (error) {
        throw new Error("Error: ", error);
    }
    }
}


const manager = new ProductManager("Productos");