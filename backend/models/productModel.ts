import mongoose from 'mongoose'

interface ProductDoc extends mongoose.Document {
    name: string
    price: number
    quantity: number
    desription: string
    image: string  
  }

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
  }
)

const Product = mongoose.model<ProductDoc>('Product', productSchema)

export { Product }
