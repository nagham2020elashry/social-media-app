import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FiImage,  FiSend } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";


export default function CommentCreation( {postId , queryKey} :{postId :string  , queryKey : string[]} ) {

const form = useForm({
    defaultValues :{
        content : "" ,
        image : ""
    }
})
const query =useQueryClient()

const {register , handleSubmit , reset} = form
const formData = new FormData()

function CreateComment(){
   return axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments` ,formData ,{
headers :{
Authorization: `Bearer ${localStorage.getItem("userToken")}`
}
})
}

const { isPending, mutate} = useMutation({
    mutationFn :CreateComment ,
    onSuccess :(res)=>{ 
       toast.success(res.data.message)
     
        query.invalidateQueries({
            queryKey :queryKey
        })
        reset()
    } ,
      onError :(err)=>{ 
      toast.success(err.data.message)
      } ,
      onSettled :()=>{} ,

   
})


function handleCreateComment(values :{content : string , image : string}){

    if (!values.content && !values.image) {
        return
    }
 if (values.content) {
  formData.append("content" ,values.content)  
 }

 if (values.image) {
  formData.append("image" ,values.image[0])  
 }

//  call api
mutate()

}

  return (
   <div className="w-lg mx-auto  rounded-[28px] border border-violet-100 bg-white p-3 shadow-sm mt-3">
      <div className="flex items-start gap-4">
       
        {/* Input area */}
    
         <form className="flex-1" onSubmit={handleSubmit(handleCreateComment)}>
          <input
          {...register("content")}
            placeholder="Write a comment..."
            className="w-full resize-none rounded-2xl border border-violet-100 bg-violet-50/40 px-4 py-2 text-[15px] text-violet-900 placeholder-violet-400 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
          />
 
          {/* Divider */}
          <div className="my-2 h-px w-full bg-violet-100" />
 
          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center  text-violet-600">
              <label
                className=" transition hover:text-violet-800 ps-5" htmlFor="img">
                <span className="flex items-center gap-1">
                <FiImage size={20} />
                 <span className="font-semibold">Photo</span>
                </span>
              </label>
              <input  {...register("image")} type="file" id="img" hidden/>
            </div>
 
            <button
            disabled={isPending}
            type="submit"
              className="flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2 text-[15px] font-semibold text-white transition hover:bg-violet-700"
            >
             {isPending ? <ImSpinner2  className="animate-spin"/> :<> <FiSend size={16} />
        <span>Comment</span> </>}
            </button>
          </div>
        </form>
       
      </div>
    </div>
  )
}
