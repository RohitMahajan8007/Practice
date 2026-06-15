import axios from "axios";


const ProductApi = axios.create({
    baseURL : "http://localhost:3000/api/product",
    withCredentials : true
})

export async function createProduct(productData){
    const response = await ProductApi.post("/create",productData);
    return response.data;
}

export async function getAllProducts(){
    const response = await ProductApi.get("/all");
    return response.data;
}

export async function getProductById(productId){
    const response = await ProductApi.get(`/${productId}`);    
    return response.data;
}

export async function updateProduct(productId, productData){
    const response = await ProductApi.put(`/${productId}`, productData);
    return response.data;
}


export async function deleteProduct(productId){
    const response = await ProductApi.delete(`/${productId}`);
    return response.data;
}