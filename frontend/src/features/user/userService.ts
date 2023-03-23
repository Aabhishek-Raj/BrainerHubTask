import axios from 'axios'
import { LoginType } from '../../pages/Login'
import { RegisterType } from '../../pages/Register'

const API_URL = 'http://localhost:5000/api/users/'

//Register user
const register = async (userData: RegisterType) => {
    const response = await axios.post(API_URL, userData)

    if (response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//Login user
const login = async (userData: LoginType) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const userService = { 
    register, 
    logout,
    login
}

export default userService