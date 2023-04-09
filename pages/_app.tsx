import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import React from "react";
import {Sidebar} from "@/components/organisms/sidebar.organism";
import {Provider} from "react-redux";
import {store} from "@/store/store";

export default function App({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <Sidebar>
                <Component {...pageProps} />
            </Sidebar>
        </Provider>
    )
}
