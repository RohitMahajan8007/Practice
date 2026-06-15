import ProductModel from "../models/product.model.js";



export async function createProduct(req, res) {

    const { title, discription, price, category } = req.body;

    const userId = req.user.id;

    const newProduct = new ProductModel({
        title,
        discription,
        price,
        category
    })
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
}

export async function getAllProducts(req, res) {
    const products = await ProductModel.find().populate("user", "username email");
    res.status(200).json(products);
}


export async function getProductById(req, res) {
    const productId = req.params.id;

    const product = await ProductModel.findById(productId).populate("user", "username email");

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }       
    
    res.status(200).json(product);
}


export async function updateProduct(req, res) {
    const productId = req.params.id;
    const { title, discription, price, category } = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        { title, discription, price, category },
          { returnDocument: "after" }
    );

    if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
}


export async function deleteProduct(req, res) {
    const productId = req.params.id;

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
        message: "Product deleted successfully",
        deletedProduct

    });
}