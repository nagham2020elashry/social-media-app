import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Loader from "../../componants/loader/Loader"
import { useParams } from "react-router-dom"
import Post from "../../componants/Post/Post"
import {Helmet} from "react-helmet";

export default function PostDetiles() {


    const {id} =useParams()

function getPostDetiles (){
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
headers :{
Authorization: `Bearer ${localStorage.getItem("userToken")}`
}
})
}

 const {data ,isLoading , isError , error } = useQuery({
  queryKey :["getSinglePost" , id],
  queryFn  : getPostDetiles
})

// console.log(data?.data.data.post)

if (isLoading) {
 return (<Loader/>)

}

if (isError) {
 return <h1 className="flex justify-center items-center text-5xl text-red-600 font-bold">{error.message}</h1>
}



  return (
    <div>



      
       <Helmet>
            <title> PostDetiles</title>
          </Helmet>
<Post post={data?.data.data.post}  isPostDetiles={true}/>
    </div>
  )
}
