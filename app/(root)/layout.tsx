import React, {ReactNode} from 'react'
import Link from "next/link";
import Image from "next/image";
// import {isAuthenticated} from "@/lib/actions/auth.action";
// import {redirect} from "next/navigation";

const RootLayout =({children} : {children: ReactNode})=> {
    //non logged in only show home page
    // const isUserAuthenticated = await isAuthenticated();
    //
    // if(!isUserAuthenticated) redirect('/sign-in')
    return (
        <div className="root-layout">
            <nav>
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="logo" width={38} height={32}></Image>
                    <h2 className="text-primary-100">PrepRing</h2>
                </Link>
            </nav>
            {children}
        </div>
    )
}
export default RootLayout
