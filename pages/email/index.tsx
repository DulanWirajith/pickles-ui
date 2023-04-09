import {notification, Table, Tag} from "antd";
import React, {useEffect, useState} from "react";
import {apis} from "@/properties";
import {GetData} from "@/api-service/get-data";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {setLastUpdatedDate} from "@/store/email/email.slice";
import moment from "moment/moment";
import {GridContent} from "@/components/templates/grid-content.template";
import Pusher from "pusher-js";

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

    const lastUpdatedDate = useAppSelector((state) => state.emails.lastUpdatedDate)
    const dispatch = useAppDispatch();

    // for pusher >>>>>>>>>>>>>>>

    const userId = "dulan";
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImUuYW5hZG9sQGdtYWlsLmNvbSIsImlhdCI6MTY2NjYwNzM4MiwiZXhwIjoxNjY3OTAzMzgyfQ.IMz3g1Lj4oC5Bw64QnyWjRc_hJZMgqSJ7VcukkaCkFAo"

    useEffect(() => {
        console.log('PUSHER_APP_ID >>', process.env.PUSHER_APP_ID);
        console.log('REACT_APP_CLUSTER >>', process.env.PUSHER_APP_CLUSTER);
        const pusher = new Pusher(`${process.env.PUSHER_APP_ID}`, {
            cluster: `${process.env.PUSHER_APP_CLUSTER}`,
            authEndpoint: "http://localhost:3000/mail/auth",
            auth: {
                params: {
                    userId,
                },
            },
        });

        console.log('pusher >>', pusher)

        const channel = pusher.subscribe(`presence-${userId}`);
        console.log('channel>>', channel)

        try {
            channel.bind("pusher:subscription_succeeded", (members: any) => {
                // getNotifications();
                console.log("subscription_succeeded", members);
                // setIsPaginationChanged(!isPaginationChanged);
            });
        } catch (e) {
            console.log(e)
        }

        console.log('asd')

        channel.bind("new_notification", (data: any) => {
            console.log(data);
        });

        return () => {
            pusher.unsubscribe(`presence-${userId}`);
        };
    }, []);


    // for pusher <<<<<<<<<<<<<<<<

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
                const dataWithKey = responseJson.content.map((item: any) => {
                        return {
                            ...item,
                            key: item.id,
                        }
                    }
                );
                setData(dataWithKey);
                setPaginationConfig({
                    ...paginationConfig,
                    total: responseJson.totalElements,
                    defaultPageSize: responseJson.size,
                    pageSize: responseJson.size,
                });
                setLoading(false);
                dispatch(setLastUpdatedDate(moment().format('MMMM Do YYYY, h:mm:ss')));
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
            <GridContent headerName="Emails" lastUpdatedDate={lastUpdatedDate}>
                <Table dataSource={data} columns={columns}
                       className="mt-0 mb-5"
                       loading={loading}
                       pagination={{
                           ...paginationConfig,
                           defaultCurrent: 1,
                           onChange: onPaginationChange,
                       }}
                />;
            </GridContent>
        </>
    )
}

