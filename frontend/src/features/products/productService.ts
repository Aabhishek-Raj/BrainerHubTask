import axios from 'axios'

const API_URL = 'http://localhost:5000/api/products/'

const addProduct = async (productData: FormData, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, productData, config)

    return response.data
}

const getProducts = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

export const productSearch = async (search: string) => {
    const storageData = await JSON.parse(localStorage.getItem('user')!)

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${storageData.token}`
            },
            params: {search}
        }
        const response = await axios.get(API_URL + 'search', config)
        return response.data 
    } catch (error: any) {
        console.log(error.response.message)
    }
}

const productService = {
    addProduct,
    getProducts
}
 
export default productService