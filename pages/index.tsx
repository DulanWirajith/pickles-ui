import {Inter} from 'next/font/google'
import Head from 'next/head';
import {Header} from "@/components/organisms/header.organism";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <>
            <Head>
                <title>Pickles UI</title>
            </Head>
            <main className="bg-gray-100 min-h-screen">
                <Header headerName={'Dashboard'}/>
            </main>
        </>
    )
}
