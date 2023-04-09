import {Header} from "@/components/organisms/header.organism";
import {Footer} from "@/components/organisms/footer.organism";
import React, {ReactNode} from "react";

interface iGridContentProps {
    children: ReactNode,
    headerName: string,
    lastUpdatedDate?: string
}

export const GridContent = ({children, headerName, lastUpdatedDate}: iGridContentProps) => {
    return (
        <div className="bg-gray-100 flex flex-col min-h-screen">
            <Header headerName={headerName}/>

            <main className="flex-grow">
                <div className='p-4 flex-grow'>
                    {children}
                </div>
            </main>

            <Footer lastUpdatedDate={lastUpdatedDate ? lastUpdatedDate : 'not updated yet'}/>
        </div>
    )
}
