import {Router} from "express"
import {createProduct , getAllProducts , getProductById ,updateProduct , deleteProduct} from "../controller/product.controller.js"
import identifyUser from "../middlewares/auth.middleware.js"
import { CreateProductValidation ,UpdateProductValidation  } from "../validation/product.validation.js"
import validate from "../middlewares/validatiom.middleware.js"

const productRouter = Router();

productRouter.post("/create",identifyUser,validate(CreateProductValidation),createProduct);
productRouter.get("/all",identifyUser,getAllProducts);
productRouter.get("/:id",identifyUser,getProductById);
productRouter.put("/:id",identifyUser,validate(UpdateProductValidation),updateProduct);
productRouter.delete("/:id",identifyUser,deleteProduct);

export default productRouter