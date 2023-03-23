import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import productService from './productService'

interface ProductState {
    products: ProductDataType[] | []
    isError: boolean
    isSuccess: boolean
    isLoading: boolean
    message: string

}

interface PayloadState {

}

const initialState: ProductState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


//Create new product
export const addProduct = createAsyncThunk('products/create',
    async (productData: FormData, thunkAPI: any) => {
        try {
            const token = thunkAPI.getState().user.user.token
            return await productService.addProduct(productData,
                token)

        } catch (error: any) {
            console.log(error.response)
            const message = (error.response && error.response.data && error.reponse.data.message)
                || error.message || error.toSting()
            return thunkAPI.rejectWithValue(message)
        }
    })

export const getProducts = createAsyncThunk('products/getAll',
    async (_, thunkAPI: any) => {
        try {
            const token = thunkAPI.getState().user.user.token
            return await productService.getProducts(token)

        } catch (error: any) {
            const message = (error.response && error.response.data && error.reponse.data.message)
                || error.message || error.toSting()
            return thunkAPI.rejectWithValue(message)
        }
    })

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // state.products.push(action.payload.data)
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                // state.message = action.payload
            })
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload.data
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                // state.message = action.payload
            })
            // .addCase(deleteproduct.pending, (state) => {
            //     state.isLoading = true
            // })
            // .addCase(deleteproduct.fulfilled, (state, action) => {
            //     state.isLoading = false
            //     state.isSuccess = true
            //     state.products = state.products.filter(
            //         (product) => product._id !== action.payload.id)
            // })
            // .addCase(deleteproduct.rejected, (state, action) => {
            //     state.isLoading = false
            //     state.isError = true
            //     state.message = action.payload
            // })
    }
})

export const { reset } = productSlice.actions
export default productSlice.reducer      
