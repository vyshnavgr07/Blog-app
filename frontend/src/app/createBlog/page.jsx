"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../components/SideBar';
import { useRouter } from 'next/navigation';
import api from '../../../utils/axiosInterceptor';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router=useRouter()




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/blogs/', { title, content });

      if (response.status === 201) {
          router.push('/')
        setSuccess('Blog created successfully!');
        setTitle('');
        setContent('');

      } else {
        setError(response.data.message || 'Failed to create blog');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
  <div className=" ">
    <SideBar />
  </div>
  <div className="flex flex-col w-3/4 items-center justify-center p-10">
    <form 
      className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-10 w-full max-w-lg"
      onSubmit={handleSubmit}
    >
      {error && <div className="text-red-600 mb-4 font-semibold">{error}</div>}
      {success && <div className="text-green-600 mb-4 font-semibold">{success}</div>}
      
      <div className="mb-6">
        <label htmlFor="title" className="block text-gray-800 font-bold mb-2">Title</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue transition duration-300 ease-in-out" 
          required
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="content" className="block text-gray-800 font-bold mb-2">Content</label>
        <textarea 
          id="content" 
          name="content" 
          rows="5" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue transition duration-300 ease-in-out"
          required
        ></textarea> 
      </div>
      
      <button 
        type="submit" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full shadow-md transition-transform transform hover:-translate-y-1 duration-300"
      >
        Submit
      </button>
    </form> 
  </div>
</div>

  );
}

export default CreateBlog;
