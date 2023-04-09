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
    useEffect(() => {
        const userId = "dulan";
        const pusher = new Pusher(`${process.env.PUSHER_APP_KEY}`, {
            cluster: `${process.env.PUSHER_APP_CLUSTER}`,
            authEndpoint: apis.EMAIL_NOTIFICATION_AUTH,
            auth: {
                params: {
                    userId, // Logged in user id. for auth purposes
                },
            },
        });

        const channel = pusher.subscribe(`presence-${userId}`);

        channel.bind("pusher:subscription_succeeded", (members: any) => {
            getEmails()
        });

        channel.bind("new_email_notification", async (data: any) => {
            notification.info({
                message: "New Email",
                description: "New email has been received. Please fetch the latest data.",
                placement: "bottomRight",
                icon: <ExclamationCircleOutlined style={{color: "yellow"}}/>,
            });
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

    function getEmails() {
        setLoading(true);
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
                    icon: <ExclamationCircleOutlined style={{color: "red"}}/>,
                });
            });
    }

    useEffect(() => {
        getEmails();
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

