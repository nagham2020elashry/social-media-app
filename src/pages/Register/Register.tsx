import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "../../schemas/auth.schema";
import { type RegisterSchemaInterface } from "../../schemas/auth.schema";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {Helmet} from "react-helmet";






export default function Register() {

const navigate =useNavigate()
const [apiError,setapiError] = useState(null)
const [isLoading,setisLoading] = useState(false)

  const form = useForm<RegisterSchemaInterface>({
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      gender: "female",
      password: "",
      rePassword: "",
    },
    resolver:zodResolver(RegisterSchema),
    mode:"onChange" 
  });



  let { register, handleSubmit , formState } = form;

  function handelRegister(values: RegisterSchemaInterface) {
    // console.log(values);


    setisLoading(true)
    axios.post(`https://route-posts.routemisr.com/users/signup`,values )
    .then((res)=>{
if (res.data.success) {
  navigate("/login")
}

    })
    .catch((err)=>{
setapiError(err.response.data.message)
    })
    .finally(()=>{
      setisLoading(false)
    })
  }

  return (
    <>

     <Helmet>
            <title> Register</title>
          </Helmet>
      <h1 className="text-center text-4xl font-bold text-indigo-500 py-6">
        Register Now
      </h1>

{apiError && (
  <p className="bg-red-500 text-white text-center font-bold p-2 rounded-sm  mx-auto">
    {apiError}
  </p>
)}


      <form
        className="max-w-md mx-auto pt-3 h-screen "
        onSubmit={handleSubmit(handelRegister)}
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            {...register("name")}
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          
            
          />

          <label
            htmlFor="name"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10  peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Name
          </label>
    <p className="text-red-500 font-bold">{formState.errors.name?.message}</p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            {...register("email")}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          
            
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10  peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Email address
          </label>
             <p className="text-red-500 font-bold">{formState.errors.email?.message}</p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="date"
            {...register("dateOfBirth")}
            id="dateOfBirth"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          
            
          />
          <label
            htmlFor="dateOfBirth"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10  peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Birthday
          </label>
   <p className="text-red-500 font-bold">{formState.errors.dateOfBirth?.message}</p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            {...register("password")}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          
            
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10  peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Password
          </label>
           <p className="text-red-500 font-bold">{formState.errors.password?.message}</p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            {...register("rePassword")}
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          
            
          />
          <label
            htmlFor="rePassword"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10  peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Confierm Your Password
          </label>
           <p className="text-red-500 font-bold">{formState.errors.rePassword?.message}</p>
        </div>
        <div className="flex gap-6">
          <div className="flex items-center mb-4">
            <input
              id="option-1"
              type="radio"
              {...register("gender")}
              defaultValue="male"
              className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
              defaultChecked
            />
            <label
              htmlFor="option-1"
              className="select-none ms-2 text-sm font-medium text-heading"
            >
              Male
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="option-2"
              type="radio"
              {...register("gender")}
              defaultValue="female"
              className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
              defaultChecked
            />
            <label
              htmlFor="option-2"
              className="select-none ms-2 text-sm font-medium text-heading"
            >
              Female
            </label>
          </div>
        </div>

        <button
        disabled={isLoading}
          type="submit"
          className="text-white disabled:bg-indigo-950 disabled:text-white disabled:cursor-not-allowed      mt-3 rounded-2xl bg-indigo-500 box-border border border-transparent hover:bg-indigo-800 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3"
        >
          {isLoading ? "Loading..." : "Register"}
        </button>

<div className="flex justify-center my-1.5 underline cursor-pointer text-fuchsia-300 font-semibold text-sm">

  <Link to={"/login"}>Do You Have An Account? Go Login   </Link>
</div>

      </form>
    </>
  );
}
