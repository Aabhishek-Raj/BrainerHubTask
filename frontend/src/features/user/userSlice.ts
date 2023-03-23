import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { LoginType } from '../../pages/Login'
import { RegisterType } from '../../pages/Register'
import userService from './userService'

//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user')!)

interface UserState {
    user: UserDataType | null
    isError: boolean
    isSuccess: boolean
    isLoading: boolean
    message: string

}

const initialState: UserState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Register user
export const register = createAsyncThunk('user/register', async (user: RegisterType, thunkAPI): Promise<ApiResponse<UserDataType>> => {
    try {
        return await userService.register(user)
    } catch (error: any) {
        console.log(error.response.data)
        return error.response.data
    }
})

//Login user
export const login = createAsyncThunk('user/login', async (user: LoginType, thunkAPI) => {
    try {
        return await userService.login(user)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.reponse.data.message)
            || error.message || error.toSting()
        return thunkAPI.rejectWithValue(message)
    }
})

//Logout for user
export const logout = createAsyncThunk('user/logout', 
async() => {
    await userService.logout()
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
        }
    },
    extraReducers: ( builder ) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<ApiResponse<UserDataType>>) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload.data
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                // state.message = action.payload.message
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                // state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null

            })
     }
})

export const { reset } = userSlice.actions
export default userSlice.reducer