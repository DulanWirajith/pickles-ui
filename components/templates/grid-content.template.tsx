import {Header} from "@/components/organisms/header.organism";
import {Footer} from "@/components/organisms/footer.organism";
import React, {ReactNode} from "react";
import Head from "next/head";

interface iGridContentProps {
    children?: ReactNode,
    headerName: string,
    lastUpdatedDate?: string
}

export const GridContent = ({children, headerName, lastUpdatedDate}: iGridContentProps) => {
    return (
        <>
            <Head>
                <title>Pickles UI</title>
            </Head>
            <div className="bg-gray-100 flex flex-col min-h-screen">
                {/* header */}
                <Header headerName={headerName}/>

                {/* content */}
                <main className="flex-grow">
                    <div className='p-4 flex-grow'>
                        {children}
                    </div>
                </main>

                {/* footer */}
                <Footer lastUpdatedDate={lastUpdatedDate ? lastUpdatedDate : 'not updated yet'}/>
            </div>
        </>
    )
}
