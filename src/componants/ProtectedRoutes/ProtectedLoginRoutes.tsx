
import { Navigate } from 'react-router-dom';

import type { ReactNode } from 'react';

export default function ProtectedLoginRoutes({children} : {children :ReactNode}) {




 if (localStorage.getItem("userToken")) {
return <Navigate  to={"/home"}/>

 } else {
    return <> {children}</>
 }
}
