import { z } from "zod"

const CreateProductValidation = z.object({
    title: z.string().min(3, { message: "Name must be at least 3 characters long" }),
    discription: z.string().min(10, { message: "Description must be at least 10 characters long" }),
    price: z.number().positive({ message: "Price must be a positive number" }),
    category: z.string().min(3, { message: "Category must be at least 3 characters long" })
})

const UpdateProductValidation = z.object({
    title: z.string().min(3, { message: "Name must be at least 3 characters long" }).optional(),
    discription: z.string().min(10, { message: "Description must be at least 10 characters long" }).optional(),
    price: z.number().positive({ message: "Price must be a positive number" }).optional(),
    category: z.string().min(3, { message: "Category must be at least 3 characters long" }).optional()
})





export { CreateProductValidation, UpdateProductValidation };