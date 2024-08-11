// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import Navbar from '../component/Navbar';
// import Category from '../page/Showprodcuttest';
// import logo from '../image/Ball Pool.jpg';

// function ShowProduct() {
//     const { categoryId } = useParams(); // Extract category ID from URL parameters
//     const [products, setProducts] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         fetchProductsByCategory(categoryId);
//     }, [categoryId]);

//     const fetchProductsByCategory = async (categoryId) => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/products/category/${categoryId}`);
//             setProducts(response.data);
//         } catch (error) {
//             console.error(error);
//             setError('Error fetching products');
//         }
//     };

//     return (
//         <div>
//             <Navbar />
//             <Category />
//             <div className='lg:ml-64'>
//                 {error && <p className="text-danger">{error}</p>}
//                 <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-between p-6'>
//                     {products.map(product => (
//                         <div>
//                             <div class="bg-slate-200 rounded-xl shadow-md p-4 border border-red-400 relative md:w-44 sm:w-36 w-28  duration-300">
//                                 <div class="absolute top-0 right-0 bg-red-500 text-white text-sm px-2 py-1 rounded-tr-xl rounded-bl-xl">
//                                     50%
//                                 </div>
//                                 <img src={logo} alt="Mobile Legends" class="rounded-lg w-full h-24 " />
//                                 <div class="mt-4">
//                                     <h2 class="text-dark text-lg font-semibold">{product.name}</h2>
//                                     <p className='text-xl font-bold text-orange-700'>${product.sale_price}</p>
//                                     <p className='text-sm font-medium'>{product.description}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ShowProduct;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Category from '../page/Showprodcuttest';
import logo from '../image/Ball Pool.jpg';
import freefire from '../image/free_fire.jpg';
import Showcat from '../sale/Showcat';
import TableSale from '../sale/TableSale';

import { useCart } from '../sale/CartContext';



function ShowProduct() {
    const { categoryId } = useParams(); // Extract category ID from URL parameters
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const { addItem } = useCart();


    
    const handleAddToCart = (item) => {
        addItem({ ...item, quantity: 1 });
    };

    useEffect(() => {
        fetchProductsByCategory(categoryId);
    }, [categoryId]);

    const fetchProductsByCategory = async (categoryId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/category/${categoryId}`);
            setProducts(response.data);
        } catch (error) {
            console.error(error);
            setError('Error fetching products');
        }
    };



    return (
        <div className="min-h-screen bg-slate-200">
            <Navbar />
            <Category />
            <div class="flex flex-wrap items-start">
                <div class="w-full md:w-3/4 lg:w-3/4  p-2">
                    <div className="lg:ml-64 mx-auto ">
                        <div>
                            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5  2xl:grid-cols-6 gap-2">
                                {products.map((product) => (
                                    <div>
                                        <div  onClick={() => handleAddToCart(product)} class="bg-slate-200 rounded-xl shadow-md p-4 border border-red-400 relative md:w-44 sm:w-36 w-28  duration-300">
                                            <div class="absolute top-0 right-0 bg-red-500 text-white text-sm px-2 py-1 rounded-tr-xl rounded-bl-xl">
                                                50%
                                            </div>
                                            <img src={logo} alt="Mobile Legends" class="rounded-lg w-full h-24 " />
                                            <div class="mt-4">
                                                <h2 class="text-dark text-lg font-semibold">{product.name}</h2>
                                                <p className='text-xl font-bold text-orange-700'>${product.sale_price}</p>
                                                <p className='text-sm font-medium'>{product.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <TableSale />
                </div>
                <div class="w-full md:w-1/4 lg:w-1/4 h-screen overflow-x-auto bg-slate-500 ">
                    <Showcat />
                </div>
            </div>


        </div>
    );
}

export default ShowProduct;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import Navbar from '../component/Navbar';
// import Category from '../page/Showprodcuttest';
// import logo from '../image/Ball Pool.jpg';
// import freefire from '../image/free_fire.jpg';
// import Showcat from '../sale/Showcat';
// import TableSale from '../sale/TableSale';

// import { useCart } from '../sale/CartContext';

// function ShowProduct() {
//     const { categoryId } = useParams(); // Extract category ID from URL parameters
//     const [products, setProducts] = useState([]);
//     const [error, setError] = useState('');
//     const { addItem } = useCart();

//     const handleAddToCart = (product) => {
//         addItem({ ...product, quantity: 1 });
//     };

//     useEffect(() => {
//         fetchProductsByCategory(categoryId);
//     }, [categoryId]);

//     const fetchProductsByCategory = async (categoryId) => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/products/category/${categoryId}`);
//             setProducts(response.data);
//         } catch (error) {
//             console.error(error);
//             setError('Error fetching products');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-slate-200">
//             <Navbar />
//             <Category />
//             <div className="flex flex-wrap items-start">
//                 <div className="w-full md:w-3/4 lg:w-3/4 p-2">
//                     <div className="lg:ml-64 mx-auto ">
//                         <div>
//                             {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//                             <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
//                                 {products.map((product) => (
//                                     <div key={product.id}>
//                                         <div onClick={() => handleAddToCart(product)} className="bg-slate-200 rounded-xl shadow-md p-4 border border-red-400 relative md:w-44 sm:w-36 w-28 duration-300">
//                                             <div className="absolute top-0 right-0 bg-red-500 text-white text-sm px-2 py-1 rounded-tr-xl rounded-bl-xl">
//                                                 50%
//                                             </div>
//                                             <img src={logo} alt="Mobile Legends" className="rounded-lg w-full h-24" />
//                                             <div className="mt-4">
//                                                 <h2 className="text-dark text-lg font-semibold">{product.name}</h2>
//                                                 <p className="text-xl font-bold text-orange-700">${product.sale_price}</p>
//                                                 <p className="text-sm font-medium">{product.description}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                     <TableSale />
//                 </div>
//                 <div className="w-full md:w-1/4 lg:w-1/4 h-screen overflow-x-auto bg-slate-500 ">
//                     <Showcat />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ShowProduct;
