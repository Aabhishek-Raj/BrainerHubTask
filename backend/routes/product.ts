import express from 'express'
import { addProduct, getProducts, productSearch } from '../controller/productController'
import multer from 'multer'
import { protect } from '../middlewares/auth'

const upload = multer({ dest: 'uploads/' })

const router = express.Router()

router.post('/', protect, upload.single('image'), addProduct)
router.get('/',protect, getProducts)
router.get('/search', protect, productSearch)

export default router