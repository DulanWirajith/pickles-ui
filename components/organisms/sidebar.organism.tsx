import React from "react";
import Link from "next/link";
import Image from 'next/image';
import {SidebarLink} from "@/components/atom/sidebar-link.atom";

export const Sidebar = ({children}: { children: React.ReactNode }) => {
    return (
        <div className='flex'>
            <div className='fixed w-40 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between'>
                <div className='flex flex-col items-center'>
                    <Link href='/'>
                        <div className='p-3 rounded-xl'>
                            <Image src="/next.svg" alt="My Image" width={500} height={500}/>
                        </div>
                    </Link>
                    <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
                    <Link href='/email'>
                        <SidebarLink name={'View Emails'}/>
                    </Link>
                </div>
            </div>
            <main className='ml-40 w-full'>{children}</main>
        </div>
    );
}
