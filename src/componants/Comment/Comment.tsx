import { FiMoreHorizontal } from "react-icons/fi"
import {  type CommentType } from "../../Types/Comment.type"
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import axios from "axios";
import toast from "react-hot-toast";



export default function Comment({
  comment,
  postId,
}: {
  comment: CommentType;
  postId: string;
}) {


  const { _id} = comment.commentCreator;

const { userID: loginUserId } = useContext(AuthContext);
   const [isOpen ,setisOpen] = useState(false)
    const query = useQueryClient()
     const navigate =useNavigate ()

function handleDeleteComment() {
    return axios.delete(`https://route-posts.routemisr.com/posts/${postId}/comments/${comment._id}`, {
headers :{
Authorization: `Bearer ${localStorage.getItem("userToken")}`
}
})
  }
  const {  isPending,mutate} = useMutation({
mutationFn :handleDeleteComment,
onSuccess: (res) => {
toast.success(res.data.message)
  query.invalidateQueries({queryKey:["getAllPosts"]})
  navigate("/")
},
onError: (err) => {
  console.log(err);
  
},
onSettled: () => {}
  })







  return (
   <> 
   <div className="bg-indigo-200 pb-2 rounded-3xl pt-0 w-lg mx-auto mt-2">
   <header className="flex items-center justify-between px-5 pt-5">
            <div className="flex items-center gap-3">
              <div className="p-0.5 rounded-full  from-violet-600 to-fuchsia-400">
                <img
                  src={comment.commentCreator.photo}
                  alt={comment.commentCreator.name}
                  className="w-11 h-11 rounded-full border-2 border-white object-cover"
                />
              </div>
              <div className="leading-tight">
                <h3 className="text-sm font-semibold text-violet-950">{comment.commentCreator.name}</h3>
                <p className="text-xs text-violet-400">{comment.createdAt}</p>
              </div>
            </div>
     
               <div className="relative">

            {loginUserId=== _id && <button
            onClick={() =>setisOpen(!isOpen)}
            className="p-2 rounded-full text-violet-400 hover:bg-violet-50 hover:text-violet-700 transition">
              <FiMoreHorizontal   size={20} />
            </button>}
            
            {isOpen && <div className="bg-violet-400 p-2 rounded-lg shadow-2xl border border-violet-500 absolute top-[116%] inset-e-2">
              <ul>
                <li className=" flex gap-2 items-center cursor-pointer p-2 text-white font-semibold ">
                  {" "}
                  <MdOutlineModeEditOutline />
                  Edit
                </li>
                <li >
                  <button  className="flex gap-2 items-center cursor-pointer p-2 text-white font-semibold w-full disabled:cursor-not-allowed"
                                    disabled={isPending}
                                   onClick={()=>{mutate()}}>
                   {isPending?   <ImSpinner2  className="animate-spin flex items-center justify-center  w-full"/> :<> 
                  <MdDelete />Delete</> }
                                   </button>
                </li>
              </ul>
            </div>}
          </div>
          </header> 
         
           <div className="px-5 pt-4">
            <p className="text-sm leading-relaxed text-violet-900/80">
             {comment.content}
            </p>
          <img  className="text-sm leading-relaxed text-violet-900/80" src={comment.image} alt="" />
          </div>
   </div>
          </>
  )
}
