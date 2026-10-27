import { FiImage, FiSend } from "react-icons/fi";
import { GiThink } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import { useRef, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImSpinner11 } from "react-icons/im";
import toast from "react-hot-toast";

export default function PostCreation() {


    const [isUploaded ,setisUploaded ] = useState("")
    const query = useQueryClient()
    const formData = new FormData()
    const textInput = useRef (null)
    const imageInput = useRef(null)


function createPostAPI() {
  return axios.post(`https://route-posts.routemisr.com/posts` ,formData ,{
headers :{
Authorization: `Bearer ${localStorage.getItem("userToken")}`
}
})
}

const { data , isPending , mutate} = useMutation({
  mutationFn :createPostAPI ,
  onSuccess : (res) =>{ 
    toast.success(res.data.message)
    textInput.current.value = ""
    imageInput.current.value = ""
    setisUploaded("")
query.invalidateQueries({queryKey : ["getAllPosts"]})



  } ,
  onError :( err)=>{
    toast.error(err.data.message)
  } ,
  onSettled : ()=>{}
})

    function handleCreatPost() {
        if (textInput.current.value ==="" && imageInput.current.value ==="") return 

        if(textInput.current.value) {
               formData.append("body" ,textInput.current!.value) 
        }

        if (imageInput.current.value) {
           formData.append("image" ,imageInput.current?.files[0])
        }

        // call api
        mutate()

    }
    function handlePreviewImage(e){
  const path =URL.createObjectURL(e.target.files[0])
  setisUploaded(path)
    }



  return (
   <>
   <div className="mx-auto w-full max-w-xl rounded-2xl border border-violet-100 bg-white p-5 mb-5 shadow-sm">
    <div className="flex items-center mb-2 ml-2">
        <span className=" text-violet-700 text-lg pr-2">
        <GiThink />
    </span>
      <h2 className=" text-lg font-bold text-violet-700">
        What do you think
      </h2>
    </div>
      {/* Input 1: text */}
      <textarea
      rows={3}
      ref={textInput}
        placeholder="What's on your mind?"
        className="w-full resize-none rounded-xl border border-violet-100 bg-white p-3 text-gray-800 placeholder-violet-300 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
      />

  {isUploaded&&<div className="relative">
        <img src={isUploaded} alt="" />
        <IoMdCloseCircle onClick={() =>{setisUploaded("")}}  className="absolute top-4 inset-e-3  sixe-12 cursor-pointer " />
  </div>}
 
      {/* Input 2: image */}
      
     <div className="flex gap-2 items-center">
        <div className="w-md">
            <label
        htmlFor="post-image"
        className="flex cursor-pointer   items-center justify-center  rounded-xl border-2 border-dashed border-violet-200 bg-white py-2 gap-2 text-violet-500 transition hover:border-violet-400 hover:bg-violet-50"
      >
        <FiImage size={20} />
        <span className="text-sm font-medium">Add an image</span>
      </label>
      <input ref={imageInput}  id="post-image" type="file" accept="image/*" className="hidden"  onChange={handlePreviewImage}/>
        </div>
 
      <div className=" flex justify-end">
        <button
        disabled={isPending}
        onClick={()=>{handleCreatPost()}}
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-700   disabled:bg-violet-900 disabled:cursor-not-allowed"
        >
         {isPending ?  <div className="animate-spin"><ImSpinner11 /></div> : <> <FiSend size={16} />
          Post</> }
        </button>
     </div>
      </div>
    </div>
   </>
  )
}

