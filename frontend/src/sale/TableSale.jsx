import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import Showcat from './Showcat';
import logo from '../image/Ball Pool.jpg';

function TableSale() {
    const { addItem } = useCart();
    const [products, setProduct] = useState([]);
    const [error, setError] = useState('');
    const { categoryId } = useParams(); // Extract category ID from URL parameters

    const getAllCat = async () => {
        const res = await axios.get('http://localhost:5000/api/getAllproduct');
        setProduct(res.data);
    };
    useEffect(() => {
        getAllCat();
    }, []);

    // useEffect(() => {
    //     fetchProductsByCategory(categoryId);
    // }, [categoryId]);

    // const fetchProductsByCategory = async (categoryId) => {
    //     try {
    //         const response = await axios.get(`http://localhost:5000/api/products/category/${categoryId}`);
    //         setProduct(response.data);
    //     } catch (error) {
    //         console.error(error);
    //         setError('Error fetching products');
    //     }
    // };


    const handleAddToCart = (item) => {
        addItem({ ...item, quantity: 1 });
    };

    return (
        <div className='container'>
        
            <div className='row mt-4'>
                <div className='bg-info col-12'>
                    {/* <Showcat /> */}
                </div>
                <div className="lg:ml-64 mx-auto ">
                        <div>
                        
                            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5  2xl:grid-cols-6 gap-2">
                                {products.map(product => {
                                      const displayStyle = product.discount > 0 ? 'block' : 'none';
                                    return(
                                        <div key={product.id}  onClick={() => handleAddToCart(product)}  className="bg-white rounded-lg shadow-md border border-red-300 p-4 relative">
                                        <div className="absolute top-0 right-0 bg-red-500 text-white text-sm px-2 py-1 rounded-tr-lg rounded-bl-lg" style={{ display: displayStyle }}>
                                        {product.discount}%
                                        </div>
                                        <img src={logo} alt={product.name} className="rounded-lg w-full h-36 object-cover mb-4" />
                                        <div>
                                            <h2 className="text-lg font-semibold ">{product.name}</h2>
                                            <p className="text-xl font-bold text-orange-700 ">${product.sale_price} <span className='text-sm text-gray-800 line-through '>$5.09</span></p>
                                            <p className="card-text">QTY: {product.qty}</p>
                                            <p className="text-sm text-gray-600n truncate-multiline">{product.description}</p>
                                        </div>
                                    </div>
                                    )
                                   
                                })}
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default TableSale;
