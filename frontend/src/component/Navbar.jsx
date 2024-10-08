// src/component/Navbar.js
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const [usertype, setUsertype] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Retrieve user type and username from local storage
        const userType = localStorage.getItem('usertype');
        const storedUsername = localStorage.getItem('username');
        setUsertype(userType);
        setUsername(storedUsername);
    }, []);

    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-gray-700 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="py-3 px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-white rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a href="#" className="flex ms-2 md:me-24">
                                <img src="https://cdn.vectorstock.com/i/1000v/07/94/modern-coffee-shop-logo-design-vector-37280794.jpg" className="h-8 me-3" alt="FlowBite Logo" />
                                <span className="self-center text-xl text-white font-bold sm:text-2xl whitespace-nowrap dark:text-white">POS Coffee</span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div>
                                    <button type="button" className="flex text-sm bg-gray-800 shadow-lg border-2 border-rose-600 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="w-8 h-8 rounded-full shadow-md" src="https://cdn.vectorstock.com/i/2000v/07/94/modern-coffee-shop-logo-design-vector-37280794.avif" alt="user photo" />
                                    </button>
                                </div>
                                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900 font-bold" role="none">
                                            {/* PHP logic or similar to display username */}{username}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-gray-700 border-r border-gray-200 lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-700 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {usertype !== 'user' && <li>
                            <NavLink
                                to="/showproduct"
                                className={({ isActive }) =>
                                    `flex items-center p-2 ${isActive ? 'bg-blue-700 text-gray-900' : 'text-gray-900'} rounded-lg dark:text-white  hover:bg-blue-500 dark:hover:bg-gray-700 group`
                                }
                            >
                                <svg className="w-5 h-5 transition  text-white duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3  text-white hover:text-gray-700">Dashboard</span>
                            </NavLink>
                        </li>}
                        {usertype !== 'admin' && <li>
                            <NavLink
                                to="/category"
                                className={({ isActive }) =>
                                    `flex items-center p-2 ${isActive ? 'bg-blue-700 text-gray-900' : 'text-gray-900'} rounded-lg dark:text-white  hover:bg-blue-500 dark:hover:bg-gray-700 group`
                                }
                            >
                                <svg className="flex-shrink-0 w-5 text-white h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286C10 17.169 10.831 18 11.857 18h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                </svg>
                                <span className="ms-3 text-white hover:text-gray-700">Company</span>
                            </NavLink>
                        </li>}
                       <li>
                            <NavLink
                                to="/showproduct"
                                className={({ isActive }) =>
                                    `flex items-center p-2 ${isActive ? 'bg-blue-700 text-gray-900' : 'text-gray-900'} rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-gray-700 group`
                                }
                            >
                                <svg className="flex-shrink-0 text-white w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M15 8h-3V6c0-1.657-1.343-3-3-3S6 4.343 6 6v2H3c-.553 0-1 .447-1 1v10c0 .553.447 1 1 1h12c.553 0 1-.447 1-1V9c0-.553-.447-1-1-1ZM8 6c0-.552.447-1 1-1s1 .448 1 1v2H8V6Z" />
                                </svg>
                                <span className="ms-3 text-white hover:text-gray-700">Products</span>
                            </NavLink>
                        </li>
                        <li>
                                    <NavLink
                                        to="/tablesale"
                                        className={({ isActive }) =>
                                            `flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 ${isActive ? 'bg-blue-700 text-gray-900' : 'text-gray-900'} hover:bg-blue-500 dark:text-white dark:hover:bg-gray-700`
                                        }
                                    >
                                        <span className="ms-3 text-white hover:text-gray-700">Sale Product</span>
                                    </NavLink>
                                </li>
                       <li>
                            <NavLink
                                to="/showproducttest"
                                className={({ isActive }) =>
                                    `flex items-center p-2 ${isActive ? 'bg-blue-700 text-gray-900' : 'text-gray-900'} rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-gray-700 group`
                                }
                            >
                                <svg className="flex-shrink-0 text-white w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M14 3H3.333L3.048.835A1.25 1.25 0 0 0 1.81 0H1.25a.75.75 0 1 0 0 1.5h.56l.158 1.25 1.667 12.5A1.75 1.75 0 0 0 5.417 17h7.166a1.75 1.75 0 0 0 1.742-1.75c0-.13-.012-.258-.036-.385l-1.64-8.2a.5.5 0 0 0-.491-.415H6.487l-.16-1.2H14a.75.75 0 1 0 0-1.5Z" />
                                    <circle cx="6.5" cy="16" r="1.5" />
                                    <circle cx="13.5" cy="16" r="1.5" />
                                </svg>
                                <span className="ms-3 text-white hover:text-gray-700">Orders</span>
                            </NavLink>
                        </li>
                         <li>
                            <NavLink
                                to="/2"
                                className={({ isActive }) =>
                                    `flex items-center p-2 ${isActive ? 'bg-blue-700 text-gray-900' : 'text-gray-900'} rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-gray-700 group`
                                }
                            >
                                <svg className="flex-shrink-0 text-white w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M15 8h-3V6c0-1.657-1.343-3-3-3S6 4.343 6 6v2H3c-.553 0-1 .447-1 1v10c0 .553.447 1 1 1h12c.553 0 1-.447 1-1V9c0-.553-.447-1-1-1ZM8 6c0-.552.447-1 1-1s1 .448 1 1v2H8V6Z" />
                                </svg>
                                <span className="ms-3 text-white hover:text-gray-700">Sales</span>
                            </NavLink>
                        </li>
                        <li>
                            <button

                                type="button"
                                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-blue-500 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-example"
                                onClick={toggleDropdown}
                            >
                                <svg className="flex-shrink-0 text-white w-5 h-5  transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                </svg>
                                <span className="flex-1 text-white ms-3 text-left rtl:text-right hover:text-gray-700 whitespace-nowrap">E-commerce</span>
                                <svg className="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-example" className={`py-2 space-y-2 ${isDropdownOpen ? 'block' : 'hidden'}`}>
                                <li>
                                    <NavLink
                                        to="/product"
                                        className={({ isActive }) =>
                                            `flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 ${isActive ? 'bg-blue-700 text-gray-900' : 'text-gray-900'} hover:bg-blue-500 dark:text-white dark:hover:bg-gray-700`
                                        }
                                    >
                                        <span className="ms-3 text-white hover:text-gray-700">Product</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/category"
                                        className={({ isActive }) =>
                                            `flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 ${isActive ? 'bg-blue-700 text-gray-900' : 'text-gray-900'} hover:bg-blue-500 dark:text-white dark:hover:bg-gray-700`
                                        }
                                    >
                                        <span className="ms-3 text-white hover:text-gray-700">Sales</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/customer"
                                        className={({ isActive }) =>
                                            `flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 ${isActive ? 'bg-blue-700 text-gray-900' : 'text-gray-900'} hover:bg-blue-500 dark:text-white dark:hover:bg-gray-700`
                                        }
                                    >
                                        <span className="ms-3 text-white hover:text-gray-700">Customer</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/paginate"
                                        className={({ isActive }) =>
                                            `flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 ${isActive ? 'bg-blue-700 text-gray-900' : 'text-gray-900'} hover:bg-blue-500 dark:text-white dark:hover:bg-gray-700`
                                        }
                                    >
                                        <span className="ms-3 text-white hover:text-gray-700">Paginate</span>
                                    </NavLink>
                                </li>
                              
                            </ul>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export default Navbar;
