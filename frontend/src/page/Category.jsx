import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import axios from 'axios';
import icondelete from '../image/delete.png';
import iconedit from '../image/edit.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Category = () => {
  const [username, setUsername] = useState('');

  const [category, setCategory] = useState([]);
  const [names, setNames] = useState('');
  const [detail, setDetail] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCat();
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  }, []);

  const getAllCat = () => {
    axios
      .get('http://localhost:5000/api/categories')
      .then(res => setCategory(res.data))
      
      .catch(err => console.log(err));
  };

  const handsubmit = async e => {
    e.preventDefault();
    const values = {
      names: names,
      detail: detail,
      userNote: username,
    };
    await axios
      .post('http://localhost:5000/api/categories', values)
      .then(res => {
        console.log(res.data);
        navigate('/category');
        window.location.reload();
        getAllCat();
        toast.success('Category successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(err => console.log(err));
      toast.error('Error Register category!', { autoClose: 3000 });
  };

  const handUpdateCategory = async e => {
    e.preventDefault();
    const values = { names, detail,userNote:username };
    try {
      await axios.put(`http://localhost:5000/api/categories/${selectedCategoryId}`, values);
      toast.success('Category updated successfully!', { autoClose: 3000 });

      getAllCat();
      setIsUpdateModalOpen(false);
      setTimeout(() => {
        window.location.reload(true);
      }, 2000); // 10,000 milliseconds = 10 seconds
    } catch (err) {
      console.error(err);
      toast.error('Error updating category!', { autoClose: 3000 });
    }
  };

  const deleteCategory = async () => {
    if (selectedCategoryId) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${selectedCategoryId}`);
        toast.success('Category deleted successfully!', { autoClose: 3000 });
        getAllCat();
        setIsDeleteModalOpen(false);
        setSelectedCategoryId(null);
      } catch (err) {
        console.error(err);
        toast.error('Error deleting category!', { autoClose: 3000 });
      }
    }
  };

  const openUpdateModal = category => {
    setNames(category.names);
    setDetail(category.detail);
    setSelectedCategoryId(category.id);
    setIsUpdateModalOpen(true);
  };

  return (
    <div>
      <Navbar />
      <div className='my-16 lg:ml-64'>
        <div className='p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700'>
          <div className='flex justify-between py-2 mr-2 md:mr-14'>
            <button
              data-modal-target='insert-modal'
              data-modal-toggle='insert-modal'
              className='block text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              type='button'
            >
              Register
            </button>
            <input
              type='text'
              className='block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Search for items'
            />
          </div>
          <div className='relative overflow-x-auto'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>No.</th>
                  <th scope='col' className='px-6 py-3'>Name</th>
                  <th scope='col' className='px-6 py-3'>Detail</th>
                  <th scope='col' className='px-6 py-3'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {category.map((cat, index) => (
                  <tr key={cat.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <td className='px-6 py-2'>{index + 1}</td>
                    <th scope='row' className='px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      {cat.names}
                    </th>
                    <td className='px-6'>{cat.detail}</td>
                    <td className='flex items-center px-6 py-1 space-x-3'>
                      <button
                        onClick={() => openUpdateModal(cat)}
                        className='block text-white bg-blue-100 hover:bg-blue-500 font-medium rounded-full text-sm px-2 py-2 text-center'
                      >
                        <img src={iconedit} className='h-4' alt='Edit' />
                      </button>
                      <button
                        onClick={() => { setIsDeleteModalOpen(true); setSelectedCategoryId(cat.id); }}
                        className='block text-white bg-red-100 hover:bg-red-500 font-medium rounded-full text-sm px-2 py-2 text-center'
                      >
                        <img src={icondelete} className='h-4' alt='Delete' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          {/* register */}
          <div
            id='insert-modal'
            tabindex='-1'
            aria-hidden='true'
            className='fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'
          >
            <div className='relative w-full max-w-md max-h-full'>
              <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                <button
                  type='button'
                  className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ms-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
                  data-modal-hide='insert-modal'
                >
                  <svg
                    aria-hidden='true'
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clip-rule='evenodd'
                    />
                  </svg>
                  <span className='sr-only'>Close modal</span>
                </button>
                <div className='px-6 py-6 lg:px-8'>
                  <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>Register Category</h3>
                  <form className='space-y-6' onSubmit={handsubmit}>
                    <div>
                      <label
                        for='categoryname'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Category Name
                      </label>
                      <input
                        type='text'
                        name='categoryname'
                        id='categoryname'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        placeholder='name'
                        required
                        value={names}
                        onChange={e => setNames(e.target.value)}
                      />
                    </div>
                    <div>
                      <label for='detail' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                        Detail
                      </label>
                      <input
                        type='text'
                        name='detail'
                        id='detail'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        placeholder='detail'
                        required
                        value={detail}
                        onChange={e => setDetail(e.target.value)}
                      />
                    </div>

                    <button
                      type='submit'
                      className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Modal */}
          <div
            id='delete-modal'
            className={`${isDeleteModalOpen ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
          >
            <div className='relative p-4 w-full max-w-md max-h-full'>
              <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                <button
                  type='button'
                  className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  <svg
                    className='w-3 h-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 14'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                    />
                  </svg>
                  <span className='sr-only'>Close modal</span>
                </button>
                <div className='p-4 md:p-5 text-center'>
                  <svg
                    className='mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 20'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                  </svg>
                  <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                    Are you sure you want to delete this category?
                  </h3>
                  <button
                    onClick={deleteCategory}
                    type='button'
                    className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    type='button'
                    className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Update Modal */}
          <div
            id='update-modal'
            className={`${isUpdateModalOpen ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
          >
            <div className='relative p-4 w-full max-w-md max-h-full'>
              <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                <button
                  type='button'
                  className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                  onClick={() => setIsUpdateModalOpen(false)}
                >
                  <svg
                    className='w-3 h-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 14'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                    />
                  </svg>
                  <span className='sr-only'>Close modal</span>
                </button>
                <form onSubmit={handUpdateCategory} className='p-6 space-y-6'>
                  <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-900 dark:text-white'>
                      Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      value={names}
                      onChange={e => setNames(e.target.value)}
                      className='block p-2.5 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                      placeholder='Category name'
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor='detail' className='block text-sm font-medium text-gray-900 dark:text-white'>
                      Detail
                    </label>
                    <input
                      type='text'
                      id='detail'
                      value={detail}
                      onChange={e => setDetail(e.target.value)}
                      className='block p-2.5 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                      placeholder='Category detail'
                      required
                    />
                  </div>
                  <button
                    type='submit'
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Category;
