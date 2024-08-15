'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../components/SideBar';
import api from '../../../utils/axiosInterceptor';
import { useBlogs } from '../../../utils/useBlogs';




const page = () => {
  const [user, setUser] = useState(null);
  const {userBlogs,setUserBlogs}=useBlogs();
  const[state,setState]=useState(false)
  useEffect(() => {
    let token= window.localStorage.getItem('token')
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/user');
      setUser(response.data.user);
      const blog=await api.get(`blogs/user/${response.data.user._id}`)
      console.log(blog,"blogg");
      
      setUserBlogs(blog?.data?.blogs)
      
      
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [state]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleDelete=async(id)=>{
try {
    const deleteBlog=await api.delete(`/blogs/${id}`);
     setState(!state)
} catch (error) {
    
}
  }

  return (
    <div className="w-full flex h-screen bg-red-500 overflow-hidden">
        <div>
            <SideBar/>
        </div>
        <div className='w-full overflow-y-auto'>
        <div className="bg-red-400 flex flex-col md:flex-row justify-between  shadow-lg rounded-lg p-6 md:p-8 w-full  ">
        <div className="flex flex-col  ">
          <img
            src={`https://ui-avatars.com/api/?name=${user.userName}&background=random`}
            alt={user.userName}
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.userName}</h2>
        
        </div>
        <div className="flex flex-col items-center space-y-3">
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
<div className='mt-4 ml-2 h-full'>  
      {userBlogs?.map((post) => (
  <div 
    key={post._id} 
    className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 w-full md:w-1/2 lg:w-1/3 p-4 box-border"
  >
    <div className="p-4 flex flex-col h-full">
      <h2
        className="text-xl md:text-2xl font-semibold text-black mb-2 cursor-pointer hover:text-blue-600"
>
        {post.title}
      </h2>
      <p className="text-gray-800 mb-4 flex-grow break-words overflow-hidden">
        {post.content}
      </p>
      <p className="text-gray-600 text-sm mb-2">
        by {post?.author} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </div>
<div className='w-full flex justify-between'> 
<button className='bg-red-900 px-4 py-2'  onClick={()=>handleDelete(post._id)}>delete</button>
<button className='bg-green-900 px-4 py-2' >update</button>
</div>
    
  </div>
))}
</div>
      </div>

    </div>
  );
};

export default page;
