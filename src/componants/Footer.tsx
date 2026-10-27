
import { LiaAccusoft } from "react-icons/lia";
import { Link } from "react-router-dom";
import { FaHeart } from 'react-icons/fa6';

 

 
const links = ["About", "Help center", "Safety", "Privacy", "Terms"];

export default function Footer() {
  return (
 <footer className="border-t border-purple-100 text-gray-600 bg-indigo-50">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-3 pt-4 md:flex-row md:justify-between">
        {/* Brand */}
       <div className=" flex items-center gap-2">
         <p className="text-indigo-600 text-3xl"><LiaAccusoft /></p>
        <Link to="/" className="text-xl font-bold text-indigo-600">
         SM App
        </Link>
       </div>
 
        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="transition hover: text-indigo-700"
            >
              {link}
            </a>
          ))}
        </nav>
 
      </div>
 
      <div className="bg-indigo-50 py-2 text-center text-xs text-indigo-700">
        <p className="inline-flex items-center gap-1">
          © {new Date().getFullYear()} Sociala. Made with
          <FaHeart className="h-3 w-3 text-indigo-500" />
        </p>
      </div>
    </footer>
  )
}
