import Head from "next/head";
import {Header} from "@/components/organisms/header.organism";
import {notification, Table} from "antd";
import {useEffect, useState} from "react";
import {apis} from "@/properties";
import {GetData} from "@/api-service/get-data";
import {ExclamationCircleOutlined} from "@ant-design/icons";

export default function Email() {
    const [isPaginationChanged, setIsPaginationChanged] = useState(false);
    const [paginationConfig, setPaginationConfig] = useState({
        total: 0,
        defaultPageSize: 10,
        pageSize: 10,
        current: 1,
    });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const onPaginationChange = (page: number, pageSize?: number) => {
        const newPaginationConfig = {...paginationConfig, current: page};
        if (pageSize) {
            newPaginationConfig.pageSize = pageSize;
        }
        setIsPaginationChanged(!isPaginationChanged);
        setPaginationConfig(newPaginationConfig);
    };

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

    useEffect(() => {
        setLoading(true)
        GetData(apis.FETCH_ALL_MAILS, {
            page: paginationConfig.current - 1,
            size: paginationConfig.pageSize
        })
            .then((result: any) => {
                let responseJson = result;
                setData(responseJson.content);
                setPaginationConfig({
                    ...paginationConfig,
                    total: responseJson.totalElements,
                    defaultPageSize: responseJson.size,
                    pageSize: responseJson.size,
                });
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                notification.error({
                    message: "Error",
                    description: error.message || "Something went wrong",
                    placement: "bottomRight",
                    icon: <ExclamationCircleOutlined style={{color: "yellow"}}/>,
                });
                console.log(error);
            });
    }, [isPaginationChanged]);

    return (
        <>
            <Head>
                <title>Pickles UI</title>
            </Head>
            <main className="bg-gray-100 min-h-screen">
                <Header headerName={'Emails'}/>
                <div className='p-4'>
                    <Table dataSource={data} columns={columns}
                           className="mt-0 mb-5"
                           loading={loading}
                           pagination={{
                               ...paginationConfig,
                               defaultCurrent: 1,
                               onChange: onPaginationChange,
                           }}
                    />;
                </div>
            </main>
        </>
    )
}

