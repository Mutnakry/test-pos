import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Category = () => {
  const [category, setCategory] = useState([]);
  const [names, setNames] = useState('');
  const [detail, setDetail] = useState('');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    getAllCat();
  }, []);

  const getAllCat = () => {
    axios
      .get('http://localhost:5000/api/categories')
      .then(res => setCategory(res.data))
      .catch(err => console.log(err));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const values = { names, detail };
    try {
      await axios.post('http://localhost:5000/api/categories', values);
      toast.success('Category added successfully!', { autoClose: 3000 });
      getAllCat();
      setNames('');
      setDetail('');
      setIsInsertModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Error adding category!', { autoClose: 3000 });
    }
  };

  const handleUpdateCategory = async e => {
    e.preventDefault();
    const values = { names, detail };
    try {
      await axios.put(`http://localhost:5000/api/categories/${selectedCategoryId}`, values);
      toast.success('Category updated successfully!', { autoClose: 3000 });
      getAllCat();
      setIsUpdateModalOpen(false);
      setSelectedCategoryId(null);
      setNames('');
      setDetail('');
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

  const openUpdateModal = cat => {
    setSelectedCategoryId(cat.id);
    setNames(cat.names);
    setDetail(cat.detail);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = cat => {
    setSelectedCategoryId(cat.id);
    setIsDeleteModalOpen(true);
  };

  const openInsertModal = () => {
    setNames('');
    setDetail('');
    setIsInsertModalOpen(true);
  };

  return (
    <div>
      <Navbar />
      <div className='my-16 lg:ml-64'>
        <div className='p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700'>
          <div className='flex justify-between py-2 mr-2 md:mr-14'>
            <button
              className='block text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              type='button'
              onClick={openInsertModal}
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
                    <td>
                      <button
                        onClick={() => openUpdateModal(cat)}
                        className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                        type='button'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(cat)}
                        className='block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
                        type='button'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Update Modal */}
          {isUpdateModalOpen && (
            <div
              id={`update-modal`}
              tabIndex="-1"
              aria-hidden="true"
              className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
            >
              <div className="relative w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Update Category</h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setIsUpdateModalOpen(false)}
                  >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1l6 6m0 0l6 6m-6-6l6-6m-6 6L1 1"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="p-4 space-y-4">
                  <form onSubmit={handleUpdateCategory}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={names}
                        onChange={e => setNames(e.target.value)}
                        className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Category name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="detail" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Detail
                      </label>
                      <textarea
                        id="detail"
                        value={detail}
                        onChange={e => setDetail(e.target.value)}
                        className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Category detail"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="block w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Delete Modal */}
          {isDeleteModalOpen && (
            <div
              id={`delete-modal`}
              tabIndex="-1"
              aria-hidden="true"
              className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
            >
              <div className="relative w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Delete Category</h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1l6 6m0 0l6 6m-6-6l6-6m-6 6L1 1"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    Are you sure you want to delete this category? This action cannot be undone.
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      onClick={() => setIsDeleteModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      onClick={deleteCategory}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Insert Modal */}
          {isInsertModalOpen && (
            <div
              id={`insert-modal`}
              tabIndex="-1"
              aria-hidden="true"
              className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
            >
              <div className="relative w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Insert Category</h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setIsInsertModalOpen(false)}
                  >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1l6 6m0 0l6 6m-6-6l6-6m-6 6L1 1"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="p-4 space-y-4">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={names}
                        onChange={e => setNames(e.target.value)}
                        className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Category name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="detail" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Detail
                      </label>
                      <textarea
                        id="detail"
                        value={detail}
                        onChange={e => setDetail(e.target.value)}
                        className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Category detail"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="block w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
