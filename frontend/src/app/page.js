"use client"
import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import { useBlogs } from "../../utils/useBlogs";
import { useRouter } from "next/navigation";
import axios from "axios";
import api from "../../utils/axiosInterceptor";

export default function Home() {
  const {blogs,setBlogs}=useBlogs()
  const router = useRouter()
  const token = window.localStorage.getItem("token");
if(!token){
  setTimeout(()=>{
    router.push('/login')
  },3000)
 
}
  useEffect(() => {
    
       const fetchBlogPosts = async () => {
           try {
               const response = await api.get('/blogs');
                 console.log(response,"res");
                 
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

   const handleUpdate=async(id)=>{
    try {
      const update=await api.put()
    } catch (error) {
      
    }
   }
 return (
    <main className="min-h-screen flex bg-blue-400 overflow-hidden ">
      <div>
      <SideBar/>
      </div>
      <div className="container mx-auto px-4 py-8 overflow-y-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Blog Posts</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map(post => (
            <div key={post._id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              <div className="p-6">
                <h2
                  onClick={() => router.push(`/blog/${post._id}`)}
                  className="text-2xl font-semibold text-black mb-2 cursor-pointer hover:text-blue-600"
                >
                  {post?.title}
                </h2>
                <p className="text-gray-800 mb-4">{post.content}</p>
                <p className="text-gray-600 text-sm mb-2">
                  by {post?.author} on {new Date(post.createdAt).toLocaleDateString()}
                </p>
               
              </div>
            </div>
          ))}
        </div>
      </div>

   
    </main>
  );  
}
