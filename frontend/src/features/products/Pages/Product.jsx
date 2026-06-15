import { useState, useEffect } from "react";
import { useProduct } from "../Hooks/useProduct.jsx";

const Product = () => {
    const {
        getAllProducts,
        createProduct,
        updateProduct,
        deleteProduct,
    } = useProduct();

    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        discription: "",
        price: "",
        category: "",
    });

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = {
                ...formData,
                price: Number(formData.price),
            };

            if (editingId) {
                const updatedProduct = await updateProduct(
                    editingId,
                    productData
                );

                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === editingId
                            ? updatedProduct
                            : product
                    )
                );

                setEditingId(null);
            } else {
                const newProduct = await createProduct(productData);

                setProducts((prevProducts) => [
                    ...prevProducts,
                    newProduct,
                ]);
            }

            setFormData({
                title: "",
                discription: "",
                price: "",
                category: "",
            });
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    const handleEdit = (product) => {
        setEditingId(product._id);

        setFormData({
            title: product.title,
            discription: product.discription,
            price: product.price,
            category: product.category,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId);

            setProducts((prevProducts) =>
                prevProducts.filter(
                    (product) => product._id !== productId
                )
            );

            if (editingId === productId) {
                setEditingId(null);

                setFormData({
                    title: "",
                    discription: "",
                    price: "",
                    category: "",
                });
            }
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Form */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold mb-4">
                        {editingId
                            ? "Update Product"
                            : "Add Product"}
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <input
                            type="text"
                            name="title"
                            placeholder="Product Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        />

                        <textarea
                            name="discription"
                            placeholder="Product Description"
                            value={formData.discription}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            rows="4"
                            required
                        />

                        <input
                            type="number"
                            name="price"
                            placeholder="Product Price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        />

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
                            >
                                {editingId
                                    ? "Update Product"
                                    : "Add Product"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(null);

                                        setFormData({
                                            title: "",
                                            discription: "",
                                            price: "",
                                            category: "",
                                        });
                                    }}
                                    className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Product List */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        Products
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products?.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white p-5 rounded-lg shadow-md"
                            >
                                <h3 className="text-xl font-bold">
                                    {product.title}
                                </h3>

                                <p className="text-gray-600 mt-2">
                                    {product.discription}
                                </p>

                                <p className="font-semibold mt-3">
                                    ₹{product.price}
                                </p>

                                <span className="inline-block mt-2 bg-gray-200 px-3 py-1 rounded-full text-sm">
                                    {product.category}
                                </span>

                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() =>
                                            handleEdit(product)
                                        }
                                        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                product._id
                                            )
                                        }
                                        className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;