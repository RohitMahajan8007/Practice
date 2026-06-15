import mongoose,{Schema} from "mongoose";


const ProductSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    discription : {
         type : String,
         required : true
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"

    },

},
{
  timestamps : true
}
)


const ProductModel = new mongoose.model("product",ProductSchema)

export default ProductModel