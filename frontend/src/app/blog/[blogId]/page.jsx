'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useBlogs } from '../../../../utils/useBlogs'
import SideBar from '@/app/components/SideBar'
import api from '../../../../utils/axiosInterceptor'

const Page = () => {
  const { blogId } = useParams()
  console.log(blogId,"eded");
  
  const [blogPost, setBlogPost] = useState(null)
  const { comments, setComments } = useBlogs()
  const [newComment, setNewComment] = useState('')
const [start,setStart]=useState(true)
  useEffect(() => {
    try {
      const token = window.localStorage.getItem('token')
      const fetchData = async () => {
        const response = await api.get(`/blogs/${blogId}`)
        setBlogPost(response.data.blog)

        const commentsResponse = await api.get(`blogs/comments/${blogId}`)
        setComments(commentsResponse.data.getcom)
      }

      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [blogId, setComments,start])

  const handleAddComment = async () => {
    try {
      const response = await api.post(`/blogs/comments/${blogId}`,{ content: newComment })
      console.log(response,"respoo");
      setComments([...comments, response.data.newComment])
      setNewComment('')
      setStart(!start)
    } catch (error) {  
      console.log(error)
    }
  }
  console.log(newComment,"cscsc");

  return (
    <div className="flex flex-col sm:flex-row w-full">
    <div className="w-full sm:w-1/4">
      <SideBar />
    </div>

    <div className="w-full sm:w-3/4 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <div className='w-full bg-slate-400 shadow-xl rounded-2xl mb-6 p-4'>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 font-bold mb-2">{blogPost?.title}</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-4">{blogPost?.content}</p>
          <h5 className="text-sm sm:text-base text-gray-500">By {blogPost?.userId?.userName}</h5>
        </div>

        <div className='w-full h-60 sm:h-96 overflow-y-scroll'>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">Comments</h2>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment?.id} className="mb-4 p-4 bg-gray-100 rounded-md shadow-sm">
                <h3 className="font-semibold text-gray-800">{comment?.userId?.userName}</h3>
                <p className="text-gray-700">{comment?.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Add a Comment</h3>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="mt-3 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            onClick={handleAddComment}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Page
