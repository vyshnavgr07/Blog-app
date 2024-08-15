"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useBlogs } from '../../../utils/useBlogs';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Blog = () => {
   const {blogs,setBlogs}=useBlogs()
   const router = useRouter()
   
   useEffect(() => {
    const token = window.localStorage.getItem("token");
        const fetchBlogPosts = async () => {
            try {
                const response = await axios.get('http://localhost:4002/api/blogs', {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                if(response.status===200){
                    setBlogs(response.data.blog)
                    
                    console.log(response.data.blog)
                }
            } catch (error) {
                console.log(error,'home page')
            }
            
         
        };

        fetchBlogPosts()
    }, []);
    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Blog Posts</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map(post => (
            <div key={post._id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              <div className="p-6">
                <h2
                  onClick={() => router.push(`/blog/${post._id}`)}
                  className="text-2xl font-semibold text-black mb-2 cursor-pointer hover:text-blue-600"
                >
                  {post.title}
                </h2>
                <p className="text-gray-800 mb-4">{post.content}</p>
                <p className="text-gray-600 text-sm mb-2">
                  by {post.userId?.userName} on {new Date(post.createdAt).toLocaleDateString()}
                </p>
                {/* <Link href={`/blog/${post._id}`}>
                  <a className="text-blue-500 hover:underline">Read more</a>
                </Link> */}
              </div>
            </div>
          ))}
        </div>
      </div>
  
    );
};

export default Blog;
