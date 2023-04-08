import Head from "next/head";
import {Header} from "@/components/organisms/header.organism";
import {Table} from "antd";

export default function Email() {
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
        {
            key: '3',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '4',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
        {
            key: '5',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
        {
            key: '6',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '7',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <>
            <Head>
                <title>Pickles UI</title>
            </Head>
            <main className="bg-gray-100 min-h-screen">
                <Header headerName={'Emails'}/>
                <div className='p-4'>
                    <Table dataSource={dataSource} columns={columns}
                           className="mt-0 mb-5"
                    />;
                </div>
            </main>
        </>
    )
}
