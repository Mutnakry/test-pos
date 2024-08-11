import React, { useState } from 'react';
import axios from 'axios';
import logo from '../image/logopos.png';
import { useNavigate } from 'react-router-dom';
import bgimg from '../image/img1.jpg';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('user');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, password, usertype });
      console.log('Registration successful:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
    }
  };

  return (
    <section
      style={{ backgroundImage: `url(${bgimg})`, height: '100vh' }}
      className="bg-center max-h-screen bg-no-repeat bg-cover bg-gray-700 bg-blend-multiply"
    >
      <div className='h-screen'>
        <div className='h-screen max-w-sm mx-auto grid items-center'>
          <div className='bg-slate-50 shadow-xl p-6 shadow-gray-500 rounded-lg'>
            <div className='text-center'>
              <h1 className='p-6 text-5xl font-bold'>Register</h1>
              <div className='flex justify-center mb-6'>
                <img className='h-32 w-34' src={logo} alt="Logo" />
              </div>
            </div>
            <form onSubmit={handleRegister}>
              <div className='mb-5'>
                <label className='block mb-2 text-sm font-bold text-gray-900'>Your Name</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' placeholder="name login system" required />
              </div>
              <div className='mb-5'>
                <label className='block mb-2 w-full text-sm font-bold text-gray-900'>Your password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' required placeholder="password login system" />
              </div>
              <div className='mb-5'>
                <label className='block mb-2 w-full text-sm font-bold text-gray-900'>User Type</label>
                <select value={usertype} onChange={(e) => setUsertype(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="super admin">Super Admin</option>
                </select>
              </div>
              <div className='flex justify-center py-7'>
                <button
                  type="submit"
                  className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5'
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
