import { useState, useEffect, MouseEvent, ChangeEvent } from 'react'
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addProduct } from '../features/products/productSlice'
import { AppDispatch } from '../redux/store'

interface FormDataValues {
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
  }

const AddProduct = () => {

    const [formData, setFormData] = useState<FormData | undefined>();
    const [formValues, setFormValues] = useState<FormDataValues>({
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      image: '',
    });

    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
  
    const saveDetails = async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      dispatch(addProduct(formData!))
      navigate('/')
    };
  
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };
  
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, files } = event.target;
      if (files && files.length > 0) {
        setFormValues({
          ...formValues,
          [name]: files[0],
        });
      }
    };
  
    useEffect(() => {
      const newFormData = new FormData();
      newFormData.append('name', formValues.name);
      newFormData.append('description', formValues.description);
      newFormData.append('price', formValues.price.toString());
      newFormData.append('quantity', formValues.quantity.toString());
      newFormData.append('image', formValues.image);
      setFormData(newFormData);
    }, [formValues]);


    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col item-center justify-center gap-4'>

                <div className='w-full py-2 border-b border-green-300 flex items-center gap-2 '>
                    <MdFastfood className='text-xl text-gray-700' />
                    <input type="text" required name='name' value={formValues.name} onChange={handleInputChange} 
                        placeholder=' Product Name' className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-gray-600' />
                </div>
                <div className='w-full'>

                </div>

                <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-96 md:h-96 cursor-pointer rounded-lg'>
                    <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                        <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
                            <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700' />
                            <p className='text-gray-500 hover:text-gray-700'>Click here to Upload</p>

                        </div>
                        <input type="file" name="image" accept='image/*' onChange={handleFileChange} className='w-0 h-0' />
                    </label>
                </div>

                <div className='w-full flex flex-col md:flex-row items-center gap-3 '>
                    <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2 '>
                        <MdAttachMoney className='text-gray-700 text-2xl' />
                        <input type="number" required name="price" value={formValues.price} onChange={handleInputChange}placeholder='Price' className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-gray-600 ' />
                    </div>

                    <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2 '>
                        <MdFoodBank className='text-gray-700 text-2xl' />
                        <input type="number" required value={formValues.quantity} onChange={handleInputChange}placeholder='Quantity' className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-gray-600 ' />

                    </div>
            
                </div>
                <div className='w-full py-2 border-b border-green-300 flex items-center gap-2 '>
                    <MdFastfood className='text-xl text-gray-700' />
                    <input type="text" required name='description' value={formValues.description} onChange={handleInputChange}
                        placeholder='Add a description' className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-gray-600' />
                </div>

                <div className='flex items-center w-full'>
                    <button type='button' className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-blue-600 px-12 py-2 rounded-lg text-lg text-white font-semibold' onClick={saveDetails}>Create</button>
                </div>

            </div>
        </div>
    )
}

export default AddProduct
  