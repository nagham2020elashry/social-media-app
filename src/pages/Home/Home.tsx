import axios from "axios"
import { type PostType } from '../../Types/Post.type';
import Post from "../../componants/Post/Post";
import Loader from "../../componants/loader/Loader";
import { useQuery } from "@tanstack/react-query";
import PostCreation from "../../componants/PostCreation/PostCreation";
import {Helmet} from "react-helmet";


export default function Home() {


 
function getAllPosts() {
  
 return axios.get ('https://route-posts.routemisr.com/posts?sort=-createdAt' , {
headers :{
Authorization: `Bearer ${localStorage.getItem("userToken")}`
}
})
}


 const {data ,isLoading , isError , error } = useQuery({
  queryKey :["getAllPosts"],
  queryFn  : getAllPosts
})


if (isLoading) {
 return (<Loader/>)

}

if (isError) {
 return <h1 className="flex justify-center items-center text-5xl text-red-600 font-bold">{error.message}</h1>
}


  return (
   <div className="w-full max-w-xl mx-auto bg-white mt-7 ">

    <Helmet>
      <title> Home</title>
    </Helmet>

<div className="mx-auto "><PostCreation/></div>

{data?.data.data.posts.map((post : PostType)=> 
<Post post={post}  user={post.user}  key={post.id} isPostDetiles = {false} />
  )}
   </div>

  )
}
