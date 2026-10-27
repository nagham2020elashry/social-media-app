
      import {Helmet} from "react-helmet";


import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {type UserType } from './../../Types/ProfileUser.type';
import {
  FiMail,
  FiUser,
  FiCalendar,
  FiAtSign,
  FiUsers,
  FiUserPlus,
} from "react-icons/fi";
import { FaVenusMars } from "react-icons/fa";
import Loader from "../../componants/loader/Loader";
import {jwtDecode}  from "jwt-decode"
import Post from "../../componants/Post/Post";
import {  type PostType } from './../../Types/Post.type';




export default function Profile() {

function getMyProfile() {
  return axios.get(`https://route-posts.routemisr.com/users/profile-data` ,{
headers :{
Authorization: `Bearer ${localStorage.getItem("userToken")}`
}
})
}

const{data , isLoading , isError} = useQuery({
queryKey :["getMyProfile"] ,
queryFn :getMyProfile
})

const user: UserType = data?.data.data.user;

const {user:userId} :{user :string} =jwtDecode(localStorage.getItem("userToken"))

function getMyPosts() {
  return axios.get(`https://route-posts.routemisr.com/users/${userId}/posts`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
  });
}

const {data :postUserData , isLoading:loadingUserData} = useQuery({
  queryKey: ['getUserPosts'],
  queryFn: getMyPosts,
})



if (isLoading) {
    return <Loader />;
  }
  if (loadingUserData) {
    return <Loader />;
  }

  if (isError) {
    return (
      <h1 className="flex justify-center items-center text-5xl text-red-600 font-bold">
       ERROR 404 ......!
      </h1>
    );
  }

  console.log(postUserData?.data.data.posts);
  

  return (
    <>
     <Helmet>
            <title> Profile</title>
          </Helmet>
  
 {user&& <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-xl shadow-violet-200/60">
        {/* Cover */}
        
 
        {/* Photo */}
        <div className=" flex justify-center ">
          <div className="rounded-full bg-white p-1.5 shadow-lg shadow-violet-200">
            <img
              src={user?.photo}
              alt="profile"
              className="h-28 w-28 rounded-full bg-violet-100 object-cover ring-4 ring-violet-100"
            />
          </div>
        </div>
 
        {/* Name + username */}
        <div className="px-6 pt-4 text-center">
          <h1 className="text-2xl font-bold text-violet-950">{user.name}</h1>
          <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
            <FiAtSign className="h-4 w-4" />
            {user.name}
          </p>
        </div>
 
        {/* Followers / Following */}
        <div className="mx-6 mt-5 grid grid-cols-2 divide-x divide-violet-100 rounded-2xl border border-violet-100 bg-violet-50/60 py-3">
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1.5 text-lg font-bold text-violet-900">
              <FiUsers className="h-4 w-4 text-violet-500" />
             {user.followersCount}
            </span>
            <span className="text-xs text-violet-500">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1.5 text-lg font-bold text-violet-900">
              <FiUserPlus className="h-4 w-4 text-violet-500" />
             {user.followingCount}
            </span>
            <span className="text-xs text-violet-500">Following </span>
          </div>
        </div>
 
        {/* Info */}
        <div className="grid grid-cols-2 gap-2.5 px-6 py-5">
          {/* Name */}
          <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-violet-100 bg-white px-3 py-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
              <FiUser className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] leading-tight text-violet-400">Name</p>
              <p className="truncate text-sm font-medium text-violet-950">
               {user.name}
              </p>
            </div>
          </div>
 
          {/* Gender */}
          <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-violet-100 bg-white px-3 py-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
              <FaVenusMars className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] leading-tight text-violet-400">Gender</p>
              <p className="truncate text-sm font-medium text-violet-950">
                {user.gender}
              </p>
            </div>
          </div>
 
          {/* Email */}
          <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-violet-100 bg-white px-3 py-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
              <FiMail className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] leading-tight text-violet-400">Email</p>
              <p className="truncate text-sm font-medium text-violet-950">
                {user.email}
              </p>
            </div>
          </div>
 
          {/* Date of birth */}
          <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-violet-100 bg-white px-3 py-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
              <FiCalendar className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] leading-tight text-violet-400">
                Date of birth
              </p>
              <p className="truncate text-sm font-medium text-violet-950">
               {user.dateOfBirth}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>}

{postUserData?.data.data.posts.map((currentPost: PostType) => <Post post={currentPost}/>)}
    
    </>




     
   
  )
}
