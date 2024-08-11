import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from '../component/Navbar';

function AddCategory() {
    const [username, setUsername] = useState('');

    const [names, setNames] = useState('');
    const [detail, setDetail] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        setError('');

        // Check if file is of valid type
        const fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (file && !fileTypes.includes(file.type)) {
            setError('Error: Images Only (jpeg, jpg, png, gif)');
            return;
        }

        // Create a FormData object
        // const formData = new FormData();
        // formData.append('names', names);
        // formData.append('detail', detail);
        // formData.append('file', file);

        const values = {
            names: names,
            detail: detail,
            userNote: username,
            file: file
        };


        try {
            await axios.post('http://localhost:5000/api/categories/uploadimg', values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/customer');
        } catch (err) {
            console.error(err);
            setError('Error uploading the file');
        }
    };

    return (
        <div>
            <Navbar />
            <div className='my-16 lg:ml-64'>
                <form onSubmit={handleUpload}>
                    <div className="w-500 border bg-light p-5">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                required
                                className='block p-2.5 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                                value={names}
                                onChange={(e) => setNames(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="detail">Detail</label>
                            <input
                                type="text"
                                className='block p-2.5 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                                value={detail}
                                onChange={(e) => setDetail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="file">Photo</label>
                            <input
                                type="file"
                                required
                                className='block p-2.5 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            {error && <p className="text-danger">{error}</p>}
                        </div>
                        <button className='px-4 py-2 bg-green-600 rounded-lg' type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCategory;
