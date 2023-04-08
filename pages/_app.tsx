import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import React from "react";
import {Sidebar} from "@/components/organisms/sidebar.organism";

export default function App({Component, pageProps}: AppProps) {
    return (
        <Sidebar>
            <Component {...pageProps} />
        </Sidebar>
    )
}
