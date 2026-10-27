import { MdError } from "react-icons/md";
import {Helmet} from "react-helmet";
export default function NotFound() {
  return (
    <div >

       <Helmet>
            <title> NotFound</title>
          </Helmet>
        <div className=" font-bold text-3xl text-red-700  flex justify-center ">
            <MdError />
        </div>
    <h1 className="text-center font-bold text-3xl text-red-700">
NotFound.......!
    </h1>
    </div>
  )
}
