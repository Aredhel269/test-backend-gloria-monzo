"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const inMemoryDB_1 = require("../../database/inMemoryDB");
// GET all products
const getAllProducts = (req, res) => {
    const { name, category, minPrice, maxPrice } = req.query;
    let results = inMemoryDB_1.products;
    if (name) {
        results = results.filter((product) => product.name.toLowerCase().includes(name.toLocaleLowerCase()));
    }
    if (category) {
        results = results.filter((product) => product.category.toLowerCase() ===
            category.toLocaleLowerCase());
    }
    if (minPrice) {
        results = results.filter((product) => product.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
        results = results.filter((product) => product.price <= parseFloat(maxPrice));
    }
    if (results.length === 0) {
        return res
            .status(404)
            .json({ message: "No products found matching the criteria." });
    }
    res.status(200).json(results);
};
exports.getAllProducts = getAllProducts;
// GET a single product by ID
const getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    const product = inMemoryDB_1.products.find((p) => p.id === id);
    if (!product) {
        res.status(404).json({ message: "Product not found" });
    }
    else {
        res.status(200).json(product);
    }
};
exports.getProductById = getProductById;
// POST a new product
const createProduct = (req, res) => {
    const newProduct = req.body;
    if (!newProduct.name ||
        !newProduct.category ||
        !newProduct.price ||
        !newProduct.quantity)
        return res.status(400).json({ message: "All fields are required" });
    const existingProduct = inMemoryDB_1.products.find((product) => product.name === newProduct.name);
    if (existingProduct)
        return res.status(400).json({ message: "Product already exists" });
    const newId = inMemoryDB_1.products.length > 0
        ? Math.max(...inMemoryDB_1.products.map((product) => product.id)) + 1
        : 1;
    newProduct.id = newId;
    inMemoryDB_1.products.push(newProduct);
    res.status(201).json(newProduct);
};
exports.createProduct = createProduct;
// PUT Update an existing product
const updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedProduct = req.body;
    const index = inMemoryDB_1.products.findIndex((p) => p.id === id);
    if (index === -1) {
        res.status(404).json({ message: "Product not found" });
    }
    else {
        inMemoryDB_1.products[index] = Object.assign(Object.assign({}, inMemoryDB_1.products[index]), updatedProduct);
        res.status(200).json(inMemoryDB_1.products[index]);
    }
};
exports.updateProduct = updateProduct;
// DELETE product
const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const index = inMemoryDB_1.products.findIndex((p) => p.id === id);
    if (index === -1) {
        res.status(404).json({ message: "Product not found" });
    }
    else {
        inMemoryDB_1.products.splice(index, 1);
        res.status(204).send();
    }
};
exports.deleteProduct = deleteProduct;
