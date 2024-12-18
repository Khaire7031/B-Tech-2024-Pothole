import React, { useEffect, useState } from 'react';
import mapImage from '../../assets/Map.png';
import logoutImage from '../../assets/Logout.png'; // Import your logout image here
import login from '../../assets/images/Login.png'; // Import your logout image here
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("role");
        setIsLogin(role != null);
        setAdmin(role === "ADMIN");
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        if (isLogin) {
            localStorage.removeItem("role");
            localStorage.removeItem("token");
            setAdmin(false);
            setIsLogin(false);
            console.log('Logged out');
            alert("Logged Out Successfully!");

            // Navigate to the home page
            navigate('/', { replace: true });

            // Add a delay before refreshing the page
            setTimeout(() => {
                window.location.reload();
            }, 500); // 500 milliseconds delay
        } else {
            navigate('/login', { replace: true });
        }
    };


    return (
        <nav className="bg-white border-b-2 border-gray-200 dark:bg-gray-900 sticky top-0 z-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={mapImage} className="h-8" alt="Pothole Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Pothole</span>
                </a>
                <button
                    onClick={toggleMenu}
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded={isOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
                        </li>
                        <li>
                            <a href="/map/search" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Map</a>
                        </li>
                        {admin && (

                            <li>
                                <a href="/admin" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Admin</a>
                            </li>
                        )}
                        <li>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                                {/* <img src={logoutImage} className="h-6 w-6" alt="Logout Icon" /> */}
                                {isLogin ? <img src={logoutImage} className="h-8 w-8" alt="Logout Icon" /> : <img src={login} className="h-7 w-7" alt="Login" />}
                                {/* <span>{isLogin ? 'Logout' : 'Login'}</span> */}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
