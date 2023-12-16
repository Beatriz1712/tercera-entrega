import mongoose from "mongoose"

const cartsCollection = "carts"

const cartsSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,  
        ref:`users`},
    
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId, 
                ref:`products`},
            quantity: Number,
        }
    ]
})

export const cartsModel  = mongoose.model(cartsCollection, cartsSchema)

