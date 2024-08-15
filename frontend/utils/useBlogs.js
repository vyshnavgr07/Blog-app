import { create } from "zustand";

const useBlogs = create((set) => ({
    blogs: [], 
    setBlogs: (blogs) => set({ blogs }), 
    comments:[],
    setComments:(comments)=>set({comments}),
    userBlogs:[],
    setUserBlogs:(userBlogs)=>set({userBlogs})
}));

export { useBlogs };
