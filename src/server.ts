import express, { Express } from "express";
import productRoutes from "./api/routes/productRoutes";

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(express.json());

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
