import { Request, Response } from "express";
import { products } from "../../database/inMemoryDB";
import { Product } from "../../models/productModel";

// GET all products
export const getAllProducts = (req: Request, res: Response) => {
  const { name, category, minPrice, maxPrice } = req.query;

  let results = products;

  if (name) {
    results = results.filter((product) =>
      product.name.toLowerCase().includes((name as string).toLocaleLowerCase())
    );
  }

  if (category) {
    results = results.filter(
      (product) =>
        product.category.toLowerCase() ===
        (category as string).toLocaleLowerCase()
    );
  }

  if (minPrice) {
    results = results.filter(
      (product) => product.price >= parseFloat(minPrice as string)
    );
  }

  if (maxPrice) {
    results = results.filter(
      (product) => product.price <= parseFloat(maxPrice as string)
    );
  }

  if (results.length === 0) {
    return res
      .status(404)
      .json({ message: "No products found matching the criteria." });
  }
  res.status(200).json(results);
};

// GET a single product by ID
export const getProductById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  } else {
    res.status(200).json(product);
  }
};

// POST a new product
export const createProduct = (req: Request, res: Response) => {
  const newProduct: Product = req.body;
  if (
    !newProduct.name ||
    !newProduct.category ||
    !newProduct.price ||
    !newProduct.quantity
  )
    return res.status(400).json({ message: "All fields are required" });

  const existingProduct = products.find(
    (product) => product.name === newProduct.name
  );
  if (existingProduct)
    return res.status(400).json({ message: "Product already exists" });

  const newId =
    products.length > 0
      ? Math.max(...products.map((product) => product.id)) + 1
      : 1;
  newProduct.id = newId;

  products.push(newProduct);
  res.status(201).json(newProduct);
};

// PUT Update an existing product
export const updateProduct = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updatedProduct: Product = req.body;
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    res.status(404).json({ message: "Product not found" });
  } else {
    products[index] = { ...products[index], ...updatedProduct };
    res.status(200).json(products[index]);
  }
};

// DELETE product
export const deleteProduct = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    res.status(404).json({ message: "Product not found" });
  } else {
    products.splice(index, 1);
    res.status(204).send();
  }
};
