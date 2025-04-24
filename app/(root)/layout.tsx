import React, {ReactNode} from 'react'
import Link from "next/link";
import Image from "next/image";
import {getCurrentUser} from "@/lib/actions/auth.action";
// import {isAuthenticated} from "@/lib/actions/auth.action";
// import {redirect} from "next/navigation";
//home page
const RootLayout =  async ({children} : {children: ReactNode})=> {
    //non logged in only show home page
    // const isUserAuthenticated = await isAuthenticated();
    //
    // if(!isUserAuthenticated) redirect("/")
    const user = await getCurrentUser();
    const username = user?.name || "test";

    // console.log(username);
    return (
        <div className="root-layout">
            <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="logo" width={38} height={32} />
                    <h2 className="text-primary-100 font-semibold text-lg">PrepRing</h2>
                </Link>

                <div className="flex items-center gap-4">
                    <span className="text-white font-medium text-base">Hello, {username}</span>
                    <button
                        type="button"
                        className="px-4 py-1 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            {children}
        </div>
    )
}
export default RootLayout
