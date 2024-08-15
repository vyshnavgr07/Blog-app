'use client'

import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import api from '../../../utils/axiosInterceptor';
import { useBlogs } from '../../../utils/useBlogs';
import Modal from '../components/Modal';

const Page = () => {
  const [user, setUser] = useState(null);
  const { userBlogs, setUserBlogs } = useBlogs();
  const [state, setState] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/user');
        setUser(response.data.user);
        const blog = await api.get(`blogs/user/${response.data.user._id}`);
        setUserBlogs(blog?.data?.blogs);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [state]);

  if (!user) {
    return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/blogs/${id}`);
      setState(!state);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (post) => {
    setCurrentPost(post);
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
    setCurrentPost(null);
  };

  const handleModalSubmit = async (id, title, content) => {
    try {
      await api.put(`/blogs/${id}`, { title, content });
      setState(!state);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen bg-red-500 overflow-hidden">
      <SideBar className="hidden md:block w-64 bg-gray-800 text-white" />
      <div className="flex-1 overflow-y-auto">
        <div className="bg-red-400 flex flex-col md:flex-row justify-between shadow-lg rounded-lg p-6 md:p-8 w-full">
          <div className="flex flex-col items-center md:items-start">
            <img
              src={`https://ui-avatars.com/api/?name=${user.userName}&background=random`}
              alt={user.userName}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.userName}</h2>
          </div>
          <div className="flex flex-col md:items-start space-y-3">
            <div className="w-full">
              <h3 className="text-lg font-semibold text-gray-700 mb-1">Username</h3>
              <p className="text-gray-600 border-b pb-2">{user.userName}</p>
            </div>
            <div className="w-full">
              <h3 className="text-lg font-semibold text-gray-700 mb-1">Email</h3>
              <p className="text-gray-600 border-b pb-2">{user.email}</p>
            </div>
          </div>
        </div>

        {/* blogs */}
        <div className='mt-4 flex flex-wrap gap-4 px-4'>
  {userBlogs?.map((post) => (
    <div
      key={post._id}
      className="bg-white shadow-lg rounded-lg overflow-y-auto transition-transform transform hover:scale-105 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 box-border"
    >
      <div className="p-4 flex flex-col h-full">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-black mb-2 cursor-pointer hover:text-blue-600">
          {post.title}
        </h2>
        <p className="text-gray-800 mb-4 flex-grow break-words overflow-hidden text-sm sm:text-base">
          {post.content}
        </p>
        <p className="text-gray-600 text-xs sm:text-sm mb-2">
          by {post?.author} on {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className='w-full flex flex-col sm:flex-row justify-between gap-2 mt-2'>
        <button className='bg-red-900 px-4 py-2 text-white text-xs sm:text-sm' onClick={() => handleDelete(post._id)}>Delete</button>
        <button className='bg-green-900 px-4 py-2 text-white text-xs sm:text-sm' onClick={() => handleUpdate(post)}>Update</button>
      </div>
    </div>
  ))}
</div>

      </div>
      {modal && 
        <Modal 
          show={modal} 
          onClose={handleModalClose} 
          onSubmit={handleModalSubmit}    
          post={currentPost} 
        />
      }
    </div>
  );
};

export default Page;
