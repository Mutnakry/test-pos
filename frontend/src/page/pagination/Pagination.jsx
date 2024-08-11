


// import React from 'react';

// const Pagination = ({ currentPage, totalPages, onPageChange, limit, setLimit }) => {
//     const getPages = () => {
//         const pages = [];
//         const startPage = Math.max(2, currentPage - 2);
//         const endPage = Math.min(totalPages - 1, currentPage + 2);

//         if (currentPage > 3) {
//             pages.push(1);
//         }

//         if (currentPage > 4) {
//             pages.push('...');
//         }

//         for (let i = startPage; i <= endPage; i++) {
//             pages.push(i);
//         }

//         if (currentPage < totalPages - 3) {
//             pages.push('...');
//         }

//         if (currentPage < totalPages - 2) {
//             pages.push(totalPages);
//         }

//         return pages;
//     };

//     return (
//         <nav className='flex items-center justify-center py-4'>

//             <ul className="inline-flex -space-x-px text-sm">
//                 <li>
//                     <button
//                         onClick={() => onPageChange(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         className="px-3 py-1 border border-gray-300 rounded-l-lg"
//                     >
//                         &laquo;
//                     </button>
//                 </li>
//                 <li>
//                     <button
//                         onClick={() => onPageChange(currentPage === currentPage)}

//                         className="px-3 py-1 border border-gray-300"
//                     >
//                         &lt;
//                     </button>
//                 </li>
//                 {getPages().map((page, index) => (
//                     <li key={index}>
//                         {page === '...' ? (
//                             <li className="px-3 py-1 border border-gray-300">...</li>
//                         ) : (
//                             <button
//                                 onClick={() => onPageChange(page)}
//                                 className={`px-3 py-1 border border-gray-300 ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
//                             >
//                                 {page}
//                             </button>
//                         )}
//                     </li>
//                 ))}
//                 <li>
//                     {/* move last page */}
//                     <button
//                         onClick={() => onPageChange(currentPage === currentPage)}
//                         disabled={currentPage === totalPages}
//                         className="px-3 py-1 border border-gray-300 "
//                     >
//                         &gt;
//                     </button>
//                     {/* move on page */}
//                     <button
//                         onClick={() => onPageChange(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                         className="px-3 py-1 border border-gray-300 rounded-r-lg"
//                     >
//                         &raquo;
//                     </button>
//                 </li>
//             </ul>
//             <select
//                 value={limit}
//                 onChange={(e) => setLimit(Number(e.target.value))}
//                 className="border border-gray-300 rounded-lg p-1 ml-4"
//             >
//                 {[5, 10, 20, 50, 100].map(value => (
//                     <option key={value} value={value}>{value}</option>
//                 ))}
//             </select>
//         </nav>
//     );
// };

// export default Pagination;





import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, limit, setLimit }) => {
    const getPages = () => {
        const pages = [];
        const startPage = Math.max(2, currentPage - 2);
        const endPage = Math.min(totalPages - 1, currentPage + 2);

        if (currentPage > 3) {
            pages.push(1);
        }

        if (currentPage > 4) {
            pages.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 3) {
            pages.push('...');
        }

        if (currentPage < totalPages - 2) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <nav className='flex items-center justify-end py-4'>
            <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="border border-gray-300 rounded-lg p-1 ml-4 mr-6"
            >
                {[5, 10, 20, 50, 100].map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
            <ul className="inline-flex -space-x-px text-sm">
                <li>
                    <button
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-gray-300 rounded-l-lg"
                    >
                        &laquo;
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-gray-300"
                    >
                        &lt;
                    </button>
                </li>
                {getPages().map((page, index) => (
                    <li key={index}>
                        {page === '...' ? (
                            <li className="px-3 py-1 border border-gray-300">...</li>
                        ) : (
                            <button
                                onClick={() => onPageChange(page)}
                                className={`px-3 py-1 border border-gray-300 ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
                            >
                                {page}
                            </button>
                        )}
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border border-gray-300"
                    >
                        &gt;
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border border-gray-300 rounded-r-lg"
                    >
                        &raquo;
                    </button>
                </li>
            </ul>

        </nav>
    );
};

export default Pagination;


