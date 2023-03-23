import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/user/userSlice'
import { AppDispatch, RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'

const Header = () => {

    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.user)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    const content =
        <header>
            <div className='bg-indigo-900 text-white sticky top-0 z-10'>

                <div className='max-w-4xl mx-auto p-4 flex justify-between items-center'>
                    <h1 className='text-3xl font-medium"'>shop.co</h1>
                <button onClick={onLogout} className='ml-auto text-1xl bg-blue-600'>
                    Logout
                </button>
                </div>
            </div>
            <button className="text-3xl sm:hidden focus:outline-none">
                &#9776;
            </button>
        </header>

    return content
}

export default Header