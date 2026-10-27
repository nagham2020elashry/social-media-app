import {
  FiHeart,
  FiMessageCircle,
  FiShare2,
  FiBookmark,
  FiMoreHorizontal,
} from "react-icons/fi";
import { type PostType } from "../../Types/Post.type";
import Comment from "../Comment/Comment";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CommentType } from "../../Types/Comment.type";
import CommentCreation from "../CommentCreation/CommentCreation";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";


export default function Post({
  post,
  isPostDetiles = false,
}: {
  post: PostType;
  isPostDetiles?: boolean;
}) {
  const { topComment, _id, user } = post;
  const { _id: userId } = user;
const { userID: loginUserId } = useContext(AuthContext);
  const [isOpen ,setisOpen] = useState(false)
  const query = useQueryClient()
  const navigate =useNavigate ()
  const [isLiked ,setisLiked ] =useState(false)

  function getPostComments() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${_id}/comments?page=1`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getPostComments", _id],
    queryFn: getPostComments,
    enabled: isPostDetiles,
  });

  function handleDeletePost() {
    return axios.delete(`https://route-posts.routemisr.com/posts/&{_id}`, {
headers :{
Authorization: `Bearer ${localStorage.getItem("userToken")}`
}
})
  }
  const {  isPending,mutate} = useMutation({
mutationFn :handleDeletePost,
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

function getPostLiked() {
  return axios.put(`https://route-posts.routemisr.com/posts/${post._id}/like` ,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
}
 const  {isPending:likePostLoading}= useMutation({
  mutationFn :getPostLiked,
    
  
  });



  if (isLoading) {
    return <Loader />;
  }
   if (likePostLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <h1 className="flex justify-center items-center text-5xl text-red-600 font-bold">
        {error.message}
      </h1>
    );
  }



  return (
    <>
      <div className="rounded-3xl border border-violet-100 shadow-sm shadow-violet-100/60 overflow-hidden mb-5 ">
        <header className="flex items-center justify-between px-5 pt-5">
          <div className="flex items-center gap-3">
            <div className="p-0.5 rounded-full  from-violet-600 to-fuchsia-400">
              <img
                src={post.user.photo}
                alt={post.user.name}
                className="w-11 h-11 rounded-full border-2 border-white object-cover"
              />
            </div>
            <div className="leading-tight">
              <h3 className="text-sm font-semibold text-violet-950">
                {post.user.name}
              </h3>
              <p className="text-xs text-violet-400">{post.createdAt}</p>
            </div>
          </div>

          <div className="relative">

            {loginUserId=== userId && <button onClick={() =>setisOpen(!isOpen)}
             className="p-2 rounded-full text-violet-400 hover:bg-violet-50 hover:text-violet-700 transition">
              <FiMoreHorizontal size={20} />
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

        {/* Content */}
        <div className="px-5 pt-4">
          <p className="text-sm leading-relaxed text-violet-900/80">
            {post.body}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-violet-50 text-violet-700">
              #nature
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-violet-100 text-violet-800">
              #friends
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-fuchsia-50 text-fuchsia-700">
              #travel
            </span>
          </div>
        </div>

        {/* Image */}
        <div className="px-5 pt-4">
          <img
            src={post.image}
            alt=""
            className="w-full  object-cover rounded-2xl"
          />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between px-5 pt-4 text-xs text-violet-400">
          <span>{post.likesCount} likes</span>
          <div className="flex gap-3 ">
            <Link to={`/postDetiles/${_id}`}>
              {" "}
              <span>{post.commentsCount} comments </span>
            </Link>
            <span> {post.sharesCount} shares</span>
          </div>
        </div>

        <CommentCreation
          postId={_id}
          queryKey={isPostDetiles ? ["getPostComments"] : ["getAllPosts"]}
        />

        {/* TopComment */}

        {topComment && <Comment comment={topComment}  postId={post._id} />}

        {/* AllComments */}
        {isPostDetiles &&
          data?.data.data.comments &&
          data?.data.data.comments.map((comment: CommentType) => (
            <Comment comment={comment} key={comment._id} postId={post._id}/>
          ))}

        <div className="mx-5 mt-3 border-t border-violet-100" />

        {/* Actions */}
        <footer className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center">
            <button
             onClick={() => {
    setisLiked(!isLiked); 
    mutate();             
  }}
  disabled={likePostLoading}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl text-violet-600 hover:bg-violet-50 transition">
              {isLiked ? <FaHeart className= "text-violet-600" /> : <FiHeart className= "text-violet-600" />}
              <span>Like</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl text-violet-600 hover:bg-violet-50 transition">
              <FiMessageCircle size={19} />
              <Link to={`/postDetiles/${_id}`}>
                {" "}
                <span>Comment</span>
              </Link>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl text-violet-600 hover:bg-violet-50 transition">
              <FiShare2 size={19} />
              <span>Share</span>
            </button>
          </div>

          <button className="p-2.5 rounded-xl text-violet-600 hover:bg-violet-50 transition">
            <FiBookmark size={19} />
          </button>
        </footer>
      </div>
    </>
  );
}
