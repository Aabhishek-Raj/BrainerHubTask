import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../features/user/userSlice'
import { AppDispatch, RootState } from '../redux/store'
import { useEffect, useState } from 'react'
import { getProducts } from '../features/products/productSlice'
import SingleProduct from '../components/SingleProduct'
import { toast } from 'react-toastify'
import { productSearch } from '../features/products/productService'

const Home = () => {

    const { user } = useSelector((state: RootState) => state.user)
    const { products, isLoading, isError, message } = useSelector((state: RootState) => state.product)

    const [search, setSearch] = useState<string>()
    const [searchResult, setSearchResult] = useState([])

    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {

        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate('/login')
        }
        dispatch(getProducts())

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    const handleSearch = async () => {
        if (!search) {
            return toast.error("Please Enter something to search", { position: 'top-left' })
        }
        const result = await productSearch(search)
        console.log(result.data)

        setSearchResult(result.data)
    }


    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-8 mx-auto">
                <div className="lg:flex lg:-mx-2">

                    <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">
                        <div className="flex items-center justify-between text-sm tracking-widest uppercase ">
                            <Link to={'/addproduct'}>
                                <button className='bg-blue-800'>add Item</button>
                            </Link>

                            <div className="relative flex items-center w-36 pl-2 overflow-hidden text-gray-600 focus-within:text-gray-400">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                                    <button onClick={handleSearch} type="submit" className="p-1 focus:outline-none focus:shadow-none">
                                        <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path fillRule="nonzero" d="M9.5,3 C13.0898509,3 16,5.91014913 16,9.5 C16,10.9337106 15.5358211,12.2590065 14.7495478,13.3338028 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3466228,20.0675907 18.7793918,20.0953203 18.3871006,19.7902954 L18.2928932,19.7071068 L13.3338028,14.7495478 C12.2590065,15.5358211 10.9337106,16 9.5,16 C5.91014913,16 3,13.0898509 3,9.5 C3,5.91014913 5.91014913,3 9.5,3 Z M9.5,5 C7.01471863,5 5,7.01471863 5,9.5 C5,11.9852814 7.01471863,14 9.5,14 C11.9852814,14 14,11.9852814 14,9.5 C14,7.01471863 11.9852814,5 9.5,5 Z" />
                                        </svg>
                                    </button>
                                </span>
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="search"
                                    name="q"
                                    className="w-full py-2 pl-12 text-sm text-white bg-gray-200 border border-transparent appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                                    placeholder="Search..."
                                    autoComplete="off"
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                            {
                                searchResult && searchResult.map((product, i) => (
                                    <SingleProduct key={i} product={product} />
                                ))
                            }

                            {products.map(product => (
                                <SingleProduct key={product.id} product={product} />
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>



    )
}

export default Home