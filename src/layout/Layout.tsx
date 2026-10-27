import { Outlet } from "react-router-dom";
import Footer from "../componants/Footer";
import Navbar from "../componants/Navbar";

export default function Layout() {
  return (
    <div >
      <Navbar/>

    <div className=" container w-[80%] mx-auto pt-14">
<Outlet/>
</div>

      <Footer/>
    </div>
  )
}
