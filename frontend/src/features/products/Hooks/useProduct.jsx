import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../Services/Product.api.js";
import { setProducts } from "../Product.slice.js";

export function useProduct() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getAllProducts();
        dispatch(setProducts(products));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [dispatch]);

  return {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
  };
}