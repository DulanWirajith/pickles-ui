import Head from "next/head";
import {Header} from "@/components/organisms/header.organism";
import {notification, Table, Tag} from "antd";
import React, {useEffect, useState} from "react";
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

    const columns = [
        {
            title: 'To Mail',
            dataIndex: 'to',
            key: 'to',
        },
        {
            title: 'Email Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'External Id',
            dataIndex: 'externalId',
            key: 'externalId',
        },
        {
            title: 'Attempts Count',
            dataIndex: 'attemptsCount',
            key: 'attemptsCount',
        },
        {
            title: 'Final Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                return status === 'SUCCESS' ? <Tag className='text-green-500'>{status}</Tag> : status === 'FAILED' ?
                    <Tag className='text-red-500'>{status}</Tag> : <Tag className='text-yellow-500'>{status}</Tag>
            }
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

