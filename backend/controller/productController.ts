import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { Product } from "../models/productModel"
import { ErrorResponse } from "../response/errorResponse"

export const addProduct = asyncHandler(async (req: Request, res: Response) => {

    const { name, quantity, price, description } = req.body
    const imagefile = req.file

    if (!name || !quantity || !imagefile || !price || !description) {
        res.status(400)
        throw new ErrorResponse('Please add all fields')
    }                 

    const product = await Product.create({ name, quantity, price, description, image: req.file?.filename })

    if (product) {
        const response = {
            status: 1,
            data: product,
            message: 'Product created successfully', 
        }
        console.log(product)
        res.status(201).json(response)

    } else {
        throw new ErrorResponse('Invalid product data')
    }
})


export const getProducts = asyncHandler(async (req: Request, res: Response) => {

    const products = await Product.find({}).lean()

    if (!products?.length) {
        throw new ErrorResponse('Sorry !! there are no products for you')
    }

    const response = {
        status: 1,
        data: products,
        message: 'Product created successfully',
    }

    res.status(201).json(response)
})

export const productSearch = asyncHandler(async (req: Request, res: Response) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
        ]
    } : {}

    const product = await Product.find(keyword)

    const response = {
        status: 1,
        data: product,
        message: 'Product created successfully',
    }

    res.status(201).json(response)
})