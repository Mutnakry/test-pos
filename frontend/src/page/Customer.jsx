import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import icondelete from '../image/delete.png';
import iconedit from '../image/edit.png';
import iconadd from '../image/icons8-add.png';

const Customer = () => {
    const [username, setUsername] = useState('');
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);  // Start at page 1
    const [limit, setLimit] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);  // Added loading state
    const [error, setError] = useState(null);       // Added error state

    useEffect(() => {
        fetchCategories();
    }, [page, limit, searchQuery]);

    const fetchCategories = async () => {
        setLoading(true);  // Set loading state to true
        try {
            const response = await axios.get('http://localhost:5000/api/categories/paginate', {
                params: {
                    page,
                    limit,
                    search_query: searchQuery
                }
            });
            setCategories(response.data.categories);
            setTotalPages(response.data.totalPages);
            setError(null);  // Reset error state if request is successful
        } catch (error) {
            setError('Error fetching categories data');  // Set error state if request fails
        } finally {
            setLoading(false);  // Set loading state to false
        }
    };


    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const deletetblproduct = async (id) => {
        if (window.confirm("Do you want to delete product")) {
            const respone = await axios.delete(`http://localhost:5000/api/categories/${id}`)
            if (respone.status === 200) {
                fetchCategories();
            }
        }
    }

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setPage(1); // Reset to the first page on search
    };

    return (
        <div>
            <Navbar />
            <div className='my-16 lg:ml-64'>
                <div className='p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700'>
                    <div className='flex justify-between py-2 mr-2 md:mr-14'>
                        <Link className='block text-white bg-green-300 text-xl hover:bg-green-500 rounded-lg px-5 py-2.5 text-center' to='/addcategory'><img src={iconadd} className='h-4' alt='Edit' /></Link>
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={handleSearch}
                            className='block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Search for names and detail'
                        />
                    </div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <div className='relative overflow-x-auto'>
                            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                                <thead className='text-md text-gray-700  font-bold bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                    <tr>
                                        <th scope='col' className='px-6 py-3'>ល.រ</th>
                                        <th scope='col' className='px-6 py-3'>ឈ្មោះ</th>
                                        <th scope='col' className='px-6 py-3'>លម្អិត</th>
                                        <th scope='col' className='px-6 py-3'>រូបភាព</th>
                                        <th scope='col' className='px-6 py-3'>សកម្មភាព</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category, index) => (
                                        <tr key={category.id} className='bg-white border-b hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700'>
                                            <td className='px-6 py-2'>{(page - 1) * limit + index + 1}</td>
                                            <th scope='row' className='px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                                {category.names}
                                            </th>
                                            <td className='px-6'>{category.detail}</td>

                                            <td>
                                                <img src={`http://localhost:5000/image/${category.image}`} className='h-10 w-10 rounded-full' />
                                            </td>
                                            <td className='flex items-center px-6 py-1 space-x-3 '>
                                                <Link className='block text-white bg-blue-100 hover:bg-blue-500 font-medium rounded-full text-sm px-2 py-2 text-center' to={`/updatecategory/${category.id}`}> <img src={iconedit} className='h-4' alt='Edit' /></Link>

                                                <button className='block text-white bg-red-100 hover:bg-red-500 font-medium rounded-full text-sm px-2 py-2 text-center' onClick={() => deletetblproduct(category.id)}><img src={icondelete} className='h-4' alt='delete' /></button>

                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <nav className='flex items-center flex-column flex-wrap md:flex-row justify-end py-4 px-8' aria-label="Page navigation example">
                                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                                    <li className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg">
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(page - 1)}
                                            disabled={page === 1}
                                        >
                                            Previous
                                        </button>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li className="flex items-center justify-center  text-blue-600 border border-gray-300 bg-blue-50"
                                            key={index + 1}>
                                            <button
                                                className={`px-3 h-full  ${page === index + 1 ? 'bg-gray-500  text-white' : ''}`}
                                                onClick={() => handlePageChange(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg ">
                                        <button
                                            className=""
                                            onClick={() => handlePageChange(page + 1)}
                                            disabled={page === totalPages}
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Customer;
