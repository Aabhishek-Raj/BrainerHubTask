import { useState, useEffect, ChangeEvent, MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/user/userSlice'
import { AppDispatch, RootState } from '../redux/store'

export type LoginType = {
    email: string
    password: string
}

const Login = () => {
    
    const [formData, setFormData] = useState<LoginType>({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state: RootState) => state.user)

        useEffect(() => {
            if(isError) {
                toast.error(message)
            }
            if(isSuccess || user) {
                navigate('/')
            }
    
            dispatch(reset())
    
        }, [ user, isError, isSuccess, message, navigate, dispatch])
        

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState, 
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }
        dispatch(login(userData))
    }

    const content =
        <main
            className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
            <section className="flex w-[30rem] flex-col space-y-10">
                <div className="text-center text-4xl font-medium">Log In</div>

                <div
                    className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                    <input
                        type="text"
                        name="email" value={email}
                        onChange={ onChange }
                        placeholder="Email "
                        className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
                </div>

                <div
                    className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                    <input
                        type="password"
                        name="password" value={password}
                        onChange={ onChange }
                        placeholder="Password"
                        className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
                </div>

                <button
                    onClick={ onSubmit }
                    className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">
                    SIGN IN
                </button>

                <p className="text-center text-lg">
                    No account?
                    <a
                        href="#"
                        className="font-medium text-indigo-500 underline-offset-4 hover:underline"
                    >Create One</a>
                </p>
            </section>
        </main >

    return content
}

export default Login