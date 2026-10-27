import { useState } from "react";
import { LiaAccusoft } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const [open, setOpen] = useState(false);
     const {userLogin , setuserLogin} =useContext(AuthContext)
const navigate = useNavigate()


     function logout() {
      localStorage.removeItem("userToken")
      setuserLogin(null)
navigate("/login")
     }



  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
       <div className=" flex items-center gap-2">
         <p className="text-indigo-600 text-3xl"><LiaAccusoft /></p>
        <Link to="/" className="text-xl font-bold text-indigo-600">
         SM App
        </Link>
       </div>
        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex"> 

           { userLogin ?( <><Link to="/" className="text-sm font-medium text-gray-800 transition-colors hover:text-indigo-600">
                Home
              </Link>
        
              <Link to="Profile" className="text-sm font-medium text-gray-800 transition-colors hover:text-indigo-600">
               Profile
              </Link>
              <button onClick={logout} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2">
            LogOut
          </button>
              </> ):(<><Link to="Register" className="text-sm font-medium text-gray-800 transition-colors hover:text-indigo-600">
                Register
              </Link>
          <Link to="Login" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2">
            Login
          </Link></>) }
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="rounded-md p-2 text-gray-800 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 md:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        {userLogin ? (<>    <Link to="/" onClick={() => setOpen(false)} className="  my-2 text-center block rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100">
              Home
            </Link>
         
            <Link to="Profile" onClick={() => setOpen(false)} className="  my-2 text-center block rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100">
              Profile
            </Link>
             <button   onClick={logout} className=" my-2 flex justify-center w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
              LogOut
            </button>
            </> ):(<>  <Link to="Register" onClick={() => setOpen(false)} className=" my-2 text-center block rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100">
              Register
            </Link>
          
            <Link to="Login" className=" my-2 flex justify-center w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
              Login
            </Link></>)}
     
         
           
          
      </div>
    </header>
  );
}

