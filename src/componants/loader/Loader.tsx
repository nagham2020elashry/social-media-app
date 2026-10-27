
import { Discuss } from "react-loader-spinner";
export default function Loader() {
  return (
    <div>
      <div className="  h-screen w-full flex justify-center items-center ">
  <Discuss
visible={true}
height="80"
width="80"
ariaLabel="discuss-loading"
wrapperStyle={{}}
wrapperClass="discuss-wrapper"
color="#fff"
/>
 </div>
    </div>
  )
}
