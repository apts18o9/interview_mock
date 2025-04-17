import React, {ReactNode} from 'react'
import {isAuthenticated} from "@/lib/actions/auth.action";
import {redirect} from "next/navigation";


const AuthLayout =  ({children}: {children: ReactNode}) => {
    // const isUserAuthenticated = await isAuthenticated();
    //
    // if(!isUserAuthenticated) redirect('/sign-in')

    return (
        <div className="auth-layout">{children}</div>
    )
}
export default AuthLayout
