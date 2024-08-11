import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../image/logopos.png';
import bgimg from '../image/img1.jpg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usertype', response.data.usertype);
      localStorage.setItem('username', response.data.username); // Store username
      toast.success('Login success', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/home');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <section
      style={{ backgroundImage: `url(${bgimg})`, height: '100vh' }}
      className="bg-center max-h-screen bg-no-repeat bg-cover bg-gray-700 bg-blend-multiply"
    >
      <div className='h-screen'>
        <div className='h-screen max-w-sm mx-auto grid items-center'>
          <div className='  p-6 shadow-gray-500 rounded-lg'>
            <div className='text-center'>
              <h1 className='p-6 text-5xl text-white font-bold'>Login</h1>
              <div className='flex justify-center mb-6'>
                <img className='h-32 w-34' src={logo} alt="Logo" />
              </div>
            </div>
            <form onSubmit={handleLogin}>
              <div className='mb-5'>
                <label className='block mb-2 text-sm font-bold text-white'>Your Name</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                  placeholder="name login system"
                  required
                />
              </div>
              <div className='mb-5'>
                <label className='block mb-2 text-white w-full text-sm font-bold'>Your password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                  required
                  placeholder="password login system"
                />
              </div>
              <div className='flex justify-center py-7'>
                <button
                  type="submit"
                  className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5'
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
