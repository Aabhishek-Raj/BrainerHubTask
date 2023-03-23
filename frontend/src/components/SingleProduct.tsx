import React from 'react'

type propsType = {
    product: ProductDataType
}

const SingleProduct = ({product}: propsType) => {

    const content =
        <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
            <img className="object-cover w-full rounded-md h-72 xl:h-80" src={`http://localhost:5000/file/${product.image}`} alt="T-Shirt" />
            <h4 className="mt-2 text-lg font-medium text-gray-700 dark:text-blue-400">{product.name}</h4>
            <p className="text-white">Price: {product.price}</p>
            <p className="text-white">Stock: {product.quantity}</p>

        </div>
    return content
}

export default SingleProduct