// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../component/Navbar';
// import logo from '../image/Ball Pool.jpg';

// const hideScrollbarStyle = {
//   msOverflowStyle: 'none',  // IE and Edge
//   scrollbarWidth: 'none',  // Firefox
//   overflowX: 'auto',
//   // Hide scrollbar for Chrome, Safari and Opera
//   '&::-webkit-scrollbar': {
//     display: 'none'
//   }
// };

// const Category = () => {
//   const [categories, setCategories] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(null);

//   useEffect(() => {
//     getAllCategories();
//   }, []);

//   const getAllCategories = () => {
//     axios.get('http://localhost:5000/api/categories')
//       .then(res => setCategories(res.data))
//       .catch(err => console.log(err));
//   };

//   const handleClick = (index) => {
//     setActiveIndex(index);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className='my-16 lg:ml-64' style={hideScrollbarStyle}>
//         <div className='flex space-x-4'>
//           {categories.map((cat, index) => (
//             <Link to={`/products/category/${cat.id}`} key={cat.id}>
//               <div 
//                 className={`h-16 w-36 my-2 bg-slate-300 shadow-2xl rounded-lg flex overflow-hidden flex-shrink-0 ${activeIndex === index ? 'bg-pink-500' : 'bg-slate-300'}`} 
//                 onClick={() => handleClick(index)}
//               >
//                 <img src={logo} className='h-16 w-16  rounded-full' alt="" />
//                 <p className='pl-1 text-dark text-bg text-center'>{cat.names}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Category;




// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../component/Navbar';

// const Category = () => {
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         getAllCategories();
//     }, []);

//     const getAllCategories = () => {
//         axios.get('http://localhost:5000/api/categories')
//             .then(res => setCategories(res.data))
//             .catch(err => console.log(err));
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className='my-16 lg:ml-64'>
//                 {categories.map((cat, index) => (
//                     <div className='grid-cols-1 flex'>
//                         <div className='h-16 w-16 bg-gray-600  rounded-lg'>
//                             <p>image</p>
//                             <p>name</p>
//                         </div>
//                     </div>
//                 ))}
//                 <div className='p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700'>
//                     <div className='relative overflow-x-auto'>
//                         <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>


//                             <tbody>
//                                 {categories.map((cat, index) => (
//                                     <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
//                                         <th scope='row' className='px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
//                                             {cat.names}
//                                         </th>
//                                         <td>
//                                             <Link className='block text-white bg-blue-100 hover:bg-blue-500 font-medium rounded-full text-sm px-2 py-2 text-center' to={`/products/category/${cat.id}`}>
//                                                 Show Products
//                                             </Link>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Category;



import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../component/Navbar';
import logo from '../image/Ball Pool.jpg';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories();
    }, []);

    const getAllCategories = () => {
        axios.get('http://localhost:5000/api/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.log(err));
    };

    const handleClick = (index, id) => {
        setActiveIndex(index);
        navigate(`/products/category/${id}`, { replace: true });
        // window.location.reload();
    };

    return (
        <div>
            <Navbar />
            <div className='mt-16 lg:ml-64 overflow-x-auto ' style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                <div className='flex space-x-4 px-2 '>
                    {categories.map((cat, index) => (
                        <div
                            key={cat.id}
                            className={`h-12 w-36 my-2 bg-slate-50 shadow-2xl rounded-lg flex overflow-hidden flex-shrink-0 cursor-pointer ${activeIndex === index ? 'bg-pink-500' : 'bg-slate-300'}`}
                            onClick={() => handleClick(index, cat.id)}
                        >
                            <img src={`http://localhost:5000/image/${cat.image}`} className='h-12 w-12 p-1 rounded-full' />
                            <p className='pl-1 text-red-600 text-bg text-center'>{cat.names}</p>

                        </div>


                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;
