interface ApiResponse<T> {
    status: 0 | 1;
    data: T;
    message?: string;
  }

interface UserDataType {
    id: string
    name: string
    email: string
    token: string
}

// interface ErrorType {
//     null
// }

interface ProductDataType {
    id: string
    name: string
    price: number
    quantity: number
    description: string
    image: string
}