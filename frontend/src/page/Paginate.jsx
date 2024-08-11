// import React, { useEffect, useState } from 'react';
// import Navbar from '../component/Navbar';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Pagination from './pagination/Pagination'; // Import the Pagination component
// import iconadd from '../image/icons8-add.png';

// const Paginate = () => {
//     const [categories, setCategories] = useState([]);
//     const [page, setPage] = useState(1);  // Start at page 1
//     const [limit, setLimit] = useState(1);
//     const [totalPages, setTotalPages] = useState(0);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [loading, setLoading] = useState(false);  // Added loading state
//     const [error, setError] = useState(null);       // Added error state

//     useEffect(() => {
//         fetchCategories();
//     }, [page, limit, searchQuery]);

//     const fetchCategories = async () => {
//         setLoading(true);  // Set loading state to true
//         try {
//             const response = await axios.get('http://localhost:5000/api/getpaginate', {
//                 params: {
//                     page,
//                     limit,
//                     search_query: searchQuery
//                 }
//             });
//             setCategories(response.data.categories);
//             setTotalPages(response.data.totalPages);
//             setError(null);  // Reset error state if request is successful
//         } catch (error) {
//             setError('Error fetching categories data');  // Set error state if request fails
//         } finally {
//             setLoading(false);  // Set loading state to false
//         }
//     };

//     const handlePageChange = (newPage) => {
//         if (newPage > 0 && newPage <= totalPages) {
//             setPage(newPage);
//         }
//     };

//     const handleSearch = (event) => {
//         setSearchQuery(event.target.value);
//         setPage(1); // Reset to the first page on search
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className='my-16 lg:ml-64'>
//                 <div className='p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700'>
//                     <div className='flex justify-between py-2 mr-2 md:mr-14'>
//                         <Link className='block text-white bg-green-300 text-xl hover:bg-green-500 rounded-lg px-5 py-2.5 text-center'>
//                             <img src={iconadd} className='h-4' alt='Add' />
//                         </Link>
//                         <input
//                             type='text'
//                             value={searchQuery}
//                             onChange={handleSearch}
//                             className='block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
//                             placeholder='Search for names and detail'
//                         />
//                     </div>
//                     <div className='relative overflow-x-auto'>
//                         <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
//                             <thead className='text-md text-gray-700 font-bold bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
//                                 <tr>
//                                     <th scope='col' className='px-6 py-3'>ល.រ</th>
//                                     <th scope='col' className='px-6 py-3'>ឈ្មោះ</th>
//                                     <th scope='col' className='px-6 py-3'>លម្អិត</th>
//                                     <th scope='col' className='px-6 py-3'>រូបភាព</th>
//                                     <th scope='col' className='px-6 py-3'>សកម្មភាព</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {categories.map((category, index) => (
//                                     <tr key={category.id} className='bg-white border-b hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700'>
//                                         <td className='px-6 py-2'>{(page - 1) * limit + index + 1}</td>
//                                         <th scope='row' className='px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
//                                             {category.name}
//                                         </th>
//                                         <td className='px-6'>{category.profit}</td>
//                                         <td className='px-6'>{category.sale_price}</td>
//                                         <td className='px-6'>{category.original_price}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <Pagination
//                             currentPage={page}
//                             totalPages={totalPages}
//                             onPageChange={handlePageChange}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Paginate;


import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from './pagination/Pagination'; // Import the Pagination component
import iconadd from '../image/icons8-add.png';

const Paginate = () => {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);  // Start at page 1
    const [limit, setLimit] = useState(20); // Default limit is 5 items per page
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
            const response = await axios.get('http://localhost:5000/api/getpaginate', {
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
                        <Link className='block text-white bg-green-300 text-xl hover:bg-green-500 rounded-lg px-5 py-2.5 text-center'>
                            <img src={iconadd} className='h-4' alt='Add' />
                        </Link>
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={handleSearch}
                            className='block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Search for names and detail'
                        />
                    </div>
                    <div className='relative overflow-x-auto'>
                        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                            <thead className='text-md text-gray-700 font-bold bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
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
                                            {category.name}
                                        </th>
                                        <td className='px-6'>{category.profit}</td>
                                        <td className='px-6'>{category.sale_price}</td>
                                        <td className='px-6'>{category.original_price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            limit={limit}
                            setLimit={setLimit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Paginate;
