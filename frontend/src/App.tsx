import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Layout from './Layouts/Layout'
import AddProduct from './pages/AddProduct'

function App() {

  const content =
    <div className='w-screen h-screen'> 
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />  
          <Route path='addproduct' element={<AddProduct/> }/>
        </Route>
      </Routes>
    </div>

  return content
}

export default App
