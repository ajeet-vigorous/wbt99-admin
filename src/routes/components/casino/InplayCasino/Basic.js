import React, { useEffect, useState } from "react";
import { Card, DatePicker, Table, Button, Row, Col, message } from "antd";
import moment from "moment";
import BackButton from "../../Hoc/BackButton";
import { useSelector } from "react-redux";

import Loader from "../../../../components/loader";
import { Link } from "react-router-dom";
import { BarChartOutlined, EyeOutlined } from "@ant-design/icons";
import { apiCall } from "../../../../appRedux/sagas/HTTP";

const Basic = () => {


    const [data, setData] = useState([])
    const [finalData, setFinalData] = useState([])


    const { loading } = useSelector((state) => state.UserReducer);

    useEffect(() => {
        onFinish()
    }, [])


    useEffect(() => {
        const filteredData = data?.filter(item => !item.isVirtual && item.cashinoStatus).map(item => ({
            key: item._id,
            isVirtual: item.isVirtual,
            maxStake: item.maxStake,
            minStake: item.minStake,
            socketURL: item.socketURL,
            cacheURL: item.cacheURL,
            betStatus: item.betStatus,
            cashinoStatus: item.cashinoStatus,
            videoUrl1: item.videoUrl1,
            videoUrl2: item.videoUrl2,
            videoUrl3: item.videoUrl3,
            videoUrlType: item.videoUrlType,
            isDisable: item.isDisable,
            name: item.name,
            shortName: item.shortName,
            fetchData: item.fetchData,
            date: item.date,
            createdAt: item.createdAt,
            setting: item.setting,
            eventId: item?.eventId


        }));
        setFinalData(filteredData);

    }, [data])
    const onFinish = async () => {
        try {
            const res = await apiCall("POST", "casino/getDiamondCasinoData");
            if (res?.data?.error === false) {
                setData(res.data.data)

            } else {
                message.error(res?.data?.message);
            }

        } catch (error) {
            message.error("Something went wrong");
        }
    };



    console.log(finalData, "fffffffffffffffffffff");



    const renderContent = (value, row, index) => {
        const obj = {
            children: value,
            props: {},
        };

        return obj;
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'code',
            render: (value, row, index) => (
                <span className="gx-text-black gx-text-uppercase gx-text-nowrap">
                    {index + 1}
                </span>
            ),
        },

        {
            title: 'Name',
            dataIndex: 'name',
            render: (value, row) => (
                <span className="gx-text-black gx-text-uppercase gx-text-nowrap">{row.name}</span>
            ),
        },
        {
            title: 'Details',
            dataIndex: 'action',
            render: (text, record) => (
                <div className="gx-bg-flex gx-justify-content-start gx-align-items-center">
                    <Button type="primary" className="">

                        <Link to={`/components/casino/casinoinplayview/${record.eventId}/${record.name}`}>
                            View
                        </Link>
                    </Button>
                    <Button type="primary" className=""><Link to={`/components/casino/inplaycasinodetails/${record.name}/${record.eventId}/`}> <EyeOutlined /> Display Games</Link></Button>
                </div>
            ),
        },
    ];

    const RangePicker = DatePicker.RangePicker;



    return (
        <>
            {loading ? <Loader props={loading} /> :
                <Card className="gx-card">

                    <div className="gx-bg-grey gx-px-3 gx-py-2 gx-bg-flex gx-align-items-center">
                        <span className="gx-fs-lg gx-font-weight-bold gx-text-white gx-align-items-center gx-text-uppercase">{`Active Games`}</span>
                        <BackButton />
                    </div>
                    <div className="gx-p-4">
                        <Table className="gx-table-responsive gx-text-uppercase" columns={columns} dataSource={finalData} bordered pagination={false} size="small" />
                    </div>
                </Card>
            }
        </>
    );
};

export default Basic;
